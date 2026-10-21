# Janki — working notes for Claude Code

Janki is an Anki add-on (this folder = `addons21/janki`). One codebase ships to **macOS
and Windows**. Repo: github.com/cjreplogle/janki (branch `master`). Website (renders this
README): the `cjrepl` repo, `ogle/janki/` (+ `ogle/canki/` web reviewer).

## Hard rules
- **Never add a `Claude-Session:` trailer** to commits. End commit messages with
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` only.
- **Anki data stays local.** Never upload cards/collection/decks. When inspecting cards,
  print stats or masked text only; copies of the collection go in a temp dir and are deleted.
- **Don't read the user's `.ics` calendar**; the lecture spreadsheet only minimally.
- Never bundle copyrighted card content.
- Motion rule (user-confirmed): hovers/animations must never shift layout (transform /
  pseudo-elements only); deck-list slides only on the redraw right after a +/− click.
- Test with Anki relaunches; the user verifies visuals. Say what was and wasn't tested.

## Layout
- `__init__.py` — startup (`_startup`), hooks, menu, shortcuts.
- `src/features/` — card_timer (flares/ring), focus, lockdown, pomodoro, practice,
  intersperse, reword (rephrasings), stats_embed, settings_button, file_open, jank.
- `src/integrations/` — qbank (.qb banks, .pptx OCR = macOS only), lectures, gamepad,
  amboss, mobilecards, canki_server (**shelved**: inert unless `JANKI_CANKI=1`).
- `src/user/` — css.py (all injected webview CSS/JS: glass, motion, typewriter, deck list),
  glass.py (native glass; Windows `_win_*` paths), hud.py (caption HUD).
- `src/system/` — settings_dialog, tray, tray_nav (glass tray menu), updater, stock_selfheal (Mac),
  data_sync (calendar/lecture files + settings ride AnkiWeb sync via `janki_sync:*` collection config).
- `src/util/` — config (ACTIVE/GLASS gates, `_cfg`), keytap (global keys), hotkeys
  (rebindable; Settings → Hotkeys), bridge (ObjC; **no-op stand-in off macOS**), state.
- `src/platform/` — `IS_MAC/IS_WIN`, `CAPS`, log paths; `platform/win/`:
  `hooks.py` (WH_KEYBOARD_LL, same Tab-chord state machine as the Mac CGEventTap, keys
  translated to **Mac keycodes** via `keymap.py`), `gamepad.py` (winmm poller, same
  `hid_button_kc` map), `dwm.py` (Acrylic/Mica), `chrome.py` (frameless main window +
  Windows caption buttons, edge resize, toolbar drag, menu bar behind Alt), `preboot.py`,
  `shell.py` (foreground, Run-key login, file associations, overlays/owned windows),
  `kiosk.py` (lockdown: key blocking, netsh Wi-Fi, WM_CLOSE).

## Windows specifics
- On Windows `ACTIVE=True` always; `GLASS` has a crash guard (`user_files/win_glass_pending`
  → `win_glass_failed`; cleared 4s after start and on clean quit).
- **See-through glass needs the pre-launch hook** (`preboot.py`): `janki_win_glass.pth`
  (`import janki_preboot`) + `janki_preboot.py` in a site dir. The module sets the Chromium
  flags (software compositing, no occlusion) and wraps `aqt.AnkiApp` to call
  `QSurfaceFormat.setAlphaBufferSize(8)` before the app exists — without alpha the window
  is solid grey. It exports `JANKI_WIN_PREBOOT=2` (= hook ran). Bundled-Python builds
  (`python3XX._pth`, e.g. the ARM64 installer) ignore .pth unless `import site` is enabled
  there — install enables it (backup `.janki-orig`, restored on uninstall). Installed on
  first run → restart prompt; Settings → General has a glass on/off button.
  Windows only draws translucent windows when **frameless**, hence `chrome.py`.
- Everything is software-drawn there, so perf matters: Windows gets a single-layer text
  halo, typewriter steps every other frame (`JK_FR`), flare overlay at 20 fps. Settings /
  dialogs are **normal framed windows** (dark title bar, solid tint) — frameless
  translucent dialogs were laggy. Never re-apply stylesheets per frame (`_win_set_bg` and
  the DWM key cache make restyles no-ops when unchanged).
- Not on Windows: .pptx slide OCR, rephrase generation (Mac-made .qb/.rp import fine),
  photo-background is Qt-rendered, AMBOSS frost not ported, Ctrl+Alt+Del can't be blocked.
- Hotkeys: show/hide `Ctrl+Alt+A`, lockdown `Ctrl+Alt+L`, chord backtick+Backspace.
  Recorder stores Qt mods with Mac names: Control→"cmd", Meta(Win key)→"ctrl", Alt→"opt".
- Main-screen Settings gear defaults ON on Windows (`main_settings_button_win`).
- Default look: **Live blur** (GPU + `win_backdrop: live`). Relaunches (`shell.relaunch_after_exit`)
  strip the hook's env vars — inheriting them kept a GPU look in software mode (restart loop).
- The hidden menu bar's shortcuts (Ctrl+Z undo…) are re-attached to `mw`
  (`chrome.keep_menu_shortcuts`); Qt disables shortcuts of a hidden QMenuBar.
- Z/X/C/V rating is an app key filter (`features/zxcv.py`), not QShortcuts (ambiguity).
- Text shadows: Appearance → Text (`text_shadow`: performance [Windows default] / quality / off).

## Lessons (don't repeat)
- **Never preload Stats in the background / on hover** (tried in 2.8.0–2.8.4): with the
  software-compositing glass + 120 Hz flag, the Stats web view could stop reaching the
  screen — an empty pane while the main process spun at ~100 % CPU until relaunch. Qt's
  own `grab()` still showed content, so it can't be self-detected. Reverted in 2.8.5;
  Stats loads on the first click of a session (as in 2.7.3).
- **Free the Stats view when Stats closes** (2.8.6): a kept, collapsed Stats web view made
  Chromium's VizCompositorThread spin ~100 % CPU while idle under the 120 Hz flag
  (`--disable-frame-rate-limit`), even with its page marked hidden. Freed → ~4 %.

- **Scrolling on the glass (2.11.5, traced via CDP):** software compositing means the root
  scroller isn't composited — any paint invalidation during a scroll re-rasters the
  visible text on the CPU. Never change a mask/style per scroll frame (cards scroll in a
  fixed `#jk-sc` frame with a STATIC edge mask); give content its own layer with
  `will-change: opacity` (not transform — breaks position:fixed inside cards). With
  `--disable-frame-rate-limit`, rAF loops spin thousands of times/s and starve input:
  drive scroll animation from an 8.3 ms timer, never a self-re-requesting rAF.

