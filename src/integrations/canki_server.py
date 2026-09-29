"""Canki — lets the Janki web reviewer (https://cjre.pl/ogle/canki) review THIS collection.

A small HTTP API served from inside Anki. Nothing is uploaded anywhere: the web page is a
static shell, and every card, answer and stat moves only between the browser and this
laptop.

Access rules
  * From this Mac (loopback): cjre.pl/ogle/canki connects keylessly — the browser sends
    `Origin: https://cjre.pl`, and the Host must be 127.0.0.1/localhost (blocks DNS
    rebinding). The page served by this server itself (http://127.0.0.1:PORT/) likewise.
  * From another device on the same network: needs the pairing key (shown in
    Tools → Canki, or as a QR on the Mac's Canki page). Wrong keys are rate-limited.

Collection work always runs on Anki's main thread (mw.taskman.run_on_main); the HTTP
threads only wait for results.
"""

import json
import mimetypes
import os
import re
import secrets
import socket
import threading
import time
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, unquote, urlparse

from aqt import mw

from ..util.config import log

# Canki is shelved: kept in the source but not shipped as a feature. While False, no
# server starts and no settings tab appears. For local development only, launch Anki
# with JANKI_CANKI=1 to bring it back.
AVAILABLE = os.environ.get("JANKI_CANKI") == "1"

DEFAULT_PORT = 8766
APP_URL = "https://cjre.pl/ogle/canki/"
TRUSTED_ORIGINS = {"https://cjre.pl", "https://www.cjre.pl"}
_KEY_ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789"   # no 0/o/1/l/i — easy to type on a phone

_server = None
_thread = None
_pending = {}            # card id → (Card, SchedulingStates) awaiting an answer
_fails = {}              # client ip → [timestamps of wrong keys]


# --------------------------------------------------------------------------- settings
def _user_dir() -> str:
    d = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "user_files")
    os.makedirs(d, exist_ok=True)
    return d


def _settings_path() -> str:
    return os.path.join(_user_dir(), "canki.json")


def _settings() -> dict:
    try:
        with open(_settings_path(), encoding="utf-8") as f:
            s = json.load(f)
    except Exception:
        s = {}
    changed = False
    if not s.get("key"):
        s["key"] = "".join(secrets.choice(_KEY_ALPHABET) for _ in range(8))
        changed = True
    # Experimental → off until switched on in Settings → Canki.
    for k, v in (("enabled", False), ("lan", True), ("port", DEFAULT_PORT)):
        if k not in s:
            s[k] = v
            changed = True
    if changed:
        _save_settings(s)
    return s


def _save_settings(s: dict) -> None:
    try:
        with open(_settings_path(), "w", encoding="utf-8") as f:
            json.dump(s, f, indent=2)
    except Exception as e:
        log("canki: settings save failed: %r" % e)


def regenerate_key() -> str:
    s = _settings()
    s["key"] = "".join(secrets.choice(_KEY_ALPHABET) for _ in range(8))
    _save_settings(s)
    return s["key"]


def lan_ips() -> list:
    ips = []
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("10.255.255.255", 1))          # no packet is sent; just picks the LAN route
        ips.append(s.getsockname()[0])
        s.close()
    except Exception:
        pass
    return [ip for ip in ips if not ip.startswith("127.")]


def local_hostname() -> str:
    try:
        import subprocess
        n = subprocess.run(["scutil", "--get", "LocalHostName"], capture_output=True,
                           text=True, timeout=2).stdout.strip()
        if n:
            return n + ".local"
    except Exception:
        pass
    return socket.gethostname()


def short_address() -> str:
    ips = lan_ips()
    return "%s:%d" % (ips[0] if ips else local_hostname(), _settings()["port"])


def pair_urls() -> list:
    s = _settings()
    port, key = s["port"], s["key"]
    urls = ["http://%s:%d/#k=%s" % (h, port, key) for h in lan_ips() + [local_hostname()]]
    return urls


