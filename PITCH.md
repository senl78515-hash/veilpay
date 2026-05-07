# VeilPay — Pitch Deck & Presentation Materials
# VeilPay — 演讲材料

---

## PART 1 · PITCH DECK (8 Slides) · 演讲稿（8 页）

---

### Slide 1 · Title · 封面

| English | 中文 |
|---------|------|
| **VeilPay** | **VeilPay** |
| *Programmable Privacy for On-Chain Payments* | *链上支付的可编程隐私层* |
| "Privacy is not binary. It should be programmable." | "隐私不是非此即彼的选择，它应该是可编程的。" |
| Built on Solana · Hackathon Demo · 2026 | 构建于 Solana · 黑客松演示 · 2026 |

**Presenter note / 演讲提示:**
> EN: Open with — *"Every payment you've ever made on Solana is visible to anyone, forever. We think that's wrong."*
>
> 中：开场白 — *"你在 Solana 上发出的每一笔支付，任何人都可以永远看到。我们认为这不对。"*

---

### Slide 2 · Problem · 问题

**EN:** On-chain payments are all-or-nothing today.
**中：** 链上支付今天只有两种选择：要么全公开，要么全隐藏。

| The world today / 现状 | The consequence / 后果 |
|----------------------|----------------------|
| Every Solana transaction is fully public / 所有 Solana 交易完全公开 | Salary data, invoices, treasury moves — all exposed / 薪资、发票、资金流向全部暴露 |
| Mixer-style privacy = full anonymity / 混币器式隐私 = 完全匿名 | Breaks compliance, triggers regulators / 破坏合规性，触发监管 |
| No middle ground exists / 没有中间地带 | Enterprises can't use on-chain payments for real finance / 企业无法将链上支付用于真实金融场景 |

**3 real scenarios that break today / 三个今天无法实现的真实场景：**

1. EN: A DAO pays its contributors — everyone sees everyone's salary.
   中：DAO 向贡献者付款——所有人的薪资对所有人可见。

2. EN: A company pays a supplier — the competitor sees the deal amount.
   中：公司向供应商付款——竞争对手看到了交易金额。

3. EN: An individual receives a large payment — becomes a target.
   中：个人收到一笔大额付款——成为攻击目标。

---

### Slide 3 · Insight · 洞察

**EN:** Privacy should be programmable — not binary.
**中：** 隐私应该是可编程的，而不是二元开关。

EN: The right question isn't *"should this be hidden?"* It's *"who should see this, when, and under what conditions?"*
中：正确的问题不是"这个应该隐藏吗？"而是"谁应该在什么时候、在什么条件下看到这个？"

```
Public ledger / 公开账本：  EXIST    EXIST    EXIST     ← transactions are real / 交易真实存在
Public view / 公众视图：  [Hidden] [Hidden] [Hidden]    ← amounts protected / 金额被保护
Auditor view / 审计员视图： $12,000   $5,000  $28,000    ← full data on demand / 按需完整数据
After 90 days / 90天后：   $12,000   $5,000  $28,000    ← auto-reveals / 自动解密归档
```

EN: This is not a new concept in traditional finance. Bank statements are private. Auditors have access. Regulators can subpoena. Archival laws govern disclosure windows. VeilPay brings this model to Solana.

中：这在传统金融中并不是新概念。银行对账单是私密的，审计师有访问权，监管机构可以传唤，归档法律规定披露窗口期。VeilPay 将这套模型带到 Solana。

---

### Slide 4 · Solution · 解决方案

**EN:** VeilPay: A programmable privacy layer with rule-based disclosure.
**中：** VeilPay：基于规则披露的可编程隐私层。

**How it works / 工作原理：**

| Step / 步骤 | English | 中文 |
|------------|---------|------|
| 1 | Sender defines a privacy rule per transaction | 发送方为每笔交易定义隐私规则 |
| 2 | Rule Engine applies the policy — public sees `[Hidden]` | 规则引擎应用策略——公众看到 `[Hidden]` |
| 3 | Commitment signed and anchored on Solana | 承诺在 Solana 上签名并锚定 |
| 4 | Authorized roles reveal on demand with cryptographic proof | 授权角色按需解密，附密码学证明 |

