"""Open .jank / .qb / .rp files from Finder (Open With → Anki, dropped on the Dock
icon, or dragged onto the main window). Anki routes every Finder-opened file —
including one opened before Anki had finished starting, which it queues until the
profile is open — through AnkiQt.handleImport;
we send Janki's three types to Janki's importers and leave everything else to Anki.
"""
import os
import sys

from aqt import mw
from aqt.main import AnkiQt
from aqt.qt import QEvent, QObject, QTimer, QWidget

from ..util.config import log

_EXTS = (".jank", ".qb", ".rp")


def _open(path: str) -> None:
    from aqt.utils import tooltip, showWarning
    name = os.path.basename(path)
    ext = os.path.splitext(path)[1].lower()
    try:
        if ext == ".jank":
            from . import jank
            jank.import_jank(path, mw)           # reports its own summary
        elif ext == ".qb":
            from ..integrations import qbank
            qbank.import_qb(path, build_deck=True)
            tooltip("Imported question bank into the Practice deck: %s" % name)
        elif ext == ".rp":
            from . import reword
            imp, skip, _reasons = reword.import_rp(path)
            tooltip("Imported %d rephrasing%s from %s%s"
                    % (imp, "" if imp == 1 else "s", name,
                       " (%d skipped)" % skip if skip else ""))
    except Exception as exc:
        log("file open %s: %s" % (name, exc))
        showWarning("Could not import %s:\n\n%s" % (name, exc))


def _in_practice_view() -> bool:
    """True while the main window shows the Practice hub (toolbar → Practice)."""
    try:
        from . import practice
        return bool(practice._practice_view) and getattr(mw, "state", None) == "deckBrowser"
    except Exception:
        return False


def _doc_exts() -> tuple:
    """Files the Practice hub accepts: documents that build a question bank (slide OCR,
    .pptx, is macOS-only) and AI tag-matching replies (.json/.jsonl)."""
    docs = (".docx", ".pptx") if sys.platform == "darwin" else (".docx",)
    return docs + (".json", ".jsonl")


def _dropped_paths(ev) -> list:
    """Local files carried by a drag that Janki imports here, or [] (then Anki handles
    it): .jank/.qb/.rp anywhere, plus .docx/.pptx while the Practice hub is showing."""
    try:
        md = ev.mimeData()
        if not md or not md.hasUrls():
            return []
        exts = _EXTS + (_doc_exts() if _in_practice_view() else ())
        out = [u.toLocalFile() for u in md.urls() if u.isLocalFile()]
        return [p for p in out if p.lower().endswith(exts) and os.path.isfile(p)]
    except Exception:
        return []


def _refresh_practice_view() -> None:
    try:
        from . import practice
        if practice._practice_view and getattr(mw, "state", None) == "deckBrowser":
            mw.deckBrowser.refresh()          # re-renders the hub with the new bank
    except Exception:
        pass


def _open_doc(path: str) -> None:
    """Build a bank from a .docx/.pptx dropped on the Practice hub (the same dialogs as
    Settings → Practice), straight into the Practice deck."""
    from ..integrations import qbank
    try:
        if path.lower().endswith((".json", ".jsonl")):
            qbank.apply_tag_results_dialog(on_done=_refresh_practice_view, path=path)
        elif path.lower().endswith(".pptx"):
            qbank.pptx_import_dialog(on_done=_refresh_practice_view, path=path,
                                     build_deck=True)
        else:
            qbank.docx_estimate_dialog(on_done=_refresh_practice_view, path=path,
                                       build_deck=True)
    except Exception as exc:
        from aqt.utils import showWarning
        log("practice drop %s: %s" % (os.path.basename(path), exc))
        showWarning("Could not build a question bank from %s:\n\n%s"
                    % (os.path.basename(path), exc))


def _handle_drop(paths) -> None:
    for p in paths:
        if p.lower().endswith(_EXTS):
            _open(p)
        else:
            _open_doc(p)


class _MainWindowDrop(QObject):
    """App-wide filter: a Janki file dropped anywhere on the MAIN window (deck list,
    reviewer, toolbar, bottom bar) is imported. The drop lands on whichever webview's
    inner widget is under the cursor, so we filter at the app level and check the
    target's top-level window; other windows (Settings has its own drop zones, the
    editor) and every other kind of drop are left alone."""

    def eventFilter(self, obj, ev):
        t = ev.type()
        if t not in (QEvent.Type.DragEnter, QEvent.Type.DragMove, QEvent.Type.Drop):
            return False
        try:
            if not isinstance(obj, QWidget) or obj.window() is not mw:
                return False
        except Exception:
            return False
        paths = _dropped_paths(ev)
        if not paths:
            return False
        ev.acceptProposedAction()
        if t == QEvent.Type.Drop:
            # Import after the drop returns: a modal dialog opened inside the drop
            # event would stall the OS drag session.
            QTimer.singleShot(0, lambda ps=paths: _handle_drop(ps))
        return True


def install_main_window_drop() -> None:
    if getattr(mw, "_janki_drop_filter", None) is not None:
        return
    f = _MainWindowDrop(mw)
    mw.app.installEventFilter(f)
    # Qt only delivers drops to a widget that accepts them. The webviews do; this
    # covers the window's own margins. Other files are still refused (the filter
    # passes them through and QMainWindow ignores the drag).
    mw.setAcceptDrops(True)
    mw._janki_drop_filter = f


def install() -> None:
    try:
        install_main_window_drop()
    except Exception as exc:
        log("main window drop: %s" % exc)
    orig = AnkiQt.handleImport
    if getattr(orig, "_janki_file_open", False):
        return

    def handleImport(self, path, *args, **kwargs):
        if isinstance(path, str) and path.lower().endswith(_EXTS) \
                and os.path.isfile(path):
            return _open(path)
        return orig(self, path, *args, **kwargs)

    handleImport._janki_file_open = True
    AnkiQt.handleImport = handleImport
