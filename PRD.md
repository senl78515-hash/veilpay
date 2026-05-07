# VeilPay MVP Product Requirements Document

**Version 1.0 | Hackathon Edition | May 2026**

---

## English Version

---

## 1. Problem

Blockchain transactions are transparent by design — every amount, sender, and receiver is publicly visible on-chain. This creates a fundamental conflict for real-world adoption:

- **Businesses** need financial privacy for payroll, procurement, and competitive reasons
- **Regulators and auditors** need access to financial data for compliance
- **Users** want control over who sees their transaction details

Today's options are binary: either fully public (like most L1 chains) or fully private (like Zcash/Tornado Cash — which are compliance nightmares). Neither works for institutional or everyday use.

**The gap:** There is no programmable middle ground where users can define *who sees what, when, and under what conditions.*

---

## 2. Target Users

| User Type | Description | Primary Need |
|-----------|-------------|--------------|
| **Payer (e.g., HR/Finance team)** | Sends on-chain payments to employees or vendors | Hide salary details from public, allow auditor access |
| **Receiver (e.g., Employee)** | Receives on-chain payment | See own transaction data, protect salary from peers |
| **Auditor / Compliance Officer** | Authorized third-party reviewer | Reveal hidden data on demand with proper authorization |
| **Observer (Public)** | Anyone viewing the blockchain | Sees only what the payer intended them to see |

---

## 3. Core Use Case: On-Chain Payroll

A company runs payroll on Solana.

- Alice (HR) sends salaries to 10 employees
- Each transaction has different amounts — employees should not see each other's salaries
- The public blockchain shows the transactions exist, but amounts and identities are masked
- The company's auditor can reveal full details when required
- After 90 days, all data auto-reveals for archival compliance

This single scenario demonstrates the full power of programmable privacy: **selective, conditional, and time-based disclosure.**

---

## 4. Product Vision

> **Privacy should be a programmable contract, not a binary switch.**

VeilPay is a **programmable privacy layer** built on Solana. It does not hide transactions — it gives users fine-grained control over transaction visibility.

Think of it as access control for financial data, on-chain.

The long-term vision is a privacy middleware that any dApp, protocol, or institution can plug into — but for this MVP, we demonstrate the concept through a clean, demo-ready payroll flow.

**Core design principle:** Every transaction carries a *privacy policy* — a set of rules that governs who can see what, and when. The rule engine enforces this policy on every data read.

---

## 5. MVP Scope

This is a **hackathon demo MVP**. The goal is to demonstrate the concept convincingly and tell a clear product story.

**In scope:**
- Send a payment with selectable privacy mode
- Define privacy rules per transaction (amount, sender, receiver visibility)
- Simulate rule-based selective disclosure (auditor reveal)
- Simulate time-based reveal (delay unlock)
- Audit view showing hidden vs revealed state
- Solana devnet integration (real transactions, simulated privacy layer)

**Out of scope (explicitly):**
- Zero-knowledge proof implementation
- On-chain encryption (use client-side simulation for demo)
- Multi-signature authorization flows
- Production-grade key management
- Mobile app

---

## 6. Feature Breakdown

### Page 1 — Send Payment

**Purpose:** Entry point for creating a privacy-controlled transaction.

| Element | Description |
|---------|-------------|
| Recipient Address | Input field (wallet address or ENS-style alias) |
| Amount | SOL or SPL token amount |
| Privacy Mode Selector | Three modes: **Public** / **Private** / **Rule-Based** |
| Rules Quick-Set | If Rule-Based: toggle hide amount / hide sender / hide receiver |
| Advanced Rules | Link to Privacy Rules page for detailed configuration |
| Send Button | Submits transaction to Solana devnet with privacy metadata |

**Privacy Mode Behavior:**
- **Public** — standard transaction, all data visible
- **Private** — all fields hidden from public view
- **Rule-Based** — custom rules apply (routes to rule configuration)

---

### Page 2 — Privacy Rules (Core Feature)

**Purpose:** Define the programmable privacy policy for a transaction or set of transactions.

This is the heart of VeilPay. Rules are composable and human-readable.

**Rule Categories:**

