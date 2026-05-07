# VeilPay — Development Log
# VeilPay — 开发日志

完整记录两次 Claude Code 对话的所有构建决策、技术细节和解决方案。

---

## 项目基本信息

| 项目 | VeilPay |
|------|---------|
| 定位 | Solana 上的可编程隐私支付层 |
| 技术栈 | Next.js 16.2.4 + TypeScript + Tailwind CSS v4 + Zustand + @solana/web3.js |
| GitHub | https://github.com/senl78515-hash/veilpay |
| Live Demo | https://veilpay-bay.vercel.app |
| 提交邮箱 | senl78515@gmail.com |

---

## 第一次对话 — 核心功能构建

### 构建内容

**4个页面：**
- `/` — 首页 Dashboard，显示交易列表和统计
- `/send` — 发送支付，选择隐私模式
- `/rules` — 配置隐私规则（Rule Builder）
- `/audit` — 审计视图，角色切换 + 字段解密
- `/audit/[id]` — 单笔交易详情，倒计时解密动画

**核心库文件：**
- `lib/types.ts` — 所有类型定义（Transaction, PrivacyRule, PrivacyMode, Asset 等）
- `lib/store.ts` — Zustand 全局状态，带 persist 中间件
- `lib/ruleEngine.ts` — 规则引擎，根据规则生成 PublicView（真实实现，非 mock）
- `lib/mockZkProvider.ts` — ZK 证明层接口（mock 实现，可替换为 Light Protocol）
- `lib/i18n.ts` — 中英双语字符串
- `lib/useT.ts` — i18n hook

**关键设计决策：**
1. **规则引擎是真实实现** — `ruleEngine.ts` 完整评估 hideSender/hideReceiver/hideAmount 逻辑
2. **ZK 层是 mock** — `mockZkProvider.ts` 实现了 `generateProof/verifyProof/createCommitment` 接口，生产环境替换为 Light Protocol 即可
3. **HydrationGuard** — 防止 Zustand persist 在 SSR 首次渲染时闪烁

### HydrationGuard 实现模式

```tsx
// components/shared/HydrationGuard.tsx
'use client'
export function HydrationGuard({ children }) {
  const hydrated = useVeilPayStore(s => s.hydrated)
  if (!hydrated) return null
  return <>{children}</>
}
```

在 store 中：
```typescript
// 在 persist onRehydrateStorage 回调里 setHydrated(true)
```

**四个页面都必须包 HydrationGuard**，否则 localStorage 数据会导致 SSR/CSR 不一致闪烁。

---

## 第二次对话 — 钱包 + 链上集成

### Phantom 钱包集成（不用 wallet-adapter）

**为什么不用 `@solana/wallet-adapter-wallets`：**
- 安装时 OOM 崩溃（包太大，Node 内存不足）
- 解决方案：直接用 `window.solana`（Phantom 原生注入 API），零新依赖

**`lib/usePhantomWallet.ts`（自定义 hook）：**

```typescript
type PhantomProvider = {
  isPhantom: boolean
  publicKey?: { toString(): string }
  connect(opts?: { onlyIfTrusted?: boolean }): Promise<{ publicKey: { toString(): string } }>
  disconnect(): Promise<void>
  on(event: string, handler: () => void): void
  removeListener(event: string, handler: () => void): void
}

export function usePhantomWallet() {
  // 挂载时静默重连（onlyIfTrusted: true）
  // 监听 'disconnect' 事件清除地址
  // 返回 { address, connecting, connect, disconnect }
}
```

### 真实链上交易（Ed25519 + Memo Program）

**`lib/solana.ts` — 两步原子交易：**

```
Step 1: phantom.signMessage(VeilPay:${commitment.slice(0,40)})
         → 弹出 Phantom "签名消息" popup → 获得 ed25519Sig

Step 2: 构建交易：
         [0] Ed25519Program.createInstructionWithPublicKey(pubkey, message, ed25519Sig)
             ← 必须在 index 0（预编译要求）
         [1] MemoProgram instruction（写入链上永久记录）
         
Step 3: phantom.signAndSendTransaction(tx)
         → 弹出 Phantom "批准交易" popup → 获得 txSignature
```

**Ed25519 vs ZK 的区别（pitch 重要）：**
- Ed25519 = **身份证明**（你持有私钥）
- ZK = **知识证明**（你知道一个秘密而不揭露它）
- 正确 pitch 表述：「密码学承诺 + 链上不可否认性」

**关键 API 细节（web3.js v1.98.4）：**
```typescript
// 正确写法
const tx = new Transaction({ blockhash, lastValidBlockHeight, feePayer })
// 错误写法（TypeScript 报错）
// const tx = new Transaction({ recentBlockhash, feePayer })  ← 旧 API
```

### Devnet Airdrop 按钮

位置：Send 页面 "From" 区域，钱包已连接时显示  
功能：请求 0.5 devnet SOL，供评审人演示时使用  

```typescript
await connection.requestAirdrop(pubkey, 0.5 * LAMPORTS_PER_SOL)
await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature: sig }, 'confirmed')
```

### AppShell 钱包按钮

