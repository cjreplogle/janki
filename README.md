# Janki

A macOS-focused [Anki](https://github.com/ankitects/anki) add-on that reskins the reviewer with native frosted-glass
transparency, throws in some focused study tool add-ons (for if you lose focus easily like me!), and adds some general QOL changes which should be particularly helpful for students at a certain medical school this project <ins>is not affiliated with</ins>.

>[!WARNING]
> **Most of the visual/native features are macOS-only.** This is mostly untested on Windows devices.
> A proper Windows port of the mac-only visuals may come later if people ask.
>
> Some features are still rather experimental. Please use this at your own risk. 

## Install

Runs as an Anki plugin on **normal, stock Anki** — no custom build or separate app.
There are two builds on the [Releases](../../releases) page — pick one:

- **`janki.ankiaddon`** — the full frosted-glass experience. Adds a small,
  self-healing, reversible **patch layer** to Anki that enables the transparency
  (details below). I use this.
- **`load-todays-lectures.ankiaddon`** — a bare-bones version of the add-on that
  simply has the [Load today's lectures](docs/load-todays-lectures.md) import
  functionality. Designed if you don't care about any of the other features.

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

### Updating
After the first install, Janki updates itself — no more manual downloads. It
checks this repo's Releases about once a day and, when a newer version is out,
offers a one-click **Update now** (it grabs the matching build, installs it, and
keeps your settings). You can also trigger it anytime with **Tools → Janki: Check
for updates…**, or turn the auto-check off via the `auto_update_check` config.

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
- **Lockdown Mode** (`backtick/~+delete`) — locks Janki into fullscreen to keep
  you from getting distracted. Escape by holding space/the entry bind for 10s.
  Tiered into three modes depending on your preferences.
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
- **Mobile cards** *(experimental, off by default)* — AnkiMobile/AnkiDroid can't run
  add-ons, so this can stamp an OLED-dark background, a serif font, and the text-reveal
  animation into your note types (scoped to mobile) so the look rides your normal sync
  to the phone/iPad. It rewrites every note type's templates, so it's opt-in: set
  `"mobile_cards": true` in the add-on config to reveal **Tools → Janki: Mobile cards**
  (Apply / Remove — one-click reversible).
- **Schedule sync / [Load today's lectures](docs/load-todays-lectures.md)** (optional) — reads a local `.ics`
  calendar (URL/file) and a local `.txt`/`.xlsx` lecture→tag map, finds your
  classes for the day, and adaptively unsuspends relevant tagged cards
  (AJ/#AK/Hutch decks tested). A calendar is optional — without one you pick
  lectures manually. **→ [How to use it: Load Today's Lectures tutorial](docs/load-todays-lectures.md).**

  *This feature expects your own calendar export and tag map; set their paths on
  the Lectures → Sources tab (or just run **Tools → Load today's lectures** and
  pick a tag map when prompted). Nothing is uploaded — the calendar is read
  locally (a URL source is optional and fetched only if you enter one).*

## Suggested Add-Ons

These extra installs help tie together some theming:
* [Anki Redesign](https://ankiweb.net/shared/info/2119814566)
* [Change Interface Font](https://ankiweb.net/shared/info/1431333984)
* [AMBOSS](https://www.amboss.com/us/anki)


## Support
*If I sent this to you for testing. Just text ((513)-502-9361) or email me if there are any issues/features
you think will be helpful to other people!* 

Janki is an independent, unofficial project. It is **not affiliated with, endorsed
by, or sponsored by** AnKing, AMBOSS, Anki / Ankitects, or any medical school.
"AnKing," "AMBOSS," and "Anki" are trademarks of their respective owners and are
used here only nominatively — to describe compatibility with those products. No
AnKing or AMBOSS content is bundled or redistributed; the add-on only operates on
your own local collection.

As Janki has functionalities that patch the original code of Anki to improve visuals 
and stamp cards for mobile effects. Certain functionalities, such as Lockdown Mode, 
may also ask for system level permissions to work properly. Mac OS makes this a requirement
for programs which automatically closing apps / disabling Wi-Fi on the device. There 
may be bugs/issues I have not identified yet. Please use the less invasive "load today's
lectures" version if you have concerns about this.

[cjre.pl/ogle](https://cjre.pl/ogle) 

## License

Licensed under the **GNU Affero General Public License v3.0** (see [LICENSE](LICENSE)).
Janki extends [Anki](https://github.com/ankitects/anki), which is also AGPL-3.0; the
self-heal patches Anki's own files locally at runtime and does not redistribute
Anki's source.
