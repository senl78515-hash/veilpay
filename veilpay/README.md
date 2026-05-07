# VeilPay — Programmable Privacy for On-Chain Payments

> **Privacy is not binary. It should be programmable.**

[English](#english) · [中文](#中文)

---

<a name="english"></a>
# English

## Project Overview

VeilPay is a programmable privacy layer built on Solana. It lets senders define a **per-transaction privacy policy** — specifying who can see the amount, sender address, and receiver address, under what conditions, and for how long — without sacrificing auditability or compliance.

---

## Problem

Every transaction on Solana is fully public by default. Existing privacy solutions force a binary choice:

| Approach | Problem |
|----------|---------|
| **Fully public** | Amounts, senders, and receivers are permanently visible to anyone |
| **Fully hidden** (mixers) | Breaks compliance, triggers regulators, destroys auditability |

There is no middle ground. Enterprises cannot use on-chain payments for payroll, invoicing, or treasury operations because they cannot control who sees what.

---

## Solution

VeilPay introduces **programmable privacy rules** at the transaction layer.

Instead of hiding everything or hiding nothing, you define a policy:

- Hide the amount if it exceeds a threshold
- Hide the sender and/or receiver address
- Allow only specific roles (auditor, company admin, DAO governance) to decrypt
- Enforce a time delay before any reveal is possible

The **Rule Engine** applies these policies deterministically. The public sees `[Hidden]` for masked fields. Authorized parties can reveal data on demand. Everything is auditable.

**Demo scenario:** On-chain payroll. HR sends salaries to 10 employees. The public sees that transactions occurred, but amounts are hidden. The company auditor can reveal full data on demand. After 90 days, data auto-reveals for archival.

---

## Key Features

- **Rule Engine** — A fully implemented conditional logic engine. `applyRules(fields, mode, rules)` evaluates privacy policies and produces a `PublicView` with masked fields. Supports three modes: `public`, `private`, `rule-based`.

- **Pluggable ZK Provider** — A `ZKProvider` interface abstracts the proof layer. The current implementation is a mock provider (hash-based simulation). Swapping in Light Protocol or any real ZK system requires only replacing the provider implementation — the interface and all upstream code remain unchanged.

- **On-Chain Commitment** — Every transaction anchors a cryptographic commitment to Solana devnet via two atomic instructions: (1) Ed25519 signature verification by the Solana precompile, (2) Memo program write. Invalid signature = entire tx rejected by the network.

- **Role-Based Access Control** — Five roles: `public`, `user`, `auditor`, `companyAdmin`, `daoGovernance`. Each role has different reveal permissions enforced by the privacy policy engine.

- **Time-Delayed Reveal** — Transactions can be locked for a configurable delay. Countdown visible in Audit view. Demo mode compresses to 10 seconds.

- **Wallet Integration** — Phantom via `window.solana`. Silent reconnect. Airdrop button for devnet SOL.

- **Full i18n** — English and Chinese, switchable at runtime.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        VeilPay UI Layer                         │
│   Send Page · Rules Builder · Audit View · Role Switcher        │
└────────────────────────┬────────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                      Rule Engine                                │
│  applyRules(fields, mode, rule) → PublicView                    │
│  Modes: public | private | rule-based                           │
│  Fields: amount · sender · receiver                             │
│  Conditions: hideAmountAbove · hideSender · hideReceiver        │
│             revealTo[roles] · delayMinutes                      │
└────────────────────────┬────────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                   Cryptography Layer                            │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              ZK Provider Interface (pluggable)          │   │
│  │  generateProof(tx, rules) → ZKProof                     │   │
│  │  verifyProof(proof) → boolean                           │   │
│  │  createCommitment(sender, receiver, amount) → hash      │   │
│  │                                                         │   │
│  │  Current:    MockProvider  (FNV-1a hash simulation)     │   │
│  │  Production: Light Protocol ZK Compressed Accounts      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │           On-Chain Commitment (Solana Devnet)           │   │
│  │  1. wallet.signMessage(commitment)  ← Ed25519 sig       │   │
│  │  2. Ed25519Program.verify(sig)  ── Solana precompile    │   │
│  │  3. MemoProgram.write(commitment) ─ permanent record    │   │
│  │  Single atomic tx: invalid sig → entire tx rejected     │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                  Privacy Policy Engine                          │
│  canReveal(tx, role) → boolean                                  │
│  getSecondsUntilReveal(tx) → number                             │
│  Roles: public · user · auditor · companyAdmin · daoGovernance  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Demo Flow

**Before starting:** Install [Phantom](https://phantom.app/), switch to Devnet.

| Step | Action | What you see |
|------|--------|-------------|
| 1 | Open the landing page | Problem framing, solution overview |
| 2 | Click **Connect Wallet** (top right) | Phantom connects, address appears |
| 3 | Click **⚡ + SOL** on the Send page | 0.5 devnet SOL airdropped for gas |
| 4 | Fill the Send form, click **Send Payment** | Phantom Popup 1: Sign Message (Ed25519) |
| 5 | Approve in Phantom | Phantom Popup 2: Approve Transaction |
| 6 | Approve in Phantom | Success screen with on-chain signature |
| 7 | Click **View on Solana Explorer** | Real transaction visible on devnet |
| 8 | Click **View in Audit** | Transaction listed with `[Hidden]` fields |
| 9 | Open detail, switch role to **Auditor** | 10-second countdown begins |
| 10 | Wait for countdown | Fields reveal: real amount, sender, receiver |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 · App Router · TypeScript |
| Styling | Tailwind CSS v4 (CSS-first, no config file) |
| State | Zustand with `persist` middleware |
| On-chain | Solana devnet · Ed25519 precompile · Memo Program |
| Wallet | Phantom (`window.solana`, Wallet Standard compatible) |
| Client SDK | `@solana/web3.js` v1.98 |
| i18n | Custom `useT()` hook · EN / ZH |

---

## What Is Real vs Mocked

| Component | Status | Details |
|-----------|--------|---------|
| **Rule Engine** | ✅ **Real** | `applyRules()` fully implements conditional field masking. All three modes work correctly. |
| **Role-based access control** | ✅ **Real** | `canReveal(tx, role)` enforces per-role permissions. Demonstrated live in the Audit role switcher. |
| **Ed25519 on-chain commitment** | ✅ **Real** | Sender signs the commitment. Solana's Ed25519 precompile verifies on-chain. Memo program writes the permanent record. |
| **Wallet connection** | ✅ **Real** | Phantom on Solana devnet. Real public key used as sender address. |
| **ZK proof generation** | ⚠️ **Mocked** | `mockZkProvider` uses FNV-1a hash to simulate proof structure. Not cryptographically meaningful. **By design** — see ZK Roadmap. |
| **Token transfers** | ⚠️ **Simulated** | No real USDC/SOL transferred. On-chain component anchors the commitment only. |
| **Reveal delay** | ⚠️ **Compressed** | Policy displays "10 minutes." Demo timer runs 10 seconds. Explicit in `privacyPolicy.ts`. |

---

## ZK Roadmap

The ZK proof layer is intentionally abstracted behind a pluggable provider interface:

```typescript
// lib/mockZkProvider.ts — current
export function generateProof(tx, rules): ZKProof { ... }  // hash simulation
export function verifyProof(proof): boolean { ... }        // flag check
export function createCommitment(...): string { ... }      // FNV-1a hash

// Production: same interface, real ZK circuits
// import { generateProof, verifyProof, createCommitment } from './lightProtocolProvider'
```

The interface contract is stable. Replacing the provider does not change the Rule Engine, Policy Engine, UI, or on-chain anchoring logic.

| Stage | Technology | Capability |
|-------|-----------|-----------|
| **Current** | Ed25519 commitment | Non-repudiation, on-chain binding |
| **Next** | Light Protocol ZK Compressed Accounts | Prove amount is in range without revealing it |
| **Future** | Custom circuits (Circom / Groth16) | Arbitrary policy proofs |

---

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| ZK provider as a pluggable interface | Swap mock → Light Protocol without touching the UI layer |
| Ed25519 on-chain commitment (not ZK) | Real cryptographic non-repudiation today; ZK circuits require weeks to audit |
| Rules as a separate page | Privacy policy is a first-class concept, not a send-time afterthought |
| Role switcher in Audit view | All access levels demonstrable in one place without multiple accounts |
| 10-second demo delay | Policy says "10 minutes"; compressed to 10 seconds for live presentations |

---

## How to Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

**Type check:**
```bash
npx tsc --noEmit
```

**For the full on-chain demo:**
1. Install [Phantom](https://phantom.app/) browser extension
2. Phantom → Settings → Developer Settings → **Devnet**
3. Connect wallet in the app → click **⚡ + SOL** to fund for gas
4. Send a transaction — two Phantom popups will appear

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font).

**Learn more about Next.js:**
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

**Deploy:**
The easiest way to deploy is [Vercel](https://vercel.com/new). See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

---

<a name="中文"></a>
# 中文

## 项目概述

VeilPay 是构建在 Solana 上的可编程隐私支付层。它允许发送方为每笔交易定义**隐私策略**——指定谁能看到金额、发送方地址和接收方地址，在什么条件下，持续多长时间——同时不牺牲可审计性和合规性。

---

## 问题

Solana 上的所有交易默认完全公开。现有隐私解决方案强迫用户二选一：

| 方案 | 问题 |
|------|------|
| **完全公开** | 金额、发送方、接收方对任何人永久可见 |
| **完全隐藏**（混币器） | 破坏合规性，触发监管，摧毁可审计性 |

两者之间没有中间地带。企业无法将链上支付用于工资发放、开票或资金管理，因为他们无法控制谁能看到什么。

---

## 解决方案

VeilPay 在交易层引入**可编程隐私规则**。

不是隐藏一切或不隐藏任何东西，而是定义策略：

- 金额超过阈值时隐藏
- 隐藏发送方和/或接收方地址
- 只允许特定角色（审计员、公司管理员、DAO 治理）解密
- 在解密前强制执行时间延迟

**规则引擎**确定性地应用这些策略。公众看到 `[Hidden]`，授权方可按需解密，一切可审计。

**Demo 场景：** 链上工资发放。HR 向 10 名员工发薪。公众只能看到交易存在，金额被隐藏。公司审计员可按需查看完整数据。90 天后数据自动解密归档。

---

## 核心功能

- **规则引擎** — 完整实现的条件逻辑引擎。`applyRules(字段, 模式, 规则)` 评估隐私策略并生成带遮罩字段的 `PublicView`。支持三种模式：`public`、`private`、`rule-based`。

- **可插拔 ZK Provider** — `ZKProvider` 接口抽象了证明层。当前实现为 mock provider（哈希模拟）。接入 Light Protocol 只需替换 provider 实现，接口和所有上游代码保持不变。

- **链上承诺** — 每笔交易通过两条原子指令将密码学承诺锚定到 Solana devnet：（1）Solana 预编译的 Ed25519 签名验证；（2）Memo 程序写入。签名无效则整笔交易被网络拒绝。

- **基于角色的访问控制** — 五种角色：`public`、`user`、`auditor`、`companyAdmin`、`daoGovernance`。每个角色拥有不同解密权限，由隐私策略引擎强制执行。

- **时间延迟解密** — 交易可锁定延迟期。倒计时在审计视图中可见。演示模式压缩为 10 秒。

- **钱包集成** — Phantom `window.solana`。静默重连。devnet SOL 空投按钮。

- **完整国际化** — 英文和中文，运行时可切换。

---

## 架构

```
┌─────────────────────────────────────────────────────────────────┐
│                          UI 层                                  │
│     发送页 · 规则构建器 · 审计视图 · 角色切换器                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                       规则引擎                                   │
│  applyRules(字段, 模式, 规则) → 公开视图                          │
│  模式：public | private | rule-based                            │
│  字段：金额 · 发送方 · 接收方                                     │
│  条件：金额阈值 · 隐藏发送方 · 隐藏接收方 · 授权角色 · 延迟分钟数   │
└────────────────────────┬────────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                      密码学层                                    │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │            ZK Provider 接口（可插拔）                    │   │
│  │  generateProof(tx, rules) → ZKProof                     │   │
│  │  verifyProof(proof) → boolean                           │   │
│  │  createCommitment(sender, receiver, amount) → hash      │   │
│  │                                                         │   │
│  │  当前：MockProvider（FNV-1a 哈希模拟）                   │   │
│  │  生产：Light Protocol ZK 压缩账户                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              链上承诺（Solana Devnet）                   │   │
│  │  1. wallet.signMessage(commitment)  ← Ed25519 签名      │   │
│  │  2. Ed25519Program.verify(sig)  ── Solana 预编译验证    │   │
│  │  3. MemoProgram.write(commitment) ─ 永久记录            │   │
│  │  单笔原子交易：签名无效 → 整笔交易被网络拒绝               │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                      隐私策略引擎                                 │
│  canReveal(tx, role) → boolean                                  │
│  getSecondsUntilReveal(tx) → number                             │
│  角色：public · user · auditor · companyAdmin · daoGovernance   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Demo 流程

**开始前：** 安装 [Phantom](https://phantom.app/)，切换到 Devnet。

| 步骤 | 操作 | 你会看到 |
|------|------|---------|
| 1 | 打开落地页 | 问题阐述、解决方案概述 |
| 2 | 点击右上角**连接钱包** | Phantom 连接，地址显示 |
| 3 | 在发送页点击 **⚡ + SOL** | 空投 0.5 devnet SOL |
| 4 | 填写发送表单，点击**发送** | Phantom 弹窗①：签名消息（Ed25519） |
| 5 | 在 Phantom 确认 | Phantom 弹窗②：批准交易 |
| 6 | 在 Phantom 确认 | 成功界面，含链上签名 |
| 7 | 点击 **View on Solana Explorer** | 在 devnet 上看到真实交易 |
| 8 | 点击**在审计中查看** | 交易列表显示 `[Hidden]` 字段 |
| 9 | 打开交易详情，角色切换为**审计员** | 10 秒倒计时开始 |
| 10 | 等待倒计时结束 | 字段解密：真实金额、发送方、接收方 |

---

## 技术栈

| 层 | 技术 |
|---|------|
| 框架 | Next.js 16 · App Router · TypeScript |
| 样式 | Tailwind CSS v4（CSS-first，无配置文件） |
| 状态 | Zustand + `persist` 中间件 |
| 链上 | Solana devnet · Ed25519 预编译 · Memo Program |
| 钱包 | Phantom（`window.solana`，兼容 Wallet Standard） |
| 客户端 SDK | `@solana/web3.js` v1.98 |
| 国际化 | 自定义 `useT()` hook · EN / ZH |

---

## 真实实现 vs 模拟实现

| 组件 | 状态 | 说明 |
|------|------|------|
| **规则引擎** | ✅ **真实** | `applyRules()` 完整实现条件字段遮罩，三种模式全部正确运行 |
| **基于角色的访问控制** | ✅ **真实** | `canReveal(tx, role)` 强制执行每个角色的权限，审计视图角色切换器演示所有级别 |
| **Ed25519 链上承诺** | ✅ **真实** | 发送方签名承诺哈希，Solana Ed25519 预编译在链上验证，Memo 程序写入永久记录 |
| **钱包连接** | ✅ **真实** | Phantom 连接 Solana devnet，真实公钥用作发送方地址 |
| **ZK 证明生成** | ⚠️ **模拟** | `mockZkProvider` 使用 FNV-1a 哈希模拟证明结构，没有密码学意义，**有意为之**——见 ZK 路线图 |
| **代币转账** | ⚠️ **模拟** | 无真实 USDC/SOL 转账，链上组件仅锚定承诺 |
| **解密延迟** | ⚠️ **压缩** | 策略显示"10 分钟"，演示运行 10 秒，在 `privacyPolicy.ts` 中明确标注 |

---

## ZK 路线图

ZK 证明层有意抽象在可插拔 provider 接口之后：

```typescript
// lib/mockZkProvider.ts — 当前实现
export function generateProof(tx, rules): ZKProof { ... }  // 哈希模拟
export function verifyProof(proof): boolean { ... }        // 标志检查
export function createCommitment(...): string { ... }      // FNV-1a 哈希

// 生产替换：相同接口，真实电路
// import { generateProof, verifyProof, createCommitment } from './lightProtocolProvider'
```

接口契约稳定，替换 provider 不会改变规则引擎、策略引擎、UI 或链上锚定逻辑。

| 阶段 | 技术 | 能力 |
|------|------|------|
| **当前** | Ed25519 承诺 | 不可否认性、链上绑定 |
| **下一步** | Light Protocol ZK 压缩账户 | 在不暴露金额的情况下证明金额在某范围内 |
| **未来** | 自定义电路（Circom / Groth16） | 任意策略证明 |

---

## 核心设计决策

| 决策 | 理由 |
|------|------|
| ZK provider 可插拔接口 | 生产环境替换 Light Protocol 无需改动 UI 层 |
| Ed25519 链上承诺（非 ZK） | 今天就有真实密码学不可否认性；ZK 电路需数周审计 |
| 规则作为独立页面 | 隐私策略是一等公民，不是发送时的附带选项 |
| 审计视图内置角色切换 | 无需多个账户即可演示所有权限级别 |
| 10 秒 Demo 延迟压缩 | 策略设为"10 分钟"，演示压缩到 10 秒 |

---

## 本地运行

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

**类型检查：**
```bash
npx tsc --noEmit
```

**完整链上演示：**
1. 安装 [Phantom](https://phantom.app/) 浏览器扩展
2. Phantom → 设置 → 开发者设置 → 切换到 **Devnet**
3. 连接钱包 → 点击 **⚡ + SOL** 充值 Gas
4. 发送交易 — 将出现两次 Phantom 弹窗

本项目使用 [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) 自动优化和加载 [Geist](https://vercel.com/font) 字体。

**了解更多 Next.js：**
- [Next.js 文档](https://nextjs.org/docs)
- [学习 Next.js](https://nextjs.org/learn)

**部署：**
推荐使用 [Vercel 平台](https://vercel.com/new)。参见 [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying)。
