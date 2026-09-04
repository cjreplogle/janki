# Load Today's Lectures — a quick tutorial

*Unsuspend the Anki cards for today's lectures, offline, in one click.*

This tool matches your class schedule to your Anki cards and **unsuspends** the
cards tied to the lectures you have today — so the deck you actually study only
contains what you've been taught. Everything runs **locally**: it never uploads
your collection, and a calendar is optional.

It ships two ways:

- Built into the full **Janki** add-on (`janki.ankiaddon`).
- As a tiny **standalone** add-on (`load-todays-lectures.ankiaddon`) if you only
  want this feature and none of Janki's visual/glass stuff.

Both add a **Tools → Load today's lectures** menu item and work identically.

---

## The one thing you need: a *tag map*

A **tag map** tells the tool *"for lecture X, unsuspend the cards with these
tags."* It's a file you make once and update as your course gives you new tags.
It can be either:

- a plain-text **`.txt`** file (easiest — see below), or
- an **`.xlsx`** spreadsheet (if your school hands one out in that shape).

A **calendar** (`.ics`) is *optional*:

- **With** a calendar → the tool figures out which lectures are *today* and
  pre-selects them.
- **Without** a calendar → it lists *every* lecture in your tag map and you tick
  the ones you want ("manual mode").

### `.txt` tag map format

Separate each lecture with a line of equals signs (`====`, four or more). Put the
**lecture name** between two such lines, then list its **tags**, one per line.
Tag lines start with `#`, `tag:`, or `deck:`. Blank lines are ignored.

```text
========================================
Cardiac Cycle & Heart Sounds
========================================
#AK_Step1_v12::#B&B::05_Cardiovascular::Heart_Sounds
tag:AJ_UCCOM_keep::Cardiology::CardiacCycle

========================================
Intro to ECGs
========================================
#AK_Step1_v12::#Physeo::Cardiology::ECG_Basics
tag:hUtChCOM::Cardio::ECG
```

Notes:

- **AnKing tags** (anything with `#AK…` or a `::` path in the AnKing column) are
  matched by their **last segment** (the concept, e.g. `ECG_Basics`), so they
  keep working even when AnKing renames the parent path between deck versions.
- **AJ / hUtChCOM tags** are matched only if the line contains that family's
  marker (`AJ_UCCOM_keep`, `hUtChCOM`), so turning a source off drops its tags
  everywhere.
- Trailing human notes in parentheses — `… (see note)` — are ignored.

> Tip: you don't have to be exhaustive. Start with a few lectures, run the tool,
> and add more as you go.

---

## First run

1. In Anki, go to **Tools → Load today's lectures**.
2. The first time, if no tag map is set yet, a **file picker opens** — choose your
   `.txt` or `.xlsx` tag map. It's saved for next time.
3. The **Lectures** window opens.

That's it. If you picked a file that has no readable lectures, the tool tells you
so you can fix it.

---

## Using the Lectures window

**With a calendar** you'll see each of today's calendar events matched to a
lecture, with the number of currently-suspended cards it would unsuspend. Use
**◀ Prev day / Today / Next day ▶** to move around; toggle any row's **Use**
checkbox to include/exclude it; the **Matched lecture** dropdown lets you correct
a wrong guess.

**Without a calendar** (manual mode) you'll see the full list of lectures from
your tag map — just tick the ones you want. There's also a **➕ Import calendar…**
button at the top: point it at an `.ics` **file or a URL** (e.g. a subscribed
feed) and, once it verifies the calendar has events, the window reopens in
day-aligned mode.

Common controls:

- **Unsuspend from:** — when a lecture's cards come from more than one source
  (AnKing / AJ / hUtChCOM), tick which sources to pull. If there's only one
  source it's shown as a read-only label.
- **Apply** — unsuspend the selected cards.
- **Re-suspend day** — undo: re-suspend the cards for the shown day.
- **Close** — done.

---

## Settings

Open **Tools → Janki: Settings… → Lectures** (full add-on), or, in the standalone
build, **Tools → Load today's lectures: Settings…**. Two panes:

**Sources**
- **Tag map** — the `.xlsx`/`.txt` file above.
- **Calendar** — an `.ics` local file *or* an `http(s)` URL (optional).

**Behavior**
- **Run automatically on launch** — once per day, on the first time you open Anki
  that day, it silently unsuspends the calendar-matched lectures (needs a
  calendar; does nothing in manual mode). Manual **Load today's lectures** still
  works anytime.
- **Fuzzy match cutoff** — how close a calendar title must be to a tag-map
  lecture name to count as a match (higher = stricter).
- **Match coverage** — how much of a title's keywords must line up.
- **Source toggles** — globally enable/disable whole tag families (AnKing, AJ,
  hUtChCOM, and others).

---

## Troubleshooting

- **"Couldn't load any lectures from that file."** — the tag map didn't parse.
  For `.txt`, check the `====` separators and that tag lines start with `#`,
  `tag:`, or `deck:`.
- **A calendar import shows a yellow ⚠ warning.** — the file/URL couldn't be read
  or had no events. Double-check the path or link.
- **A lecture matched the wrong thing.** — fix it with the row's **Matched
  lecture** dropdown, or raise the **Fuzzy match cutoff** in settings.
- **Nothing happens on launch.** — auto-run needs a calendar *and* only fires once
  per calendar day. Use **Tools → Load today's lectures** to run it by hand.

Details get logged to `janki-lectures.log` inside the add-on's folder if you need
to dig in.

---

*Your schedule and collection stay on your machine — this tool reads your files
locally and only ever touches the network if you give it an `http(s)` calendar
URL.*
