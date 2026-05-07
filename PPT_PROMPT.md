# VeilPay PPT Generation Prompt
# 用于 AI 生成 PPT 的完整提示词

---

## 使用方式
将下方「=== PROMPT START ===」到「=== PROMPT END ===」之间的全部内容，复制粘贴给 AI（推荐 Gamma.app / ChatGPT / Claude），即可生成完整 PPT。

---

=== PROMPT START ===

Please create a professional pitch deck presentation for a Web3 hackathon project called **VeilPay**. Below are all the requirements.

---

## DESIGN REQUIREMENTS

**Overall Style:**
- Dark theme throughout — deep dark navy/black backgrounds
- Futuristic, minimal, and technical aesthetic
- Feels like a fintech + Web3 product, not a startup template
- Clean typography, no decorative clutter

**Color Palette:**
- Background: `#080A12` (very dark navy black)
- Card / section background: `#111827` (dark navy)
- Border / divider: `#1f2d45` (muted blue-grey)
- Primary accent: `#3B82F6` (blue)
- Secondary accent: `#8B5CF6` (purple)
- Gradient: `from #2563eb to #7c3aed` (blue to purple, used on key elements)
- Success / real: `#22C55E` (green)
- Warning / mocked: `#F59E0B` (amber)
- Body text: `#F9FAFB` (near white)
- Muted text: `#9CA3AF` (grey)

**Typography:**
- Headings: Bold, large, white
- Subheadings: Medium weight, `#9CA3AF`
- Body: Regular, `#F9FAFB`
- Code / addresses: Monospace font, blue or green

**Layout principles:**
- Wide (16:9) slides
- Left-aligned text in most slides
- Generous whitespace — never crowded
- Important keywords in the gradient color `#3B82F6` to `#8B5CF6`
- Use minimal icons where specified
- Tables and comparison grids are preferred over bullet lists

**Visual motifs to use (optional but preferred):**
- Subtle dot-grid or hexagonal pattern on backgrounds
- Soft glowing orbs (blue + purple) as ambient background decoration
- Code block styling for technical snippets (dark background, monospaced, syntax-colored)
- Green dot indicator (●) for "real/live" items
- Amber dot indicator (⚠) for "mocked" items

---

## SLIDE-BY-SLIDE CONTENT

---

### SLIDE 1 — Title Slide

**Layout:** Full-bleed dark background with gradient headline, logo top-left, content centered

**Top-left logo area:**
- Shield icon (blue to purple gradient)
- Text: "Veil**Pay**" (Pay in blue `#3B82F6`)

**Center content:**
- Eyebrow text (small, muted): `Programmable Privacy on Solana`
- Main headline (very large, gradient text): `Privacy is not binary.`
- Second line (large, white): `It should be programmable.`
- Subtext (small, muted grey): `Define who can see transaction data, when, and under what conditions — without giving up auditability.`

**Bottom area:**
- Pill badge: `⚡ Built on Solana`
- Pill badge: `🏆 Hackathon Demo`
- Pill badge: `🌐 Live on Devnet`

**Background:** Animated-style ambient glow — two soft radial gradients, one blue (left-center) and one purple (right-center), on dark `#080A12`

**Speaker note:** *"Every payment on Solana is visible to anyone, forever. We think that's wrong."*

---

### SLIDE 2 — Problem

**Layout:** Two-column layout: left = problem statement text, right = visual comparison table

**Slide title:** `The Problem`

**Left column — headline + body:**
- Large text: `On-chain payments are all-or-nothing today.`
- Body: `Every Solana transaction is permanently public. Amounts, senders, and receivers are exposed to anyone — forever.`

**Right column — 2x2 comparison grid (card style, dark bordered):**

Card 1 — red/warning border:
- Label: `Fully Public`
- Icon: 👁 (eye)
- Description: `All transaction data permanently visible to anyone`
- Tag pill: `No Privacy`

Card 2 — red/warning border:
- Label: `Fully Hidden (Mixers)`
- Icon: 🚫
- Description: `Anonymity that breaks compliance and triggers regulators`
- Tag pill: `No Compliance`

**Below the grid — 3 scenario rows (icon + one-liner each):**
- 🏢 `DAO pays contributors — everyone sees everyone's salary`
- 📄 `Company pays supplier — competitor sees the deal amount`
- 👤 `Individual receives large payment — becomes a target`

