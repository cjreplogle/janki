"""Don't reveal Anki's auto-hidden top/bottom bars when a floating overlay slides over Anki.

Anki shows its hidden top bar (and, in full screen, the menu bar) whenever the pointer
*leaves* the main webview (`MainWebView.eventFilter`, QEvent.Leave). Overlays from other
apps — WorkMode's hot-corner peeks and full-screen Spotify player — appear under a
stationary pointer, which Qt reports as a Leave, so the bars dropped down in full screen.

A Leave while the pointer is still inside Anki's window (and not at the very top edge,
where the real menu-bar reveal happens) can only mean something covered Anki, so it's
ignored. Real exits — leaving the window, or pushing into the top edge — behave as before.
"""

from aqt.qt import QCursor, QEvent

TOP_EDGE = 6    # px from the window top that still counts as a deliberate reveal


def install() -> None:
    import aqt.main

    cls = aqt.main.MainWebView
    if getattr(cls, "_janki_overlay_leave", False):
        return
    original = cls.eventFilter

    def eventFilter(self, obj, evt):
        if evt is not None and evt.type() == QEvent.Type.Leave:
            pos = QCursor.pos()
            win = self.mw.frameGeometry()
            if win.contains(pos) and pos.y() - win.top() > TOP_EDGE:
                return True     # covered by an overlay, not a real exit
        return original(self, obj, evt)

    cls.eventFilter = eventFilter
    cls._janki_overlay_leave = True
