# Janki

<p align="center" style="font-weight: 400;">A feature rich <a href=https://github.com/ankitects/anki>Anki</a> client designed around you.
</p>

<p align="center">
  <img src="docs/media/reviewer.jpg" alt="Frosted-glass reviewer" width="360">
</p>

>[!WARNING]
> Some features within this add-on are still rather experimental. Please use at your own risk!

## Install

Runs as a plugin on top of Anki. No separate app.
Two builds — pick one (each link always downloads the latest release):

- **[⬇ Download `janki.ankiaddon`](https://github.com/cjreplogle/janki/releases/latest/download/janki.ankiaddon)**
  — the full frosted-glass experience. Adds a small, self-healing, reversible
  **patch layer** to Anki that enables the transparency (details below). I use this.
- **[⬇ Download `load-todays-lectures.ankiaddon`](https://github.com/cjreplogle/janki/releases/latest/download/load-todays-lectures.ankiaddon)**
  — a bare-bones version of the add-on that simply has the
  [Load today's lectures](docs/load-todays-lectures.md) import functionality.
  Designed for if you don't care for any of the other features.

1. **Install Anki** (if you haven't yet) from [apps.ankiweb.net](https://apps.ankiweb.net).
2. **Double-click the downloaded `.ankiaddon`** (Anki opens and installs it), or in Anki:
   **Tools → Add-ons → Install from file…** → pick the file.
3. **Restart Anki.** On first launch Janki applies a small one-time patch to Anki
   so the frosted glass can work, then asks you to **quit and reopen once**. Do
   that, and the glass is on. From then on, just open Anki normally.

> [!NOTE]
> **Why the one-time patch + restart?** True transparency needs a setting applied
> before Anki starts drawing — something an add-on alone can't do. Janki modifies
> two of Anki's own files to enable it (backups are kept), and **re-applies
> automatically after any Anki update**, prompting a quick restart when it does.



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

**Windows:** **Tools → Janki: Uninstall…** (also in Settings → General) removes
Janki and everything it added in one click, then closes Anki.

> To change or disable any feature: **Tools → Janki: Settings…**


### Windows (beta)

Janki now runs on Windows too. However, it does not meet my current performance and quality standards. Using it in its current state will be buggy. If you still feel so inclined, you may try it for yourself below.

Download
**[`janki-windows.ankiaddon`](https://github.com/cjreplogle/janki/releases)**

Some features unavailable. New installs start with the **Solid** window (fastest);
pick a glass look in **Settings → General → Window glass**.

## Features

- **Frosted-glass reviewer** — revamps the Anki user interface from the ground up. Minimal, yet designed to seamlessly take advantage of modern hardware features. Includes a rework of card animations, application-wide frosted glass transparency, and much, much more...

  <p align="center">
    <img src="docs/media/reviewer2.jpg" alt="Reviewer glass" width="48%">
    <img src="docs/media/reviewer3.jpg" alt="Reviewer glass, another card" width="48%">
  </p>
  <p align="center">
    <a href="https://youtu.be/2jU0c5a6myo"><img src="https://img.youtube.com/vi/2jU0c5a6myo/hqdefault.jpg" alt="Watch the glass reviewer on YouTube" width="60%"></a>
  </p>
- **Focus Mode** (**`Tab+F`**) — hides toolbar/answer bar and centers the card.
  Only has the card contents on screen. Also throws in small customizable timer
  which fills over N seconds; when it runs out a red edge-glow flares
  (a "time to move on" nudge). A green flare denotes a card as finished for the day.
- **Lockdown Mode** (`backtick/~+delete`) — locks Janki into fullscreen to keep
  you from getting distracted. Escape by holding space/the entry bind for 10s.
  Tiered into three levels depending on how cooked your attention span is from
  doom-scrolling.
  
  <p align="center">
    <video src="https://github.com/cjreplogle/janki/raw/master/docs/media/scroll-animations.mp4" autoplay loop muted playsinline controls width="560"></video>
  </p>

- **Rephrase** — automatically re-word the same card
  slightly differently while retaining core information (Enable: **`Tab + R`**), so you
  don't simply memorize the card without understanding it. Automatically intersperses
  reworded cards after a single pass, while the original text is easily retrievable. All
  rephrases fall with the same card, so making headway with the adjusted wording has the
  same effect as getting the original card correct.

  **→ [How to Use Card Rephrasing](https://cjre.pl/ogle/janki/rephrase)**
- **Practice questions** — pull multiple-choice questions
  related to the card you're reviewing (**`Tab + Q`**), or load whole question banks into
  Anki as a real, syncable Practice deck. Banks are local `.qb` files; grading is by answer
  choice (correct → suspend, wrong → retry, skip → bury) with a per-bank Score. Runtime is
  100% local.
  
  **→ [Practice system + how to import a document as a question bank](docs/practice-questions.md)**
- **.jank bundles** — one file per content drop: decks (`.apkg`), question banks (`.qb`),
  lecture tag maps (`.json`) and rephrasings (`.rp`) imported together, in the right order,
  without touching your review history. **Settings → General → Import .jank…**, and
  **Build .jank…** to package your own.

  **→ [.jank bundles: importing and building](https://cjre.pl/ogle/janki/jank)**
- **Mobile card theming** *(experimental, off by default)* — AnkiMobile/AnkiDroid can't run
  add-ons, so this can stamp an OLED-dark background, a serif font, and the text-reveal
  animation into your note types (scoped to mobile) so the look rides your normal sync
  to the phone/iPad. It rewrites every note type's templates, so it's opt-in: set
  `"mobile_cards": true` in the add-on config to reveal **Tools → Janki: Mobile cards**
  (Apply / Remove — one-click reversible).
  
  **→ [Mobile cards setup + recommended AnkiMobile settings](docs/mobile-cards.md)**

  <p align="center">
    <video src="https://github.com/cjreplogle/janki/raw/master/docs/media/mobile-cards.mp4" autoplay loop muted playsinline controls width="240"></video>
    <!-- practice mobile clip hidden for now
    <video src="https://github.com/cjreplogle/janki/raw/master/docs/media/mobile-practice.mp4" autoplay loop muted playsinline controls width="240"></video>
    -->
  </p>
- **Load today's lectures** — reads a local `.ics`
  calendar (URL/file) and a local `.txt`/`.xlsx` lecture→tag map, finds your
  classes for the day, and adaptively unsuspends relevant tagged cards
  (AJ/#AK/Hutch decks tested). A calendar is optional — without one you pick
  lectures manually.

  **→ [Load Today's Lectures tutorial](docs/load-todays-lectures.md)**

  <p align="center">
    <img src="docs/media/load-todays-lectures.jpg" alt="Load today's lectures" width="375">
  </p>

  *This feature expects your own calendar export and tag map; set their paths on
  the Lectures → Sources tab (or just run **Tools → Load today's lectures** and
  pick a tag map when prompted). Nothing is uploaded — the calendar is read
  locally (a URL source is optional and fetched only if you enter one).*
- **Lecture Card Manager** — click the calendar icon in the toolbar for a week view of
  your classes, built from your calendar and lecture → tag map (matched lectures in blue,
  fuzzy matches edged amber). Click a class to manage that lecture's cards in one place:
  **Study active cards** or **Study all cards** (a temporary filtered deck — reviews count
  normally), **Suspend / Unsuspend cards for this lecture**, and see which tags it pulls
  in. **Study Progress** ranks the lectures you've already had by how under-studied
  they are, so you know what to catch up on. Everything is read locally.
- **Caption Mode** — Trying to multitask but still see your anki cards? Press **`Tab + \`**
  to change the Anki notecard view to be in "caption" form. **`Tab+Arrow Keys`**
  adjusts their screen position. Remains visible in this view even when other
  things are in fullscreen. (Note: also integrated to work & adjust with remote buttons)

  <p align="center">
    <video src="https://github.com/cjreplogle/janki/raw/master/docs/media/caption-mode.mp4" autoplay loop muted playsinline controls width="560"></video>
  </p>
- **Global hotkeys & remote** — hold **Tab** as a modifier or use your
  controller to drive the reviewer even when Anki is not focused.
  (i.e. **`Tab+Z`** → again, overrides being unfocused). **`Cmd+Opt+A`** also will globally
  focus the Anki window regardless of whatever else you are doing.
  Every shortcut (including the Tab chord key itself) can be changed in
  **Settings → Hotkeys**.
- **Pomodoro** — review-time work intervals, an in-window break screen
  (hold **Space** to skip), and a calm "break due" blue edge tint.
  Toggle the whole system on/off in settings. 
- **Tray menu** — keeps Anki open in the background and allows you to navigate a
  miniaturized menu with other things focused.
- **Quick Zoom** — for whatever god forsaken reason Anki does not have **`Cmd+`**
  or **`Cmd-`** hotkeys to zoom card contents so that exists now...

## Changelog

Every release is also on [GitHub Releases](https://github.com/cjreplogle/janki/releases).

<details open>
<summary><b>2.10.0</b> · 2026-10-08</summary>

- **AnKing loads much faster**: lecture tag searches are matched against an in-memory tag index instead of Anki's search, so lectures with hundreds of AnKing tags load in a fraction of a second.
- **Weak areas no longer hangs with AnKing on** (tags with parentheses are matched individually).
- **Several spreadsheet tag maps at once**, including the older AnKing sheet layout (Settings → Lectures → More maps).
- **Windows**: one-click uninstall (Tools → Janki: Uninstall…), and new installs start with the Solid window.
- Top-right settings button on by default for new installs.

</details>

<details>
<summary><b>2.9.3</b> · 2026-10-08</summary>

- **AnKing loads much faster**: lecture tag searches are now matched against an in-memory tag index instead of running through Anki's search one tag at a time. Lectures with hundreds of AnKing tags load in a fraction of a second instead of lagging Anki.

</details>

<details>
<summary><b>2.9.2</b> · 2026-10-07</summary>

- **Weak areas no longer hangs with AnKing on**: AnKing tags with parentheses in their names (e.g. `T-score_(DEXA)`) made Weak areas run one enormous Anki search per lecture, freezing or crashing Anki. Those tags are now matched individually, like every other tag.

</details>

<details>
<summary><b>2.9.1</b> · 2026-10-07</summary>

- **Several spreadsheet tag maps at once**: you can now use more than one .xlsx tag map. Add extra spreadsheets under Settings → Lectures → **More maps** (or drop one on the window once a base map is set); each lecture gets the tags from every map. Before, adding a second spreadsheet replaced the first.

</details>

<details>
<summary><b>2.9.0</b> · 2026-10-07</summary>

- **Windows: Solid window by default**: new Windows installs start with the **Solid** window glass (a plain dark window, fastest). Existing setups keep their current choice; change it anytime in Settings → General → Window glass.

</details>

<details>
<summary><b>2.8.14</b> · 2026-10-07</summary>

- **Settings button shown by default**: new installs now show the top-right settings button. Existing setups keep their current choice (Settings → Appearance → Window).

</details>

<details>
<summary><b>2.8.13</b> · 2026-10-07</summary>

- **Older AnKing tag sheets work in the tag mapper**: spreadsheets laid out as side-by-side lecture / **Anking** column pairs (one sheet per module, no decks column) now load lecture by lecture, the same as the current sheet.

</details>

<details>
<summary><b>2.8.12</b> · 2026-10-07</summary>

- **Much faster AnKing searches**: lecture searches using AnKing as a source no longer list every sub-tag of a concept (one tag already covers its children). Broad concepts went from up to ~20,000 search terms to ~1,300, so loading lectures from AnKing no longer lags Anki.

</details>

<details>
<summary><b>2.8.11</b> · 2026-10-07</summary>

- **Windows: one-click uninstall**: **Tools → Janki: Uninstall…** (or Settings → General → Uninstall Janki…) removes Janki and everything it added, then closes Anki.
- Deleting Janki from Tools → Add-ons now also removes its start-up hook from Anki's Python folder (it used to stay behind and keep running). A hook left over from an earlier delete removes itself at the next start.

</details>

<details>
<summary><b>2.8.10</b> · 2026-10-07</summary>

- **.docx question banks load straight into a deck**: importing a .docx now always creates its Practice deck, including from Settings → Practice and on a profile without a Practice deck yet (before, it could import without making a deck). Drag a .docx onto the Anki window and press **Create & import**

</details>

<details>
<summary><b>2.8.9</b> · 2026-10-07</summary>

- **More .docx question banks**: the .docx importer now also reads banks that use Word's automatic numbering (question numbers and A–E choice letters added by Word) with the answers in a key at the end ("Answer: C. …" followed by "Explanation: …"). Answers are matched to questions in order and checked against the key's choice text

</details>

<details>
<summary><b>2.8.8</b> · 2026-10-07</summary>

- **Pomodoro**: holding Space to skip a break now works even if macOS hasn't given Anki keyboard-monitoring permission
- **Practice cards**: the rephrase button no longer overlaps "Show original slide" (desktop and phones)

</details>

<details>
<summary><b>2.8.7</b> · 2026-10-07</summary>

- **Older Anki versions**: if your Anki is too old for Janki's glass, Janki now says so (once, at launch) and names your Anki version. **Settings → General** shows the same message instead of a greyed-out button with no explanation. Update Anki from apps.ankiweb.net, then relaunch it twice.

</details>

<details>
<summary><b>2.8.6</b> · 2026-10-07</summary>

- **Idle CPU fixed**: after you'd opened Stats once, Anki could keep a whole CPU core busy while sitting idle for the rest of the session (with 120 Hz on). Stats now releases itself when you leave it, so idle CPU stays low (about 100 % → 4 % in testing). Each Stats open loads fresh (about 0.4 s)

</details>

<details>
<summary><b>2.8.5</b> · 2026-10-07</summary>

**Stats**
- Fixed Stats sometimes opening as an empty pane, with Anki using a full CPU core, until restart. Hover preloading (added in 2.8.0) caused it, so it's been removed. Stats again loads on your first click each session, then opens instantly

**Window**
- One click on the Dock icon now reopens the window after closing it with the red X (it took two)

**Tray**
- Classes no longer stay grey when the tray is opened right after launch; they fill in with their course colours

</details>

<details>
<summary><b>2.8.4</b> · 2026-10-07</summary>

**Closing to the menu bar**
- The red X now reliably keeps the window closed. Before, it could reappear as an empty glass frame, either right after launch or a moment after closing
- The Dock icon and ⌘-Tab still bring it back

**Stats**
- Fixed Stats sometimes opening empty after switching pages quickly (it stayed empty until Anki was restarted). Janki now checks each open and rebuilds the view if it comes up blank
- Fixed Stats opening empty when clicked while its background load was still running

**Also**
- After an update that refreshes the macOS glass patch, the rebuild runs in the background instead of freezing the window for a few seconds

</details>

<details>
<summary><b>2.8.3</b> · 2026-10-07</summary>

- **Closing to the menu bar sticks**: pressing the red X no longer brings the window straight back (blank until clicked). The Dock icon and ⌘-Tab still reopen it
- **No freeze after updating**: when an update refreshes the glass patch, it's rebuilt in the background instead of freezing the window for a few seconds after launch

</details>

<details>
<summary><b>2.8.2</b> · 2026-10-07</summary>

**Glass on more Macs**
- Glass now works when Anki's files are installed outside Anki.app (for example by Anki's launcher)
- Quitting at the profile chooser, or starting Anki with add-ons off, no longer switches glass off on the next launch
- The one-time glass setup download no longer fails on Macs missing the system certificates
- If macOS "Reduce transparency" is on, Janki says so (glass draws solid while it's on)

**Settings → General**
- The glass patch button is always there on macOS. When glass can't be applied to your Anki, it's greyed out with the reason
- Every click now reports what happened (restart prompt, or exactly why it didn't apply)
- "Restore stock Anki" after an Anki update now restores the current version's files

**Also**
- Janki says why when glass is off because this Anki is too old

</details>

<details>
<summary><b>2.8.1</b> · 2026-10-07</summary>

**Tray & Calendar**
- The tray no longer says "No classes" while the calendar is still loading: it shows "Loading classes…" and fills in when your classes arrive
- A tray prepared before midnight (Anki left running overnight) is rebuilt when opened, so "Today" is really today
- Classes that arrive after "Loading…" fade in, in their course colours, instead of popping in (Calendar: a day at a time)

</details>

<details>
<summary><b>2.8.0</b> · 2026-10-07</summary>

**Stats opens ready**
- Pointing at **Stats** in the toolbar starts loading it in the background, so the click shows it straight away (the first panel appears in about 0.15 s)
- Not while studying, and no cursor flicker

**Calendar & lectures**
- With AnKing on, today's lectures no longer auto-load at launch (it can take minutes). Turn it back on with **Settings → Lectures → Behavior → Auto-load even with AnKing on (slow)**
- Calendar: opens at the top, so short windows keep their space under the toolbar
- Notices shown at launch now use Janki's glass style

**Faster first launch of the day**
- Nothing Janki reads from disk runs before the first deck list anymore (calendar prewarm, data sync)

**macOS**
- Opening **Practice** no longer flickers: the page is rewritten in place instead of reloaded

</details>

<details>
<summary><b>2.7.3</b> · 2026-10-07</summary>

**Pomodoro**
- Going back to the menu while a break is due (blue tint showing) now cancels that break and restarts the work timer, instead of the tint coming back on the menu and the break taking over your next card

**Typewriter**
- Plays on every card show, including fast flips and relearning cards shown again
- A reveal that stalls now finishes instead of staying half-typed

**Faster**
- Practice: the deck list and question-bank progress are much quicker with many banks

**Also**
- Settings: the calendar's Refresh button no longer flashes as its own little window when Settings opens

Windows users: see **2.7.3w** for the Windows rendering rewrite.

</details>

<details>
<summary><b>2.7.2</b> · 2026-10-07</summary>

**Fix: calendar and lecture sync**
- A passphrase set in Settings → Lectures → Sync was treated as missing, so nothing synced. It now works with the passphrase you already set; no need to enter it again. Update every computer, then sync each one.

</details>

<details>
<summary><b>2.7.1</b> · 2026-10-07</summary>

**Sync your calendar and lecture setup between computers**
- Your calendar URL and settings, calendar colours and class counts, the lecture spreadsheet, source decks, exclusions and aliases now travel with your normal AnkiWeb sync
- Everything is encrypted with a passphrase before it leaves your computer: AnkiWeb can't read the calendar URL, the spreadsheet or even the file names
- Set it up in **Settings → Lectures → Sync**: use the same passphrase on each computer (Mac or Windows). Nothing syncs until a passphrase is set
- A computer that receives the calendar URL downloads the calendar itself; the spreadsheet is saved into Janki's folder if its original location doesn't exist there
- If two computers use different passphrases, Janki says so once, after a sync

**Lectures settings, reorganized**
- **Sources**: the tag map, plus the sources the Calendar uses. Each source's decks fold away behind a **+** button
- **Calendar**: the calendar file/URL, Refresh now, today's lecture window and the timezone
- **Sync**: the new sync settings, including your current passphrase (hidden until you press Show)

**Also**
- Deck list: starts closer under the toolbar, matching the gap above it
- Settings: the window resizes properly when the Sources list loads or a source is expanded

</details>

<details>
<summary><b>2.7.0</b> · 2026-10-06</summary>

**Smoother on ProMotion (120 Hz) Macs**
- Lifts the 60 fps limit on animations and scrolling (applies after two launches; create an empty `~/.janki_60fps` file to go back to 60)
- Idle CPU stays low: the controller polling no longer redraws the page constantly, and a hidden Calendar spinner no longer animates
- The text scroll and the mobile card reveal now run by time, so they keep the same speed at any frame rate

**Better practice-question matching**
- Questions filed under a subdeck (by the .docx subdeck mapping or a tag map) now count as a direct deck match for cards in that subdeck
- A question whose lecture title agrees with the card's deck/tag name ranks higher within its tier
- Deck tags guessed from question text rank below guessed concept tags
- Questions carrying a huge, meaningless tag list (from an over-broad lecture-map entry) no longer match every card, and lecture-map tagging no longer creates them or overwrites existing tags
- Matching is much faster during review

**.jank bundler**
- Expand a question bank or tag map to pick individual lectures; a bank selection ships as its own "(selection)" bank so it never replaces someone's full copy
- **Trim banks and tag maps to the ticked decks**: ticks only the lectures your chosen decks actually use
- Only tag maps that are in use (Settings → Lectures → Tag map) are offered; long names are no longer cut off

**Also**
- Text scroll: list bullets now appear with their line instead of all at once
- Deck list: rows fade out at the bottom above the button bar
- **Launch**: the window fades in once the deck list is ready (no more text popping in)
- Tooltips such as "Collection sync complete" fade in and out
- macOS: quitting soon after launching no longer turns glass off on the next launch
- Settings: the tab row always clears the window's close button, even on narrow windows or with larger system fonts
- Calendar: thinner Study Progress outline

</details>

<details>
<summary><b>2.6.7</b> · 2026-10-06</summary>

- **macOS: double-click to import** — on first launch Janki registers `.jank`, `.qb` and `.rp` files to open in Anki (only file types that have no default app yet, so your own choice is kept). Double-clicking one then imports it.

</details>

<details>
<summary><b>2.6.6</b> · 2026-10-06</summary>

**Smoother reviews**
- Fixed the hang where Z/X/C/V seemed to do nothing for a moment: the tray menu no longer re-reads your decks after every answer, Practice bank checks wait until you leave the reviewer, and the answer side's extras run after the answer appears
- Text scroll no longer stutters early in a session: the Practice "borrowed tags" index builds in the background shortly after launch, without holding the collection
- List bullets no longer appear ahead of the typing text-scroll
- Anki no longer steals focus from other apps right after login/sync

**Practice questions**
- Review picks matched tags/decks first by a wide margin, then tags inferred from text, then near-miss tags, then word similarity — word similarity only orders questions within a tier
- `.docx` import: optional **Map to subdecks of** — questions are filed under the matching subdeck (by header name, else by content) and link to that subdeck's cards
- `.docx` import: optional **tag map** CSV (Q, deck, tag, Stem) — auto-detected next to the .docx or chosen with **Choose tag map…**
- `.docx` and `.jank` imports run in the background with a glass progress panel; Anki stays usable
- Renaming a deck inside Practice keeps it in Practice

**Also**
- Export window: new **Tags (.txt)** format — every tag in a deck + subdecks (or selected notes), with an optional indented subdeck tree
- Rephrase: rewords where the on-device model padded the card with invented/repeated lines are discarded

</details>

<details>
<summary><b>2.6.5</b> · 2026-10-06</summary>

**Review by arrow keys**
- **↑** on a card goes up to the toolbar (starting on Decks); **↓** goes down to the bottom bar
- In the bottom bar: Show Answer first, then **Good** once the answer shows; **←/→** pick Again / Hard / Good / Easy, **Enter/Space** press, **↑/Esc** back to the card
- The arrows go straight to navigation (they no longer scroll the card first); practice questions keep their own arrow keys

- **Enter/Space** on an arrow-key-selected toolbar item opens it during review (instead of flipping/answering the card)


**Also**
- **Background sync**: the automatic sync when Anki opens no longer shows a Syncing… window; on quit the window hides at once while the sync and backup finish (`sync_in_background`, on by default)
- Rephrase prompt and objectives tag-map dialogs: checkboxes visible again
- Deck list: the settings gear no longer stays on a deck after you collapse it

</details>

<details>
<summary><b>2.6.4</b> · 2026-10-06</summary>

**Keyboard navigation**
- Toolbar arrow keys: one highlight only (a clicked item no longer keeps its own ring beside the selection)
- ↑ from the Calendar starts on the Calendar item (was Decks)
- The toolbar highlight clears while you arrow through Calendar lectures or decks, and comes back when you switch to another app and return; ←/→ always start a selection on a focused toolbar

**Tour**
- Focus → Reviewing stays on the open sample card instead of reloading it

**Also**
- The Practice button on cards sits off the bottom edge so its highlight isn't cut off
- Ctrl+Z and menu shortcuts work while the menu bar is hidden; Z / X / C / V rate reliably once the answer is showing; Text shadows setting (Appearance → Text)

</details>

<details>
<summary><b>2.6.2</b> · 2026-10-06</summary>

**Practice question import (.pptx)**
- **Highlight-reveal banks**: where the right answer is revealed by an animated box over a screenshot, Janki reads the box to mark the correct choice, and attaches the next slide as the explanation
- **Exam-software screenshots** ("Item 2 of 48" screens, QID cards): toolbar and sidebar clutter stripped, numbered choices understood, "The correct answer is X" keys read
- Questions split across two screenshots on one slide (stem + choices) now import as one question
- Radio-button choices ("○ A)") read correctly
- EOB-style bank: ~185 of ~230 questions now import complete (was ~40)

**.jank builder**
- New **Decks** group: tick decks (subdecks included) to bundle them as .apkg, media included, review history optional; shown as an expandable tree

**Look & feel**
- Keyboard focus rings follow the button's rounding (no box inside the ring) on the toolbar and bottom bar
- Tour: rounded spotlight with its full ring; the Calendar step opens the Calendar itself
- Deck list: fixed width, stable scrollbar gutter, bigger +/− targets that no longer get swallowed by the name's hover

**Also** — Z / X / C / V always rate (replay own voice moved to Alt+V), tray sound levels, day seeking and class details in the tray, calendar fixes, lower memory use

</details>

<details>
<summary><b>2.5</b> · 2026-10-05</summary>

**Calendar**
- **Study Progress** (was Identify Weak Areas): **Biweekly** (since last Monday) and **End of block**, grouped by your biweekly assessments from the calendar (Biweekly I, II, …), each lecture with a mini 14-day review line; suspended cards no longer count as "not started"
- Class pages open instantly (counts fill in, with a small spinner while refreshing); Open in LMS for any event with a link; − to unassign a lecture; arrow-key navigation
- Dress codes from class notes, star for mandatory, calendar URLs downloaded once a day (+ Refresh now)
- Sources' decks found automatically; switch whole sources off (Settings → Lectures → Calendar); Practice match Lenient / Strict

**Tray**
- Decks | Practice | Today as a segmented switch; Today is a mini day view (8am–1pm) with course colours
- Opens instantly (built in the background, no card data needed), capped at half the screen
- Right-click the speaker for Navigation / Reviews sound levels; closes on any outside click

**Also**
- Card tags pinned above the answer buttons, capped (Settings → Appearance → Text)
- Sounds settings moved under Appearance; hot corner under Focus
- Safer lecture defaults for new installs (only Hutch loads); warning when AnKing auto-load is on
- Many fixes: quit hangs, focus stealing, temporary decks hidden, sync no longer kicks you out of the calendar

</details>

<details>
<summary><b>2.4</b> · 2026-10-05</summary>

**Calendar**
- **Identify Weak Areas** (bottom bar on the Calendar): past lectures ranked by unstarted cards, recall, due cards and leeches — "Past 2 weeks" (since last Monday) or "End of block" (8 weeks), with a progress bar; click a lecture for its page
- **Practice** button on class pages: related practice questions in a temporary deck (Lenient / Strict setting)
- Opt individual tags out of a lecture (− on a tag chip), tag counts on classes, **Open in LMS**
- Sources' decks found automatically (e.g. Hutch → CRanki); switch whole sources off (Settings → Lectures → Calendar)
- Dress codes from class notes, star for mandatory classes, side-by-side overlapping classes, now-line, day-by-day arrow keys, trackpad swipe, grid fills the window

**Faster, lighter**
- Calendar opens instantly (primed at launch); class pages and weak areas no longer queue behind background work
- Lecture searches cached; AnKing's big tag map handled far more gently
- Fixed the "Expression tree is too large" error on big lectures, hangs on quit, focus being pulled while in other apps

**Also**
- WorkMode-style hot corner (Settings → Focus → Hot corner): a preview slides in; click to bring Anki back
- Card tags pinned above the answer buttons, capped (Settings → Appearance → Text)
- Space no longer swallowed in editors during a Pomodoro break
- Safer defaults: new installs only load Hutch lectures; warning when AnKing auto-load is on

</details>

<details>
<summary><b>2.3</b> · 2026-10-05</summary>

**Calendar (new)**
- Calendar page from your lecture calendar: Day / 3-day / Week views with smooth slides, remembers your view
- Click a class for its page: pick the matching lecture, choose sources, study unsuspended or all cards (suspended ones are put back afterwards), unsuspend, view tags
- Course colours, a star on mandatory classes, side-by-side overlapping classes, a red "now" line
- Dress codes from class notes shown at the top of the day; assignments only on their due date; repeating events supported
- Navigate with ←/→ (day by day), ↓/↑, Enter, or a two-finger trackpad swipe
- Tray: switch between Decks and today's classes

**Also new**
- Hot corner (pick the corner in Settings)
- Update button on the main screen
- Right-click a deck to unsuspend or create a subdeck
- Status while a .pptx is importing
- Lecture wizard: switches, quick buttons to change the calendar / spreadsheet file, fades in

**Fixes**
- Pomodoro no longer steals focus or flares over other apps
- Large lectures no longer hit a database error when counting/studying
- Faster: calendar reads and lecture matching happen in the background
- Checkbox drawing on older Macs, tour boxes line up with the card, deck-name hover loop
- Sounds on Windows/Parallels

</details>

<details>
<summary><b>2.2</b> · 2026-09-30</summary>

**Getting started**
- Guided "Welcome to Janki" setup and an interactive in-app tour (practice questions, rephrasings, Focus/Caption, lectures, keyboard shortcuts)
- One restart on install, with plain explanations for permissions

**Keyboard & controller**
- Navigate decks, banks, the toolbar, Settings and practice answers with the arrow keys / a controller (Enter/Space open, ↑ into the toolbar)
- New shortcuts: ⌘D Decks · ⌘G Practice · ⌘B back · ⌘O last deck · ⌘L lectures · ⌘S Settings (all rebindable)
- Controller +/− zoom the card; Contanki no longer double-reads the pad in menus

**Sounds (optional, off by default)**
- Soft UI sounds for navigation and reviewing, 4 sound sets + a custom folder, per-sound levels (drag) and on/off (right-click)

**Smoother & faster**
- Continuous transitions between Decks, Practice and Stats; steady deck columns; balanced deck overview
- Faster first card; lecture wizard lag fixed

**Also**
- Import File handles Janki files; drop .docx/.xlsx anywhere
- Dark mode by default, Disable animations switch, glass/photo toggles
- Lockdown: tray usable, quitting waits out a countdown
- Many fixes (fullscreen restore, flares over Settings, practice arrow keys, and more)

</details>

<details>
<summary><b>2.1.6</b> · 2026-09-29</summary>

- **One restart to install**: Janki sets up its glass right away and restarts Anki itself if needed (with safeguards against restart loops).
- **Z / X / C / V** rate cards Again / Hard / Good / Easy, like 1–4 (Settings → Hotkeys)
- Close-to-tray is off by default
- Anthropic Serif font option removed (if selected, you're moved to Lora)
- Includes all 2.0 features. Janki now also runs on Windows — see the 2.1.6w release.

</details>

<details>
<summary><b>2.0.0</b> · 2026-09-29</summary>

**New: adjustable hotkeys.** Settings → Hotkeys lists every Janki shortcut (including the Tab chord key) in collapsible groups. Click one, press a new key; duplicates are flagged and everything can be restored to defaults.

**Motion and polish**
- Deck names slide and grow a soft pill on hover; toolbar items and buttons fade, lift and press
- Subdecks drop down when you click + and fold up on −
- The deck list's width and its New / Learn / Due columns glide instead of jumping as subdecks open and close; headings are centred over their numbers
- A little more space between whole decks, and after a subdeck group
- The first card fades in when you start studying
- Study Now is larger and a paler blue
- The deck list's column headers (Deck / New / Learn / Due, and Bank / To-Do / Review / Completion) stay pinned at the top while you scroll
- The "Congratulations! You have finished this deck" page uses the Janki font
- Honours macOS Reduce motion; turns itself off if the Anki Redesign add-on is enabled (Settings → Appearance → Text → Hover animations)

**Practice questions**
- A wrong answer now buries the card until your next session instead of grading it Hard
- "Score" is now **Completion**: the share of a bank's answerable questions you've cleared
- To-Do / Review / Completion are centred over their numbers

**Fixes**
- Slide OCR no longer turns "T cells" into "I cells" (I-cell disease is left alone)
- Card-timer flares no longer steal focus from the fullscreen reviewer
- Loading a big lecture day no longer freezes Anki

</details>

## Suggested Add-Ons

These extra installs help tie together some theming:
* [Anki Redesign](https://ankiweb.net/shared/info/2119814566) (Some menu animations)

## Support

>[!NOTE]
>*If I sent this to you for testing, just text me @ `(513)-502-9361` in the case there are 
>any issues/features you think will be helpful to other people!* **Thank you for being an 
>early user!** 

<div id="legal"></div>

Janki is an independent, unofficial project. It is **not affiliated with, endorsed
by, or sponsored by** AnKing, AMBOSS, Anki / Ankitects, or any medical school.
"AnKing," "AMBOSS," and "Anki" are trademarks of their respective owners and are
used here only nominatively — to describe compatibility with those products. No
AnKing or AMBOSS content is bundled or redistributed; the add-on only operates on
your local collection. Claude Opus 4.8-5.5 was used in the co-programming of this
application.

No features are 
intentionally taken from other add-ons. The intention is that this centralizes and 
streamlines use of a variety of tools in existance. If any other creators have any issue 
with features within this app, please email me at `creplogle20@gmail.com`. I am happy to 
accommodate any inquiries and/or get rid of things if you feel this infringes on something 
else you have made. *Janki will **never** have any mandatory paid features. If you paid for any 
part of this software, you have been scammed.*

Janki has functionalities that patch the original code of Anki to improve visuals 
and stamp cards with javascript code for mobile effects. Certain functionalities, such as
Lockdown Mode, may also ask for system level permissions to work properly. MacOS makes this
a requirement for programs which automatically closing apps / disabling Wi-Fi on the 
device. There may be bugs, issues, or inaccuracies I have not yet identified. In using this 
application therefore, I cannot be liable for any unintentional damages to user Anki data 
or glitches. Please only upload content to non-local LLMs with permission.

## License

Licensed under the **GNU Affero General Public License v3.0** (see [LICENSE](LICENSE)).
Janki extends [Anki](https://github.com/ankitects/anki), which is also AGPL-3.0; the
self-heal patches Anki's own files locally at runtime and does not redistribute
Anki's source.

[cjre.pl/ogle](https://cjre.pl/ogle/plain)
