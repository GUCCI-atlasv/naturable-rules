// Validate rule packs: schema, regex compile, and each rule's own before/after examples.
// Usage: node scripts/validate.mjs      (exit code 1 on any error)

import { packs, createEngine, LAYER_ORDER, PURPOSES } from "../src/index.js";
import { HEURISTIC_NAMES } from "../src/heuristics.js";

const SEVERITIES = ["strong", "suggestion"];
const CONFIDENCE = ["high", "medium", "low"];
const CATEGORIES = ["evidence", "sentence", "structure", "rhythm", "artifact", "vocabulary"];
const FIX_TYPES = ["delete", "map", "replace_match", "replace"];
const POLICIES = ["never_invent", "keep_numbers"];
const REQUIRED = ["id", "name_en", "name_zh", "layer", "category", "severity", "confidence", "detect", "rewrite", "reason", "before", "after", "evidence_policy"];

const errors = [];
const warnings = [];
const err = (id, msg) => errors.push(`${id}: ${msg}`);
const warn = (id, msg) => warnings.push(`${id}: ${msg}`);
const engine = createEngine({ packs });
const ids = new Set();

for (const [lang, pack] of Object.entries(packs)) {
  if (!pack.version || !pack.language) err(lang, "pack missing version/language");
  for (const r of pack.rules) {
    const id = r.id || "(no id)";
    if (ids.has(id)) err(id, "duplicate id");
    ids.add(id);
    if (!id.startsWith(`${lang}.`)) err(id, `id must start with "${lang}."`);
    for (const k of REQUIRED) if (r[k] === undefined || r[k] === "") err(id, `missing ${k}`);
    if (!LAYER_ORDER.includes(r.layer)) err(id, `bad layer ${r.layer}`);
    if (!CATEGORIES.includes(r.category)) err(id, `bad category ${r.category}`);
    if (!SEVERITIES.includes(r.severity)) err(id, `bad severity ${r.severity}`);
    if (!CONFIDENCE.includes(r.confidence)) err(id, `bad confidence ${r.confidence}`);
    if (!POLICIES.includes(r.evidence_policy)) err(id, `bad evidence_policy ${r.evidence_policy}`);
    for (const p of Object.keys(r.purpose_weights || {})) if (!PURPOSES.includes(p)) err(id, `unknown purpose ${p}`);
    if (r.detect?.type === "regex") {
      try { new RegExp(r.detect.pattern, r.detect.flags || "g"); } catch (e) { err(id, `regex: ${e.message}`); }
    } else if (r.detect?.type === "heuristic") {
      if (!HEURISTIC_NAMES.includes(r.detect.name)) err(id, `unknown heuristic ${r.detect.name}`);
    } else err(id, "detect.type must be regex|heuristic");
    if (!/^https:\/\/naturable\.app\/[^\s]*$/.test(r.docs || "")) err(id, "docs must be a https://naturable.app/ URL");
    if (r.auto && !r.fix) err(id, "auto=true needs fix");
    if (r.fix && !FIX_TYPES.includes(r.fix.type)) err(id, `bad fix.type ${r.fix.type}`);

    // Self-test with the rule's own examples (this rule only, language forced).
    const only = new Set([id]);
    const hitBefore = engine.scan(r.before, { language: lang, only });
    if (!hitBefore.length) err(id, `before example does not trigger: "${r.before}"`);
    const hitAfter = engine.scan(r.after, { language: lang, only });
    if (hitAfter.length) err(id, `after example still triggers: "${r.after}"`);
    if (r.auto && hitBefore.length) {
      const res = engine.applyIssue(r.before, hitBefore[0]);
      if (!res.ok) err(id, `auto fix refused on own example (${res.reason})`);
      else if (res.text === r.before) err(id, "auto fix made no change");
      else if (res.text !== r.after && !r.after.startsWith("(")) warn(id, `auto fix gives "${res.text}", example after is "${r.after}"`);
    }
  }
}

for (const w of warnings) console.log("warn ", w);
for (const e of errors) console.log("ERROR", e);
const total = Object.values(packs).reduce((n, p) => n + p.rules.length, 0);
console.log(`\n${total} rules · ${errors.length} errors · ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