**Example rule / 示例规则：**
```
Hide amount if > 1,000 USDC   /  金额超过 1000 USDC 则隐藏
Hide sender address            /  隐藏发送方地址
Hide receiver address          /  隐藏接收方地址
Allow: Auditor to reveal       /  授权：审计员可解密
Delay: 10 minutes              /  延迟：10 分钟后才可解密
```

**Key properties / 核心属性：**

| ✅ | English | 中文 |
|----|---------|------|
| ✅ | Public can verify transactions *exist* | 公众可验证交易*存在*（无法审查） |
| ✅ | Public *cannot* see protected fields | 公众*无法*看到被保护的字段 |
| ✅ | Auditors *can* reveal with proof | 审计员*可以*附带证明地解密 |
| ✅ | Everything auditable after disclosure window | 超过披露窗口期后一切可审计 |

---

### Slide 5 · Demo · 演示

**EN:** Live on Solana Devnet.
**中：** 运行在 Solana Devnet 上。

**The flow / 演示流程：**

| Step / 步骤 | Action / 操作 | What you see / 你会看到 |
|------------|--------------|----------------------|
| 1 | Connect Phantom (Devnet) / 连接 Phantom（Devnet） | Address appears in header / 地址显示在顶栏 |
| 2 | Click ⚡ + SOL | 0.5 devnet SOL airdropped / 空投 0.5 devnet SOL |
| 3 | Send payment with rules / 带规则发送支付 | Form with privacy preview / 带隐私预览的表单 |
| 4 | Phantom popup ① | Sign the commitment (Ed25519) / 签名承诺（Ed25519） |
| 5 | Phantom popup ② | Approve transaction / 批准交易 |
| 6 | Success screen / 成功界面 | Real on-chain signature / 真实链上签名 |
| 7 | View on Solana Explorer / 在 Explorer 查看 | Real devnet transaction / 真实 devnet 交易 |
| 8 | Audit page / 审计页 | `[Hidden]` fields in list / 列表中显示 `[Hidden]` |
| 9 | Switch role to Auditor / 切换角色为审计员 | 10-second countdown / 10 秒倒计时 |
| 10 | Countdown ends / 倒计时结束 | Fields reveal: real data / 字段解密：真实数据 |

---

### Slide 6 · Architecture · 架构

```
┌──────────────────────────────────────────┐
│         UI Layer / UI 层                 │
│  Send · Rules Builder · Audit · Reveal   │
│  发送 · 规则构建 · 审计 · 解密             │
└──────────────────┬───────────────────────┘
                   │
┌──────────────────▼───────────────────────┐
│    Rule Engine / 规则引擎  ✅ REAL        │
│  applyRules(fields, mode, rules)         │
│  → PublicView with masked fields         │
│  → 带遮罩字段的公开视图                   │
└──────────────────┬───────────────────────┘
                   │
┌──────────────────▼───────────────────────┐
│     Cryptography Layer / 密码学层         │
│                                          │
│  ZK Provider Interface ⚠️ MOCKED         │
│  ZK Provider 接口（模拟）                 │
│  └─ MockProvider (hash simulation)       │
│  └─ [SLOT] Light Protocol (production)  │
│                                          │
│  On-Chain Commitment ✅ REAL             │
│  链上承诺（真实）                          │
│  Ed25519 sign → verify → Memo write      │
└──────────────────┬───────────────────────┘
                   │
┌──────────────────▼───────────────────────┐
│  Privacy Policy Engine / 隐私策略引擎     │
│  ✅ REAL                                 │
│  canReveal(tx, role) · countdown         │
└──────────────────────────────────────────┘
```

EN: The ZK provider is a pluggable interface. Replacing mock → Light Protocol requires zero changes to the Rule Engine, Policy Engine, or UI.

中：ZK provider 是可插拔接口。将 mock 替换为 Light Protocol 不需要对规则引擎、策略引擎或 UI 做任何修改。

---

### Slide 7 · Public Good / Impact · 公共价值与影响

**EN:** Who needs this?
**中：** 谁需要这个？