**Bottom accent line (gradient underline bar):** The core tension: *Transparency makes blockchains trustworthy. Full transparency makes them unusable for real finance.*

---

### SLIDE 3 — Insight

**Layout:** Centered statement slide with large typographic emphasis

**Slide title:** `The Insight`

**Main statement (very large, white, center-aligned):**
`Privacy should be programmable.`
`Not binary.`

**Subtext below:**
`The right question isn't "should this be hidden?" — it's "who should see this, when, and under what conditions?"`

**Visual: animated-style table (4 rows, dark card background with borders)**

| Row | Column 1 | Column 2 | Column 3 |
|-----|----------|----------|----------|
| Public ledger | ✓ EXISTS | ✓ EXISTS | ✓ EXISTS |
| Public sees | [Hidden] | [Hidden] | [Hidden] |
| Auditor sees | $12,000 | $5,000 | $28,000 |
| After 90 days | $12,000 | $5,000 | $28,000 |

Style: First row = muted text. Second row = amber `[Hidden]` badges. Third row = green revealed text. Fourth row = grey archival text.

**Bottom note (small, muted):**
`This model already exists in traditional finance — bank statements, auditor access, regulatory subpoenas, archival laws. VeilPay brings it to Solana.`

---

### SLIDE 4 — Solution

**Layout:** Left = solution description, Right = example rule card + flow

**Slide title:** `The Solution`

**Top tagline (large, gradient text):**
`VeilPay — Programmable privacy rules at the transaction layer.`

**Left column — How it works (numbered list, large steps):**

Step 1: `Sender defines a privacy rule per transaction`
Step 2: `Rule Engine applies the policy`
Step 3: `Public sees [Hidden] for protected fields`
Step 4: `Authorized roles reveal on demand with cryptographic proof`

**Right column — Rule card (styled like a dark UI card with blue border):**

Card header: `Example Privacy Rule`

```
Hide amount if > 1,000 USDC
Hide sender address       ✓
Hide receiver address     ✓
Allow reveal:  [Auditor]
Delay:         10 minutes
```

**Below — 4 property badges (green, horizontal row):**
- ✅ Transactions exist and are verifiable
- ✅ Protected fields show [Hidden] to public
- ✅ Auditors can reveal with proof
- ✅ Full auditability after disclosure window

---

### SLIDE 5 — Demo

**Layout:** Full-width demo flow diagram with screenshot placeholder

**Slide title:** `Live Demo — Solana Devnet`

**Top badges (horizontal row):**
- Green pill: `● Live on Devnet`
- Blue pill: `🔗 Ed25519 Verified On-Chain`
- Blue pill: `📋 Memo Program Anchored`

**Main content: Numbered demo flow (horizontal steps or vertical list)**

Each step is a card with step number, action, and result:

1. **Connect Wallet** → `Phantom connects, real address appears`
2. **⚡ Get Devnet SOL** → `0.5 SOL airdropped for gas`
3. **Fill Send Form** → `Privacy rules apply in real time`
4. **Phantom Popup ①** → `Sign the commitment (Ed25519 signature)`
5. **Phantom Popup ②** → `Approve transaction — sent to Solana`
6. **Success Screen** → `Real on-chain signature displayed`
7. **Solana Explorer** → `View real devnet transaction`
8. **Audit View** → `Transaction shows [Hidden] fields`
9. **Switch to Auditor** → `10-second countdown begins`
10. **Reveal** → `Real amount, sender, receiver displayed`

**Key callout box (green bordered card, center or bottom):**
> Two Phantom popups:
> ① Sign Message — Ed25519 signature on commitment hash
> ② Approve Transaction — atomic tx with Ed25519 verify + Memo write
> Solana network validates the signature. Invalid sig = tx rejected by the network.

**Speaker note:** *"Let me show you the live demo. Everything you'll see is running on Solana devnet."*

---

### SLIDE 6 — Architecture

**Layout:** Full-width architecture diagram (dark background, technical style)

**Slide title:** `Architecture`

**Main diagram: 4-layer stack (top to bottom, each layer is a dark card with borders)**

Layer 1 — UI Layer (top, `#111827` background):
```
UI Layer
Send Page · Rules Builder · Audit View · Role Switcher
```

Layer 2 — Rule Engine (green border = real):
```
✅ Rule Engine  [REAL - IMPLEMENTED]
applyRules(fields, mode, rules) → PublicView
Modes: public | private | rule-based
Fields: amount · sender · receiver
```

