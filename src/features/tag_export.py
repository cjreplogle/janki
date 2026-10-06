""""Tags" as a format in Anki's own Export window: writes the deck tree (chosen deck +
subdecks, indented) and then every tag used by those cards, or by the notes selected in
Browse, to a .txt file, one per line, sorted. Read-only: nothing in the collection changes."""
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


def _deck_tree(col, limit) -> list:
    """Indented deck tree for the export: the chosen deck and every subdeck; all decks for
    "All Decks"; for selected notes, the decks those notes' cards are in (with parents)."""
    from anki.collection import DeckIdLimit, NoteIdsLimit
    if isinstance(limit, DeckIdLimit):
        root = col.decks.name(limit.deck_id)
        names = [root] + [n for n, _d in col.decks.children(limit.deck_id)]
    elif isinstance(limit, NoteIdsLimit):
        names = set()
        nids = list(limit.note_ids)
        for i in range(0, len(nids), 500):
            chunk = ",".join(str(int(n)) for n in nids[i:i + 500])
            for did in col.db.list("select distinct case when odid then odid else did end "
                                   "from cards where nid in (%s)" % chunk):
                nm = col.decks.name_if_exists(did)
                if nm:
                    parts = nm.split("::")
                    names.update("::".join(parts[:k]) for k in range(1, len(parts) + 1))
        names = list(names)
    else:
        names = [d.name for d in col.decks.all_names_and_ids()]
    names = sorted(set(names), key=lambda n: [p.lower() for p in n.split("::")])
    if not names:
        return []
    base = min(n.count("::") for n in names)
    out = []
    for n in names:
        depth = n.count("::") - base
        out.append(n if depth == 0 else "    " * depth + n.split("::")[-1])
    return out


def _make_exporter():
    from aqt.import_export.exporting import Exporter, _export_parent, _show_exported_tooltip
    from aqt.operations import QueryOp

    class TagListExporter(Exporter):
        extension = "txt"
        show_deck_list = True
        show_include_deck = True          # relabelled "Include subdeck tree" (see _patch_dialog)

        @staticmethod
        def name() -> str:
            return "Tags"

        def export(self, mw_, options) -> None:
            def op(col):
                tags = _tags_for(col, options.limit)
                if options.include_deck:
                    lines = (["DECKS"] + _deck_tree(col, options.limit) + ["", "TAGS"]
                             + (tags or ["(none)"]))
                else:
                    lines = tags
                with open(options.out_path, "w", encoding="utf-8") as f:
                    f.write("\n".join(lines) + "\n")
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


def _patch_dialog() -> None:
    """Reuse the dialog's "Include deck name" checkbox as "Include subdeck tree" while the
    Tags format is selected (restored for the other formats)."""
    from aqt.import_export.exporting import ExportDialog
    if getattr(ExportDialog.exporter_changed, "_jk_tags", False):
        return
    orig = ExportDialog.exporter_changed

    def exporter_changed(self, idx):
        orig(self, idx)
        try:
            box = self.frm.includeDeck
            if not hasattr(box, "_jk_label"):
                box._jk_label = box.text()
            if _cls is not None and isinstance(self.exporter, _cls):
                box.setText("Include subdeck tree")
                if not getattr(box, "_jk_set", False):
                    box.setChecked(True); box._jk_set = True
            else:
                box.setText(box._jk_label)
        except Exception as e:
            log("tag export label: %s" % e)
    exporter_changed._jk_tags = True
    ExportDialog.exporter_changed = exporter_changed


def install() -> None:
    if getattr(mw, "_janki_tag_export", False):
        return
    gui_hooks.exporters_list_did_initialize.append(_add_exporter)
    try:
        _patch_dialog()
    except Exception as e:
        log("tag export dialog: %s" % e)
    mw._janki_tag_export = True