# --------------------------------------------------------------------------- approve-to-pair
# A phone that opens Canki without a key asks to pair; Anki shows "Allow?" and, once
# allowed, hands that phone the pairing key. No QR or typing needed.
_pair_reqs = {}          # request id → {"ip", "name", "state", "t"}


def pair_request(ip: str, name: str) -> dict:
    now = time.time()
    for rid, r in list(_pair_reqs.items()):
        if now - r["t"] > 300:
            _pair_reqs.pop(rid, None)
    for rid, r in _pair_reqs.items():
        if r["ip"] == ip and r["state"] == "pending":
            return {"id": rid}
    if sum(1 for r in _pair_reqs.values() if r["state"] == "pending") >= 3:
        return {"error": "busy"}
    recent = [t for t in _fails.get(ip, []) if now - t < 600]
    if len(recent) >= 10:
        return {"error": "busy"}
    _fails[ip] = recent + [now]            # asking counts toward the rate limit too
    rid = secrets.token_urlsafe(12)
    _pair_reqs[rid] = {"ip": ip, "name": (name or "A device")[:60], "state": "pending", "t": now}
    mw.taskman.run_on_main(lambda: _ask_allow(rid))
    return {"id": rid}


def pair_status(ip: str, rid: str) -> dict:
    r = _pair_reqs.get(rid)
    if not r or r["ip"] != ip:
        return {"state": "gone"}
    if r["state"] == "allowed":
        _pair_reqs.pop(rid, None)
        return {"state": "allowed", "key": _settings()["key"]}
    return {"state": r["state"]}


def _ask_allow(rid):
    from aqt.qt import QMessageBox
    r = _pair_reqs.get(rid)
    if not r:
        return
    box = QMessageBox(mw)
    box.setWindowTitle("Canki")
    box.setIcon(QMessageBox.Icon.Question)
    box.setText("%s wants to review your cards." % r["name"])
    box.setInformativeText("Device address: %s\nOnly allow devices you own." % r["ip"])
    allow = box.addButton("Allow", QMessageBox.ButtonRole.AcceptRole)
    box.addButton("Deny", QMessageBox.ButtonRole.RejectRole)
    box.setDefaultButton(allow)

    def done(_=None):
        if rid in _pair_reqs:
            _pair_reqs[rid]["state"] = "allowed" if box.clickedButton() is allow else "denied"
    box.finished.connect(done)
    box.open()
    try:
        mw.raise_()
        mw.activateWindow()
        box.raise_()
    except Exception:
        pass


# --------------------------------------------------------------------------- main thread
def _on_main(fn, timeout=25):
    box, ev = {}, threading.Event()

    def run():
        try:
            box["v"] = fn()
        except Exception as e:          # surfaced to the HTTP caller
            box["e"] = e
        finally:
            ev.set()

    mw.taskman.run_on_main(run)
    if not ev.wait(timeout):
        raise TimeoutError("Anki is busy")
    if "e" in box:
        raise box["e"]
    return box["v"]


def _col():
    col = mw.col
    if col is None:
        raise RuntimeError("No Anki profile is open")
    return col


# --------------------------------------------------------------------------- API bodies
_AV_RE = re.compile(r"\[anki:play:[^\]]*\]|\[sound:[^\]]*\]")


def _clean(html: str) -> str:
    html = _AV_RE.sub("", html or "")
    # Janki's mobile-reword payload is metadata, never content.
    return re.sub(r"(?is)<!-- janki-reword:start -->.*?<!-- janki-reword:end -->", "", html)


def _reword(text, card, kind):
    try:
        from ..features import reword
        return reword.apply(text, card, kind)
    except Exception:
        return text


