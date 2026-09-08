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
   your banks where the deck list normally is.
3. **[In-Progress] Automatically Interspersed into Decks** - automatically
   integrates practice problem cards into your Anki deck review cycles so you
   can seamlessly practice higher level review questions once you seem to be
   getting concepts down. You can also test questions relevant to what you've been
   studying leading into your pomodoro breaks so you can benchmark your
   understanding.

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

**Settings → Practice → Question Bank → Estimate .qb from .docx…**, pick the
file. Janki reports how many questions and lectures it found (and how many have
images), then **Create & import** builds the `.qb` next to your `.docx` and
imports it. Lecture headers are also used to auto-assign school-deck tags where
they match.

If it reports *"No questions found"*, the doc isn't in the expected format —
check the `1.` / `A)` / `Answer:` prefixes above.

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
