"""Glass state diagnostics helpers."""

import os
from ctypes import c_void_p, c_bool
from aqt import mw
from aqt.webview import AnkiWebView
from aqt.qt import QTimer, QObject, QEvent

from .bridge import _bridge
from .config import ACTIVE, _cfg, log
from ..user import glass
from . import keytap


# ---------------------------------------------------------------------------
# Focus / window breadcrumb — TEMP: capture what drops app/window focus or flips
# Focus Mode, since the general log() is stderr-only. Writes to janki-focus.log.
# ---------------------------------------------------------------------------
_FOCUS_LOG = os.path.expanduser("~/Library/Logs/janki-focus.log")


def flog(msg: str) -> None:
    try:
        import datetime
        with open(_FOCUS_LOG, "a", encoding="utf-8") as f:
            f.write("%s  %s\n"
                    % (datetime.datetime.now().isoformat(timespec="milliseconds"), msg))
    except Exception:
        pass


def caller_stack(limit: int = 6) -> str:
    """A compact 'file:line func' trail of the current Python call stack (skips this
    frame) — shows who triggered a Focus-Mode change."""
    try:
        import traceback
        frames = traceback.extract_stack()[:-1][-limit:]
        return " <- ".join("%s:%d %s" % (os.path.basename(fr.filename), fr.lineno, fr.name)
                           for fr in frames)
    except Exception:
        return "?"


def _frontmost() -> str:
    """Who currently holds focus: the frontmost APP + Anki's key window class. Names
    the thief when mw deactivates (another app, or a Janki helper panel)."""
    try:
        from ctypes import c_char_p
        msg, cls = _bridge()

        def _nsstr(p):
            if not p:
                return "?"
            b = msg(c_char_p, p, b"UTF8String")
            return b.decode("utf-8", "replace") if b else "?"
        ws = msg(c_void_p, cls("NSWorkspace"), b"sharedWorkspace")
        app = msg(c_void_p, ws, b"frontmostApplication") if ws else None
        appname = _nsstr(msg(c_void_p, app, b"localizedName")) if app else "?"
        nsapp = msg(c_void_p, cls("NSApplication"), b"sharedApplication")
        keyw = msg(c_void_p, nsapp, b"keyWindow") if nsapp else None
        kcls = "?"
        if keyw:
            kcls = _nsstr(msg(c_void_p, msg(c_void_p, keyw, b"class"), b"description"))
        return "frontApp=%s keyWin=%s" % (appname, kcls)
    except Exception as exc:
        return "frontmost? %s" % exc


class _FocusWatch(QObject):
    def eventFilter(self, obj, ev):
        try:
            t = ev.type()
            if t == QEvent.Type.WindowActivate:
                flog("mw WindowActivate")
            elif t == QEvent.Type.WindowDeactivate:
                flog("mw WindowDeactivate visible=%s fs=%s  %s"
                     % (mw.isVisible(), mw.isFullScreen(), _frontmost()))
            elif t == QEvent.Type.WindowStateChange:
                flog("mw WindowStateChange fs=%s min=%s max=%s visible=%s"
                     % (mw.isFullScreen(), mw.isMinimized(), mw.isMaximized(),
                        mw.isVisible()))
            elif t == QEvent.Type.Hide:
                flog("mw Hide")
            elif t == QEvent.Type.Show:
                flog("mw Show fs=%s" % mw.isFullScreen())
        except Exception:
            pass
        return False


_focus_watch = None


def install_focus_watch() -> None:
    global _focus_watch
    if _focus_watch is not None:
        return
    try:
        _focus_watch = _FocusWatch()
        mw.installEventFilter(_focus_watch)

        def _on_app_state(st):
            try:
                flog("appState=%s visible=%s fs=%s"
                     % (st, mw.isVisible(), mw.isFullScreen()))
            except Exception:
                pass
        mw.app.applicationStateChanged.connect(_on_app_state)
        flog("=== focus-watch installed (state=%s) ===" % getattr(mw, "state", "?"))
    except Exception as exc:
        log("focus-watch: %s" % exc)

# ---------------------------------------------------------------------------
# Diagnostics
# ---------------------------------------------------------------------------

def glass_diagnose():
    lines = ["=== janki (deep) diagnostics ==="]
    lines.append(f"launched via wrapper (ANKI_GLASS): {ACTIVE}")
    lines.append(f"QTWEBENGINE_CHROMIUM_FLAGS: {os.environ.get('QTWEBENGINE_CHROMIUM_FLAGS')}")
    lines.append(f"vibrancy installed: {glass._vibrancy_installed}")
    try:
        msg, cls = _bridge()
        window = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
        if window:
            lines.append(f"NSWindow.isOpaque(): {bool(msg(c_bool, window, b'isOpaque'))}")
            cv = msg(c_void_p, window, b"contentView")
            # class name of contentView
            name_ptr = msg(c_void_p, msg(c_void_p, cv, b"class"), b"description")
            lines.append(f"contentView present: {bool(cv)}")
    except Exception as exc:
        lines.append(f"native probe error: {exc}")
    try:
        central = mw.centralWidget()
        for v in ([c for c in central.children() if isinstance(c, AnkiWebView)] if central else []):
            bg = v.page().backgroundColor()
            lines.append(f"  {type(v).__name__}: page alpha={bg.alpha()}")
    except Exception as exc:
        lines.append(f"webview probe error: {exc}")
    lines.append("")
    lines.append("=== key tap ===")
    lines.append(f"global_keys config: {_cfg().get('global_keys', False)}")
    lines.append(f"_key_tap_running: {keytap._key_tap_running}")
    lines.append(f"_key_tap_enabled: {keytap._key_tap_enabled}")
    lines.append(f"_tab_held: {keytap._tab_held}")
    try:
        import ctypes
        AX = ctypes.CDLL('/System/Library/Frameworks/ApplicationServices.framework/ApplicationServices')
        lines.append(f"AXIsProcessTrusted: {bool(AX.AXIsProcessTrusted())}")
    except Exception as exc:
        lines.append(f"AXIsProcessTrusted error: {exc}")
    lines.append("")
    lines.append("--- key tap log (most recent 30 lines) ---")
    try:
        if os.path.exists(keytap._GTAP_LOG):
            with open(keytap._GTAP_LOG) as f:
                log_lines = f.read().splitlines()
            lines.extend(log_lines[-30:])
        else:
            lines.append("(log file not yet created)")
    except Exception as exc:
        lines.append(f"log read error: {exc}")

    out = "\n".join(lines)
    print(out)
    return out


