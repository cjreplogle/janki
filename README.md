# Janki

A macOS-focused Anki add-on that reskins the reviewer with native frosted-glass
transparency and adds a set of focused-study tools: a Pomodoro system with an
in-window break screen, a per-card "lingering" timer with edge-glow flares, a
distraction-free Focus Mode, global hotkeys, AMBOSS frosting, and an optional
local lecture-unsuspender driven by a calendar + spreadsheet.

> **macOS only.** Janki uses native macOS vibrancy, an Objective-C bridge, and
> CoreGraphics event taps. On Windows/Linux the mac-specific pieces are skipped,
> so most visual/hotkey features will not work.

## Install

**From a release file**
1. Download `janki.ankiaddon` from the [Releases](../../releases) page.
2. Double-click it (Anki opens and installs), or in Anki:
   **Tools → Add-ons → Install from file…** and pick the `.ankiaddon`.
3. Fully quit and reopen Anki.

**From source (for development)**
Clone into your Anki add-ons folder as a folder named `janki`:
`~/Library/Application Support/Anki2/addons21/janki/`

## Features

- **Frosted-glass reviewer** — native macOS vibrancy/blur; transparent cards,
  serif card font, OLED full-screen mode.
- **Focus Mode** (`Tab+F`) — hides toolbar/answer bar and centers the card.
- **Pomodoro** — review-time work intervals, an in-window break screen
  (hold **Space** to skip), and a calm "break due" blue edge tint.
  Toggle the whole system on/off in settings.
- **Card timer** — a thin bar fills over N seconds; when it runs out a red
  edge-glow flares (a "time to move on" nudge). A green flare marks a card
  finished for the day. Intensity and timing are adjustable.
- **Global hotkeys** — hold **Tab** as a modifier to drive the reviewer even
  when Anki is not focused.
- **AMBOSS** — frosts the AMBOSS side panel and hover tooltip; hides term
  underlines unless in fullscreen.
- **Lecture unsuspender** (optional, cohort-specific) — reads a local `.ics`
  calendar and a local `.xlsx` lecture→tag map, finds today's lectures, and
  unsuspends their cards on confirm. See **Tools → Janki: Settings… → Lectures**.

## Settings

**Tools → Janki: Settings…** — a tabbed dialog: Appearance, Focus, Pomodoro,
General, and Lectures (Sources / Behavior). **Tools → Load today's lectures**
opens the unsuspend window directly.

The lecture feature expects your own calendar export and tag spreadsheet; set
their paths on the Lectures → Sources tab. Nothing is uploaded — the calendar is
read locally (a URL source is optional and fetched only if you enter one).

## License

MIT — see [LICENSE](LICENSE).
