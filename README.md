# Janki

A macOS-focused [Anki](https://github.com/ankitects/anki) add-on that reskins the reviewer with native frosted-glass
transparency, throws in some focused study tool add-ons (for if you lose focus easily like me!), and adds some general QOL changes which should be particularly helpful for students at a certain medical school this project <ins>is not affiliated with</ins>.

>[!WARNING]
> **macOS only for now...** If enough people ask, I can try and throw together a Windows release. No guarantees I have the time to figure it out... (*I have to pass medical school too!*)

## Install

**From a release file**
1. Download `janki.ankiaddon` from the [Releases](../../releases) page.
2. Double-click it (Anki opens and installs), or in Anki:
   **Tools → Add-ons → Install from file…** and pick the `.ankiaddon`.
3. Fully quit and reopen Anki.

**From source**
Clone/copy file contents into your Anki add-ons folder as a folder named `janki`:
`~/Library/Application Support/Anki2/addons21/janki/`


> If you wish to change any settings or disable any features, you may do so by navigating to Tools > Janki: Settings...


## Features

- **Frosted-glass reviewer** — native macOS vibrancy/blur; transparent cards,
  serif card font, OLED full-screen mode.
- **Focus Mode** (`Tab+F`) — hides toolbar/answer bar and centers the card.
  Only has the card contents on screen.
- **OLED Optimization** — when in fullscreen, uses a true black backdrop. Useful
  for increasing contrast and readability on Mac displays.
- **Caption Mode** — Trying to multitask but still see your anki cards? Press **Tab + \**
  to change the Anki notecard view to be in "caption" form. **Tab+Arrow Keys**
  adjusts their screen position. Remains visible in this view even when other
  things are in fullscreen.
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
  and adaptively unsuspends relevant tagged cards (AJ/Anking tags tested).

  *The schedule sync feature expects your own calendar export and tag spreadsheet;
  set their paths on the Lectures → Sources tab. Nothing is uploaded — the
  calendar is read locally (a URL source is optional and fetched only if
  you enter one).*

## Suggested Add-Ons

These extra installs help tie together some theming:
* [Anki Redesign](https://ankiweb.net/shared/info/2119814566)
* [Change Interface Font](https://ankiweb.net/shared/info/1431333984)


## Support
*If I sent this to you for testing. Just text me if there are any issues/features
you think will be helpful to other people!* 

FYI - this is very vibe coded and designed for my personal use / habits. Source code 100% is a hot mess but it does what I need it to do so I can live with it. 

[cjre.pl/ogle](https://cjre.pl/ogle) 

