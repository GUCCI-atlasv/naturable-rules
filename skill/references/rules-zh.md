# Naturable rules — Chinese (beta) · zh-v1.1

Generated from `packs/zh.json`. Do not edit by hand.

Layers run in this order and win overlaps in this order: **hollow → structure → artifact → lexicon**.
`strong` = clear pattern; `suggestion` = worth a look. `safe fix` = can be applied automatically without changing meaning, numbers or names.

## hollow

### 拟人化理想人格喻体 — `zh.metaphor.ideal_persona`

- **Severity:** strong · **category:** vocabulary · **confidence:** high
- **Why:** 理想人格式喻体是中文 AI 稿常见空洞修辞。
- **Do:** 换成具体的人或删掉喻体，只保留实际作用。
- **Before:** 它像一位智慧的导师，指引方向。
- **After:** 值班工程师会在告警后15分钟内接手。
- **Detects:** `(智慧的导师\|不知疲倦的助手\|贴心的伙伴\|忠诚的卫士\|沉默的守望者\|智能助手就像[^。！？]{0,20}老师)`
- **Learn more:** https://naturable.app/zh-cn/how-it-works/

## structure

### 段首零回指评论 — `zh.para.zero_anaphora`

- **Severity:** suggestion · **category:** structure · **confidence:** medium
- **Why:** 段首直接下评价却缺少回指，读起来像模板评论。
- **Do:** 在段首评价前补上“这/该…”回指，或并入上段。
- **Before:** 值得肯定。产品节奏更快了。
- **After:** 这一点值得肯定：产品节奏更快了。
- **Detects:** heuristic `zh_zero_anaphora`
- **Learn more:** https://naturable.app/zh-cn/how-it-works/

### 冒号滥用·空转句引列表 — `zh.colon.list_intro`

- **Severity:** suggestion · **category:** structure · **confidence:** high · **safe fix**
- **Why:** 空转引导句不增加信息，只是在引列表。
- **Do:** 删掉空转引导，保留列表内容与顺序。
- **Before:** 具体来说：成本下降，速度提升。
- **After:** 成本下降，速度提升。
- **Detects:** `(具体(?:来说\|而言)\|主要包括\|有以下几点\|可以从以下几个方面\|包括以下几点)[:：]`
- **Learn more:** https://naturable.app/zh-cn/how-it-works/

### 冒号滥用·提示语 — `zh.colon.prompt`

- **Severity:** suggestion · **category:** structure · **confidence:** high · **safe fix**
- **Why:** 冒号前的提示语常是助手腔脚手架。
- **Do:** 删掉提示语，直接写后面的内容。
- **Before:** 核心是：把评审时间压到一天内。
- **After:** 把评审时间压到一天内。
- **Detects:** `(核心是\|关键在于\|重点是\|本质上是\|简单说就是)[:：]`
- **Learn more:** https://naturable.app/zh-cn/how-it-works/

### 翻案腔（不是……而是……） — `zh.flip.not_but`

- **Severity:** strong · **category:** sentence · **confidence:** high
- **Why:** 假对立翻案腔是中文 AI 稿高频结构。
- **Do:** 去掉假对立，直接陈述主判断。
- **Before:** 这不是工具问题，而是流程问题。
- **After:** 评审排队拖慢了发布。
- **Detects:** `不是[^。！？；]{1,30}而是[^。！？；]{1,40}`
- **Learn more:** https://naturable.app/zh-cn/how-it-works/

### 序数词当小标题 — `zh.ordinal.fake_heading`

- **Severity:** suggestion · **category:** structure · **confidence:** medium
- **Why:** 连续序数开段会造成模板提纲感。
- **Do:** 降为正文衔接，或改成真正的小标题，避免假目录感。
- **Before:** 首先，提升效率。其次，降低成本。
- **After:** 效率先提升；成本也会跟着下降。
- **Detects:** `(?:^\|[\n。；])\s*(第[一二三四五六七八九十1-9]\|首先\|其次\|再次\|最后)[，,、]`
- **Learn more:** https://naturable.app/zh-cn/how-it-works/

### 破折号过密 — `zh.dash.dense`

- **Severity:** suggestion · **category:** rhythm · **confidence:** medium
- **Why:** 破折号过密会形成可辨认的模型痕迹（Claude/DeepSeek 更重）。
- **Do:** 降低破折号密度；能用逗号或句号处优先改写。注意：部分模型更爱用破折号，这不是作者判决。
- **Before:** 方案——包括排期——已经——确认。
- **After:** 方案（含排期）已经确认。
- **Detects:** heuristic `zh_dash_dense`
- **Learn more:** https://naturable.app/zh-cn/how-it-works/

### 相邻句结构同款 — `zh.adjacent.parallel`

- **Severity:** suggestion · **category:** rhythm · **confidence:** medium
- **Why:** 相邻句同一模板是中文 AI 稿常见结构问题。
- **Do:** 拆开同构，让句式跟着信息变化。
- **Before:** 它提升了效率。它降低了成本。它改善了体验。
- **After:** 效率先上去；成本随批量下降。体验则来自更短的等待。
- **Detects:** heuristic `zh_adjacent_parallel`
- **Learn more:** https://naturable.app/zh-cn/how-it-works/