| User / 用户 | Pain today / 现在的痛点 | VeilPay enables / VeilPay 实现 |
|------------|----------------------|------------------------------|
| **DAOs** | Contributor salaries public / 贡献者薪资公开 | Private pay, auditable by token holders / 薪资私密，代币持有人可审计 |
| **Enterprises / 企业** | Invoice amounts exposed / 发票金额暴露 | B2B payments with selective disclosure / 选择性披露的企业支付 |
| **Individuals / 个人** | Large payments = visible target / 大额收款 = 可见目标 | Receive payroll privately / 私密接收工资 |
| **DeFi protocols / DeFi 协议** | MEV from visible order flow / 可见订单流导致 MEV | Protected transaction data / 受保护的交易数据 |
| **Compliance teams / 合规团队** | Can't use chain without full exposure / 无法在不完全暴露的情况下使用链 | Regulatory-grade audit access / 监管级审计访问 |

**EN:** Privacy is a prerequisite for real-world adoption of on-chain finance. VeilPay removes the wall — without making the ledger less trustworthy.

**中：** 隐私是链上金融在现实世界中被采用的前提条件。VeilPay 移除了这堵墙——同时不削弱账本的可信度。

---

### Slide 8 · Roadmap · 路线图

| Phase / 阶段 | English | 中文 | Status / 状态 |
|-------------|---------|------|--------------|
| **Now / 现在** | Rule Engine fully implemented | 规则引擎完整实现 | ✅ |
| **Now / 现在** | Role-based access control (5 roles) | 基于角色的访问控制（5 种角色） | ✅ |
| **Now / 现在** | Ed25519 on-chain commitment, Solana devnet | Ed25519 链上承诺，Solana devnet | ✅ |
| **Now / 现在** | ZK proof layer — mocked, interface ready | ZK 证明层——已模拟，接口就绪 | ⚠️ |
| **3 months / 3个月** | Light Protocol ZK Compressed Accounts | Light Protocol ZK 压缩账户 | 🔲 |
| **3 months / 3个月** | Custom Solana program for commitment storage | 用于承诺存储的自定义 Solana 程序 | 🔲 |
| **3 months / 3个月** | Mainnet deployment | 主网部署 | 🔲 |
| **6–12 months / 6-12个月** | Custom Circom circuits for arbitrary proofs | 用于任意证明的自定义 Circom 电路 | 🔲 |
| **6–12 months / 6-12个月** | SDK for other dApps to plug in VeilPay rules | 供其他 dApp 接入 VeilPay 规则的 SDK | 🔲 |
| **6–12 months / 6-12个月** | Compliance module: scheduled auto-export | 合规模块：定时自动导出 | 🔲 |

---
---

## PART 2 · 60-SECOND PITCH · 60 秒英文讲稿（附中文对照）

*Read at ~130 words/min · 约 130 词/分钟朗读*

---

**English:**

> Every payment on Solana is public by default. Anyone can see who paid whom, how much, and when — forever.
>
> That's fine for simple transfers. But it makes Solana unusable for real-world finance: payroll, invoicing, treasury operations. The data is too sensitive.
>
> Existing solutions — mixers, full privacy chains — go too far. They hide everything, break compliance, and eliminate auditability. That's not the answer.
>
> **VeilPay is not just a private payment app. It is a programmable privacy layer for real-world on-chain finance.**
>
> You define the policy: hide the amount above a threshold, restrict visibility to an auditor, unlock after 90 days. The Rule Engine enforces it. The commitment is signed and verified on Solana — right now, on devnet.
>
> The ZK proof layer is mocked today — by design. The interface is pluggable. Light Protocol slots in without touching a line of the Rule Engine.
>
> Privacy shouldn't be a toggle. It should be a policy. That's VeilPay.

---

**中文对照：**

> Solana 上的每一笔支付默认都是公开的。任何人都可以永远看到谁付给了谁、付了多少钱、什么时间付的。
>
> 对于简单转账来说这没问题，但这让 Solana 无法用于真实金融场景：工资发放、发票支付、资金管理。这些数据太敏感了。
>
> 现有的解决方案——混币器、完全隐私链——走得太远。它们隐藏一切，破坏合规性，消除了可审计性。这不是答案。
>
> **VeilPay 不只是一个私密支付应用，它是面向真实世界链上金融的可编程隐私层。**
>
> 你来定义策略：超过阈值时隐藏金额，将可见权限限制给审计员，90 天后自动解锁。规则引擎来执行。承诺在 Solana 上签名并验证——现在就在 devnet 上运行。
>
> ZK 证明层今天是模拟的——这是有意为之的设计。接口是可插拔的。Light Protocol 可以接入，无需改动规则引擎的任何一行代码。
>
> 隐私不应该是一个开关，它应该是一个策略。这就是 VeilPay。

