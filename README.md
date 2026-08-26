# Janki

A macOS-focused [Anki](https://github.com/ankitects/anki) add-on that reskins the reviewer with native frosted-glass
transparency, throws in some focused study tool add-ons (for if you lose focus easily like me!), and adds some general QOL changes which should be particularly helpful for students at a certain medical school this project <ins>is not affiliated with</ins>.

>[!NOTE]
> **Most of the visual/native features are macOS-only.** On Windows/Linux the
> native bits are cleanly disabled (no errors), and the **Safe** build still runs
> the cross-platform features: today's-lectures import, card zoom (Ctrl +/−), the
> text-reveal animation, dark-text rescue, deck stats, and close-to-tray. A proper
> Windows port of the mac-only visuals may come later if people ask.

## Install

Runs as an Anki plugin on **normal, stock Anki** — no custom build or separate app.
There are two builds on the [Releases](../../releases) page — pick one:

- **`janki.ankiaddon` (Glass)** — the full frosted-glass experience. Adds a small,
  self-healing, reversible **patch layer** to Anki that enables the transparency
  (details below). I use this.
- **`janki-safe.ankiaddon` (Safe / no-glass)** — **never touches Anki's files.**
  Everything except the window transparency + OLED. Best if you're on a
  managed device, on Windows, or just do not want the portions of this that
  directly modify Anki's code.

1. **Install Anki** (if you haven't yet) from [apps.ankiweb.net](https://apps.ankiweb.net).
2. **Download `janki.ankiaddon`** from the [Releases](../../releases) page.
3. **Double-click it** (Anki opens and installs it), or in Anki:
   **Tools → Add-ons → Install from file…** → pick the `.ankiaddon`.
4. **Restart Anki.** On first launch Janki applies a small one-time patch to Anki
   so the frosted glass can work, then asks you to **quit and reopen once**. Do
   that, and the glass is on. From then on, just open Anki normally.

> [!NOTE]
> **Why the one-time patch + restart?** True transparency needs a setting applied
> before Anki starts drawing — something an add-on alone can't do. Janki modifies
> two of Anki's own files to enable it (backups are kept), and **re-applies
> automatically after any Anki update**, prompting a quick restart when it does.
> It only edits local rendering/startup code — your collection, sync, and login
> are untouched. Everything except the visual glass still works even if you skip
> the restart.
>
> **Safe by design:** if the glass ever fails to start on your Anki version, Janki
> automatically rolls its changes back on the next launch and opens plain Anki —
> it will never leave you stuck on a broken/crashing app. You can re-enable it
> later from **Tools → Janki: Settings… → General**. Prefer zero risk? Use the
> **Safe** build, which never patches Anki at all.



**From source (devs):** copy the files into
`~/Library/Application Support/Anki2/addons21/janki/`.

### Uninstall
Because the glass involves a small patch to Anki's own files, remove it the clean
way: **Tools → Janki: Settings… → General → "Restore stock Anki (remove glass
patch)"**, restart, then delete the add-on from **Tools → Add-ons**. That restores
Anki's original files (repairing its signature) and clears everything Janki added,
so nothing is left behind.

> To change or disable any feature: **Tools → Janki: Settings…**


## Features

- **Frosted-glass reviewer** — native macOS vibrancy/blur; transparent cards,
  serif card font, OLED full-screen mode.
- **Focus Mode** (`Tab+F`) — hides toolbar/answer bar and centers the card.
  Only has the card contents on screen.
- **OLED Optimization** — when in fullscreen, uses a true black backdrop. Useful
  for increasing contrast and readability on Mac displays.
- **Caption Mode** — Trying to multitask but still see your anki cards? Press **Tab + \\**
  to change the Anki notecard view to be in "caption" form. **Tab+Arrow Keys**
  adjusts their screen position. Remains visible in this view even when other
  things are in fullscreen. (Note: also integrated to work & adjust with remote buttons)
- **Global hotkeys** — hold **Tab** as a modifier to drive the reviewer even
  when Anki is not focused. (i.e. Tab+Z → again, overrides being unfocused)
- **Improved Animations** — typing animation plays on card reveal to prevent
  any recall based on the "shape" of the text rather than content.
- **Pomodoro** — review-time work intervals, an in-window break screen
  (hold **Space** to skip), and a calm "break due" blue edge tint.
  Toggle the whole system on/off in settings.
- **Card timer** — a thin bar fills over N seconds; when it runs out a red
  edge-glow flares (a "time to move on" nudge). A green flare marks a card
  finished for the day. Intensity and timing are adjustable.
- **Always in front** — always places the Anki app in front of other windows, 
  even when Anki is not focused so you can always see what you are studying.
- **Quick Zoom** — for whatever god forsaken reason Anki does not have **Cmd**+**+**
  or **Cmd**+**-** hotkeys to zoom card contents so that exists now
- **AMBOSS integrations** — frosts the AMBOSS side panel and hover tooltip; hides term
  underlines unless in fullscreen.
- **Schedule sync** (optional) — reads a local `.ics` calendar (URL/file)
  and a local `.xlsx` lecture→tag map, finds your classes for the day,
  and adaptively unsuspends relevant tagged cards (AJ/Anking/Hutch decks tested)

  *The schedule sync feature expects your own calendar export and tag spreadsheet;
  set their paths on the Lectures → Sources tab. Nothing is uploaded — the
  calendar is read locally (a URL source is optional and fetched only if
  you enter one).*

## Suggested Add-Ons

These extra installs help tie together some theming:
* [Anki Redesign](https://ankiweb.net/shared/info/2119814566)
* [Change Interface Font](https://ankiweb.net/shared/info/1431333984)
* [AMBOSS](https://www.amboss.com/us/anki) (optional but I just properly integrated it with my UI changes)


## Support
*If I sent this to you for testing. Just text me if there are any issues/features
you think will be helpful to other people!* 

FYI - this is very vibe coded and designed around my personal habits. This is not on AnkiWeb because the patcher is not able to be used on AnkiWeb plugins.

This is still experimental and mostly designed around my own study preferences. Source code state is not ideal but it does what I need it to, so I can live with it. Hopefully it helps you too.

[cjre.pl/ogle](https://cjre.pl/ogle) 

## License

Licensed under the **GNU Affero General Public License v3.0** (see [LICENSE](LICENSE)).
Janki extends [Anki](https://github.com/ankitects/anki), which is also AGPL-3.0; the
self-heal patches Anki's own files locally at runtime and does not redistribute
Anki's source.

