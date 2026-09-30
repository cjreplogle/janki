"""User-adjustable hotkeys (Settings → Hotkeys).

Every Janki hotkey is listed in ACTIONS with its default. Overrides live in config
`hotkeys` as {action id: binding}; missing ids use the default. Bindings by kind:

  leader  {"kc": int}                 the held key for the chord shortcuts (default Tab)
  tab     {"kc": int}                 key pressed while the leader is held (global tap)
  shift   {"kc": int}                 like tab, but also needs Shift (caption font)
  combo   {"kc": int, "mods": [...]}  a modifier combo seen by the global tap
  chord   {"kc": int, "kc2": int}     two keys held together (lockdown)
  qt      {"seq": str}                an in-app Qt shortcut (QKeySequence portable text)

`kc` is a macOS virtual key code. The global key tap keeps working on the DEFAULT
key codes internally: apply() builds a user-key → default-key table that the tap
translates through, so the handlers themselves never change.
"""
import sys

from aqt import mw

from .config import log, _cfg

# (id, group, label, kind, default binding)
ACTIONS = [
    ("leader",        "Chord key",     "Key held for the chord shortcuts",     "leader", {"kc": 48}),
    ("again",         "Review",        "Rate Again",                           "tab",    {"kc": 6}),
    ("hard",          "Review",        "Rate Hard",                            "tab",    {"kc": 7}),
    ("good",          "Review",        "Rate Good",                            "tab",    {"kc": 8}),
    ("easy",          "Review",        "Rate Easy",                            "tab",    {"kc": 9}),
    ("show_or_good",  "Review",        "Show answer / rate Good",              "tab",    {"kc": 49}),
    ("undo",          "Review",        "Undo last rating",                     "tab",    {"kc": 53}),
    ("practice",      "Review",        "Practice question for this card",      "tab",    {"kc": 12}),
    ("reword",        "Review",        "Toggle reworded card",                 "tab",    {"kc": 15}),
    ("focus_mode",    "Window & focus", "Toggle Focus Mode",                   "tab",    {"kc": 3}),
    ("open_deck",     "Window & focus", "Open last-studied deck",              "tab",    {"kc": 31}),
    ("toggle_window", "Window & focus", "Show / hide Anki (from anywhere)",    "combo",  {"kc": 0, "mods": ["cmd", "opt"]}),
    ("settings",      "Window & focus", "Open Janki Settings",                 "qt",     {"seq": "Ctrl+Alt+S"}),
    ("zoom_in",       "Window & focus", "Card zoom in",                        "qt",     {"seq": "Ctrl+="}),
    ("zoom_out",      "Window & focus", "Card zoom out",                       "qt",     {"seq": "Ctrl+-"}),
    ("go_back",       "Navigation",    "Back one step",                        "qt",     {"seq": "Ctrl+B"}),
    ("go_decks",      "Navigation",    "Go to the Decks list",                 "qt",     {"seq": "Ctrl+D"}),
    ("go_practice",   "Navigation",    "Open Practice",                        "qt",     {"seq": "Ctrl+G"}),
    ("open_deck_qt",  "Navigation",    "Study the last deck",                  "qt",     {"seq": "Ctrl+O"}),
    ("settings_alt",  "Navigation",    "Open Janki Settings (alternate)",      "qt",     {"seq": "Ctrl+S"}),
    ("caption",       "Caption",       "Toggle caption HUD",                   "tab",    {"kc": 42}),
    ("cap_up",        "Caption",       "Move caption up",                      "tab",    {"kc": 126}),
    ("cap_down",      "Caption",       "Move caption down",                    "tab",    {"kc": 125}),
    ("cap_left",      "Caption",       "Move caption left",                    "tab",    {"kc": 123}),
    ("cap_right",     "Caption",       "Move caption right",                   "tab",    {"kc": 124}),
    ("cap_bigger",    "Caption",       "Caption text bigger (+ Shift)",        "shift",  {"kc": 24}),
    ("cap_smaller",   "Caption",       "Caption text smaller (+ Shift)",       "shift",  {"kc": 27}),
    # Windows: Meta is the Win key and Win+L locks the PC, so Ctrl+Alt+L there.
    ("lockdown",      "Lockdown",      "Toggle lockdown",                      "qt",
     {"seq": "Ctrl+Alt+L" if sys.platform.startswith("win") else "Ctrl+Meta+L"}),
    ("lock_chord",    "Lockdown",      "Lockdown chord (engage / hold to exit)", "chord", {"kc": 50, "kc2": 51}),
]
GROUPS = ["Review", "Navigation", "Window & focus", "Caption", "Lockdown", "Chord key"]
_BY_ID = {a[0]: a for a in ACTIONS}