---
---

## PART 3 · JUDGE Q&A · 评委问答

---

### Q1: Why not implement real ZK proofs?
### 为什么不实现真正的 ZK 证明？

**EN:**
Writing and auditing a ZK circuit — Groth16, PLONK — is weeks of work minimum. In a hackathon, that tradeoff would have left us with an unfinished circuit and no working demo.

The architectural decision was deliberate: implement the Rule Engine, Policy Engine, and on-chain commitment layer with full correctness, and leave the ZK proof layer as a cleanly defined, pluggable interface.

What we have today is real cryptographic non-repudiation — Ed25519 signatures verified on-chain by Solana's precompile. What ZK adds is zero-knowledge amount range proofs — proving an amount is in range without revealing it. That's a meaningful upgrade, and the interface slot is ready for it. The production path is Light Protocol's ZK Compressed Accounts.

**中文：**
编写和审计一个 ZK 电路——Groth16、PLONK——至少需要数周工作。在黑客松中，这样的权衡会让我们既没有完成的电路，也没有可运行的演示。

这个架构决策是有意为之的：以完全正确性实现规则引擎、策略引擎和链上承诺层，同时将 ZK 证明层留作清晰定义的可插拔接口。

我们今天拥有的是真实的密码学不可否认性——由 Solana 预编译验证的 Ed25519 链上签名。ZK 增加的是零知识金额范围证明——在不揭露金额的情况下证明金额在某个范围内。这是有意义的升级，接口插槽已经就绪。生产路径是 Light Protocol 的 ZK 压缩账户。

---

### Q2: How is this different from mixers?
### 这与混币器有什么区别？

**EN:**
Fundamentally different goal and design. Mixers anonymize the sender. Their purpose is to make it impossible to trace who sent what to whom — which destroys auditability and compliance.

VeilPay is not about anonymity. It's about **selective disclosure**. The sender is always known to the sender. Rules define who else can see what, when. An auditor can always reveal. A regulator can always be given access. The commitment is permanently on-chain — nothing is destroyed.

The mental model: VeilPay is closer to a bank privacy policy than a mixer. Your bank knows everything. Your accountant can see everything. But random people on the street don't. That's what we're building.

**中文：**
目标和设计有根本性区别。混币器匿名化发送方，其目的是使追踪谁向谁发送了什么变得不可能——这破坏了可审计性和合规性。

VeilPay 不是关于匿名性的，而是关于**选择性披露**的。发送方始终知道是谁发送的。规则定义了其他人在何时能看到什么。审计员始终可以解密。监管机构始终可以获得访问权限。承诺永久保存在链上——没有任何东西被销毁。

心智模型：VeilPay 更接近银行隐私政策而非混币器。你的银行知道一切，你的会计师可以看到一切，但街上的陌生人看不到。这就是我们在构建的东西。

---

### Q3: Who are the users?
### 用户是谁？

**EN:**
Three segments immediately:

**DAOs and crypto-native organizations** — Right now, every contributor payment is public. DAO treasuries are exposed. VeilPay lets them run compensation privately while maintaining auditability for token holders.

**Enterprises entering Web3** — The single biggest blocker for enterprise blockchain adoption is data visibility. A company cannot put its invoice flows on a public ledger. VeilPay gives them the privacy model they need without sacrificing the audit trail.

**Power users and high-net-worth individuals** — Large on-chain payments create visible targets. Privacy rules let them receive payments without broadcasting their balance to the world.

**中文：**
立即可以识别三类用户：

**DAO 和加密原生组织** — 目前，每笔贡献者付款都是公开的，DAO 资库是暴露的。VeilPay 让他们私密地运营薪酬体系，同时为代币持有人维持可审计性。

**进入 Web3 的企业** — 企业区块链采用的最大障碍是数据可见性。企业无法将发票流程放在公开账本上。VeilPay 为他们提供所需的隐私模型，同时不牺牲审计追踪。

**高净值用户和个人** — 大额链上支付创造了可见的目标。隐私规则让他们在不向全世界广播余额的情况下接收付款。

---

### Q4: What is actually implemented vs mocked?
### 什么是真实实现的，什么是模拟的？

**EN — be direct:**

