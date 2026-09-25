"""Open .jank / .qb / .rp files from Finder (Open With → Anki, or dropped on the Dock
icon). Anki routes every such file — including one opened before Anki had finished
starting, which it queues until the profile is open — through AnkiQt.handleImport;
we send Janki's three types to Janki's importers and leave everything else to Anki.
"""
import os

from aqt import mw
from aqt.main import AnkiQt

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
            qbank.import_qb(path)
            tooltip("Imported question bank: %s" % name)
        elif ext == ".rp":
            from . import reword
            imp, skip, _reasons = reword.import_rp(path)
            tooltip("Imported %d rephrasing%s from %s%s"
                    % (imp, "" if imp == 1 else "s", name,
                       " (%d skipped)" % skip if skip else ""))
    except Exception as exc:
        log("file open %s: %s" % (name, exc))
        showWarning("Could not import %s:\n\n%s" % (name, exc))


def install() -> None:
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