#### Field Visibility Rules
| Rule | Description |
|------|-------------|
| Hide Amount | Amount is masked publicly; optionally set threshold (e.g., hide if > 1000 SOL) |
| Hide Sender | Sender address is masked |
| Hide Receiver | Receiver address is masked |

#### Selective Disclosure Rules
| Rule | Description |
|------|-------------|
| Auditor Access | Designate a wallet address as authorized to reveal all hidden fields |
| Receiver-Only View | Only the receiver can see the amount |
| Custom Role | Assign any wallet as a named role (e.g., "Tax Authority") with reveal permissions |

#### Time-Based Rules
| Rule | Description |
|------|-------------|
| Reveal After Delay | Hidden data auto-reveals after N days (e.g., 90 days) |
| Reveal On Date | Scheduled reveal at a specific timestamp |

**Rule Preview Panel:** Real-time display showing "what the public sees" vs "what the auditor sees" as rules are configured. This is critical for demo storytelling.

---

### Page 3 — Audit View

**Purpose:** Demonstrate the before/after state of privacy — the key demo moment.

**Layout (split view):**

| Left Panel — Public View | Right Panel — Revealed View |
|--------------------------|------------------------------|
| Transaction hash | Transaction hash |
| Amount: `[HIDDEN]` | Amount: 2,500 SOL |
| Sender: `[HIDDEN]` | Sender: Alice.sol |
| Receiver: `[HIDDEN]` | Receiver: Bob.sol |
| Timestamp | Timestamp |
| Rule status: "Auditor reveal required" | Rule status: "Revealed by Auditor" |

**Reveal Action:** Auditor connects wallet → clicks "Reveal" → system checks authorization → data unlocks.

**Timeline View:** Show the lifecycle of a transaction's privacy state — Created → Rules Applied → Auditor Revealed / Time Expired.

---

### Page 4 — Transaction Dashboard

**Purpose:** Overview of all transactions with their current privacy states.

| Column | Description |
|--------|-------------|
| Transaction ID | Short hash |
| Status | Public / Hidden / Partially Revealed |
| Privacy Policy | Summary of applied rules |
| Reveal Status | Pending / Revealed / Scheduled |
| Actions | View / Reveal / Edit Rules |

---

## 7. User Flow

```
[User opens VeilPay]
        │
        ▼
[Connect Wallet] ──────────────────────────────────────────────┐
        │                                                       │
        ▼                                                    [Auditor]
[Send Payment Page]                                             │
   - Enter recipient                                            │
   - Enter amount                                               ▼
   - Select: Rule-Based ──────────────────────► [Audit View Page]
        │                                          - See hidden data
        ▼                                          - Click "Reveal"
[Privacy Rules Page]                               - See revealed data
   - Hide amount if > 1000                                      │
   - Hide sender/receiver                                       ▼
   - Add auditor: auditor.sol                   [Timeline: Rules Applied →
   - Set reveal delay: 90 days                   Auditor Revealed]
        │
        ▼
[Confirm & Send]
   - Preview: "Public sees [HIDDEN]"
   - Transaction sent to Solana devnet
        │
        ▼
[Transaction Dashboard]
   - Status: Hidden
   - Rules: Active
   - Reveal: Pending auditor
```

---

## 8. Success Criteria (Demo-Focused)

| Criteria | Signal |
|----------|--------|
| **Concept clarity** | A non-technical judge understands the problem in 30 seconds |
| **Live transaction** | Real Solana devnet transaction fires and is visible on explorer |
| **Privacy contrast** | Public view vs revealed view is visually striking and instantly understandable |
| **Rule configurability** | Demo shows at least 3 rule types working (hide amount, auditor reveal, time delay) |
| **Auditor flow** | Auditor wallet connects, triggers reveal, data unlocks — live on stage |
| **Storytelling** | Payroll narrative holds throughout: HR sends → employee receives → auditor reveals |

**Demo script target:** Full walkthrough in under 3 minutes, ending on the split Audit View showing hidden → revealed.

---

## 9. Out of Scope