# CGEventFlags bits for the tap-side combos.
MOD_FLAGS = {"ctrl": 0x40000, "opt": 0x80000, "cmd": 0x100000, "shift": 0x20000}
MOD_MASK = 0x40000 | 0x80000 | 0x100000 | 0x20000
MOD_GLYPH = {"ctrl": "⌃", "opt": "⌥", "shift": "⇧", "cmd": "⌘"}

# macOS virtual key code → display name.
KC_NAMES = {
    0: "A", 11: "B", 8: "C", 2: "D", 14: "E", 3: "F", 5: "G", 4: "H", 34: "I", 38: "J",
    40: "K", 37: "L", 46: "M", 45: "N", 31: "O", 35: "P", 12: "Q", 15: "R", 1: "S",
    17: "T", 32: "U", 9: "V", 13: "W", 7: "X", 16: "Y", 6: "Z",
    29: "0", 18: "1", 19: "2", 20: "3", 21: "4", 23: "5", 22: "6", 26: "7", 28: "8", 25: "9",
    24: "=", 27: "-", 33: "[", 30: "]", 42: "\\", 41: ";", 39: "'", 43: ",", 47: ".",
    44: "/", 50: "`", 49: "Space", 48: "Tab", 53: "Esc", 51: "Delete", 117: "Fwd Delete",
    36: "Return", 76: "Enter", 126: "↑", 125: "↓", 123: "←", 124: "→",
    115: "Home", 119: "End", 116: "Page Up", 121: "Page Down",
    122: "F1", 120: "F2", 99: "F3", 118: "F4", 96: "F5", 97: "F6", 98: "F7", 100: "F8",
    101: "F9", 109: "F10", 103: "F11", 111: "F12",
}

# Live tables read by the key tap (rebuilt by apply()).
leader_kc = 48
tab_map = {}          # user key code → default key code (tab + shift actions)
shift_kcs = set()     # default key codes whose chord also needs Shift
toggle_kc = 0
toggle_flags = MOD_FLAGS["cmd"] | MOD_FLAGS["opt"]
chord_kc1, chord_kc2 = 50, 51


def default(aid):
    return dict(_BY_ID[aid][4])


def binding(aid, cfg=None):
    """Current binding for `aid` (user override, else default)."""
    cfg = _cfg() if cfg is None else cfg
    b = (cfg.get("hotkeys") or {}).get(aid)
    d = default(aid)
    if not isinstance(b, dict):
        return d
    kind = _BY_ID[aid][3]
    ok = ("seq" in b) if kind == "qt" else isinstance(b.get("kc"), int)
    if kind == "chord":
        ok = ok and isinstance(b.get("kc2"), int)
    return dict(b) if ok else d


_WIN = sys.platform.startswith("win")
if _WIN:
    KC_NAMES = {**KC_NAMES, 51: "Backspace", 117: "Delete"}
# How the stored modifier names read on each OS. The recorder stores Qt's modifiers
# with Mac names: Control→"cmd", Meta→"ctrl", Alt→"opt". On Windows Qt's Control is
# the Ctrl key and Meta is the Win key.
_MOD_TEXT = ({"ctrl": "Win+", "opt": "Alt+", "shift": "Shift+", "cmd": "Ctrl+"} if _WIN
             else MOD_GLYPH)
_MOD_ORDER = ("cmd", "opt", "shift", "ctrl") if _WIN else ("ctrl", "opt", "shift", "cmd")


def key_name(kc):
    return KC_NAMES.get(kc, "Key %d" % kc)


def native_to_kc(native: int):
    """A QKeyEvent's nativeVirtualKey() as a Mac keycode (Windows sends VK codes)."""
    if _WIN:
        from ..platform.win.keymap import vk_to_kc
        return vk_to_kc(native)
    return int(native)


