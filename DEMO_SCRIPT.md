# VeilPay — Demo Video Script (3–5 min)
# 演示视频旁白脚本（3-5 分钟）

**Format:** Screen recording only, no face required / 纯屏幕录制，无需露脸  
**Language:** English narration (script below) / 英文旁白  
**Target length:** ~4 minutes at a comfortable pace / 舒适语速约 4 分钟

---

## SECTION 1 — INTRO (30 seconds)
*Screen: veilpay-bay.vercel.app homepage*

> "Every payment on Solana is permanently public. Anyone can see the sender, receiver, and amount — forever. That's fine for simple transfers, but it makes Solana unusable for real-world finance: payroll, invoices, treasury operations.
>
> Existing privacy tools go too far — they hide everything and destroy compliance. There's no middle ground.
>
> This is VeilPay — a programmable privacy layer for on-chain payments. Instead of hiding everything or showing everything, you define exactly who can see what, when, and under what conditions."

---

## SECTION 2 — CONNECT WALLET (30 seconds)
*Screen: Click "Connect Wallet" in the navbar*

> "Let me show you the live demo — this is running on Solana devnet right now.
>
> First, I'll connect my Phantom wallet."

*[Phantom popup appears — click Connect]*

> "Connected. You can see my real wallet address in the nav bar.
>
> Since this is devnet, I'll grab some test SOL for gas fees with one click."

*[Click the ⚡ + SOL airdrop button — wait for it to turn green]*

> "Got it — 0.5 devnet SOL airdropped directly from Solana."

---

## SECTION 3 — PRIVACY RULES (45 seconds)
*Screen: Navigate to /rules page*

> "Before sending, let me show you the Rule Builder — this is the core of VeilPay.
>
> I can define exactly what gets hidden and under what conditions."

*[Show the rule toggles — hide sender, hide receiver, hide amount above threshold]*

> "Here I'm setting a rule: hide the amount if it's above 1,000 USDC, hide the sender address, hide the receiver address.
>
> I can also set who is allowed to reveal this data — in this case, the Auditor role — and after what delay. I'll set a 10-second reveal window for the demo."

*[Show the live preview updating on the right side]*

> "On the right, you can see the live preview — this is exactly what the public will see on-chain: the amount is hidden, sender and receiver are masked. But the transaction still exists and is verifiable."

---

## SECTION 4 — SEND TRANSACTION (60 seconds)
*Screen: Navigate to /send page*

> "Now let's send a real transaction. I'll fill in the recipient address and amount."

*[Type in recipient address and amount: 1200 USDC]*

> "I'm sending 1,200 USDC — which is above my 1,000 threshold, so the amount will be hidden according to my rule."

*[Notice the amber warning: "Amount will be hidden per your rule"]*

> "The rule engine is already flagging this in real time. I'll select Rule-Based privacy mode."

*[Click Send]*

> "Now watch what happens — first Phantom asks me to sign the commitment."

*[Phantom Sign Message popup appears]*

> "This is an Ed25519 signature — I'm cryptographically signing a hash of this transaction's commitment. This proves I authorized this specific payment without the signature being forgeable."

*[Click Sign in Phantom]*

> "Signed. Now Phantom asks me to approve the actual transaction."

*[Phantom Approve Transaction popup appears]*

> "This transaction contains two Solana instructions: first, the Ed25519 precompile that verifies my signature directly on-chain — if the signature is invalid, Solana rejects the entire transaction. Second, a Memo program instruction that permanently writes the commitment to the blockchain as a readable record."

*[Click Approve in Phantom]*

> "Transaction sent."

---

## SECTION 5 — SUCCESS + EXPLORER (30 seconds)
*Screen: Success screen appears with transaction details*

> "The transaction is confirmed. I can see the proof ID, the masked public view — amount hidden, addresses hidden — and the real on-chain transaction signature."

*[Click "View on Solana Explorer" button]*

> "Here it is on Solana Explorer — a real devnet transaction. You can see the Ed25519 instruction and the Memo instruction in the same atomic transaction. This is not simulated. This is live on Solana."

*[Show the explorer page briefly, then navigate back]*

---

## SECTION 6 — AUDIT VIEW (60 seconds)
*Screen: Click "View in Audit" button, or navigate to /audit*

> "Now let's look at how this transaction appears to different viewers. This is the Audit page."

*[Show the transaction card with [Hidden] fields]*

> "As the public, I can see the transaction exists — the proof ID, the timestamp, the privacy mode. But the amount, sender, and receiver are all masked. The ledger is still trustworthy — I just can't read the sensitive fields."

*[Click on the transaction to open /audit/[id]]*

> "Let me open the full detail view. I'm currently viewing this as the default public role."

*[Show the role switcher dropdown — switch to "Auditor"]*

> "Now I'll switch to the Auditor role — simulating what an authorized auditor would see."

*[A countdown timer appears — 10 seconds]*

> "Because I set a reveal delay in my rule, there's a countdown before the data unlocks. In a real deployment, this would be minutes or hours — giving the sender time to confirm authorization."

*[Countdown reaches zero — fields animate and reveal]*

> "And now the fields are revealed. Real amount: 1,200 USDC. Real sender and receiver addresses. The auditor sees everything — but only the auditor, and only after the delay."

---

## SECTION 7 — ARCHITECTURE SUMMARY (30 seconds)
*Screen: Navigate back to homepage or show architecture slide*

> "Let me quickly explain what's real versus what's mocked.
>
> The Rule Engine is fully implemented — it evaluates your privacy policy and generates the masked public view.
>
> The on-chain commitment is real — Ed25519 signature verification using Solana's precompile, plus a Memo program record. You just saw it live on Explorer.
>
> The ZK proof layer is mocked — by design. The interface is pluggable. When we integrate Light Protocol's ZK Compressed Accounts, nothing in the Rule Engine or UI changes. The slot is ready."

---

## SECTION 8 — CLOSING (20 seconds)
*Screen: Homepage or title slide*

> "VeilPay is not just a private payment app. It's a programmable privacy layer — the missing piece that lets Solana be used for real-world finance without exposing sensitive data to everyone, forever.
>
> Privacy shouldn't be a toggle. It should be a policy.
>
> Thank you."

---

## RECORDING TIPS / 录制建议

- **工具：** Windows `Win + G`（Xbox Game Bar）或 OBS，免费
- **分辨率：** 1920×1080，录制整个浏览器窗口
- **语速：** 慢一点，评审边看边理解，不要赶
- **停顿：** 每个 Phantom 弹窗出现时暂停 1-2 秒，让观看者看清楚
- **演示前：** 确保 Phantom 已切换到 Devnet，提前领好 SOL
- **备用：** 先演练一遍再录制，整个流程约 3-4 分钟

---

## TOTAL TIMING ESTIMATE / 时长估算

| Section | 内容 | 时长 |
|---------|------|------|
| 1 | Intro | ~30s |
| 2 | Connect wallet + airdrop | ~30s |
| 3 | Privacy rules | ~45s |
| 4 | Send transaction (2 popups) | ~60s |
| 5 | Success + Explorer | ~30s |
| 6 | Audit view + reveal | ~60s |
| 7 | Architecture summary | ~30s |
| 8 | Closing | ~20s |
| **Total** | | **~4:25** |