| Feature | Reason Excluded |
|---------|-----------------|
| Zero-Knowledge Proofs | Too complex for hackathon timeframe; simulated cryptography is sufficient for demo |
| On-chain encryption | Use client-side rule enforcement and metadata masking for MVP |
| Multi-sig authorization | Adds UX friction; single auditor wallet sufficient for demo |
| Token support beyond SOL | Scope reduction; SOL transfers are sufficient to prove the concept |
| Mobile / responsive design | Desktop-first for demo presentation |
| User account system | Wallet-based identity is sufficient |
| Rule editing after send | Post-send rule mutation deferred to post-hackathon |

---

## 10. Technical Considerations

**Stack (recommended):**
- **Frontend:** Next.js + Tailwind CSS + shadcn/ui
- **Wallet:** Solana Wallet Adapter (Phantom / Backpack)
- **Chain:** Solana Devnet
- **Transaction metadata:** Store privacy rules in transaction memo field (base64 encoded JSON) or off-chain in a lightweight backend
- **Privacy simulation:** Client-side rule engine reads metadata and applies masking/reveal logic
- **State management:** Zustand or React Context

**Privacy Layer Architecture (MVP simplification):**

```
Transaction Object
├── On-chain: standard SOL transfer (real, verifiable)
└── Metadata layer: privacy rules JSON
        ├── hiddenFields: ["amount", "sender", "receiver"]
        ├── authorizedRevealer: "auditor-wallet-pubkey"
        └── revealAfter: 1717200000 (Unix timestamp)

Rule Engine (client-side)
├── Reads metadata
├── Checks: is current viewer authorized?
├── Checks: has reveal time passed?
└── Returns: visible or masked field values
```

**Key technical note:** For the hackathon, encryption is simulated. The "hidden" data is stored in metadata but masked by the client-side rule engine. The demo shows the *concept* of programmable privacy — production would replace this with ZK proofs or on-chain encryption (e.g., using Lit Protocol or similar).

**Solana-specific considerations:**
- Use Solana memo program for attaching privacy rule metadata to transactions
- Devnet SOL airdrop for demo wallets
- Keep transaction fees minimal — use compressed NFTs or memo instructions

---
---

## 中文版本 (Chinese Version)

---

# VeilPay MVP 产品需求文档

**1.0 版 | 黑客松参赛版 | 2026年5月**

---

## 1. 问题背景

区块链交易天然透明——每一笔金额、发送方、接收方都在链上公开可查。这对真实场景的落地造成了根本性矛盾：

- **企业**需要保护薪资、采购等敏感财务信息
- **监管机构和审计方**需要在合规场景下访问财务数据
- **用户**希望自主决定谁能看到自己的交易记录

现有方案都是两个极端：要么完全公开（如大多数主链），要么完全隐藏（如 Zcash / Tornado Cash——合规噩梦）。两者都无法满足机构和日常使用的需求。

**核心缺口：** 目前没有任何工具能让用户以可编程方式定义——谁能看到什么、在什么时候看到、在什么条件下才能看到。

---

## 2. 目标用户

| 角色 | 描述 | 核心需求 |
|------|------|----------|
| **付款方（如 HR / 财务）** | 向员工或供应商发起链上支付 | 对外隐藏薪资，允许审计方查阅 |
| **收款方（如员工）** | 接收链上薪资 | 只看到自己的数据，不让同事看到 |
| **审计方 / 合规官员** | 经授权的第三方审查人 | 在需要时揭示隐藏数据 |
| **公众观察者** | 任意链上数据浏览者 | 只能看到付款方允许公开的信息 |

---

## 3. 核心使用场景：链上发薪

一家公司在 Solana 上进行链上薪资发放。

- Alice（HR）向 10 名员工发送薪资
- 每笔金额不同——员工之间不应互相知道薪资
- 区块链上可见"交易存在"，但金额和身份信息被遮蔽
- 公司审计方在必要时可授权揭示完整数据
- 90 天后数据自动公开，满足归档合规要求

这一场景完整展示了可编程隐私的核心价值：**选择性、条件性、时间性的数据披露。**

---

## 4. 产品愿景

> **隐私应该是可编程的合约，而不是一个开关。**

VeilPay 是构建于 Solana 之上的**可编程隐私层**。它不是"隐藏交易"，而是给用户提供对交易可见性的精细控制权。

