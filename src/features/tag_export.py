"""Export the list of tags used by a deck (including its subdecks) to a .txt file, one tag
per line, sorted. Offered from the deck gear menu (deck list / Practice) and the Browse
sidebar's right-click menu on a deck. Read-only: nothing in the collection changes."""
import os

from aqt import mw, gui_hooks
from aqt.qt import QFileDialog
from aqt.utils import tooltip, showWarning

from ..util.config import log


def _deck_tags(col, did) -> list:
    dids = [did] + [d for _n, d in col.decks.children(did)]
    ids = ",".join(str(int(d)) for d in dids)
    rows = col.db.list(
        "select distinct n.tags from notes n where n.id in "
        "(select nid from cards where did in (%s) or odid in (%s))" % (ids, ids))
    tags = {}
    for r in rows:
        for t in (r or "").split():
            tags.setdefault(t.lower(), t)          # Anki tags are case-insensitive
    return sorted(tags.values(), key=str.lower)


def export_tags(did, parent=None) -> None:
    col = mw.col
    if col is None:
        return
    try:
        name = col.decks.name(did)
        tags = _deck_tags(col, did)
    except Exception as e:
        showWarning("Couldn't read tags: %s" % e, parent=parent)
        return
    if not tags:
        tooltip("No tags in “%s”." % name, parent=parent)
        return
    safe = "".join(c if c.isalnum() or c in " -_." else "_" for c in name.replace("::", " - "))
    start = os.path.join(os.path.expanduser("~/Desktop"), "%s tags.txt" % safe.strip())
    path, _ = QFileDialog.getSaveFileName(parent or mw, "Export tags", start, "Text (*.txt)")
    if not path:
        return
    try:
        with open(path, "w", encoding="utf-8") as f:
            f.write("\n".join(tags) + "\n")
        tooltip("Exported %d tags from “%s”." % (len(tags), name), parent=parent)
    except Exception as e:
        showWarning("Couldn't save: %s" % e, parent=parent)


def _gear(menu, did) -> None:
    menu.addAction("Export Tags…", lambda: export_tags(did))


def _sidebar(sidebar, menu, item, index) -> None:
    try:
        from aqt.browser.sidebar.item import SidebarItemType
        if item is None or item.item_type != SidebarItemType.DECK:
            return
        menu.addSeparator()
        menu.addAction("Export Tags…", lambda: export_tags(item.id, sidebar.browser))
    except Exception as e:
        log("tag export sidebar: %s" % e)


def install() -> None:
    if getattr(mw, "_janki_tag_export", False):
        return
    gui_hooks.deck_browser_will_show_options_menu.append(_gear)
    gui_hooks.browser_sidebar_will_show_context_menu.append(_sidebar)
    mw._janki_tag_export = True
