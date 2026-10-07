"""Janki's own data rides along with AnkiWeb sync, so the Calendar and lecture setup
follow you between computers. Decks, cards and scheduling already sync through Anki
itself; this covers the files Anki doesn't know about (calendar colours, class counts,
re-suspend list, lecture → deck mapping, exclusions, aliases, the downloaded calendar,
the lecture spreadsheet) and the calendar/lecture settings.

Each item is stored compressed in its own collection-config key (`janki_sync:<name>`),
so AnkiWeb carries it with the normal sync and two computers editing different items
never overwrite each other. Before a sync, items changed here are written into the
collection; after a sync (and when a profile opens) items changed elsewhere are written
back to disk. When both sides changed the same item, the newer edit wins.

Settings: `sync_janki_data` (default on). Phones can't run add-ons, so this is
computer ↔ computer (Mac and Windows)."""
import base64
import hashlib
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
_KEY = "janki_sync:"
_MAX = 4 * 1024 * 1024                       # skip anything bigger (keeps syncs light)

# plain files, relative to the add-on folder
_FILES = {
    "colours": "user_files/calendar_colours.json",
    "counts": "user_files/class_counts.json",
    "resuspend": "user_files/calendar_resuspend.json",
    "source_decks": "user_files/source_decks.json",
    "excluded": "user_files/lecture_excluded.json",
    "aliases": "aliases.json",
    "ics_cache": "user_files/calendar_cache.ics",
    "ics_meta": "user_files/calendar_cache.json",
}
# settings that mean the same thing on every computer
_CFG_PREFIXES = ("calendar_", "unsuspend_", "ak_", "lecture_")
_CFG_KEYS = ("timezone", "fuzzy_cutoff", "auto_on_launch")
# settings that point at a file on this computer: the file itself is synced
_PATH_KEYS = {"xlsx": "xlsx_path", "ics_file": "ics_path"}


def _enabled():
    return bool(_cfg().get("sync_janki_data", True))


def _h(data):
    return hashlib.sha1(data).hexdigest()


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


def _remote(col):
    out = {}
    for name in list(_FILES) + ["cfg"] + list(_PATH_KEYS):
        try:
            v = col.get_config(_KEY + name, None)
        except Exception:
            v = None
        if isinstance(v, dict) and v.get("h"):
            out[name] = v
    return out


def push():
    """Before a sync: copy items edited on this computer into the collection."""
    col = getattr(mw, "col", None)
    if not col or not _enabled():
        return
    try:
        st, remote, n = _load_state(), _remote(col), 0
        for name, (data, mt) in _local().items():
            h = _h(data)
            if h == (remote.get(name) or {}).get("h"):
                st[name] = h                     # already identical in the collection
                continue
            if h == st.get(name) or (name in remote and name not in st):
                continue     # unchanged here / first sync on this computer: take theirs
            entry = {"h": h, "t": mt or time.time(),
                     "d": base64.b64encode(zlib.compress(data, 9)).decode("ascii")}
            if name in _PATH_KEYS:
                entry["n"] = os.path.basename((_cfg_raw().get(_PATH_KEYS[name]) or ""))
            col.set_config(_KEY + name, entry)
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
            data = zlib.decompress(base64.b64decode(it["d"]))
            _apply(name, data, it)
            st[name] = it["h"]
            got.append(name)
        _save_state(st)
        if got:
            log("data sync: received %s" % ", ".join(got))
            _refresh(got)
    except Exception as e:
        log("data sync: pull: %s" % e)


def _apply(name, data, it):
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
            p = os.path.join(_RECV, os.path.basename(it.get("n") or name))
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


def install():
    try:
        gui_hooks.profile_did_open.append(pull)
        gui_hooks.sync_will_start.append(push)
        gui_hooks.sync_did_finish.append(pull)
    except Exception as e:
        log("data sync: %s" % e)