**Real / 真实：**
- Rule Engine — `applyRules()` runs real conditional logic. Three modes, configurable thresholds. This is the core of the product.
- Role-based access control — `canReveal(tx, role)` enforces per-role permissions correctly.
- Ed25519 on-chain commitment — Sender signs the commitment. Solana's Ed25519 precompile verifies on-chain. Memo program writes the commitment. Real Solana transaction on devnet — click the Explorer link.
- Wallet integration — Real Phantom, real public key, real devnet.

**Mocked / 模拟：**
- ZK proof generation — `mockZkProvider` uses FNV-1a hash. Not cryptographically meaningful. Explicitly labeled "mock-v1". Provider interface is real; implementation is a placeholder.
- Token transfers — No USDC/SOL moved. On-chain anchors the commitment only.
- Reveal delay — Policy = 10 min; demo = 10 sec. Explicit in `privacyPolicy.ts`.

**中文：**

**真实实现：**
- 规则引擎 — `applyRules()` 运行真实的条件逻辑。三种模式，可配置阈值。这是产品的核心。
- 基于角色的访问控制 — `canReveal(tx, role)` 正确执行每个角色的权限。
- Ed25519 链上承诺 — 发送方签名承诺，Solana Ed25519 预编译在链上验证，Memo 程序写入承诺。真实的 devnet 交易——点击 Explorer 链接可查。
- 钱包集成 — 真实的 Phantom，真实的公钥，真实的 devnet。

**模拟实现：**
- ZK 证明生成 — `mockZkProvider` 使用 FNV-1a 哈希，没有密码学意义，明确标记为"mock-v1"，provider 接口是真实的，实现是占位符。
- 代币转账 — 没有真实的 USDC/SOL 转移，链上组件仅锚定承诺。
- 解密延迟 — 策略设为 10 分钟，演示运行 10 秒，在 `privacyPolicy.ts` 中明确标注。

---

### Q5: How would this work in production?
### 生产环境中如何运作？

**EN:**
Four changes to go from demo to production:

1. **Replace `mockZkProvider` with Light Protocol** — Same interface. `generateProof()` and `verifyProof()` get real implementations. Zero changes upstream.
2. **Add a Solana program** — Custom program that stores commitment hashes, enforces reveal authorization on-chain, and emits events for indexing.
3. **Real token transfers** — Integrate SPL Token transfers. Privacy rules apply to the transfer metadata.
4. **Indexer** — Audit view currently reads from local state. Production needs an on-chain indexer for commitment accounts.

The Rule Engine and Policy Engine don't change. The architecture is designed so the cryptography layer upgrades independently.

**中文：**
从演示到生产需要四个变化：

1. **将 `mockZkProvider` 替换为 Light Protocol** — 相同接口，`generateProof()` 和 `verifyProof()` 获得真实实现，上游代码零修改。
2. **添加 Solana 程序** — 自定义程序存储承诺哈希，在链上强制执行解密授权，并为索引发出事件。
3. **真实代币转账** — 集成 SPL Token 转账，隐私规则应用于转账元数据。
4. **索引器** — 审计视图目前从本地状态读取，生产环境需要链上承诺账户的索引器。

规则引擎和策略引擎不需要改变。架构设计使密码学层可以独立升级。

---

### Q6: Why Solana?
### 为什么选择 Solana？

**EN:**
Three reasons that matter for this use case:

**Speed and cost** — Privacy operations are computationally expensive. Solana's 400ms block times and sub-cent fees make this practical at scale. On Ethereum, a ZK verification instruction would cost dollars and take seconds.

**Ed25519 precompile** — Solana has a native Ed25519 signature verification precompile. We can verify cryptographic commitments on-chain at minimal cost, without deploying a custom verification contract. That's a first-class primitive that made our architecture straightforward.

**Ecosystem** — Light Protocol — the ZK layer we're targeting for production — is built on Solana. The ZK compression infrastructure is Solana-native.

**中文：**
三个对这个用例至关重要的原因：

**速度和成本** — 隐私操作计算成本高。Solana 400 毫秒的出块时间和低于一分钱的手续费使其在规模化时可行。在以太坊上，一个 ZK 验证指令需要花费几美元并等待几秒钟。

**Ed25519 预编译** — Solana 有原生的 Ed25519 签名验证预编译。我们可以以最低成本在链上验证密码学承诺，无需部署自定义验证合约。这是使我们架构简洁的一等基础设施。

