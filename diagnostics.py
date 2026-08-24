"""Glass state diagnostics helpers."""

import os
from ctypes import c_void_p, c_bool
from aqt import mw
from aqt.webview import AnkiWebView
from aqt.qt import QTimer

from .bridge import _bridge
from .config import ACTIVE, _cfg
from . import glass, keytap

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
