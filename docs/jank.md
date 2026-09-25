# .jank bundles — one file per content drop

A `.jank` packs everything for a drop into a single download, so students import
**one file** instead of several.

## Importing

**Tools → Janki: Settings → General → Import .jank…** — or drag the `.jank` onto the
General tab. Janki imports, in order:

| File | What happens |
|---|---|
| `.apkg` decks | Imported with Anki's own importer (no dialogs). New notes are added; existing notes update only if the bundle's copy is newer. **Your review history, scheduling and deck options are never touched.** |
| `.qb` question banks | Installed; a bank with the same id is **replaced** (so a new drop is an update). |
| `.json` lecture tag maps | Saved to `user_files/tagmaps/` and used by **Load today's lectures** (a same-named map from an earlier drop is replaced). |
| `.rp` rephrasings | Merged into your rephrasings (last — they point at the notes the decks bring in). |

A summary shows what came in, plus the bundle's name, version and notes. After a drop
with new banks, use **Load Question Banks to Anki**; with new rephrasings, **Enable /
update on mobile** and sync.

## Building

**Settings → General → Build .jank…** opens the packager:

- Tick what to include **from your Janki**: installed question banks (re-packed as
  `.qb`), your lecture tag maps, and all stored rephrasings (one `.rp`).
- **Add files from disk** (or drag them in) for decks (`.apkg`) or anything else.
- Give it a name, version and notes (shown on import), then **Export .jank…**.

A `.jank` is just a renamed `.tar.gz`, so you can also make one by hand:

```
tar -czf block2-week3.jank manifest.json *.apkg *.qb *.json *.rp
```

`manifest.json` is optional: `{"name": "...", "version": "...", "notes": "..."}`.

## Safety

Bundles are unpacked into a private temporary folder first. Absolute paths, `../` path
tricks, links, macOS `__MACOSX` junk and unsupported file types are skipped, duplicate
names are made unique, and there's a 4 GB size cap. Nothing is uploaded anywhere.