Layer 3 — Cryptography Layer (split into two sub-cards):

Sub-card A (amber border = mocked):
```
⚠️ ZK Provider Interface  [PLUGGABLE]
generateProof(tx, rules) → ZKProof
verifyProof(proof) → boolean
Current:    MockProvider (hash simulation)
Production: Light Protocol ZK Compressed Accounts
```

Sub-card B (green border = real):
```
✅ On-Chain Commitment  [REAL - LIVE]
1. wallet.signMessage(commitment)  ← Ed25519 signature
2. Ed25519Program.verify(sig)      ← Solana precompile
3. MemoProgram.write(commitment)   ← permanent record
Single atomic tx: invalid sig = entire tx rejected
```

Layer 4 — Privacy Policy Engine (green border = real):
```
✅ Privacy Policy Engine  [REAL - IMPLEMENTED]
canReveal(tx, role) · getSecondsUntilReveal(tx)
Roles: public · user · auditor · companyAdmin · daoGovernance
```

**Right side callout (small, muted):**
`The ZK provider is a pluggable interface. Replacing mock → Light Protocol = zero changes to Rule Engine, Policy Engine, or UI.`

---

### SLIDE 7 — Impact

**Layout:** Left = target users table, Right = broader impact statement

**Slide title:** `Who Needs This`

**Left: User table (5 rows, alternating dark cards)**

| User | Pain Today | VeilPay Enables |
|------|-----------|----------------|
| DAOs | Contributor salaries public | Private pay, auditable by token holders |
| Enterprises | Invoice amounts exposed | B2B payments with selective disclosure |
| Individuals | Large payments = visible target | Receive payroll privately |
| DeFi Protocols | MEV from visible order flow | Protected pre-execution data |
| Compliance Teams | Can't use chain without full exposure | Regulatory-grade audit access |

**Right: Impact statement (large, centered, with accent)**

Large text: `Privacy is a prerequisite for real-world on-chain finance adoption.`

Body text: `Every serious enterprise evaluating Solana for payments hits the same wall: "We can't put our financial data on a public ledger." VeilPay removes that wall — without making the ledger less trustworthy.`

**Bottom full-width gradient bar with white text:**
`Transparency makes blockchains trustworthy. Programmable privacy makes them usable.`

---

### SLIDE 8 — Roadmap

**Layout:** Timeline or 3-column phase layout

**Slide title:** `Roadmap`

**3-phase layout (each phase is a card):**

**Phase 1 — Now (Hackathon)** — green border, label `COMPLETE`
- ✅ Rule Engine — fully implemented
- ✅ Role-based access control (5 roles)
- ✅ Ed25519 on-chain commitment (Solana devnet)
- ✅ Time-delayed reveal
- ✅ Full EN/ZH i18n
- ✅ Phantom wallet integration
- ⚠️ ZK proof layer — mocked, pluggable interface ready

**Phase 2 — 3 Months** — blue border, label `NEXT`
- 🔲 Light Protocol ZK Compressed Accounts
- 🔲 True zero-knowledge amount range proofs
- 🔲 Custom Solana program for commitment storage
- 🔲 Real SPL token transfers
- 🔲 Mainnet deployment

**Phase 3 — 6–12 Months** — purple border, label `FUTURE`
- 🔲 Custom Circom circuits for arbitrary policy proofs
- 🔲 SDK for other dApps to plug in VeilPay rules
- 🔲 Compliance module: scheduled auto-export to auditors
- 🔲 DAO governance over global disclosure policies

**Bottom closing statement (large, centered, gradient text):**
`The Rule Engine and Policy Engine are the core IP.`
`ZK is a pluggable upgrade. The architecture is designed to grow.`

**Footer:** `VeilPay · Built on Solana · 2026`

---

## ADDITIONAL REQUIREMENTS

**Slide transitions:** Subtle fade or slide — nothing flashy
**Animations:** Minimal — only appear-on-click for step-by-step reveals if supported
**Slide numbers:** Show on all slides except title
**Footer on all non-title slides:** Small muted text — `VeilPay · Programmable Privacy for On-Chain Payments`
**Font recommendations:** Inter or Geist for body, any bold geometric sans for headings
**Total slides:** 8
**Aspect ratio:** 16:9 widescreen
**Export format:** PDF + editable source

