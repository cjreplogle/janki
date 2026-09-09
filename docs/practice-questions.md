# Practice questions — question banks & building one from a Word doc

*Janki can pull multiple-choice practice questions that relate to the card
you're reviewing, and can also load whole question banks into Anki as a real,
syncable "Practice" deck. Everything at runtime is **100% local** — no network,
no AI (although we can use it to help match questions to cards, more on that later).
Banks are plain files (`.qb`) which can consist of up to hundreds of practice
questions for your usage.

---

## What a "bank" is

A question bank is a `.qb` file — just a renamed zip containing the questions
(and any images). Once imported it's extracted into
`user_files/qbanks/<id>/` (which survives add-on updates) and tracked in a
registry. Each question has a stem, choices, the correct answer, and an optional
explanation/rationale.

You use a bank in two ways:

1. **Related questions during review** — press **`Tab + Q`** on a card to be
   asked the next practice question related to it. Janki matches questions to the
   card using the same concept tags your cards already carry (`#AK` / AnKing,
   AJ, Hutch, …); an untagged bank falls back to plain text-overlap with the
   card's content.
2. **A Practice deck** — load banks into Anki as a normal deck (one subdeck per
   bank, further split by lecture). Click **Practice** in the top toolbar to see
   your banks where the deck list normally is. New cards appear in **exact
   slide/source order** — even across the per-lecture subdecks — because Janki
   pins each card's position to its order in the document and sets the bank's deck
   options to gather new cards by ascending position (options group *"Janki
   Practice (slide order)"*). (This governs the first pass through new cards;
   after that, normal spaced-repetition scheduling takes over.)
3. **Automatically interspersed into your review sessions** — Janki can drop
   relevant practice questions into your *normal* review (not just the Practice
   deck), matched to the concepts of the cards you've just been studying. See
   **[Interspersing practice into review](#interspersing-practice-into-review)**
   below.

---

## Importing a bank

Open **Tools → Janki: Settings → Practice → Question Bank**. From there:

- **Import question bank (.qb)…** — pick a `.qb` (or `.zip`) someone shared with
  you. It's validated, extracted, and registered.
- **Load Question Banks to Anki** (bottom of the page) — turns your imported
  banks into a real **Practice** deck (a subdeck per bank, split by lecture) so
  they sync like any other deck and can be reviewed normally.

Installed banks are listed at the bottom with a checkbox (enable/disable for
matching), a **+** button to preview the questions, and **Remove**.

---

## Building a bank from a Word document (`.docx`)

This is the easiest way to author your own bank: write the questions in a plain
Word doc in the format below, and Janki parses it into a `.qb` and imports it in
one step.

### 1. Format the `.docx`

Use these line prefixes (case-insensitive). Blank lines are ignored, and long
stems / choices / rationales may wrap across several lines.

```
Lecture: Cardiac Physiology
Objective: Describe the phases of the cardiac cycle

1. Which phase immediately follows isovolumetric contraction?
A) Rapid ejection
B) Isovolumetric relaxation
C) Rapid filling
D) Atrial systole
Answer: A
Rationale: Once ventricular pressure exceeds aortic pressure, the aortic
valve opens and blood is ejected — the rapid ejection phase.
Professor's Quote: "Pressure beats volume — the valve only cares about pressure."

2. The first heart sound (S1) corresponds to closure of which valves?
A) Aortic and pulmonic
B) Mitral and tricuspid
C) Mitral and aortic
D) Tricuspid and pulmonic
Answer: B
Rationale: S1 is the AV valves (mitral + tricuspid) closing at the start of
systole.
```

Rules:

- **`Lecture:`** starts a section. It becomes the question's lecture (used as the
  subdeck when you convert to a Practice deck, and as a matching hint). Repeat it
  whenever the topic changes. Optional but recommended.
- **`Objective:`** — optional learning objective for the questions that follow.
- **`1.`, `2.`, …** — a number followed by a period and a space starts a new
  question; the rest of the line is the stem.
