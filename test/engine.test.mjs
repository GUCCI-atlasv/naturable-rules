import { test } from "node:test";
import assert from "node:assert/strict";
import { engine, diff, burstiness, conservesInformation } from "../src/index.js";

const ids = (issues) => issues.map((i) => i.rule.id);

test("parity with live naturable.app sample (engine 2.2.0): 64 / 8 strong / 3 suggestions / rhythm 97", () => {
  const t = "Great question! In today's digital landscape, experts believe this robust technology is not just a tool, it's a pivotal shift. In order to leverage it, teams could potentially rethink their work. The future looks bright. I hope this helps!";
  const r = engine.analyze(t, { purpose: "blog" });
  assert.equal(r.language, "en");
  assert.equal(r.score.total, 64);
  assert.equal(r.score.strong, 8);
  assert.equal(r.score.suggestions, 3);
  assert.equal(r.score.dimensions.rhythm, 97);
});

test("chinese sample flags the expected classes", () => {
  const t = "说白了，人工智能像一位智慧的导师。具体来说：首先，它提升效率；其次，它降低成本。核心是：不是工具问题，而是流程问题。这是最重要的挑战之一。希望这对你有所帮助！";
  const got = new Set(ids(engine.analyze(t).issues));
  for (const id of ["zh.opener.filler", "zh.metaphor.ideal_persona", "zh.colon.list_intro", "zh.colon.prompt", "zh.flip.not_but", "zh.translationese.one_of", "zh.artifact.chat"]) {
    assert.ok(got.has(id), `missing ${id}`);
  }
});

test("overlap: earlier layer wins (hollow beats structure on the same span)", () => {
  const r = engine.scan("In today's fast-paced world, teams ship faster.", { language: "en" });
  assert.deepEqual(ids(r), ["en.hollow.unsourced_everyone"]);
});

test("purpose weights demote strong lexicon rules for academic writing", () => {
  const blog = engine.scan("We leverage this method.", { purpose: "blog" })[0];
  const acad = engine.scan("We leverage this method.", { purpose: "academic" })[0];
  assert.equal(blog.rule.severity, "strong");
  assert.equal(acad.rule.severity, "suggestion");
});

test("ignored rules and ignored keys are respected", () => {
  const t = "Great question! We leverage it.";
  assert.ok(!ids(engine.scan(t, { ignoredRules: new Set(["en.artifact.chat"]) })).includes("en.artifact.chat"));
  assert.ok(!ids(engine.scan(t, { ignoredKeys: new Set(["en.lexicon.cliche:leverage"]) })).includes("en.lexicon.cliche"));
});

test("autofix only touches auto rules and tidies punctuation", () => {
  const t = "Great question! In conclusion, ship weekly. Furthermore, costs fell.";
  const r = engine.analyze(t);
  const f = engine.autofix(t, r.issues);
  assert.equal(f.text, "Ship weekly. Costs fell.");
});

test("conservation gate blocks fixes that drop numbers", () => {
  assert.equal(conservesInformation("Revenue hit $4.2M in 2026.", "Revenue hit big."), false);
  assert.equal(conservesInformation("In order to ship 3 builds.", "To ship 3 builds."), true);
});

test("en dash density: below threshold silent, above threshold per-dash hits", () => {
  const few = "One dash — is fine in a long enough paragraph of normal writing that goes on for a while.";
  assert.equal(engine.scan(few, { only: new Set(["en.structure.dash_dense"]) }).length, 0);
  const many = "The plan — with dates — is ready — and signed.";
  const hits = engine.scan(many, { only: new Set(["en.structure.dash_dense"]) });
  assert.equal(hits.length, 3);
  assert.ok(hits.every((h) => many.slice(h.start, h.end).includes("—")));
});

test("zh zero-anaphora offsets point at the paragraph start (single-newline paragraphs)", () => {
  const t = "第一段内容。\n值得肯定的是团队效率。";
  const hit = engine.scan(t, { language: "zh", only: new Set(["zh.para.zero_anaphora"]) })[0];
  assert.ok(hit);
  assert.equal(t.slice(hit.start, hit.end), hit.text);
  assert.ok(hit.text.startsWith("值得肯定"));
});

test("adjacent_parallel locates the right sentence when it repeats", () => {
  const t = "It works. It works. It ships. Done here.";
  const hits = engine.scan(t, { only: new Set(["en.structure.adjacent_parallel"]) });
  assert.deepEqual(hits.map((h) => h.start), [0, 10]);
});

test("burstiness and diff utilities", () => {
  const b = burstiness("Short one. This sentence is quite a lot longer than the first. Tiny.", "en");
  assert.equal(b.n, 3);
  assert.ok(b.cv > 0.5);
  const d = diff("teams could potentially ship", "teams could ship");
  assert.equal(d.changes, 1);
  assert.ok(d.ops.some((o) => o.type === "del" && o.text.includes("potentially")));
});