位置：导航栏，语言切换和网络标签之间  
状态机：
- 未连接 → 显示 Wallet 图标 + "Connect Wallet"
- 连接中 → spinner
- 已连接 → 绿色圆点 + `{addr.slice(0,4)}…{addr.slice(-4)}`，hover 变红（disconnect）

### Zustand Store 修改

```typescript
// partialize 排除不需要持久化的字段
partialize: (state) => {
  const { walletAddress, hydrated, ...rest } = state
  return rest
}

// addTransaction 使用钱包地址或 fallback
const sender = get().walletAddress ?? FALLBACK_SENDER
```

---

## 遇到的问题和解决方案

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| OOM 崩溃 | `@solana/wallet-adapter-wallets` 包太大 | 改用 `window.solana` 直接调用，零依赖 |
| `@solana/web3.js` 类型缺失 | OOM 安装中断导致 `lib/index.d.ts` 未写入 | 单独重新安装 `@solana/web3.js` |
| `recentBlockhash` TypeScript 报错 | web3.js v1.98.4 改用 `blockhash` | 改为 `{ blockhash, lastValidBlockHeight, feePayer }` |
| HydrationGuard 级联错误 | 增量编辑导致 JSX 未闭合 | audit 页面改用全文件重写 |
| PPT_PROMPT.md Edit 工具匹配失败 | `=== PROMPT END ===` 在文件中出现两次 | 提供更多上下文使匹配唯一 |
| npm 孤儿包留存 | OOM 后 node_modules 有未声明的包 | `npm install --legacy-peer-deps --prefer-offline` 清理 |

---

## 文件结构

```
d:\Web3Projects\VeilPay\
├── PITCH.md              # 8 页 Pitch Deck + 60 秒脚本 + Q&A + 提交清单（双语）
├── PPT_PROMPT.md         # AI 生成 PPT 用的完整 prompt（英文版 + 中文版）
├── PRD.md                # 产品需求文档（英中双语）
├── DEVLOG.md             # 本文件：完整开发记录
└── veilpay/              # Next.js 应用
    ├── app/
    │   ├── page.tsx          # 首页 Dashboard
    │   ├── send/page.tsx     # 发送支付
    │   ├── rules/page.tsx    # 隐私规则配置
    │   ├── audit/page.tsx    # 审计列表
    │   └── audit/[id]/page.tsx  # 单笔交易详情
    ├── components/
    │   ├── layout/AppShell.tsx       # 导航栏（含钱包按钮）
    │   ├── send/PrivacyModeSelector.tsx
    │   ├── send/TransactionPreview.tsx
    │   ├── audit/TransactionCard.tsx
    │   ├── audit/RevealPanel.tsx
    │   ├── rules/RuleBuilder.tsx
    │   ├── rules/RulePreview.tsx
    │   └── shared/
    │       ├── HydrationGuard.tsx    # SSR 防闪烁
    │       ├── HiddenField.tsx       # ████ 遮罩显示
    │       ├── ProofBadge.tsx
    │       └── StatusBadge.tsx
    └── lib/
        ├── types.ts             # 所有类型
        ├── store.ts             # Zustand 全局状态
        ├── ruleEngine.ts        # 隐私规则引擎（真实实现）
        ├── mockZkProvider.ts    # ZK 层接口（mock）
        ├── solana.ts            # Ed25519 + Memo 链上锚定
        ├── usePhantomWallet.ts  # Phantom 钱包 hook
        ├── i18n.ts              # 中英双语字符串
        ├── useT.ts              # i18n hook
        └── utils.ts
```

---

## 真实 vs Mock 对照表

| 功能 | 状态 | 说明 |
|------|------|------|
| 规则引擎 | ✅ 真实 | 完整评估 hideSender/hideReceiver/hideAmount/time-lock |
| Phantom 钱包连接 | ✅ 真实 | window.solana 原生 API |
| Ed25519 链上签名验证 | ✅ 真实 | Solana 预编译指令 |
| Memo Program 记录 | ✅ 真实 | 永久链上记录 |
| Devnet 交易 | ✅ 真实 | 可在 Solana Explorer 查看 |
| ZK 证明生成 | 🟡 Mock | pluggable 接口，生产接 Light Protocol |
| 跨链隐私传递 | 🔲 未做 | 路线图 |
| 合规披露 API | 🔲 未做 | 路线图 |

---

## 本地运行

```bash
cd veilpay
npm install --legacy-peer-deps
npm run dev
# 访问 http://localhost:3000
```

演示前：
1. 安装 Phantom 浏览器插件
2. Phantom 切换到 **Devnet**
3. 打开 Send 页，连接钱包，点 ⚡ + SOL 领取测试币

---

## 部署信息

- **平台：** Vercel
- **触发：** `npx vercel deploy --prod --yes`（在 `veilpay/` 目录下）
- **构建命令：** `npm run build`（Next.js 自动检测）
- **根目录：** `veilpay/`（Vercel 自动检测）

---

## 提交还需完成

- [ ] 测试 Live Demo 完整流程（Phantom Devnet → 发送 → Explorer）
- [ ] 录屏 Demo Video（3-5 分钟）
- [ ] 用 PPT_PROMPT.md 生成并导出 PPT PDF
- [ ] 填写项目描述（直接复制 PITCH.md Part 4 的文字）