Please generate this presentation now.

=== PROMPT END ===

---
---

## 中文版提示词

---

=== 中文提示词开始 ===

请为一个 Web3 黑客松项目 **VeilPay** 生成一套专业的演讲 PPT。以下是全部要求。

---

## 设计要求

**整体风格：**
- 全程深色主题，深海军蓝/黑色背景
- 未来感、简洁、技术感的美学
- 感觉像一个金融科技 + Web3 产品，而不是普通创业模板
- 干净的排版，无装饰性杂乱元素

**配色方案：**
- 背景色：`#080A12`（极深的海军黑）
- 卡片/区块背景：`#111827`（深海军蓝）
- 边框/分隔线：`#1f2d45`（柔和蓝灰）
- 主要强调色：`#3B82F6`（蓝色）
- 次要强调色：`#8B5CF6`（紫色）
- 渐变色：`从 #2563eb 到 #7c3aed`（蓝到紫，用于关键元素）
- 成功/真实：`#22C55E`（绿色）
- 警告/模拟：`#F59E0B`（琥珀色）
- 正文：`#F9FAFB`（近白色）
- 灰色辅助文字：`#9CA3AF`

**字体排版：**
- 标题：粗体、大号、白色
- 副标题：中等字重，`#9CA3AF`
- 正文：常规字重，`#F9FAFB`
- 代码/地址：等宽字体，蓝色或绿色

**布局原则：**
- 宽幅（16:9）幻灯片
- 大多数幻灯片左对齐文字
- 充足的留白——绝不拥挤
- 关键词使用渐变色 `#3B82F6` 到 `#8B5CF6`
- 在指定位置使用简洁图标
- 优先使用表格和对比网格，而非项目符号列表

**视觉元素（可选但推荐）：**
- 背景上的点阵或六边形细纹图案
- 柔和的发光光晕（蓝色 + 紫色）作为环境背景装饰
- 技术代码片段使用代码块样式（深色背景、等宽字体、语法着色）
- 绿色圆点指示器（●）表示"真实/运行中"
- 琥珀色指示器（⚠）表示"模拟"项目

---

## 逐页内容

---

### 第 1 页 — 封面

**布局：** 全出血深色背景，渐变标题，左上角 Logo，内容居中

**左上角 Logo 区域：**
- 盾牌图标（蓝到紫渐变）
- 文字："Veil**Pay**"（Pay 为蓝色 `#3B82F6`）

**中心内容：**
- 眉标文字（小号，灰色）：`Solana 上的可编程隐私层`
- 主标题（超大号，渐变文字）：`隐私不是非此即彼的选择，`
- 第二行（大号，白色）：`它应该是可编程的。`
- 副文字（小号，灰色）：`定义谁可以看到交易数据、在什么时候、在什么条件下——同时不失去可审计性。`

**底部区域：**
- 徽章：`⚡ 构建于 Solana`
- 徽章：`🏆 黑客松演示`
- 徽章：`🌐 运行于 Devnet`

**背景：** 环境光晕——两个柔和的径向渐变，一个蓝色（左中）一个紫色（右中），背景色 `#080A12`

**演讲提示：** *"你在 Solana 上发出的每一笔支付，任何人都可以永远看到。我们认为这不对。"*

---

### 第 2 页 — 问题

**布局：** 双栏布局：左侧 = 问题陈述文字，右侧 = 视觉对比表

**幻灯片标题：** `问题所在`

**左栏——标题 + 正文：**
- 大号文字：`今天的链上支付只有两个极端。`
- 正文：`Solana 上的每一笔交易永久公开。金额、发送方、接收方对任何人永远可见。`

**右栏——2×2 对比网格（深色边框卡片风格）：**

卡片 1——红色/警告边框：
- 标签：`完全公开`
- 图标：👁（眼睛）
- 描述：`所有交易数据对任何人永久可见`
- 标签徽章：`零隐私`

卡片 2——红色/警告边框：
- 标签：`完全隐藏（混币器）`
- 图标：🚫
- 描述：`破坏合规性并触发监管的匿名化`
- 标签徽章：`零合规`

**网格下方——3 个场景条目（图标 + 一句话）：**
- 🏢 `DAO 向贡献者付款——所有人的薪资对所有人可见`
- 📄 `公司向供应商付款——竞争对手看到了交易金额`
- 👤 `个人收到大额付款——成为攻击目标`