_PREF_KEYS = (
    "typewriter", "typewriter_wpm", "typewriter_min_ms", "typewriter_max_ms", "typewriter_speed",
    "card_timer", "card_timer_seconds", "card_timer_sentence_chars", "card_timer_len_min_mult",
    "card_timer_len_max_mult", "card_timer_min_s", "card_timer_cap_s", "card_timer_bg_pulse",
    "card_timer_pulse_ms", "card_timer_green_flare", "card_timer_red_flare",
    "card_timer_practice_seconds", "uniform_text", "card_font", "card_zoom", "ui_animations",
    "text_black_to_white", "tint_color",
)


def _prefs() -> dict:
    """The desktop's look-and-feel settings, so the web reviewer behaves the same."""
    try:
        from ..util.config import _cfg
        c = _cfg()
        out = {k: c[k] for k in _PREF_KEYS if k in c}
        out["hotkeys"] = _hotkeys(c)
        return out
    except Exception:
        return {}


def _hotkeys(c) -> dict:
    """Janki's effective review hotkeys (defaults + Settings → Hotkeys overrides) as
    key names the browser can match: {action: {"kind", "key", "seq"}}."""
    try:
        from ..util import hotkeys as hk
    except Exception:
        return {}
    over = c.get("hotkeys") or {}
    out = {}
    for aid, _grp, _lbl, kind, default in hk.ACTIONS:
        if kind not in ("leader", "tab", "qt"):
            continue
        b = over.get(aid) or default
        if kind == "qt":
            out[aid] = {"kind": kind, "seq": b.get("seq", "")}
        else:
            out[aid] = {"kind": kind, "key": hk.KC_NAMES.get(int(b.get("kc", -1)), "")}
    return out


def _card_css() -> dict:
    """Janki's reviewer card overrides (css._build_css, Reviewer branch), minus the
    glass-window bits, so web cards format exactly like desktop ones. `dark` holds the
    rules Janki only applies on a dark tint."""
    try:
        from ..user import css
        from ..util.config import _cfg
        c = _cfg()
    except Exception:
        return {"base": "", "dark": ""}
    parts = [
        # Card fully transparent: beats AnKing's `.night_mode .card{background:…!important}`.
        "html, body, #qa, .card, #qa *,"
        "html .night_mode .card, html .nightMode.card,"
        "html .night_mode #qa, html .nightMode #qa,"
        "html .night_mode .card *, html .nightMode.card * {"
        " background: transparent !important; background-color: transparent !important; }",
        # No box-within-a-box: strip the card containers' borders, rounding and fill.
        "#qa, .card, html .night_mode #qa, html .nightMode #qa,"
        "html .night_mode .card, html .nightMode.card {"
        " border: none !important; outline: none !important; box-shadow: none !important;"
        " border-radius: 0 !important; }",
        # Lists: left-aligned items in a centred block; hide empty bullets.
        "#qa ul:not(li ul):not(li ol), #qa ol:not(li ul):not(li ol),"
        ".card ul:not(li ul):not(li ol), .card ol:not(li ul):not(li ol) {"
        " display: inline-block !important; text-align: left !important; }"
        "#qa li, .card li { text-align: left !important; }"
        "#qa li:empty, .card li:empty { display: none !important; }",
        "#qa, .card, #qa *:not(kbd) { font-family: %s !important; }" % css.ui_font_stack(c),
        "#s2, .timer, .timeOverMsg { display: none !important; }",
        "#tags-container { opacity: .4 !important; line-height: 1.5 !important;"
        " display: flex !important; flex-wrap: wrap !important; justify-content: center !important;"
        " gap: 2px 6px !important; align-items: flex-start !important; }"
        "#tags-container > * { line-height: 1.4 !important; white-space: nowrap !important;"
        " margin: 0 !important; float: none !important; }",
    ]
    if c.get("uniform_text", False):
        parts.append(css.uniform_text_css(("",), c.get("uniform_text_px", 24)))
    cloze = str(c.get("cloze_color", "#6db3ff") or "").strip()
    if cloze:
        parts.append(".cloze, .cloze b, #qa .cloze, .card .cloze,"
                     "html .night_mode .cloze, html .nightMode .cloze,"
                     "html .night_mode #qa .cloze, html .nightMode.card .cloze {"
                     " color: %s !important; }" % cloze)
    try:
        dark = css.black_text_css(("#qa",))
    except Exception:
        dark = ""
    return {"base": "\n".join(parts), "dark": dark}


