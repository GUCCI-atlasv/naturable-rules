# Naturable rules — English · en-v1.1

Generated from `packs/en.json`. Do not edit by hand.

Layers run in this order and win overlaps in this order: **hollow → structure → artifact → lexicon**.
`strong` = clear pattern; `suggestion` = worth a look. `safe fix` = can be applied automatically without changing meaning, numbers or names.

## hollow

### Vague source — `en.hollow.vague_source`

- **Severity:** strong · **category:** evidence · **confidence:** high
- **Why:** The attribution cannot be checked as written.
- **Do:** Name the source, date, or remove the attribution.
- **Before:** Experts believe this approach works.
- **After:** A 2024 NIST brief found this approach works.
- **Detects:** `\b(experts (?:believe\|say\|agree)\|studies (?:show\|suggest\|indicate)\|research (?:shows\|suggests)\|it is widely (?:believed\|known\|accepted)\|many people believe)\b`
- **Learn more:** https://naturable.app/en/signs-of-ai-writing/#vague-sources

### Generic conclusion — `en.hollow.generic_conclusion`

- **Severity:** strong · **category:** evidence · **confidence:** medium
- **Why:** The ending makes a broad claim without evidence or action.
- **Do:** End with a specific result, limit, or next step.
- **Before:** The future looks bright.
- **After:** Ship the pilot to three teams next quarter.
- **Detects:** `\b(the future looks bright\|the possibilities are endless\|only time will tell\|the sky['’]s the limit\|a brighter tomorrow\|transform(?:ing\|s)? the way we (?:live\|work\|think))\b`
- **Learn more:** https://naturable.app/en/signs-of-ai-writing/#generic-conclusions

### Fake certainty — `en.hollow.fake_certainty`

- **Severity:** strong · **category:** evidence · **confidence:** medium
- **Why:** Certainty language stands in for missing proof.
- **Do:** State the claim and the evidence; drop the certainty filler.
- **Before:** It is clear that adoption will rise.
- **After:** Adoption rose 12% after the pilot.
- **Detects:** `\b(it is (?:clear\|obvious\|evident) that\|needless to say\|without a doubt\|there is no doubt that)\b`
- **Learn more:** https://naturable.app/en/signs-of-ai-writing/#fake-certainty

### Unsourced everyone-claim — `en.hollow.unsourced_everyone`

- **Severity:** suggestion · **category:** evidence · **confidence:** medium
- **Why:** Appeals to an unnamed consensus instead of a fact.
- **Do:** Drop the chorus claim; open with the concrete point.
- **Before:** As we all know, speed matters.
- **After:** Speed matters when checkout takes over three seconds.
- **Detects:** `\b(everyone knows that\|as we all know\|in today['’]s (?:fast-paced\|ever-changing) world)\b`
- **Learn more:** https://naturable.app/en/signs-of-ai-writing/#template-openers

### Specificity cover-up risk — `en.hollow.specificity_cover`

- **Severity:** strong · **category:** evidence · **confidence:** high
- **Why:** A hollow summary sits next to concrete figures that should stay visible.
- **Do:** Keep the numbers and names already in the draft; do not replace them with empty summary.
- **Before:** Revenue hit $4.2M. Experts believe growth is strong.
- **After:** Revenue hit $4.2M, up 18% year over year.
- **Detects:** heuristic `specificity_cover`
- **Learn more:** https://naturable.app/en/how-it-works/#rule-en-hollow-specificity_cover

## structure

### Not-just / but frame — `en.structure.not_just_but`

- **Severity:** strong · **category:** sentence · **confidence:** high
- **Why:** The 'not just X, it is Y' frame often sounds rehearsed.
- **Do:** State the main claim directly without the fake contrast.
- **Before:** This technology is not just a tool, it's a pivotal shift.
- **After:** The change cuts review time in half.
- **Detects:** `\b(?:it['’]s\|it is\|this is\|that is\|is) not (?:just\|only\|about)\b[^.!?]{0,120}?\b(?:it['’]s\|it is)\b`
- **Learn more:** https://naturable.app/en/signs-of-ai-writing/#not-just-frame

### Colon throat-clearing — `en.structure.colon_throat`

- **Severity:** suggestion · **category:** structure · **confidence:** high · **safe fix**
- **Why:** The phrase announces content instead of delivering it.
- **Do:** Delete the empty lead-in; keep the content after the colon.
- **Before:** Here's what you need to know: ship weekly.
- **After:** Ship weekly.
- **Detects:** `\b((?:here['’]s\|here is) what you need to know\|the (?:key\|bottom line\|truth) is this\|consider the following)\s*:`
- **Learn more:** https://naturable.app/en/signs-of-ai-writing/#throat-clearing

### Empty list intro — `en.structure.list_intro_empty`