def _build_diag_text() -> str:
    lines = ["=== janki diagnostics ==="]
    lines.append(f"launched via wrapper (ANKI_GLASS): {ACTIVE}")
    lines.append(f"QTWEBENGINE_CHROMIUM_FLAGS: {os.environ.get('QTWEBENGINE_CHROMIUM_FLAGS')}")
    lines.append(f"vibrancy installed: {glass._vibrancy_installed}")
    try:
        msg, cls = _bridge()
        window = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
        if window:
            lines.append(f"NSWindow.isOpaque(): {bool(msg(c_bool, window, b'isOpaque'))}")
            cv = msg(c_void_p, window, b"contentView")
            lines.append(f"contentView present: {bool(cv)}")
    except Exception as exc:
        lines.append(f"native probe error: {exc}")
    try:
        central = mw.centralWidget()
        for v in ([c for c in central.children() if isinstance(c, AnkiWebView)] if central else []):
            bg = v.page().backgroundColor()
            lines.append(f"  {type(v).__name__}: page alpha={bg.alpha()}")
    except Exception as exc:
        lines.append(f"webview probe error: {exc}")
    lines.append("")
    lines.append("=== key tap ===")
    lines.append(f"global_keys config: {_cfg().get('global_keys', False)}")
    lines.append(f"_key_tap_running: {keytap._key_tap_running}")
    lines.append(f"_key_tap_enabled: {keytap._key_tap_enabled}")
    lines.append(f"_tab_held: {keytap._tab_held}")
    try:
        import ctypes as _ct
        _AX = _ct.CDLL('/System/Library/Frameworks/ApplicationServices.framework/ApplicationServices')
        lines.append(f"AXIsProcessTrusted: {bool(_AX.AXIsProcessTrusted())}")
    except Exception as exc:
        lines.append(f"AXIsProcessTrusted error: {exc}")
    lines.append("")
    lines.append("--- key tap log ---")
    try:
        if os.path.exists(keytap._GTAP_LOG):
            with open(keytap._GTAP_LOG) as f:
                log_lines = f.read().splitlines()
            lines.extend(log_lines[-50:])
        else:
            lines.append("(log not yet created — key tap hasn't started)")
    except Exception as exc:
        lines.append(f"log read error: {exc}")
    return "\n".join(lines)


def glass_diagnose_live():
    from PyQt6.QtWidgets import QDialog, QVBoxLayout, QHBoxLayout, QPushButton, QTextEdit
    dlg = QDialog(mw)
    dlg.setWindowTitle("Janki Diagnostics")
    dlg.resize(700, 500)
    layout = QVBoxLayout(dlg)

    text = QTextEdit()
    text.setReadOnly(True)
    text.setFontFamily("Menlo")
    text.setFontPointSize(11)
    layout.addWidget(text)

    btn_row = QHBoxLayout()
    btn_clear = QPushButton("Clear Log")
    btn_close = QPushButton("Close")
    btn_row.addWidget(btn_clear)
    btn_row.addStretch()
    btn_row.addWidget(btn_close)
    layout.addLayout(btn_row)

    def refresh():
        pos = text.verticalScrollBar().value()
        at_bottom = pos == text.verticalScrollBar().maximum()
        text.setPlainText(_build_diag_text())
        if at_bottom:
            text.verticalScrollBar().setValue(text.verticalScrollBar().maximum())
        else:
            text.verticalScrollBar().setValue(pos)

    def clear_log():
        try:
            open(keytap._GTAP_LOG, 'w').close()
        except Exception:
            pass
        refresh()

    timer = QTimer(dlg)
    timer.timeout.connect(refresh)
    timer.start(1000)

    btn_clear.clicked.connect(clear_log)
    btn_close.clicked.connect(dlg.accept)

    refresh()
    dlg.show()


# ---------------------------------------------------------------------------
# Live settings dialog
# ---------------------------------------------------------------------------

def _live_apply(cfg):
    """Colour + opacity now live on the WINDOW background (uniform, behind every
    webview). Persist config and re-apply the native window tint."""
    mw.addonManager.writeConfig(__name__, cfg)
    glass._apply_window_tint()
    glass._apply_bg_image()   # re-dim any custom background with the new opacity/tint