**底部强调行（渐变下划线条）：** 核心矛盾：*透明性使区块链可信。完全透明使其无法用于真实金融。*

---

### 第 3 页 — 洞察

**布局：** 居中陈述式幻灯片，大号排版强调

**幻灯片标题：** `核心洞察`

**主要陈述（超大号，白色，居中对齐）：**
`隐私应该是可编程的，`
`而不是二元开关。`

**下方副文字：**
`正确的问题不是"这个应该隐藏吗？"——而是"谁应该在什么时候、在什么条件下看到这个？"`

**视觉：表格（4行，深色卡片背景带边框）**

| 层级 | 交易 A | 交易 B | 交易 C |
|------|--------|--------|--------|
| 公开账本 | ✓ 存在 | ✓ 存在 | ✓ 存在 |
| 公众看到 | [隐藏] | [隐藏] | [隐藏] |
| 审计员看到 | ¥12,000 | ¥5,000 | ¥28,000 |
| 90天后 | ¥12,000 | ¥5,000 | ¥28,000 |

样式：第一行 = 灰色文字。第二行 = 琥珀色 [隐藏] 徽章。第三行 = 绿色已解密文字。第四行 = 灰色归档文字。

**底部注释（小号，灰色）：**
`这个模型在传统金融中早已存在——银行对账单、审计师访问、监管传唤、归档法律。VeilPay 将它带到 Solana。`

---

### 第 4 页 — 解决方案

**布局：** 左侧 = 解决方案描述，右侧 = 示例规则卡片

**幻灯片标题：** `解决方案`

**顶部标语（大号，渐变文字）：**
`VeilPay — 在交易层实现可编程隐私规则。`

**左栏——工作原理（编号列表，大号步骤）：**

步骤 1：`发送方为每笔交易定义隐私规则`
步骤 2：`规则引擎应用策略`
步骤 3：`公众看到被保护字段的 [隐藏]`
步骤 4：`授权角色附带密码学证明按需解密`

**右栏——规则卡片（深色 UI 卡片样式，蓝色边框）：**

卡片标题：`示例隐私规则`

```
金额超过 1000 USDC 则隐藏
隐藏发送方地址     ✓
隐藏接收方地址     ✓
允许解密：[审计员]
延迟：    10 分钟
```

**下方——4 个属性徽章（绿色，横排）：**
- ✅ 交易存在且可验证
- ✅ 被保护字段对公众显示 [隐藏]
- ✅ 审计员可附证明解密
- ✅ 披露窗口期后完全可审计

---

### 第 5 页 — 演示

**布局：** 全宽演示流程图

**幻灯片标题：** `实时演示 — Solana Devnet`

**顶部徽章（横排）：**
- 绿色徽章：`● 运行于 Devnet`
- 蓝色徽章：`🔗 Ed25519 链上验证`
- 蓝色徽章：`📋 Memo Program 锚定`

**主要内容：10 步流程卡片**

1. **连接钱包** → `Phantom 连接，真实地址显示`
2. **⚡ 获取 Devnet SOL** → `0.5 SOL 空投用于 Gas`
3. **填写发送表单** → `隐私规则实时预览`
4. **Phantom 弹窗①** → `签名承诺（Ed25519 签名）`
5. **Phantom 弹窗②** → `批准交易——发送至 Solana`
6. **成功界面** → `显示真实链上签名`
7. **Solana Explorer** → `查看真实 devnet 交易`
8. **审计视图** → `交易显示 [隐藏] 字段`
9. **切换为审计员** → `10 秒倒计时开始`
10. **解密** → `真实金额、发送方、接收方显示`

**关键说明框（绿色边框卡片）：**
> 两次 Phantom 弹窗：
> ① 签名消息——对承诺哈希的 Ed25519 签名
> ② 批准交易——包含 Ed25519 验证 + Memo 写入的原子交易
> Solana 网络验证签名。签名无效 = 交易被网络拒绝。

**演讲提示：** *"让我展示一下实时演示。你将看到的一切都运行在 Solana devnet 上。"*

---

### 第 6 页 — 架构

**布局：** 全宽架构图（深色背景，技术风格）

**幻灯片标题：** `架构`

**主图：4层堆叠（从上到下，每层为带边框的深色卡片）**

第 1 层——UI 层（顶部）：
```
UI 层
发送页 · 规则构建器 · 审计视图 · 角色切换器
```

