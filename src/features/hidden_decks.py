"""Hide decks from the main deck list (a deck's gear menu → Hide from deck list); show
them again from Browse (right-click the deck in the sidebar → Show in deck list).

Only the deck list is affected — cards, scheduling, Browse and studying by other routes
are untouched. A hidden deck's subdecks are hidden with it. The list lives in the
collection config (`janki_hidden_decks`), so it syncs with the collection.
"""
from aqt import gui_hooks, mw

from ..util.config import log

_KEY = "janki_hidden_decks"


def hidden_ids() -> set:
    try:
        return {int(x) for x in (mw.col.get_config(_KEY, []) or [])}
    except Exception:
        return set()


def _refresh_list() -> None:
    try:
        if getattr(mw, "state", None) == "deckBrowser":
            mw.deckBrowser.refresh()
    except Exception:
        pass


def set_hidden(did: int, hide: bool) -> None:
    """Hide / show a deck as an undoable step ("Hide Deck" / "Show Deck" under Edit → Undo,
    ⌘Z / Ctrl+Z): a named custom undo entry wrapping an undoable config write."""
    from aqt.operations import CollectionOp
    ids = hidden_ids()
    (ids.add if hide else ids.discard)(int(did))
    val = sorted(int(x) for x in ids)

    def op(col):
        pos = col.add_custom_undo_entry("Hide Deck" if hide else "Show Deck")
        col.set_config(_KEY, val, undoable=True)
        return col.merge_undo_entries(pos)

    CollectionOp(parent=mw, op=op).success(lambda _c: _refresh_list()).run_in_background()


def _after_op(changes, handler) -> None:
    """Undo/redo of a Hide Deck step changes only config — redraw the deck list then."""
    try:
        if getattr(changes, "config", False) and not getattr(changes, "study_queues", False):
            _refresh_list()
    except Exception:
        pass


def hidden_with_children() -> set:
    """Hidden decks plus all their subdecks (what the deck list leaves out)."""
    ids = hidden_ids()
    if not ids:
        return set()
    out = set(ids)
    try:
        for did in ids:
            d = mw.col.decks.get(did, default=False)
            if not d:
                continue
            for _name, cid in mw.col.decks.children(did):
                out.add(int(cid))
    except Exception as e:
        log("hidden decks: %s" % e)
    return out


def _sidebar_menu(sidebar, menu, item, index) -> None:
    try:
        from aqt.browser.sidebar.item import SidebarItemType
        if item is None or item.item_type != SidebarItemType.DECK:
            return
        did = int(item.id)
    except Exception:
        return
    hidden = did in hidden_ids()
    menu.addSeparator()
    act = menu.addAction("Show in deck list" if hidden else "Hide from deck list")
    act.triggered.connect(lambda _=False, d=did, h=hidden: set_hidden(d, not h))


def _gear_menu(menu, did) -> None:
    try:
        from ..user.css import _deck_gear_items
        _deck_gear_items(menu, int(did))
    except Exception as e:
        log("deck gear menu: %s" % e)


def install() -> None:
    if hasattr(gui_hooks, "operation_did_execute"):
        gui_hooks.operation_did_execute.append(_after_op)
    # each deck row's gear menu: Unsuspend all / Create subdeck / Hide from deck list
    if hasattr(gui_hooks, "deck_browser_will_show_options_menu"):
        gui_hooks.deck_browser_will_show_options_menu.append(_gear_menu)
    if hasattr(gui_hooks, "browser_sidebar_will_show_context_menu"):
        gui_hooks.browser_sidebar_will_show_context_menu.append(_sidebar_menu)
