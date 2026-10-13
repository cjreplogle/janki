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

## About Janki

Janki is an Anki Add-on/Client obsessively built around streamlining **your** experience as a medical student.

When I first started medical school, I immediately felt inundated with resources. We get **tens of thousands** of cards thrown at us, and are told to do our best over the next two years. AJ, Anking, hUtCH, UWorld, AMBOSS, FirstAid... This app is not a replacement for these wonderful tools. They all have their own things that make them effective. Instead, Janki is something that integrates these distinct systems medical students use into a cohesive centralized platform. Why would you need this? So YOU can spend your time actually studying in a self-structured manner, rather than needing to sift through the other tedious bloat to get there.

The fundamental problem Janki attempts to resolve is simple. Anki is an incredible tool for memorizing a lot of content. **Memorizing is not understanding.** Understanding comes from building complex associations of what concepts mean, and then generalizing said knowledge to new situations. It is through this repeated process in engagement with concepts, review, examination, and clinic, that you refine the skills necessary to make good clinical judgements when your decisions eventually carry real consequence. (Disclaimer: This is the opinion of a clueless M1, you may safely disregard.)

**So how do we make our systems better?** 

To start, Janki throws in modified sentence structure for your cards in what I have labeled as the **"Rephrase"** system. This allows you to study isolated concepts by throwing them at you in multiple ways. Janki also fundamentally changes how content is presented, going down to even its visual design (serif font family, scroll-reveal card animations). This is all intentional and more than just fluff to look nice. The goal is to force you to reason and understand what the cloze you are recalling means beyond simply "an association" or "an appearance". I integrate AI to produce these structural card variations, while making sure the essential core concepts to be learned are still decided by people. I have scaffolded this to avoid potential mis-skilling. However, I want to try and take more protective measures here, so I will consult other experts regarding how this should be implemented best. 

**Question banks** force the user to reason and apply the concepts they are actively training within new settings. By mapping questions to cards algorithmically, Janki can intersperse practice problems for you to test yourself as you review. This higher-order problem solving is what forces you to internalize concepts and solidify your understanding. I am a very short attention-span person. Beyond these core features, I have made every effort to make Anki engaging to use and thrown in different tricks like Pomodoro/Lockdown mode to keep you reviewing. I've even revamped some of Anki's core libraries for managing and loading cards. Despite the visual upgrades, Anki should actually load considerably faster than without the patch (especially on MacOS). Anki should look, feel, and run like it was made in 2026, not 2008. 

In the process, I've come to realize there's an incredible amount of room for providing some quality-of-life changes to Janki. Anki has always been a degree separated from whatever content you are actually covering in lecture. Until now the user has largely been responsible for filling that gap themselves. The **Calendar** feature directly interfaces your class schedule with whatever Anki decks and workflows you use. A handler imports spreadsheets connecting lecture titles to tags. Janki then applies a search algorithm to these match calendar titles to the spreadsheet titles. This is all tied up in a calendar-based UI so you can instantly identify, review and unsuspend your cards as you cover them in lecture. There is also a study progress tool which reads your review history and identifies areas you may need more work. It even can process your end-of-block calendar and view your individual biweekly exam progression. This should all come together to help you more effectively understand **what** you need to study, and give **you** the tools needed to be successful.

Janki is not some learning panacea, but, I have already seen it help myself and peers tremendously. Even if you are not a big Anki person, I honestly recommend you try it! I believe it solidly addresses core design limitations of Anki in its current state. I've also had a lot of fun building it. I grew up hacking every video game I played (Mario Kart Wii, CS:GO, Minecraft). I'd take apart electronics for fun and ramshackle them back together. These experiences taught me how to code and understand how computers work. While I've had less time for a lot of the pains that come with managing a large codebase as a medical student, Claude Code has made much of these problems effectively trivial. It's honestly an incredible piece of technology. In total, the project is now over **42,000 lines of code** somehow... As someone with involvement in other large codebase projects across multiple domains, it's let me spearhead things independently I otherwise would never have been able to at this point in my career.

I will **never** charge for something like this. The potential benefit for us students far outweighs my desire to make a quick buck. All I ask is that you share it with a friend if it helps you. Thank you for trying out Janki!

*"I sincerely hope this tool helps you find success."*

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
