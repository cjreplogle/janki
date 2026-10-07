"""Janki's own data rides along with AnkiWeb sync, so the Calendar and lecture setup
follow you between computers. Decks, cards and scheduling already sync through Anki
itself; this covers the files Anki doesn't know about (calendar colours, class counts,
re-suspend list, lecture → deck mapping, exclusions, aliases, the lecture spreadsheet)
and the calendar/lecture settings — including the calendar URL, so a computer that
receives it downloads the calendar itself (the .ics file is never sent).

Each item is compressed and encrypted, then stored in its own collection-config key,
so AnkiWeb carries it with the normal sync and two computers editing different items
never overwrite each other. The key comes from a passphrase you type on each computer
(Tools → Janki: Sync passphrase…); only the derived key is kept, locally. AnkiWeb sees
random-looking key names (`jk_<hex>`) and ciphertext: no filenames, no contents, and
change fingerprints are keyed too. Nothing syncs until a passphrase is set.

Cipher (stdlib only — Anki bundles no crypto library): scrypt → two subkeys;
HMAC-SHA256 in counter mode as the keystream with a random 16-byte nonce, then
HMAC-SHA256 over key name + nonce + ciphertext (encrypt-then-MAC). Before a sync, items changed here are written into the
collection; after a sync (and when a profile opens) items changed elsewhere are written
back to disk. When both sides changed the same item, the newer edit wins.

Settings: `sync_janki_data` (default on). Phones can't run add-ons, so this is
computer ↔ computer (Mac and Windows)."""
import base64
import hashlib
import hmac
import json
import os
import time
import zlib

from aqt import gui_hooks, mw

from ..util.config import _cfg, _cfg_raw, log

_ADDON = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
_UF = os.path.join(_ADDON, "user_files")
_STATE = os.path.join(_UF, "data_sync_state.json")
_RECV = os.path.join(_UF, "synced")          # received spreadsheet / local calendar file
_LEGACY = "janki_sync:"                      # v1 (plain) keys, removed on sight
_PREFIX = "jk_"
_SALT = b"janki-sync-v2"                     # fixed so every computer derives the same key
_MAX = 4 * 1024 * 1024                       # skip anything bigger (keeps syncs light)

# plain files, relative to the add-on folder
_FILES = {
    "colours": "user_files/calendar_colours.json",
    "counts": "user_files/class_counts.json",
    "resuspend": "user_files/calendar_resuspend.json",
    "source_decks": "user_files/source_decks.json",
    "excluded": "user_files/lecture_excluded.json",
    "aliases": "aliases.json",
}
# no longer sent: the calendar travels as its URL (in "cfg") and each computer downloads
# it; entries left from earlier versions are removed from the collection
_DROPPED = ("ics_cache", "ics_meta", "ics_file")
# settings that mean the same thing on every computer
_CFG_PREFIXES = ("calendar_", "unsuspend_", "ak_", "lecture_")
_CFG_KEYS = ("timezone", "fuzzy_cutoff", "auto_on_launch")
# settings that point at a file on this computer: the file itself is synced
_PATH_KEYS = {"xlsx": "xlsx_path"}


def _enabled():
    return bool(_cfg().get("sync_janki_data", True))


def _keys():
    """(enc_key, mac_key) from the stored passphrase key, or None when not set."""
    k = (_cfg_raw().get("sync_key") or "").strip()
    if len(k) != 64:
        return None
    raw = bytes.fromhex(k)
    return (hmac.new(raw, b"enc", hashlib.sha256).digest(),
            hmac.new(raw, b"mac", hashlib.sha256).digest())


def derive_key(passphrase):
    return hashlib.scrypt(passphrase.encode("utf-8"), salt=_SALT,
                          n=2 ** 15, r=8, p=1, maxmem=64 * 1024 * 1024).hex()


def _stream(ek, nonce, n):
    out, i = bytearray(), 0
    while len(out) < n:
        out += hmac.new(ek, nonce + i.to_bytes(8, "big"), hashlib.sha256).digest()
        i += 1
    return bytes(out[:n])


def _seal(keys, label, plain):
    ek, mk = keys
    nonce = os.urandom(16)
    ct = bytes(a ^ b for a, b in zip(plain, _stream(ek, nonce, len(plain))))
    tag = hmac.new(mk, label.encode() + nonce + ct, hashlib.sha256).digest()
    return base64.b64encode(nonce + ct + tag).decode("ascii")