- **Study start speed (2026-10-20, measured):** Anki's reviewer holds each card until
  its fonts (≤800 ms) / images (≤200 ms) load, with a fresh cache per page — Lora is
  preloaded in the reviewer head, next cards' images on the overview. A cold first
  review spent ~0.4 s compiling reviewer.js: warmed once per launch in a hidden iframe
  on the overview. Bottom bars are a separate page that takes ~0.5 s to rebuild: same
  context type → swap buttons in place (stats_embed `_dedupe_bottom_draws`). mw.web is
  page-swapped (no reload), so inline body styles survive into the next screen — undo
  any hide. Hide via `visibility` (CSS entry animations hold opacity). Diagnostics:
  `~/.janki_studyprof` (profile + page timings), `~/.janki_stallwatch` (ms threshold).

## Releases
1. Bump `manifest.json` `human_version`; compile (`python -m py_compile`).
2. Commit (trailer rule above) → `git pull --rebase` → push → tag → push tag.
3. `git archive --format=zip -o <asset> HEAD`, then `gh release create`.
- **macOS channel**: normal release, asset `janki.ankiaddon` (+ `load-todays-lectures.ankiaddon`).
  The Mac updater reads `/releases/latest` only. Latest Mac release: **v2.12.2** (Windows: **v2.12.2w**).
- **Windows channel**: `--prerelease`, tag `vX.Y.Zw` (version shown as `X.Y.Zw`), asset
  `janki-windows.ankiaddon` (same commit as the Mac release; manifest version gets the `w`).
  The Windows updater picks the newest release carrying that asset, so Mac never sees it.
  Installs older than 2.1.1 can't see this channel (manual install once).
- **Also attach `janki-windows.ankiaddon` to the normal (Mac) release** — the website's
  Windows download is `/releases/latest/download/janki-windows.ankiaddon`, and "latest"
  skips pre-releases. Safe for the updater (tags compare numerically: `2.11.2` = `2.11.2w`).
- Local dev checkout: set `"auto_update_check": false` so the updater doesn't overwrite it.

## Testing without Windows hardware (from the Mac)
Simulated-Windows import/startup sweep: fake `sys.platform="win32"` **after** pre-importing
the stdlib, stub `ctypes.WinDLL`/`winreg`, real PyQt6 for `aqt.qt`, MagicMock for other
`aqt`/`anki` modules; import every module + `janki`, call `janki._startup()`. The one
expected error is a QAction/MagicMock mismatch from the stand-in window. Qt's Python
(`~/anki-src/out/pyenv/bin/python`) has PyQt6. On Windows itself just relaunch Anki.

## Open items
- Windows beta untested on real hardware beyond the user's VM (build 22000, Parallels —
  its virtual GPU makes Chromium slow). Check glass, Tab chords unfocused, caption over
  fullscreen, controller, lockdown.
- If the tray menu is still slow on Windows: make it a solid panel too.
- AMBOSS frost on Windows; Canki is shelved (dev only).

## Branching
One branch: `master`. Mac and Windows ship from the same commit. Dev in the Windows VM:
rsync this folder into the VM's `addons21/janki` (via `/Volumes/[C] Windows 11.hidden/...`).