**生态系统** — Light Protocol——我们为生产环境目标的 ZK 层——构建在 Solana 上，ZK 压缩基础设施是 Solana 原生的。

---
---

## PART 4 · SUBMISSION CHECKLIST · 提交检查清单

---

### Required Materials / 必要材料

- [ ] **GitHub Repository / GitHub 仓库**
  - [ ] Public repo / 公开仓库
  - [ ] README.md complete (EN + ZH, all 9 sections) / README 完整（中英文，9 个章节）
  - [ ] `npx tsc --noEmit` passes / TypeScript 零报错
  - [ ] Clear commit history / 清晰的提交历史

- [ ] **Live Demo Link / 在线演示链接**
  - [ ] Deployed to Vercel / 部署到 Vercel
  - [ ] Works on devnet without local setup / 无需本地配置即可在 devnet 运行
  - [ ] Full send flow tested on deployed URL / 在部署 URL 上测试完整发送流程

- [ ] **Demo Video / 演示视频** (3–5 min / 3-5 分钟)
  - [ ] Shows: connect → send → Explorer → audit → role switch → reveal / 展示：连接→发送→Explorer→审计→切换角色→解密
  - [ ] Narrate what's real vs mocked / 旁白说明哪些是真实的，哪些是模拟的
  - [ ] Show the Solana Explorer transaction / 展示 Solana Explorer 上的交易
  - [ ] Mention ZK plugin architecture / 提及 ZK 插件架构

- [ ] **Pitch Deck / 演讲稿**
  - [ ] 8 slides exported to PDF / 8 页幻灯片导出为 PDF
  - [ ] Architecture diagram included / 包含架构图
  - [ ] Real vs Mocked table included / 包含真实 vs 模拟对比表
  - [ ] Team info on title slide / 封面包含团队信息

- [ ] **Project Description / 项目描述** (200–500 words / 200-500 词)

  **EN:**
  > VeilPay is a programmable privacy layer for Solana payments. Rather than forcing a binary choice between full transparency and full anonymity, VeilPay lets senders define per-transaction privacy rules: who can see the amount, sender, and receiver — under what conditions and for how long. The Rule Engine evaluates policies and produces a masked PublicView. Authorized roles can reveal on demand. Every transaction anchors a commitment to Solana devnet via Ed25519 signature verification (Solana precompile) and Memo program. The ZK proof layer is a pluggable interface — currently mocked, designed to slot in Light Protocol for production.

  **中文：**
  > VeilPay 是 Solana 支付的可编程隐私层。它不强迫用户在完全透明和完全匿名之间二选一，而是让发送方为每笔交易定义隐私规则：谁可以看到金额、发送方和接收方——在什么条件下，持续多长时间。规则引擎评估策略并生成遮罩公开视图，授权角色可按需解密。每笔交易通过 Ed25519 签名验证（Solana 预编译）和 Memo 程序将承诺锚定到 Solana devnet。ZK 证明层为可插拔接口——当前为模拟实现，设计用于在生产环境中接入 Light Protocol。

- [ ] **Track / Award Category / 赛道/奖项类别**
  - [ ] DeFi / Privacy / Infrastructure track / DeFi / 隐私 / 基础设施赛道
  - [ ] Best UI/UX award — strong candidate / 最佳 UI/UX 奖——强力候选
  - [ ] Best use of Solana primitives — Ed25519 precompile angle / 最佳使用 Solana 基础设施——Ed25519 预编译角度

---

### Pre-Demo Checklist (Day of) / 演示当天检查清单

- [ ] Phantom installed, switched to **Devnet** / Phantom 已安装并切换到 **Devnet**
- [ ] Wallet has devnet SOL (use ⚡ + SOL or faucet.solana.com) / 钱包有 devnet SOL（使用 ⚡ + SOL 或 faucet.solana.com）
- [ ] Demo URL opens and wallet connects / 演示 URL 可打开且钱包可连接
- [ ] Full send flow works: two Phantom popups, Explorer link appears / 完整发送流程正常：两次 Phantom 弹窗，Explorer 链接出现
- [ ] Audit page shows the transaction / 审计页显示交易
- [ ] Role switch → countdown → reveal works / 角色切换 → 倒计时 → 解密正常
- [ ] Screen recording of successful demo flow ready as backup / 备用：成功演示流程的屏幕录制已准备好
