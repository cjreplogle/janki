# Practice Questions

*Multiple-choice question banks, matched to the cards you're studying. 100% local.*

A **bank** is a `.qb` file (a renamed zip) of questions with choices, the answer
and an explanation. Once imported, you can:

- **Ask for a related question** while reviewing: press **`Tab + Q`**.
- **Study a Practice deck**: a synced deck with one subdeck per bank, in slide order.
- **Mix questions into reviews** automatically (see *Interspersing* below).

**Get a bank** from **Tools → Janki: Settings → Practice → Question Bank**: import
a shared `.qb`, generate one with AI, or build one from a Word doc or PowerPoint.

---

<details>
<summary><b>Importing a bank</b></summary>

- **Drag and drop**: drop a `.qb` onto the Anki window or its Dock icon (or
  double-click it in Finder). The bank list in Settings also takes `.zip`, `.docx`
  and `.pptx` files.
- **Import question bank (.qb)…**: pick a `.qb` or `.zip`; it's validated and added.
- **Load Question Banks to Anki** (bottom of the page): turns your banks into a
  **Practice** deck (a subdeck per bank, split by lecture) that syncs normally.

Each installed bank has a checkbox (use it for matching), **+** to preview, and
**Remove**.

</details>


<details>
<summary><b>Building a bank from a Word doc (.docx)</b></summary>

Write questions with these line prefixes (case-insensitive; lines may wrap):

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
valve opens and blood is ejected.
Professor's Quote: "Pressure beats volume."
```

- **`Lecture:`** sets the subdeck for the questions after it (recommended).
- **`Objective:`**, **`Rationale:`**, **`Professor's Quote:`** are optional.
- **`1.`** starts a question; **`A)`–`E)`** (or `A.`) are choices; **`Answer:`** is the letter.
- Images pasted under a question travel with it.

Then **Build .qb from .docx…** → **Create & import**. *"No questions found"* means
the prefixes above don't match.

</details>

<details>
<summary><b>Building a bank from a PowerPoint (.pptx) of screenshots</b></summary>

For decks where each question is a pasted screenshot. **Build .qb from .pptx
(OCR)…** reads the text out of the images with macOS's built-in text recognition,
fully offline. Slides should look like `3. Question… (A) … (B) …`, with the answer
on a later slide keyed by number (`3. The answer is A. …`).

- **macOS only**; the first run needs Xcode Command Line Tools
  (`xcode-select --install`).
- **OCR isn't perfect.** Janki never guesses: a question without a confident answer
  is skipped. Optionally import those as **⚠ incomplete** cards (showing the slide)
  to see what went wrong. Skim the **+** preview afterwards.
- **Handled:** figures and graphs, two questions per slide, shared figure panels,
  garbled question numbers, and section title slides (which become lecture subdecks).

</details>

<details>
<summary><b>Interspersing practice into review</b></summary>

**Settings → Practice → Intersperse** (off by default) mixes questions from your
enabled banks into normal reviews, matched to the concepts you just studied.

- **Every N cards**: a matched question appears inline as your next card; right
  retires it, wrong sets it aside for a later session.
- **Before each Pomodoro break**: a short practice set as a benchmark (needs
  **Focus → Pomodoro**).
- **If nothing matches**: skip the round (default) or fall back to text similarity.

Your real deck's scheduling is never touched.

</details>

<details>
<summary><b>How grading & Completion work</b></summary>

Practice cards are graded by your answer, not Again/Hard/Good/Easy:

- **Correct** → retired (suspended), with a green flare.
- **Incorrect** or **skipped** → set aside until your next session, so you see it
  another day rather than minutes later.

**Completion** is the share of a bank you've cleared (suspended ÷ all;
⚠ incomplete cards excluded).

On **AnkiMobile**, grade with the app's own buttons (card scripts can't grade
there), which can skew results; see **[Mobile cards](mobile-cards.md)**.

</details>

<details>
<summary><b>Making a bank with AI</b></summary>

Copy this prompt into any AI chat, set the number of questions, and send it with
your lecture notes, objectives or slides attached or pasted. Zip
the two files it returns (or use the `.qb` it builds) and import it.
*Only paste material you're allowed to share with an AI service.*

<details class="prompt">
<summary>Show prompt</summary>

```text
Create a question bank file for Janki (an Anki add-on). Turn the source material
I've attached or pasted into multiple-choice practice questions.

OUTPUT exactly two files.

1) manifest.json
{
  "qb_format": 1,
  "id": "<short-lowercase-id-with-dashes>",
  "name": "<Readable Bank Name>",
  "version": "1",
  "author": "internal",
  "family": "",
  "match": "text",
  "count": <number of questions>
}

2) questions.jsonl: ONE JSON object per line (not an array, no trailing commas):
{"id": "q1", "stem": "...", "choices": ["...", "...", "...", "...", "..."], "answer": 1, "explanation": "...", "lecture": "...", "tags": []}

Field rules:
- id: "q1", "q2", ... in order.
- stem: an NBME-style clinical vignette, plain text, ending in a single clear
  question (see Style below).
- choices: 4-5 plain-text options, without "A." / "B." letters.
- answer: 0-based index of the correct choice (0 = first choice).
- explanation: 2-4 sentences on why the answer is right and why the most
  tempting wrong choices are wrong.
- lecture: the lecture or topic the question belongs to; questions are grouped
  into subdecks by it. Use "Topic::Subtopic" to nest.
- tags: [] unless the source gives AnKing tags (e.g. "#AK_Step1_v12::Biochem::Amino_acids").

Style (NBME / USMLE, medium-hard difficulty):
- Open with age, sex and setting, then history, exam findings and labs/imaging as
  relevant; end with one lead-in (e.g. "Which of the following is the most likely
  diagnosis?" / "...mechanism of action?" / "...next best step?").
- Require 2-step reasoning: identify the condition from the findings, then answer
  about its mechanism, cause, complication or treatment. Avoid naming the
  diagnosis in the stem.
- Test understanding and application, not recall of a single phrase.
- One clearly best answer; every distractor plausible and from the same category
  (all diagnoses, all drugs, all enzymes...). No "all/none of the above".
- Use only facts supported by the source.

Answer-choice guards (no test-taking giveaways):
- Make all choices about the same length and grammatical form; the correct choice
  must NOT be the longest or the most specific. Before finishing, check every
  question and rewrite any where the answer stands out by length or detail.
- Don't repeat stem wording only in the correct choice, and avoid absolute words
  ("always", "never") in distractors only.
- Spread the correct answer evenly across positions (0-4) over the whole bank.

If you can run code, also zip both files (at the zip's root) into <id>.qb and give
me the file. Otherwise, print each file in its own code block.

NUMBER OF QUESTIONS: <e.g. 20, or "as many as the material supports">
```

</details>

</details>