### 顿号罗列过密 — `zh.enumeration.dense`

- **Severity:** suggestion · **category:** sentence · **confidence:** medium
- **Why:** 顿号过密会让信息变成清单而不是论述。
- **Do:** 拆成短句，或删掉弱项，避免一长串顿号堆叠。
- **Before:** 涵盖效率、质量、体验、成本、安全、合规、扩展。
- **After:** 先看效率与质量；成本、安全另开一节。
- **Detects:** heuristic `zh_enumeration_dense`
- **Learn more:** https://naturable.app/zh-cn/how-it-works/

## artifact

### 助手寒暄 — `zh.artifact.chat`

- **Severity:** strong · **category:** artifact · **confidence:** high · **safe fix**
- **Why:** 这是对话助手残留，不属于正文。
- **Do:** 删除寒暄，直接进入内容。
- **Before:** 希望这对你有所帮助！成本已下降。
- **After:** 成本已下降。
- **Detects:** `(很高兴为你解答[！!]?\|希望这对你有所帮助[！!]?\|如果你还有任何问题[^。！？!?]*)`
- **Learn more:** https://naturable.app/zh-cn/how-it-works/

## lexicon

### 起首语填充 — `zh.opener.filler`

- **Severity:** suggestion · **category:** vocabulary · **confidence:** high · **safe fix**
- **Why:** 起首填充语常可直接删掉而不损失信息。
- **Do:** 删除起首语，或改写成带判断的完整句。
- **Before:** 说白了，成本已经下降。
- **After:** 成本已经下降。
- **Detects:** `(说白了\|简单来说\|总的来说\|值得一提的是\|不可否认的是\|毋庸置疑的是\|需要指出的是)`
- **Learn more:** https://naturable.app/zh-cn/how-it-works/

### 翻译腔·被动堆叠 — `zh.translationese.passive`

- **Severity:** suggestion · **category:** sentence · **confidence:** medium
- **Why:** 欧化被动是翻译腔子类之一。
- **Do:** 改成主动表述，说明谁做了什么。
- **Before:** 方案被团队所认可。
- **After:** 团队认可了这套方案。
- **Detects:** `(被[^。！？]{0,8}所[^。！？]{1,12}\|被进行\|被予以)`
- **Learn more:** https://naturable.app/zh-cn/how-it-works/

### 翻译腔·的字链 — `zh.translationese.de_stack`

- **Severity:** suggestion · **category:** vocabulary · **confidence:** medium
- **Why:** 连续“的”字链是翻译腔常见表面特征。
- **Do:** 打断“的”字链，改成短句或动词结构。
- **Before:** 这是我们团队的非常重要的需要重视的问题。
- **After:** 这个问题需要认真对待。
- **Detects:** `([\u4e00-\u9fff]{1,6}的){3,}[\u4e00-\u9fff]{1,8}`
- **Learn more:** https://naturable.app/zh-cn/how-it-works/

### 翻译腔·们字滥用 — `zh.translationese.men`

- **Severity:** suggestion · **category:** vocabulary · **confidence:** medium · **safe fix**
- **Why:** 不必要的“们”常来自英文复数直译。
- **Do:** 中文复数常可省略“们”，或改成具体群体名。
- **Before:** 用户们可以导出结果。
- **After:** 用户可以导出结果。
- **Detects:** `(用户们\|读者们\|开发者们\|人们们)`
- **Learn more:** https://naturable.app/zh-cn/how-it-works/

### 翻译腔·进行时垫话 — `zh.translationese.ongoing`

- **Severity:** suggestion · **category:** vocabulary · **confidence:** medium · **safe fix**
- **Why:** 进行时垫话多来自英文进行体直译。
- **Do:** 删掉进行时垫话，直接用动词。
- **Before:** 我们正在进行着评估。
- **After:** 我们在评估。
- **Detects:** `(正在进行着?\|进行一个\|做出一个[^。！？]{0,6}的?(?:决定\|选择\|改变))`
- **Learn more:** https://naturable.app/zh-cn/how-it-works/

### 翻译腔·之一堆叠 — `zh.translationese.one_of`

- **Severity:** suggestion · **category:** vocabulary · **confidence:** medium
- **Why:** “最…之一”常是英文 one of the 直译垫话。
- **Do:** 能说程度就说程度，避免空洞“之一”。
- **Before:** 这是最重要的挑战之一。
- **After:** 这是眼下最紧的挑战。
- **Detects:** `(最[^。！？]{0,8}之一\|之一[^。！？]{0,6}之一)`
- **Learn more:** https://naturable.app/zh-cn/how-it-works/

## Rules deliberately NOT applied

These were tested and rejected. Do not suggest them.

- **少用比喻** (`zh.banned.less_metaphor`): Humans use more metaphors; problem is persona type, not metaphor count.
- **删除设问** (`zh.banned.delete_rhetorical`): Removing rhetorical questions makes text less human.
- **句长必须不均匀** (`zh.banned.force_uneven_length`): No difference after corrected segmentation.
- **硬补就** (`zh.banned.force_jiu`): Directionally plausible but not productizable.