可以理解为：链上财务数据的访问控制系统。

长期愿景是成为任何 dApp、协议或机构都可接入的隐私中间件。本次 MVP 以一个清晰的链上发薪演示来验证这一核心概念。

**核心设计原则：** 每笔交易携带一份"隐私策略"——一组规则，定义谁能看到什么、什么时候看到。规则引擎在每次数据读取时强制执行这些规则。

---

## 5. MVP 范围

本版本是**黑客松演示 MVP**，目标是清晰地传达产品概念，讲好产品故事。

**包含功能：**
- 发起带隐私模式选择的支付
- 为每笔交易定义隐私规则（金额、发送方、接收方可见性）
- 模拟基于规则的选择性披露（审计方揭示）
- 模拟基于时间的自动揭示（延迟解锁）
- 审计视图（隐藏前 vs 揭示后对比展示）
- Solana 开发网集成（真实交易 + 模拟隐私层）

---

## 6. 功能详情

### 页面一 — 发送支付

**用途：** 创建隐私受控交易的入口。

| 元素 | 说明 |
|------|------|
| 接收方地址 | 输入钱包地址或别名 |
| 金额 | SOL 或 SPL 代币金额 |
| 隐私模式选择 | 三种模式：**公开 / 私密 / 规则定制** |
| 快速规则设置 | 勾选隐藏金额 / 隐藏发送方 / 隐藏接收方 |
| 高级规则入口 | 跳转到隐私规则页进行详细配置 |
| 发送按钮 | 携带隐私元数据提交至 Solana 开发网 |

---

### 页面二 — 隐私规则（核心功能）

**用途：** 为交易定义可编程的隐私策略。这是 VeilPay 的核心。

**规则分类：**

#### 字段可见性规则
| 规则 | 说明 |
|------|------|
| 隐藏金额 | 金额对外屏蔽；可设条件（如：金额 > 1000 时隐藏） |
| 隐藏发送方 | 发送方地址对外屏蔽 |
| 隐藏接收方 | 接收方地址对外屏蔽 |

#### 选择性披露规则
| 规则 | 说明 |
|------|------|
| 审计方访问权限 | 指定某钱包地址为授权揭示方 |
| 仅接收方可见 | 只有接收方能查看金额 |
| 自定义角色 | 为任意钱包分配命名角色（如"税务机关"）并赋予揭示权限 |

#### 时间规则
| 规则 | 说明 |
|------|------|
| 延迟揭示 | 隐藏数据在 N 天后自动公开（如 90 天） |
| 定时揭示 | 指定时间戳自动公开 |

**规则预览面板：** 实时展示"公众看到的内容" vs "审计方看到的内容"，是演示中的关键叙事工具。

---

### 页面三 — 审计视图

**用途：** 展示隐私"揭示前 vs 揭示后"的对比效果——演示的高潮时刻。

| 左侧：公众视图 | 右侧：揭示后视图 |
|----------------|-----------------|
| 交易哈希 | 交易哈希 |
| 金额：`[已隐藏]` | 金额：2,500 SOL |
| 发送方：`[已隐藏]` | 发送方：Alice.sol |
| 接收方：`[已隐藏]` | 接收方：Bob.sol |
| 时间戳 | 时间戳 |
| 规则状态："需审计方揭示" | 规则状态："已由审计方揭示" |

**揭示操作：** 审计方连接钱包 → 点击"揭示" → 系统验证授权 → 数据解锁展示。

**时间线视图：** 展示交易隐私状态的生命周期——创建 → 规则生效 → 审计揭示 / 定时到期公开。

---

### 页面四 — 交易总览

**用途：** 汇总展示所有交易及其当前隐私状态。

| 列 | 说明 |
|----|------|
| 交易 ID | 短哈希 |
| 状态 | 公开 / 隐藏 / 部分揭示 |
| 隐私策略 | 已应用规则摘要 |
| 揭示状态 | 等待中 / 已揭示 / 定时揭示 |
| 操作 | 查看 / 揭示 / 编辑规则 |

---

## 7. 用户流程