- **`A)` … `E)`** — the answer choices (`A)`/`A.` both work, up to five).
- **`Answer:`** — the letter of the correct choice (`A`–`E`).
- **`Rationale:`** — optional explanation shown on the answer side.
- **`Professor's Quote:`** — optional; appended to the explanation.
- **Images** pasted into the doc are attached to the question they sit under and
  travel with the bank.

### 2. Import it

**Settings → Practice → Question Bank → Build .qb from .docx…**, pick the
file. Janki reports how many questions and lectures it found (and how many have
images), then **Create & import** builds the `.qb` next to your `.docx` and
imports it. Lecture headers are also used to auto-assign school-deck tags where
they match.

If it reports *"No questions found"*, the doc isn't in the expected format —
check the `1.` / `A)` / `Answer:` prefixes above.

---

## Building a bank from a PowerPoint (`.pptx`) of question screenshots

Some question banks live as **slide decks where each question (and its answer)
is a pasted screenshot**, not selectable text. Janki can still turn these into a
real MCQ bank: it reads the text *out of the slide images* using macOS's
built-in text recognition (the Vision framework) — **fully offline, no download,
no account, nothing uploaded.**

**Settings → Practice → Question Bank → Build .qb from .pptx (OCR)…**, pick the
file. Janki extracts each slide image, recognizes the text, assembles the
multiple-choice questions, and reports how many it read cleanly before building
and importing the `.qb`. From there it behaves like any other bank (same binary
grading, Score, Practice deck).

For this to work the slides should read roughly like:

```
3. Which phase immediately follows isovolumetric contraction?
(A) Rapid ejection
(B) Isovolumetric relaxation
(C) Rapid filling
(D) Atrial systole
```

…with the answer on a **later** slide, keyed by the same question number:

```
3. The answer is A. Once ventricular pressure exceeds aortic pressure…
```

Questions are matched to their answers **by number** (numbers may restart per
section — that's fine), so it doesn't matter whether answers are interleaved
after each question or batched at the end.

Good to know:

- **First run needs Xcode Command Line Tools** (for the ~30-line recognition
  helper Janki compiles once and caches). If they're missing, Janki tells you to
  run `xcode-select --install` and try again. macOS only.
- **OCR is not perfect.** A clean deck yields most of its questions; some may be
  skipped if the recognizer garbles the choices or can't find the answer letter.
  Janki **never guesses an answer** — a question with no confidently-matched
  answer is dropped rather than imported wrong. Skim the bank's **+** preview
  afterwards and fix any stragglers.
- **Import incomplete questions for diagnosis (optional).** If some questions were
  *detected* but couldn't be fully parsed (no answer matched, choices/stem
  missing), the build dialog offers an extra **"Import … + N incomplete"** button.
  Those come in as flagged **⚠ incomplete** cards that show their original slide
  image plus whatever text was read, so you can see exactly what tripped up the
  parse. They're marked in the **+** preview, are never surfaced as related
  questions during review, and can be fixed or removed. (Because they have no
  confirmed answer, they won't grade as "correct" — they're a diagnostic aid.)
- **Figures are carried over.** If a question has a graph/table/photo — either as
  a separate image on the slide, or baked into the question screenshot (detected
  when the stem mentions a "graph"/"table"/"curve"/"figure") — that image travels
  with the bank and shows on the card beneath the recognized text.
- **Two-question and shared-figure slides are handled.** Side-by-side questions
  (two columns on one slide) are read a column at a time, and a shared figure
  panel ("Questions 13-15") is attached to each question in that range even
  though they live on later slides. If a question's number is garbled/dropped by
  OCR (e.g. a coloured number label), it's filled in sequence within the section
  so its answer still binds.
- **Section titles become lecture tags.** Banks organised under native-text title
  slides (e.g. "Cell Death and Injury") tag each question with that topic, so the
  Practice deck splits into per-topic subdecks. Question numbers may restart per
  section — that's handled.