第 2 层——规则引擎（绿色边框）：
```
✅ 规则引擎  [真实 - 已实现]
applyRules(字段, 模式, 规则) → 公开视图
模式：public | private | rule-based
字段：金额 · 发送方 · 接收方
```

第 3 层——密码学层（两个子卡片）：

子卡片 A（琥珀色边框）：
```
⚠️ ZK Provider 接口  [可插拔]
当前：MockProvider（哈希模拟）
生产：Light Protocol ZK 压缩账户
```

子卡片 B（绿色边框）：
```
✅ 链上承诺  [真实 - 运行中]
1. wallet.signMessage(commitment)  ← Ed25519 签名
2. Ed25519Program.verify(sig)      ← Solana 预编译
3. MemoProgram.write(commitment)   ← 永久记录
```

第 4 层——隐私策略引擎（绿色边框）：
```
✅ 隐私策略引擎  [真实 - 已实现]
canReveal(tx, role) · 倒计时计时器
角色：public · user · auditor · companyAdmin · daoGovernance
```

**右侧说明（小号，灰色）：**
`ZK Provider 是可插拔接口。将 mock 替换为 Light Protocol = 无需对规则引擎、策略引擎或 UI 做任何修改。`

---

### 第 7 页 — 影响力

**布局：** 左侧 = 目标用户表格，右侧 = 影响陈述

**幻灯片标题：** `谁需要这个`

**左侧：用户表格**

| 用户 | 现在的痛点 | VeilPay 实现 |
|------|-----------|-------------|
| DAO | 贡献者薪资公开 | 私密付款，代币持有人可审计 |
| 企业 | 发票金额暴露 | 选择性披露的企业支付 |
| 个人 | 大额收款 = 可见目标 | 私密接收工资 |
| DeFi 协议 | 可见订单流导致 MEV | 受保护的执行前数据 |
| 合规团队 | 无法使用链而不完全暴露 | 监管级审计访问 |

**右侧：影响陈述**

大号文字：`隐私是链上金融在现实世界被采用的前提条件。`

正文：`每个认真评估 Solana 用于支付的企业都碰到同一堵墙："我们不能把财务数据放在公开账本上。"VeilPay 移除了这堵墙——同时不削弱账本的可信度。`

**底部全宽渐变条（白色文字）：**
`透明性使区块链可信。可编程隐私使其可用。`

---

### 第 8 页 — 路线图

**布局：** 三栏阶段布局

**幻灯片标题：** `路线图`

**第一阶段——现在（黑客松）** — 绿色边框，标签 `已完成`
- ✅ 规则引擎——完整实现
- ✅ 基于角色的访问控制（5种角色）
- ✅ Ed25519 链上承诺（Solana devnet）
- ✅ 时间延迟解密
- ✅ 完整中英文国际化
- ✅ Phantom 钱包集成
- ⚠️ ZK 证明层——已模拟，可插拔接口就绪

**第二阶段——3个月** — 蓝色边框，标签 `下一步`
- 🔲 Light Protocol ZK 压缩账户
- 🔲 真正的零知识金额范围证明
- 🔲 自定义 Solana 程序
- 🔲 真实 SPL 代币转账
- 🔲 主网部署

**第三阶段——6-12个月** — 紫色边框，标签 `未来`
- 🔲 自定义 Circom 电路
- 🔲 供其他 dApp 接入的 VeilPay SDK
- 🔲 合规模块：定时自动导出
- 🔲 DAO 治理全局披露策略

**底部结语（大号，居中，渐变文字）：**
`规则引擎和策略引擎是核心资产。`
`ZK 是可插拔的升级。架构为增长而设计。`

**页脚：** `VeilPay · 构建于 Solana · 2026`

---

## 额外要求

**幻灯片切换：** 细微的淡入或滑动——无夸张效果
**动画：** 极简——如果支持，仅对步骤逐步展示使用点击出现
**幻灯片编号：** 除封面外所有幻灯片显示
**非封面幻灯片页脚：** 小号灰色文字——`VeilPay · 链上支付的可编程隐私层`
**推荐字体：** 正文使用 Inter 或思源黑体，标题使用任意粗体几何无衬线字体
**总页数：** 8 页
**宽高比：** 16:9 宽屏
**导出格式：** PDF + 可编辑源文件

请现在生成这套演示文稿。

=== 中文提示词结束 ===