def api_hello():
    def f():
        col = _col()
        ver = ""
        try:
            with open(os.path.join(os.path.dirname(__file__), "..", "..", "manifest.json")) as fh:
                ver = json.load(fh).get("human_version", "")
        except Exception:
            pass
        return {"ok": True, "app": "Janki", "version": ver, "prefs": _prefs(), "cardCss": _card_css(),
                "profile": mw.pm.name if mw.pm else "", "decks": len(col.decks.all_names_and_ids())}
    return f


def _tree(node, depth=0, prefix=""):
    out = []
    for ch in node.children:
        full = prefix + ch.name
        out.append({"id": ch.deck_id, "name": full, "depth": depth,
                    "new": ch.new_count, "learn": ch.learn_count, "review": ch.review_count,
                    "collapsed": bool(ch.collapsed), "hasChildren": bool(ch.children)})
        out.extend(_tree(ch, depth + 1, full + "::"))
    return out


def api_decks():
    def f():
        col = _col()
        rows = _tree(col.sched.deck_due_tree())
        # Janki keeps practice-bank decks off the main list; they get their own tab.
        prac = []
        try:
            from ..features import practice
            hide = set(practice._practice_dids() or [])
            prac = [r for r in rows if r["id"] in hide]
            rows = [r for r in rows if r["id"] not in hide]
            if prac:                                  # re-base depths for the Practice list
                top = min(r["depth"] for r in prac)
                prac = [dict(r, depth=r["depth"] - top) for r in prac]
        except Exception:
            pass
        return {"decks": rows, "practice": prac, "current": col.decks.get_current_id()}
    return f


def api_next(did):
    def f():
        from anki.cards import Card
        col = _col()
        if did:
            col.decks.select(int(did))
        q = col.sched.get_queued_cards(fetch_limit=1)
        counts = {"new": q.new_count, "learn": q.learning_count, "review": q.review_count}
        deck = col.decks.name(col.decks.get_current_id())
        if not q.cards:
            return {"done": True, "counts": counts, "deck": deck}
        qc = q.cards[0]
        card = Card(col, backend_card=qc.card)
        card.start_timer()
        _pending.clear()
        _pending[card.id] = (card, qc.states)
        out = card.render_output(reload=True)
        q_raw, a_raw = _clean(out.question_text), _clean(out.answer_text)
        q_html = _clean(_reword(out.question_text, card, "reviewQuestion"))
        a_html = _clean(_reword(out.answer_text, card, "reviewAnswer"))
        try:
            labels = [re.sub("[\u2066-\u2069]", "", s) for s in col.sched.describe_next_states(qc.states)]
        except Exception:
            labels = ["", "", "", ""]
        queue = {0: "new", 1: "learn", 3: "learn"}.get(int(qc.queue), "review")
        return {"done": False, "deck": deck, "counts": counts, "queue": queue,
                "cid": card.id, "nid": card.nid, "q": q_html, "a": a_html,
                "qOrig": q_raw if q_raw != q_html else None,
                "aOrig": a_raw if a_raw != a_html else None,
                "css": out.css, "ord": card.ord, "intervals": labels,
                "tags": card.note().tags}
    return f


def _refresh_desktop():
    try:
        if mw.state in ("review", "overview", "deckBrowser"):
            mw.reset()
    except Exception:
        pass