---

## Interspersing practice into review

Instead of setting practice questions aside in their own deck, Janki can weave
them into your ordinary review sessions — so you practice higher-level questions
on the concepts you're *currently* studying, and can benchmark yourself right
before a break.

Turn it on in **Settings → Practice → Intersperse**. Everything is off until you
enable it, and it only ever surfaces questions from your **enabled** banks.

**How relevance works.** As you review, Janki tracks the concept tags (`#AK` /
AnKing, AJ, Hutch, …) of the cards you've recently answered. When it's time to
intersperse, it pulls the questions that best match those concepts — the same tag
matcher used by `Tab + Q`.

**Two triggers, two modes:**

- **After every N cards → seamless inline.** A matched question simply appears as
  your next "card" in the same deck flow, then your real cards resume — no leaving
  the deck. It's a real Practice card, so it looks and grades exactly like the
  Practice deck: pick an answer, see it tint green/red with the explanation, and
  **Continue**. Get it right and it retires (and counts toward the bank's Score);
  get it wrong or skip and it comes back later in the session.
- **Before each pomodoro break → mini practice set.** Right before the break
  screen, Janki gathers a short set of matched questions and lets you run through
  them as a quick benchmark, then the break begins. (Requires Pomodoro enabled
  under **Focus → Pomodoro**.)

**Settings:**

- **Every N cards** — how often the inline trigger fires.
- **Questions per round** — the target range (min–max) to pull each time.
- **If nothing matches** — either **Skip this round** (default; stay uninterrupted
  when there's nothing relevant) or **Text-similarity fallback** (surface loosely
  related questions using text overlap, the same fallback `Tab + Q` uses).

Interspersing never touches your real deck's scheduling: inline questions are
graded by Janki directly (right → retire, wrong → resurface), and the pre-break
set runs in a temporary filtered deck that's torn down afterward.

---

## Optional: AI-assisted tagging (offline round-trip)

A freshly-parsed bank matches by text similarity. To make matching sharper, you
can tag questions with your concept tags — done as a manual copy-paste, so no
data ever leaves your machine automatically:

1. **Copy AI tag-matching prompt…** — copies a prompt (with your questions +
   tag vocabulary) to the clipboard.
2. Paste it into your own Claude/ChatGPT, and save its JSON reply to a file.
3. **Apply AI tag results (.json)…** — applies those tags back onto the banks.

This is entirely optional. Banks work without it, but it can be really helpful
for integrating these questions seamlessly with your cards.

---

## How grading & Score work

Practice cards are graded **only by your answer choice**, not by the usual
Again/Hard/Good/Easy:

- **Correct** → graded Easy and **suspended** (retired from the queue), with a
  soft green flare.
- **Incorrect** → graded Hard (comes back for another try).
- **Skip** (advance without picking) → **buried** for the session, no judgement.

Practice questions work fundamentally different from traditional card reviews
because we are not trying to just associate definitions. It is testing your
understanding. You either make the connection or you don't. When you get a card
right, we get it out of your way, since the exercise is complete. If it's wrong,
it acts equivalent in spacing to a 'Hard' card review. You will see it again
another time, but not as quickly as simply not knowing a card to avoid just
remembering the answer.

The **Score** shown for each bank is the share of the cards you've *attempted*
that you've *cleared*: **suspended ÷ attempted**, from each card's current state.
Resetting a card returns it to "new" and drops it back out — and skipped/buried
cards don't count either way.

> On **AnkiMobile**, practice cards still show the right/wrong color and the
> explanation, but the app doesn't allow grading from card JavaScript — so grade
> with AnkiMobile's own buttons. See **[Mobile cards](mobile-cards.md)**.
> This unfortunately does screw with grading. Please keep this in mind if you are
> doing lots of these practice bank problems on mobile.
