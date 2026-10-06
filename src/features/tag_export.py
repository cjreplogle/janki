""""Tags" as a format in Anki's own Export window: writes every tag used by the chosen
deck (and its subdecks), or by the notes selected in Browse, to a .txt file, one tag per
line, sorted. Read-only: nothing in the collection changes."""
from aqt import mw, gui_hooks

from ..util.config import log


def _tags_for(col, limit) -> list:
    from anki.collection import DeckIdLimit, NoteIdsLimit
    if isinstance(limit, NoteIdsLimit):
        nids = list(limit.note_ids)
    elif isinstance(limit, DeckIdLimit):
        did = limit.deck_id
        dids = [did] + [d for _n, d in col.decks.children(did)]
        ids = ",".join(str(int(d)) for d in dids)
        nids = col.db.list("select distinct nid from cards where did in (%s) or odid in (%s)"
                           % (ids, ids))
    else:                                           # "All Decks"
        return sorted(col.tags.all(), key=str.lower)
    tags = {}
    for i in range(0, len(nids), 500):
        chunk = ",".join(str(int(n)) for n in nids[i:i + 500])
        for r in col.db.list("select tags from notes where id in (%s)" % chunk):
            for t in (r or "").split():
                tags.setdefault(t.lower(), t)        # Anki tags are case-insensitive
    return sorted(tags.values(), key=str.lower)


def _make_exporter():
    from aqt.import_export.exporting import Exporter, _export_parent, _show_exported_tooltip
    from aqt.operations import QueryOp

    class TagListExporter(Exporter):
        extension = "txt"
        show_deck_list = True

        @staticmethod
        def name() -> str:
            return "Tags"

        def export(self, mw_, options) -> None:
            def op(col):
                tags = _tags_for(col, options.limit)
                with open(options.out_path, "w", encoding="utf-8") as f:
                    f.write("\n".join(tags) + ("\n" if tags else ""))
                return len(tags)

            QueryOp(parent=_export_parent(mw_, options), op=op,
                    success=lambda n: _show_exported_tooltip(
                        mw_, options, "%d tag%s exported." % (n, "" if n == 1 else "s"))
                    ).run_in_background()

    return TagListExporter


_cls = None


def _add_exporter(classes) -> None:
    global _cls
    try:
        if _cls is None:
            _cls = _make_exporter()
        if _cls not in classes:
            classes.append(_cls)
    except Exception as e:
        log("tag export: %s" % e)


def install() -> None:
    if getattr(mw, "_janki_tag_export", False):
        return
    gui_hooks.exporters_list_did_initialize.append(_add_exporter)
    mw._janki_tag_export = True