def api_answer(body):
    def f():
        from anki.scheduler.v3 import CardAnswer
        col = _col()
        cid = int(body.get("cid", 0))
        ease = int(body.get("ease", 3))
        if cid not in _pending:
            raise KeyError("That card is no longer current — reload the next card")
        card, states = _pending.pop(cid)
        ms = max(0, min(int(body.get("ms", 0)), 3600_000))
        if ms:
            card.timer_started = time.time() - ms / 1000.0
        rating = {1: CardAnswer.AGAIN, 2: CardAnswer.HARD, 3: CardAnswer.GOOD,
                  4: CardAnswer.EASY}.get(ease, CardAnswer.GOOD)
        col.sched.answer_card(col.sched.build_answer(card=card, states=states, rating=rating))
        _refresh_desktop()
        return {"ok": True}
    return f


def api_undo():
    def f():
        col = _col()
        try:
            col.undo()
        except Exception as e:
            return {"ok": False, "error": str(e)}
        _pending.clear()
        _refresh_desktop()
        return {"ok": True}
    return f


def api_related(cid):
    def f():
        from anki.cards import Card
        from . import qbank
        col = _col()
        card = Card(col, int(cid))
        leaves = qbank.card_leaf_keys(card)
        tokens = qbank._tokens((card.question() or "") + " " + (card.answer() or ""))
        ranked = qbank._rank_questions(leaves, tokens, use_text_fallback=True)[:5]
        banks = qbank.list_banks()
        out = []
        for q in ranked:
            n = qbank._normalize_q(q)
            d = (banks.get(q.get("_bid")) or {}).get("dir", "")
            n["media"] = ["qmedia/%s/%s" % (d, m) for m in n.get("media") or []] if d else []
            for k in ("slide", "ans_slide"):
                n[k] = "qmedia/%s/%s" % (d, n[k]) if (d and n.get(k)) else ""
            n["bank"] = (banks.get(q.get("_bid")) or {}).get("name", "")
            out.append(n)
        return {"questions": out}
    return f


def api_stats():
    def f():
        col = _col()
        cutoff = col.sched.day_cutoff
        today = col.db.first(
            "select count(), coalesce(sum(time),0)/1000 from revlog where id > ?",
            (cutoff - 86400) * 1000) or (0, 0)
        again = col.db.scalar(
            "select count() from revlog where id > ? and ease = 1", (cutoff - 86400) * 1000) or 0
        days = 140
        rows = col.db.all(
            "select (id/1000 - ?)/86400, count() from revlog where id > ? group by 1",
            cutoff, (cutoff - days * 86400) * 1000)
        heat = [0] * days
        for d, n in rows:
            i = days + int(d)
            if 0 <= i < days:
                heat[i] = n
        streak = 0
        for n in reversed(heat):
            if n:
                streak += 1
            elif streak:
                break
        total = col.card_count()
        young = col.db.scalar("select count() from cards where type=2 and ivl < 21") or 0
        mature = col.db.scalar("select count() from cards where type=2 and ivl >= 21") or 0
        return {"today": {"reviews": today[0], "seconds": today[1], "again": again},
                "heat": heat, "streak": streak,
                "cards": {"total": total, "young": young, "mature": mature,
                          "new": col.db.scalar("select count() from cards where type=0") or 0}}
    return f


def api_pair():
    return {"key": _settings()["key"], "urls": pair_urls(), "short": short_address()}


# --------------------------------------------------------------------------- app shell
_APP_CACHE = None


def _app_html() -> bytes:
    """Serve the same page as cjre.pl/ogle/canki (fetched live, cached for offline use),
    so a phone on the LAN gets the current web app from this one address."""
    cache = os.path.join(_user_dir(), "canki_app.html")
    try:
        req = urllib.request.Request(APP_URL, headers={"User-Agent": "Janki-Canki"})
        with urllib.request.urlopen(req, timeout=4) as r:
            data = r.read()
        if b"canki" in data:
            with open(cache, "wb") as f:
                f.write(data)
            return data
    except Exception as e:
        log("canki: app fetch failed (%r) — using cache" % e)
    try:
        with open(cache, "rb") as f:
            return f.read()
    except Exception:
        return (b"<!doctype html><meta charset=utf-8><title>Canki</title>"
                b"<p style='font:16px Georgia;padding:2em'>Canki needs internet once to "
                b"download the web app. Connect this Mac to the internet and reload.</p>")