```
[用户打开 VeilPay]
        │
        ▼
[连接钱包] ─────────────────────────────────────────────────┐
        │                                                    │
        ▼                                               [审计方]
[发送支付页面]                                               │
   - 填写接收方                                              │
   - 填写金额                                                ▼
   - 选择：规则定制 ──────────────────────► [审计视图页面]
        │                                     - 查看隐藏数据
        ▼                                     - 点击"揭示"
[隐私规则页面]                                - 查看完整数据
   - 金额 > 1000 时隐藏                                      │
   - 隐藏发送方/接收方                                        ▼
   - 授权审计方：auditor.sol              [时间线：规则生效 →
   - 设置延迟揭示：90天                    审计揭示完成]
        │
        ▼
[确认并发送]
   - 预览："公众看到 [已隐藏]"
   - 交易提交至 Solana 开发网
        │
        ▼
[交易总览页面]
   - 状态：隐藏中
   - 规则：生效中
   - 揭示：等待审计方
```

---

## 8. 成功标准（演示导向）

| 标准 | 判断信号 |
|------|----------|
| **概念传达清晰** | 非技术评委在 30 秒内理解问题 |
| **真实链上交易** | Solana 开发网交易真实触发，链上浏览器可查 |
| **隐私对比震撼** | 隐藏视图 vs 揭示视图的视觉差异直观强烈 |
| **规则可配置性** | 演示至少 3 种规则类型（隐藏金额、审计揭示、时间揭示） |
| **审计流程完整** | 审计方连接钱包 → 触发揭示 → 数据解锁，现场完成 |
| **叙事连贯** | 贯穿整个演示的发薪叙事：HR 发起 → 员工接收 → 审计揭示 |

**演示脚本目标：** 3 分钟内完整演示，结尾定格在审计视图的隐藏→揭示对比画面。

---

## 9. 不在范围内

| 功能 | 排除原因 |
|------|----------|
| 零知识证明实现 | 黑客松时间内无法完成；演示阶段用模拟加密即可 |
| 链上加密 | MVP 使用客户端规则引擎 + 元数据遮蔽模拟隐私效果 |
| 多签授权流程 | 增加 UX 复杂度；单审计方钱包足以演示 |
| 多代币支持 | 聚焦 SOL 转账已足够验证核心概念 |
| 移动端 / 响应式设计 | 演示优先桌面端展示 |
| 用户账户体系 | 钱包即身份，无需额外账户系统 |
| 发送后修改规则 | 延至黑客松后版本实现 |

---

## 10. 技术方案（黑客松简化版）

**推荐技术栈：**
- **前端：** Next.js + Tailwind CSS + shadcn/ui
- **钱包：** Solana Wallet Adapter（Phantom / Backpack）
- **链：** Solana 开发网（Devnet）
- **交易元数据：** 隐私规则以 JSON 格式编码，写入交易 memo 字段或轻量后端
- **隐私模拟：** 客户端规则引擎读取元数据，执行遮蔽/揭示逻辑
- **状态管理：** Zustand 或 React Context

**隐私层架构（MVP 简化）：**

```
交易对象
├── 链上：标准 SOL 转账（真实可验证）
└── 元数据层：隐私规则 JSON
        ├── hiddenFields: ["amount", "sender", "receiver"]
        ├── authorizedRevealer: "审计方钱包公钥"
        └── revealAfter: 1717200000（Unix 时间戳）

规则引擎（客户端）
├── 读取元数据
├── 判断：当前查看者是否有权限？
├── 判断：揭示时间是否已到？
└── 返回：可见或遮蔽的字段值
```

**重要说明：** 黑客松阶段，加密为模拟实现。"隐藏"数据存储在元数据中，由客户端规则引擎控制展示。演示呈现的是可编程隐私的**核心概念**——生产版本将替换为零知识证明或链上加密方案（如 Lit Protocol）。

**Solana 具体注意事项：**
- 使用 Solana Memo Program 将隐私规则元数据附加到交易
- 演示钱包通过 Devnet 水龙头获取测试 SOL
- 保持链上费用极低——使用 memo 指令即可

---

*VeilPay — Privacy is not a feature. It's a policy.*