- **Severity:** suggestion · **category:** structure · **confidence:** medium · **safe fix**
- **Why:** A throat-clearing sentence adds no information before a list.
- **Do:** Remove the empty intro; keep the list items intact.
- **Before:** There are several benefits:
- **After:** (keep the list; drop the intro)
- **Detects:** `\b(there are (?:several\|many\|numerous) (?:benefits\|reasons\|ways\|factors\|things)\|the (?:benefits\|advantages) (?:are\|include) (?:numerous\|many))\b[^.!?]{0,40}:`
- **Learn more:** https://naturable.app/en/signs-of-ai-writing/#throat-clearing

### Formulaic signpost — `en.structure.signpost`

- **Severity:** suggestion · **category:** structure · **confidence:** medium · **safe fix**
- **Why:** The opening announces content instead of delivering it.
- **Do:** Begin with the concrete point.
- **Before:** In today's digital landscape, teams ship faster.
- **After:** Teams ship faster when reviews finish same-day.
- **Detects:** `\b(let['’]s dive in\|without further ado\|in today['’]s (?:world\|landscape\|digital (?:age\|landscape\|world))\|at the end of the day)\b`
- **Learn more:** https://naturable.app/en/signs-of-ai-writing/#template-openers

### Adjacent parallel sentences — `en.structure.adjacent_parallel`

- **Severity:** suggestion · **category:** rhythm · **confidence:** medium
- **Why:** Neighboring sentences share the same template.
- **Do:** Vary openings and sentence shape; keep the facts.
- **Before:** It improves speed. It improves quality. It improves trust.
- **After:** It improves speed. Quality follows when reviews shrink. Trust rises when numbers stay visible.
- **Detects:** heuristic `adjacent_parallel`
- **Learn more:** https://naturable.app/en/signs-of-ai-writing/#same-shape-sentences

### Empty rule-of-three slogan — `en.structure.rule_of_three_slogans`

- **Severity:** suggestion · **category:** sentence · **confidence:** medium
- **Why:** Three vague adjectives read like marketing filler.
- **Do:** Replace the slogan triad with one measurable claim.
- **Before:** Better, faster, and stronger results await.
- **After:** Median review time dropped from 4 days to 1.
- **Detects:** `\b(better\|faster\|stronger\|smarter\|simpler),\s+(better\|faster\|stronger\|smarter\|simpler),\s+and\s+(better\|faster\|stronger\|smarter\|simpler)\b`
- **Learn more:** https://naturable.app/en/how-it-works/#rule-en-structure-rule_of_three_slogans

### Stock conclusion opener — `en.structure.in_conclusion`

- **Severity:** suggestion · **category:** structure · **confidence:** high · **safe fix**
- **Why:** The phrase signals a template ending.
- **Do:** Delete the stock opener; keep the closing point.
- **Before:** In conclusion, ship the smaller release first.
- **After:** Ship the smaller release first.
- **Detects:** `\b(in conclusion\|to (?:summarize\|sum up\|conclude)\|all in all\|in summary)\b[,:]?`
- **Learn more:** https://naturable.app/en/signs-of-ai-writing/#generic-conclusions

### Dense em dashes — `en.structure.dash_dense`

- **Severity:** suggestion · **category:** rhythm · **confidence:** medium
- **Why:** Frequent em dashes are a common chatbot habit. A few are fine; a steady stream reads as a template.
- **Do:** Swap some dashes for a comma, period, colon or parentheses. Keep the ones doing real work.
- **Before:** The plan — including the dates — is ready — and approved.
- **After:** The plan, including the dates, is ready and approved.
- **Detects:** heuristic `en_dash_dense` {"min_count":3,"per_1000_words":8}
- **Learn more:** https://naturable.app/en/signs-of-ai-writing/#em-dashes

### Whether-or parallelism — `en.structure.positive_negative_parallel`

- **Severity:** suggestion · **category:** sentence · **confidence:** medium
- **Why:** Mirrored whether/or frames often pad a thin claim.
- **Do:** Pick the relevant case; drop the mirrored fork.
- **Before:** Whether you're a beginner or an expert, this is essential.
- **After:** New editors should learn the shortcut first.
- **Detects:** `\bwhether (?:you['’]re\|it['’]s\|you are\|it is) [^.!?]{3,60}?,? or [^.!?]{3,60}?,\s*(?:this\|it\|that) (?:is\|can be\|remains\|will be)`
- **Learn more:** https://naturable.app/en/how-it-works/#rule-en-structure-positive_negative_parallel

## artifact

### Assistant chatter — `en.artifact.chat`

- **Severity:** strong · **category:** artifact · **confidence:** high · **safe fix**
- **Why:** Leftover assistant phrasing distracts from the document.
- **Do:** Delete the aside and address the reader directly.
- **Before:** Great question! Ship weekly.
- **After:** Ship weekly.
- **Detects:** `\b(Great question[!.]?\|I hope this helps[!.]?\|let me know if[^.!?]*\|feel free to (?:ask\|reach out)[^.!?]*\|I['’]d be happy to help[^.!?]*)`
- **Learn more:** https://naturable.app/en/signs-of-ai-writing/#assistant-leftovers

### Model disclaimer — `en.artifact.disclaimer`