# --------------------------------------------------------------------------- HTTP
def _safe_join(base, rel):
    p = os.path.realpath(os.path.join(base, rel))
    if not p.startswith(os.path.realpath(base) + os.sep):
        return None
    return p


class _Handler(BaseHTTPRequestHandler):
    server_version = "Canki/1"

    def log_message(self, fmt, *args):     # keep Anki's console quiet
        log("canki: " + (fmt % args))

    # ---- helpers
    def _cors(self):
        origin = self.headers.get("Origin")
        self.send_header("Access-Control-Allow-Origin", origin or "*")
        self.send_header("Vary", "Origin")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, X-Canki-Key")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Private-Network", "true")

    def _send(self, code, body, ctype="application/json; charset=utf-8", cache=False):
        if not isinstance(body, (bytes, bytearray)):
            body = json.dumps(body).encode("utf-8")
        self.send_response(code)
        self._cors()
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "private, max-age=3600" if cache else "no-store")
        self.end_headers()
        self.wfile.write(body)

    def _loopback(self):
        ip = self.client_address[0]
        return ip in ("127.0.0.1", "::1", "::ffff:127.0.0.1")

    def _host_is_local(self):
        host = (self.headers.get("Host") or "").rsplit(":", 1)[0].strip("[]").lower()
        return host in ("127.0.0.1", "localhost", "::1")

    def _authorized(self, qs):
        origin = self.headers.get("Origin")
        if self._loopback() and self._host_is_local():
            port = self.server.server_address[1]
            same = {"http://127.0.0.1:%d" % port, "http://localhost:%d" % port}
            if origin is None or origin in TRUSTED_ORIGINS or origin in same:
                return True
        key = self.headers.get("X-Canki-Key") or (qs.get("k") or [""])[0]
        ip = self.client_address[0]
        recent = [t for t in _fails.get(ip, []) if time.time() - t < 600]
        if len(recent) >= 10:
            return False
        if key and secrets.compare_digest(key, _settings()["key"]):
            return True
        if key:
            recent.append(time.time())
            _fails[ip] = recent
        return False

    def _call(self, fn):
        try:
            self._send(200, _on_main(fn))
        except Exception as e:
            self._send(500, {"error": str(e) or e.__class__.__name__})

    # ---- verbs
    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.send_header("Access-Control-Max-Age", "600")
        self.end_headers()

    def do_GET(self):
        u = urlparse(self.path)
        path, qs = unquote(u.path), parse_qs(u.query)
        if path in ("/", "/index.html"):
            return self._send(200, _app_html(), "text/html; charset=utf-8")
        if path.startswith("/m/"):
            return self._media_path(path, u.query)
        if path == "/api/pair/status":
            return self._send(200, pair_status(self.client_address[0], (qs.get("id") or [""])[0]))
        if not self._authorized(qs):
            return self._send(401, {"error": "key"})
        if path == "/api/hello":
            return self._call(api_hello())
        if path == "/api/decks":
            return self._call(api_decks())
        if path == "/api/next":
            return self._call(api_next((qs.get("deck") or [""])[0]))
        if path == "/api/related":
            return self._call(api_related((qs.get("cid") or ["0"])[0]))
        if path == "/api/stats":
            return self._call(api_stats())
        if path == "/api/pair":
            if not self._loopback():
                return self._send(403, {"error": "pairing info is only shown on this Mac"})
            return self._send(200, api_pair())
        if path.startswith("/media/"):
            return self._file(lambda: mw.col.media.dir(), path[len("/media/"):])
        if path.startswith("/qmedia/"):
            from . import qbank
            return self._file(qbank._qbanks_dir, path[len("/qmedia/"):])
        self._send(404, {"error": "not found"})

    def do_POST(self):
        u = urlparse(self.path)
        if u.path == "/api/pair/request":
            try:
                n = min(int(self.headers.get("Content-Length") or 0), 4096)
                name = str(json.loads(self.rfile.read(n) or b"{}").get("name") or "")
            except Exception:
                name = ""
            return self._send(200, pair_request(self.client_address[0], name))
        if not self._authorized(parse_qs(u.query)):
            return self._send(401, {"error": "key"})
        try:
            n = min(int(self.headers.get("Content-Length") or 0), 65536)
            body = json.loads(self.rfile.read(n) or b"{}")
        except Exception:
            body = {}
        if u.path == "/api/answer":
            return self._call(api_answer(body))
        if u.path == "/api/undo":
            return self._call(api_undo())
        self._send(404, {"error": "not found"})

    def _media_path(self, path, query):
        # Card frames use <base href="/m/KEY/"> so relative media, fonts and Anki's
        # reviewer assets (_anki/...) resolve with the key baked into the path.
        parts = path.split("/", 3)                # ['', 'm', key, rest]
        if len(parts) < 4:
            return self._send(404, {"error": "not found"})
        if not self._authorized({"k": [parts[2]]}):
            return self._send(401, {"error": "key"})
        rest = parts[3]
        if rest.startswith("_anki/"):
            return self._proxy_anki("/" + rest, query)
        return self._file(lambda: mw.col.media.dir(), rest)

    def _proxy_anki(self, path, query):
        """Anki's own reviewer assets (reviewer.js/css, MathJax, image-occlusion) from its
        built-in media server, so card templates behave exactly as on the desktop."""
        try:
            port = mw.mediaServer.getPort()
            url = "http://127.0.0.1:%d%s%s" % (port, path, ("?" + query) if query else "")
            with urllib.request.urlopen(url, timeout=10) as r:
                data, ctype = r.read(), r.headers.get("Content-Type") or "application/octet-stream"
        except Exception as e:
            return self._send(404, {"error": str(e)})
        self._send(200, data, ctype, cache=True)

    def _file(self, base_fn, rel):
        try:
            base = base_fn()
        except Exception:
            return self._send(404, {"error": "not found"})
        p = _safe_join(base, rel)
        if not p or not os.path.isfile(p):
            return self._send(404, {"error": "not found"})
        with open(p, "rb") as f:
            data = f.read()
        self._send(200, data, mimetypes.guess_type(p)[0] or "application/octet-stream", cache=True)