def _open(keys, label, blob):
    ek, mk = keys
    raw = base64.b64decode(blob)
    nonce, ct, tag = raw[:16], raw[16:-32], raw[-32:]
    want = hmac.new(mk, label.encode() + nonce + ct, hashlib.sha256).digest()
    if not hmac.compare_digest(tag, want):
        raise ValueError("wrong passphrase or damaged data")
    return bytes(a ^ b for a, b in zip(ct, _stream(ek, nonce, len(ct))))


def _cfg_key(keys, name):
    return _PREFIX + hmac.new(keys[1], b"name:" + name.encode(), hashlib.sha256).hexdigest()[:20]


_KEYS = None      # set per push/pull; _h fingerprints are keyed so equal files don't show


def _h(data):
    return hmac.new(_KEYS[1], b"h:" + data, hashlib.sha256).hexdigest()[:24]


def _load_state():
    try:
        with open(_STATE, encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


def _save_state(st):
    try:
        os.makedirs(_UF, exist_ok=True)
        tmp = _STATE + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(st, f)
        os.replace(tmp, _STATE)
    except Exception as e:
        log("data sync: state save: %s" % e)


def _read(path):
    try:
        if os.path.getsize(path) > _MAX:
            return None, 0.0
        with open(path, "rb") as f:
            return f.read(), os.path.getmtime(path)
    except Exception:
        return None, 0.0


def _write(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    tmp = path + ".jksync"
    with open(tmp, "wb") as f:
        f.write(data)
    os.replace(tmp, path)


def _is_url(p):
    return (p or "").strip().lower().startswith(("http://", "https://", "webcal://"))


def _portable_cfg(c):
    out = {k: v for k, v in c.items()
           if k.startswith(_CFG_PREFIXES) or k in _CFG_KEYS}
    if _is_url(c.get("ics_path")):
        out["ics_path"] = c["ics_path"]
    return out


def _local():
    """{name: (bytes, mtime)} for everything this computer has to offer."""
    items = {}
    for name, rel in _FILES.items():
        data, mt = _read(os.path.join(_ADDON, rel))
        if data is not None:
            items[name] = (data, mt)
    c = _cfg_raw()
    items["cfg"] = (json.dumps(_portable_cfg(c), sort_keys=True).encode(), 0.0)
    for name, key in _PATH_KEYS.items():
        p = (c.get(key) or "").strip()
        if p and not _is_url(p) and os.path.isfile(p):
            data, mt = _read(p)
            if data is not None:
                items[name] = (data, mt)
    return items


def _names():
    return list(_FILES) + ["cfg"] + list(_PATH_KEYS)


def _remote(col):
    out = {}
    for name in _names():
        try:
            v = col.get_config(_cfg_key(_KEYS, name), None)
        except Exception:
            v = None
        if isinstance(v, dict) and v.get("h"):
            out[name] = v
    return out


def _check(col):
    """True when the collection's check value opens with this passphrase (or there is
    none yet, which this computer then writes)."""
    k = _PREFIX + "check"
    try:
        v = col.get_config(k, None)
        st = _load_state()
        if st.pop("_new_key", False):        # passphrase just (re)set here: it's the one
            v = None
            _save_state(st)
        if v:
            return _open(_KEYS, k, v) == b"janki"
        col.set_config(k, _seal(_KEYS, k, b"janki"))
        return True
    except Exception:
        return False


def _drop_legacy(col):
    if _KEYS:
        for name in _DROPPED:
            try:
                if col.get_config(_cfg_key(_KEYS, name), None) is not None:
                    col.remove_config(_cfg_key(_KEYS, name))
            except Exception:
                pass
    for name in _names() + list(_DROPPED):
        try:
            if col.get_config(_LEGACY + name, None) is not None:
                col.remove_config(_LEGACY + name)
        except Exception:
            pass


_warned = False


def _ready(col):
    """Load the keys; warn once per session about a missing / mismatched passphrase."""
    global _KEYS, _warned
    _KEYS = _keys()
    msg = None
    if _KEYS is None:
        msg = "Janki sync is waiting for a passphrase (Tools → Janki: Sync passphrase…)."
    elif not _check(col):
        msg = ("Janki sync: this passphrase doesn't match the one your other computer "
               "used. Calendar data isn't syncing.")
        _KEYS = None
    if msg and not _warned:
        _warned = True
        try:
            from aqt.utils import tooltip
            tooltip(msg, period=6000)
        except Exception:
            pass
        log("data sync: " + msg)
    return _KEYS is not None


def push():
    """Before a sync: copy items edited on this computer into the collection."""
    col = getattr(mw, "col", None)
    if not col or not _enabled():
        return
    try:
        ok = _ready(col)
        _drop_legacy(col)
        if not ok:
            return
        st, remote, n = _load_state(), _remote(col), 0
        for name, (data, mt) in _local().items():
            h = _h(data)
            if h == (remote.get(name) or {}).get("h"):
                st[name] = h                     # already identical in the collection
                continue
            if h == st.get(name) or (name in remote and name not in st):
                continue     # unchanged here / first sync on this computer: take theirs
            fname = ""
            if name in _PATH_KEYS:
                fname = os.path.basename((_cfg_raw().get(_PATH_KEYS[name]) or ""))
            ck = _cfg_key(_KEYS, name)
            plain = zlib.compress(fname.encode("utf-8") + b"\0" + data, 9)
            col.set_config(ck, {"h": h, "t": mt or time.time(), "d": _seal(_KEYS, ck, plain)})
            st[name] = h
            n += 1
        _save_state(st)
        if n:
            log("data sync: sent %d item(s)" % n)
    except Exception as e:
        log("data sync: push: %s" % e)


def pull():
    """After a sync / on open: write items edited on another computer to disk."""
    col = getattr(mw, "col", None)
    if not col or not _enabled():
        return
    try:
        if not _ready(col):
            return
        st, local, got = _load_state(), _local(), []
        for name, it in _remote(col).items():
            if it["h"] == st.get(name):
                continue                                  # nothing new from elsewhere
            cur = local.get(name)
            if cur and _h(cur[0]) == it["h"]:
                st[name] = it["h"]
                continue
            # changed here too and not sent yet: the newer edit wins
            if cur and st.get(name) and _h(cur[0]) != st[name] and cur[1] > it.get("t", 0):
                continue
            if name == "cfg" and cur and st.get(name) and _h(cur[0]) != st[name]:
                continue                                  # unsent setting change here wins
            try:
                plain = zlib.decompress(_open(_KEYS, _cfg_key(_KEYS, name), it["d"]))
            except Exception as e:
                log("data sync: %s: %s" % (name, e))
                continue
            fname, _, data = plain.partition(b"\0")
            _apply(name, data, fname.decode("utf-8", "ignore"))
            st[name] = it["h"]
            got.append(name)
        _save_state(st)
        if got:
            log("data sync: received %s" % ", ".join(got))
            _refresh(got)
    except Exception as e:
        log("data sync: pull: %s" % e)


def _apply(name, data, fname):
    if name in _FILES:
        _write(os.path.join(_ADDON, _FILES[name]), data)
        return
    c = _cfg_raw()
    if name == "cfg":
        c.update(json.loads(data.decode()))
    else:                                     # spreadsheet / local calendar file
        key = _PATH_KEYS[name]
        p = (c.get(key) or "").strip()
        if not (p and not _is_url(p) and os.path.isfile(p)):
            p = os.path.join(_RECV, os.path.basename(fname or name))
            c[key] = p
        _write(p, data)
    mw.addonManager.writeConfig(__name__, c)


def _refresh(got):
    try:
        from ..integrations import lectures as L
        L._ics_reset()
        L._EV_CACHE["key"] = None
    except Exception:
        pass
    # the Calendar page redraws on its own sync_did_finish / profile_did_open hooks,
    # which run after these (installed first)


def ask_passphrase():
    """Tools → Janki: Sync passphrase… — the same phrase on every computer."""
    from aqt.qt import QInputDialog, QLineEdit
    from aqt.utils import tooltip
    text, ok = QInputDialog.getText(
        mw, "Janki sync passphrase",
        "Calendar and lecture data are encrypted before they go to AnkiWeb.\n"
        "Use the same passphrase on each computer. It never leaves this computer;\n"
        "if you forget it, set a new one everywhere (data re-uploads on next sync).",
        QLineEdit.EchoMode.Password)
    if not ok or not text.strip():
        return
    global _warned
    c = _cfg_raw()
    c["sync_key"] = derive_key(text.strip())
    mw.addonManager.writeConfig(__name__, c)
    _warned = False
    try:
        _save_state({"_new_key": True})    # resend everything under the new key
    except Exception:
        pass
    tooltip("Janki sync passphrase saved — it takes effect on the next sync.")


def install():
    try:
        from aqt.qt import QAction
        act = QAction("Janki: Sync passphrase…", mw)
        act.triggered.connect(ask_passphrase)
        mw.form.menuTools.addAction(act)
    except Exception as e:
        log("data sync menu: %s" % e)
    try:
        gui_hooks.profile_did_open.append(pull)
        gui_hooks.sync_will_start.append(push)
        gui_hooks.sync_did_finish.append(pull)
    except Exception as e:
        log("data sync: %s" % e)
