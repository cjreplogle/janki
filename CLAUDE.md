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
- `docs/windows-port-plan.md` stays uncommitted unless asked.
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

## Windows specifics (beta, 2.1.x)
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

## Releases
1. Bump `manifest.json` `human_version`; compile (`python -m py_compile`).
2. Commit (trailer rule above) → `git pull --rebase` → push → tag → push tag.
3. `git archive --format=zip -o <asset> HEAD`, then `gh release create`.
- **macOS channel**: normal release, asset `janki.ankiaddon` (+ `load-todays-lectures.ankiaddon`).
  The Mac updater reads `/releases/latest` only. Latest Mac release: **v2.7.1** (Windows: **v2.7.1w**).
- **Windows channel**: `--prerelease`, tag `vX.Y.Zw` (version shown as `X.Y.Zw`), asset
  `janki-windows.ankiaddon` (same commit as the Mac release; manifest version gets the `w`).
  The Windows updater picks the newest release carrying that asset, so Mac never sees it.
  Installs older than 2.1.1 can't see this channel (manual install once).
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
