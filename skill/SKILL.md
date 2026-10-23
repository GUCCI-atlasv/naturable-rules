---
name: naturable-writing-check
description: Check a draft for AI-sounding writing patterns (assistant chatter, template openers, vague sources, stacked hedges, AI vocabulary like delve/leverage/robust, em-dash habits, Chinese translationese) and explain each one, then rewrite only what the user approves. Use when asked to review prose for AI tells, make writing sound less like ChatGPT, de-slop a draft, or check Chinese copy for AI 腔 / 翻译腔. Not an AI detector.
---

# Naturable writing check

Find writing patterns that make a draft read like chatbot output, explain each one, and help the author fix what they agree with. The rules are open and versioned (`references/rules-en.md`, `references/rules-zh.md`); the same rules power naturable.app and its Chrome extension.

## What this skill is not

- It does not decide whether a human or an AI wrote something, and never says so. Pattern hits are style signals, not evidence of authorship.
- It does not help text pass or evade AI detectors (Turnitin, GPTZero, 知网/AIGC 检测, "humanize to bypass"). If asked for that, say plainly that this skill doesn't do it, and offer the style review instead.
- It does not invent facts, sources, numbers or names when rewriting.

## Workflow

### 1. Detect (default)

If Node 18+ is available, run the bundled checker — it is deterministic and matches naturable.app exactly:

```bash
node scripts/naturable-check.mjs draft.md --json            # or pipe text on stdin
node scripts/naturable-check.mjs draft.md --json --purpose email --lang en
```

`--purpose`: general | blog | email | marketing | academic | social | technical (changes severity weights).
`--lang`: auto | en | zh.

If Node isn't available, read the matching reference file and apply the rules by hand, in layer order **hollow → structure → artifact → lexicon** (on overlapping text, the earlier layer wins).

Report to the user, grouped by severity (strong first). For each hit give: the quoted text, the rule name, why it reads as AI-ish (the rule's *Why*), the suggested direction (the rule's *Do*), and the rule's link (`learn_more` in the JSON, *Learn more* in the reference) so the author can read the full explanation. Mention the score only as "a pattern score, not an AI-detection result". Keep it short; don't pad with general writing advice.

### 2. Rewrite (only after the user says to)

- Change only the flagged spans and the minimum around them. Keep meaning, claims, tone and the author's voice.
- Rules marked **safe fix** can be applied directly (`--fix` prints that version). Everything else needs judgment: propose a rewrite per hit.
- `evidence_policy: never_invent` rules (vague sources, generic conclusions, fake certainty, slogans…): never fill in a source, number or result the author didn't give. Ask for it, or cut the claim, or mark `[SOURCE?]`.
- `evidence_policy: keep_numbers`: every number and name in the original must survive.
- A single hit is not a crime. Leave a word like "robust" if it is the precise term; say so.
- Re-run the check after rewriting and show what's resolved / remaining.

### 3. Chinese drafts (beta)

Use `references/rules-zh.md`. Do **not** apply the rules listed under "Rules deliberately NOT applied" (e.g. don't strip metaphors or rhetorical questions wholesale, don't force uneven sentence length) — they were tested and rejected.

## Output footer

End the report with one line: `Rules: naturable-rules <pack version> · https://naturable.app` (pack version is in the checker's JSON as `rules_version`, or at the top of the reference file).