class _Server(ThreadingHTTPServer):
    daemon_threads = True
    allow_reuse_address = True


# --------------------------------------------------------------------------- lifecycle
def start() -> bool:
    global _server, _thread
    if _server:
        return True
    s = _settings()
    if not s.get("enabled", True):
        return False
    host = "0.0.0.0" if s.get("lan", True) else "127.0.0.1"
    try:
        _server = _Server((host, int(s["port"])), _Handler)
    except OSError as e:
        log("canki: could not listen on %s:%s (%r)" % (host, s["port"], e))
        _server = None
        return False
    _thread = threading.Thread(target=_server.serve_forever, name="canki", daemon=True)
    _thread.start()
    log("canki: serving on %s:%s" % (host, s["port"]))
    return True


def stop() -> None:
    global _server, _thread
    if _server:
        try:
            _server.shutdown()
            _server.server_close()
        except Exception:
            pass
    _server = _thread = None
    _pending.clear()


def running() -> bool:
    return _server is not None


# --------------------------------------------------------------------------- UI
def build_settings_page():
    """The Canki page for Janki's settings window (Settings → Canki). Experimental."""
    from aqt.qt import (QCheckBox, QHBoxLayout, QLabel, QPushButton, Qt, QVBoxLayout,
                        QWidget, QDesktopServices, QUrl)
    page = QWidget()
    lay = QVBoxLayout(page)

    beta = QLabel("🧪  <b>Experimental.</b> Canki lets you review this collection from a "
                  "browser — on this Mac or a phone on the same Wi-Fi — with Janki's card "
                  "look, timer and practice questions. It may change or break between "
                  "versions.")
    beta.setWordWrap(True)
    beta.setTextFormat(Qt.TextFormat.RichText)
    beta.setStyleSheet("QLabel { background: rgba(255,176,32,0.13); border: 1px solid "
                       "rgba(255,176,32,0.5); border-radius: 6px; padding: 8px 10px; }")
    lay.addWidget(beta)

    info = QLabel()
    info.setTextFormat(Qt.TextFormat.RichText)
    info.setOpenExternalLinks(True)
    info.setWordWrap(True)
    info.setTextInteractionFlags(Qt.TextInteractionFlag.TextBrowserInteraction)
    lay.addWidget(info)

    on = QCheckBox("Enable Canki (serve this collection to the web reviewer)")
    lan = QCheckBox("Allow phones/tablets on this Wi-Fi (each one needs your Allow)")
    s = _settings()
    on.setChecked(bool(s.get("enabled", True)))
    lan.setChecked(bool(s.get("lan", True)))
    lay.addWidget(on)
    lay.addWidget(lan)

    def render():
        s = _settings()
        if not running():
            info.setText("<b>Canki is off.</b>" if not s.get("enabled")
                         else "<b>Canki couldn't start</b> — port %s may be in use." % s["port"])
            lan.setEnabled(False)
            return
        lan.setEnabled(True)
        rows = "".join("<li><a href='%s'>%s</a></li>" % (u, u) for u in pair_urls()) \
            if s.get("lan", True) else "<li><i>Wi-Fi access is off.</i></li>"
        info.setText(
            "<p><b>On this Mac:</b> open <a href='%s'>cjre.pl/ogle/canki</a> — it connects "
            "automatically.</p>"
            "<p><b>On a phone on the same Wi-Fi:</b> open <code style='font-size:15px'>%s</code> "
            "and click <b>Allow</b> when Anki asks (or scan the QR on the Mac's Canki page).</p>"
            "<p style='color:gray'>Full links:</p><ul>%s</ul><p style='color:gray'>Pairing key: %s</p>"
            "<p style='color:gray'>Your cards never leave your devices — the website is only "
            "the app; reviews go straight to this Anki.</p>" % (APP_URL, short_address(), rows, s["key"]))

    def apply():
        s = _settings()
        s["enabled"], s["lan"] = on.isChecked(), lan.isChecked()
        _save_settings(s)
        stop()
        start()
        render()

    on.toggled.connect(lambda _: apply())
    lan.toggled.connect(lambda _: apply())

    row = QHBoxLayout()
    open_btn = QPushButton("Open Canki")
    open_btn.clicked.connect(lambda: QDesktopServices.openUrl(QUrl(APP_URL)))
    new_key = QPushButton("New pairing key")

    def regen():
        regenerate_key()
        render()
    new_key.clicked.connect(regen)
    new_key.setToolTip("Unpairs every phone that used the old key")
    row.addWidget(open_btn)
    row.addWidget(new_key)
    row.addStretch(1)
    lay.addLayout(row)
    lay.addStretch(1)
    render()
    return page


def install():
    """Start the server (if enabled in Settings → Canki). Safe to call more than once."""
    from aqt import gui_hooks
    if not AVAILABLE:
        return
    start()
    if not getattr(mw, "_janki_canki_hooked", False):
        gui_hooks.profile_will_close.append(stop)
        mw._janki_canki_hooked = True