def describe(aid, b=None):
    """Human-readable text for a binding (as shown in Settings)."""
    b = binding(aid) if b is None else b
    kind = _BY_ID[aid][3]
    if kind == "qt":
        try:
            from aqt.qt import QKeySequence
            return QKeySequence(b["seq"]).toString(QKeySequence.SequenceFormat.NativeText) \
                or b["seq"]
        except Exception:
            return b.get("seq", "")
    if kind == "combo":
        mods = "".join(_MOD_TEXT[m] for m in _MOD_ORDER if m in (b.get("mods") or []))
        return mods + key_name(b["kc"])
    if kind == "chord":
        return "%s + %s" % (key_name(b["kc"]), key_name(b["kc2"]))
    if kind == "leader":
        return key_name(b["kc"])
    lead = key_name(binding("leader")["kc"])
    pre = (("Shift+" if _WIN else "⇧") + lead) if kind == "shift" else lead
    return "%s + %s" % (pre, key_name(b["kc"]))


def conflicts(cfg=None):
    """[(description, [labels])] for chord keys that collide with each other."""
    cfg = _cfg() if cfg is None else cfg
    lead = binding("leader", cfg)["kc"]
    seen = {}
    for aid, _g, label, kind, _d in ACTIONS:
        if kind not in ("tab", "shift"):
            continue
        kc = binding(aid, cfg)["kc"]
        seen.setdefault((kind == "shift", kc), []).append(label)
        if kc == lead:
            seen.setdefault(("lead", kc), ["Chord key"]).append(label)
    out = []
    for (shift, kc), labels in seen.items():
        if len(labels) > 1:
            out.append((key_name(kc), labels))
    return out


def apply():
    """Rebuild the tap's tables and re-key the in-app Qt shortcuts from config."""
    global leader_kc, tab_map, shift_kcs, toggle_kc, toggle_flags, chord_kc1, chord_kc2
    cfg = _cfg()
    try:
        leader_kc = binding("leader", cfg)["kc"]
        tm, sk = {}, set()
        for aid, _g, _l, kind, d in ACTIONS:
            if kind in ("tab", "shift"):
                tm.setdefault(binding(aid, cfg)["kc"], d["kc"])   # first wins on a clash
                if kind == "shift":
                    sk.add(d["kc"])
        tab_map, shift_kcs = tm, sk
        tb = binding("toggle_window", cfg)
        toggle_kc = tb["kc"]
        toggle_flags = 0
        for m in tb.get("mods") or []:
            toggle_flags |= MOD_FLAGS.get(m, 0)
        cb = binding("lock_chord", cfg)
        chord_kc1, chord_kc2 = cb["kc"], cb["kc2"]
    except Exception as exc:
        log("hotkeys apply (tap): %s" % exc)
    try:
        from aqt.qt import QKeySequence
        zin, zout = binding("zoom_in", cfg)["seq"], binding("zoom_out", cfg)["seq"]
        scs = getattr(mw, "_janki_zoom_scs", None) or []
        if len(scs) >= 3:
            scs[0].setKey(QKeySequence(zin))
            # Ctrl++ is only an alias for the default Cmd+= (the '+' key needs Shift).
            scs[1].setKey(QKeySequence("Ctrl++" if zin == "Ctrl+=" else ""))
            scs[2].setKey(QKeySequence(zout))
        lk = getattr(mw, "_janki_lock_sc", None)
        if lk is not None:
            lk.setKey(QKeySequence(binding("lockdown", cfg)["seq"]))
        for attr, aid in (("_janki_settings_sc", "settings"), ("_janki_back_sc", "go_back"),
                          ("_janki_decks_sc", "go_decks"),
                          ("_janki_practice_sc", "go_practice"),
                          ("_janki_open_last_sc", "open_deck_qt"),
                          ("_janki_settings_sc2", "settings_alt")):
            sc = getattr(mw, attr, None)
            if sc is not None:
                sc.setKey(QKeySequence(binding(aid, cfg)["seq"]))
    except Exception as exc:
        log("hotkeys apply (qt): %s" % exc)