- **Severity:** strong · **category:** artifact · **confidence:** high · **safe fix**
- **Why:** This reads like a model limitation rather than document content.
- **Do:** Verify the claim or remove the disclaimer.
- **Before:** As of my last update, the API supports streaming.
- **After:** The API supports streaming as of March 2026.
- **Detects:** `\b(as of my last (?:update\|knowledge cutoff)\|based on the available sources\|information may be incomplete\|as an AI(?: language)? model[^.!]*)\b`
- **Learn more:** https://naturable.app/en/signs-of-ai-writing/#model-disclaimers

### Assistant scaffolding — `en.artifact.let_me`

- **Severity:** suggestion · **category:** artifact · **confidence:** high · **safe fix**
- **Why:** Assistant staging language is not part of the document voice.
- **Do:** Drop the scaffolding; start with the content.
- **Before:** Let me explain: we ship on Fridays.
- **After:** We ship on Fridays.
- **Detects:** `\b(let me (?:explain\|break (?:this\|it) down\|walk you through)\|here['’]s a (?:quick )?(?:overview\|summary) of)\b`
- **Learn more:** https://naturable.app/en/how-it-works/#rule-en-artifact-let_me

## lexicon

### Wordy filler phrase — `en.lexicon.filler_phrase`

- **Severity:** suggestion · **category:** vocabulary · **confidence:** high · **safe fix**
- **Why:** The phrase adds length without useful meaning.
- **Do:** Use the shorter alternative.
- **Before:** In order to finish, cut scope.
- **After:** To finish, cut scope.
- **Detects:** `\b(in order to\|due to the fact that\|it is important to note that\|it is worth noting that\|for all intents and purposes)\b`
- **Learn more:** https://naturable.app/en/signs-of-ai-writing/#filler-phrases

### Generic AI diction — `en.lexicon.cliche`

- **Severity:** strong · **category:** vocabulary · **confidence:** medium
- **Why:** This wording is common in polished but nonspecific drafts.
- **Do:** Replace it with a plain, precise word.
- **Before:** We leverage a robust solution.
- **After:** We use Postgres with read replicas.
- **Detects:** `\b(delve\|tapestry\|realm\|showcas(?:e\|ing)\|leverage\|myriad\|plethora\|seamless(?:ly)?\|robust\|pivotal\|foster(?:ing)?\|embark\|elevate\|harness(?:ing)?\|underscore(?:s\|d\|ing)? the importance\|landscape\|nestled\|boasts)\b`
- **Learn more:** https://naturable.app/en/ai-words-to-avoid/#top-words

### Stock transition opener — `en.lexicon.transition_stack`

- **Severity:** suggestion · **category:** vocabulary · **confidence:** high · **safe fix**
- **Why:** Sentence-initial stock transitions often mark assistant cadence.
- **Do:** Delete or replace with a plain connective that fits the logic.
- **Before:** Furthermore, costs fell.
- **After:** Costs fell.
- **Detects:** `(^\|[.!?\n]\s*)(Furthermore\|Moreover\|Additionally\|In addition\|Consequently\|Hence\|Thus\|Therefore)\b`
- **Learn more:** https://naturable.app/en/signs-of-ai-writing/#transition-openers

### Stacked hedging — `en.lexicon.hedge_stack`

- **Severity:** suggestion · **category:** sentence · **confidence:** medium · **safe fix**
- **Why:** Multiple qualifiers make the claim vague.
- **Do:** Keep one qualifier and state the evidence.
- **Before:** Teams could potentially rethink their work.
- **After:** Teams may rethink their work after the pilot.
- **Detects:** `\b(could potentially\|may possibly\|it (?:could\|might) be argued that\|tends to somewhat)\b`
- **Learn more:** https://naturable.app/en/signs-of-ai-writing/#stacked-hedges

### Play a role filler — `en.lexicon.play_role`

- **Severity:** suggestion · **category:** vocabulary · **confidence:** medium
- **Why:** The idiom asserts importance without describing the action.
- **Do:** Say what the subject actually does.
- **Before:** Caching plays a vital role in latency.
- **After:** Caching cuts p95 latency by 40%.
- **Detects:** `\b(play(?:s\|ed\|ing)? a (?:vital\|important\|key\|crucial) role\|serves? as a testament to)\b`
- **Learn more:** https://naturable.app/en/signs-of-ai-writing/#role-and-journey

### Journey / unlock cliche — `en.lexicon.journey_unlock`

- **Severity:** suggestion · **category:** vocabulary · **confidence:** medium
- **Why:** Motivational cliches hide the actual mechanism.
- **Do:** Name the concrete change.
- **Before:** This unlocks the full potential of the team.
- **After:** This frees two engineers from weekly triage.
- **Detects:** `\b(embark(?:s\|ed\|ing)? on a (?:journey\|quest)\|unlock(?:s\|ed\|ing)? the (?:full )?potential\|game-?changer)\b`
- **Learn more:** https://naturable.app/en/signs-of-ai-writing/#role-and-journey
