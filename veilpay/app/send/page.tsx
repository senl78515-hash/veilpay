'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Settings2, Send, CheckCircle2, Copy, Wallet, ExternalLink, Zap } from 'lucide-react'
import { PrivacyModeSelector } from '@/components/send/PrivacyModeSelector'
import { TransactionPreview } from '@/components/send/TransactionPreview'
import { useVeilPayStore } from '@/lib/store'
import { useT } from '@/lib/useT'
import { HydrationGuard } from '@/components/shared/HydrationGuard'
import { usePhantomWallet } from '@/lib/usePhantomWallet'
import { anchorCommitmentOnChain, airdropDevnet, explorerUrl } from '@/lib/solana'
import type { PrivacyMode, Asset, Transaction } from '@/lib/types'

export default function SendPage() {
  const router = useRouter()
  const t = useT()
  const { pendingRule, addTransaction } = useVeilPayStore()
  const { address: walletAddress, connect, connecting } = usePhantomWallet()

  const [receiver, setReceiver] = useState('4Bs2nP81qM7kR3eW6yTiUcVaXdFgHj9K')
  const [amount, setAmount] = useState('1200')
  const [asset, setAsset] = useState<Asset>('USDC')
  const [mode, setMode] = useState<PrivacyMode>('rule-based')
  const [sending, setSending] = useState(false)
  const [sendStep, setSendStep] = useState<'signing' | 'anchoring' | null>(null)
  const [sent, setSent] = useState<Transaction | null>(null)
  const [onChainSig, setOnChainSig] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [airdropping, setAirdropping] = useState(false)
  const [airdropDone, setAirdropDone] = useState(false)

  async function handleSend() {
    if (!receiver || !amount || parseFloat(amount) <= 0) return
    setSending(true)
    setSendStep(null)

    const tx = addTransaction({ receiver, amount: parseFloat(amount), asset, privacyMode: mode, rules: pendingRule })

    let realSig: string | null = null
    if (walletAddress) {
      try {
        setSendStep('signing')
        realSig = await anchorCommitmentOnChain(tx.commitment, walletAddress)
        setSendStep('anchoring')
      } catch {
        // user rejected or no SOL — demo still completes
      }
    } else {
      await new Promise((r) => setTimeout(r, 1200))
    }

    setOnChainSig(realSig)
    setSendStep(null)
    setSending(false)
    setSent(tx)
  }

  async function handleAirdrop() {
    if (!walletAddress || airdropping) return
    setAirdropping(true)
    setAirdropDone(false)
    try {
      await airdropDevnet(walletAddress)
      setAirdropDone(true)
      setTimeout(() => setAirdropDone(false), 4000)
    } catch {
      // devnet rate-limit or RPC error — silent
    } finally {
      setAirdropping(false)
    }
  }

  function copySignature(sig: string) {
    navigator.clipboard.writeText(sig)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sendingLabel = sendStep === 'signing'
    ? 'Sign the commitment…'
    : sendStep === 'anchoring'
      ? 'Anchoring on Solana…'
      : t.send.sending

  const rulesSummary = (() => {
    const parts: string[] = []
    if (pendingRule.hideSender && pendingRule.hideReceiver) parts.push(t.send.hidingSenderReceiver)
    else if (pendingRule.hideSender) parts.push(t.send.hidingSender)
    else if (pendingRule.hideReceiver) parts.push(t.send.hidingReceiver)
    else parts.push(t.send.noIdentityHiding)
    if (pendingRule.hideAmountAbove !== undefined)
      parts.push(t.send.amountHiddenSuffix(pendingRule.hideAmountAbove))
    return parts.join(' ')
  })()

  return (
    <HydrationGuard>
      {sent ? (
        <div className="max-w-lg mx-auto pt-12">
          <div className="bg-[#111827] border border-[#1f2d45] rounded-2xl p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-[#0d1f12] border-2 border-[#22C55E] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7 text-[#22C55E]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{t.send.successTitle}</h2>
              <p className="text-sm text-[#9CA3AF] mt-1">{t.send.successSubtitle}</p>
            </div>

            <div className="bg-[#0d1117] border border-[#1f2d45] rounded-xl p-4 text-left space-y-3">
              <Row label={t.send.fieldAmount}       value={`${sent.amount} ${sent.asset}`} />
              <Row label={t.send.fieldReceiver}     value={`${sent.receiver.slice(0, 8)}...${sent.receiver.slice(-4)}`} />
              <Row label={t.send.fieldPrivacyMode}  value={sent.privacyMode} highlight />
              <Row label={t.send.fieldPublicAmount} value={sent.publicView.amount} />
              <Row label={t.send.fieldProofId}      value={sent.proof.proofId} mono />
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#9CA3AF]">{t.send.fieldTxSig}</span>
                <button
                  onClick={() => copySignature(sent.txSignature)}
                  className="flex items-center gap-1.5 text-xs font-mono text-[#3B82F6] hover:text-[#60A5FA] transition-colors"
                >
                  <span>{sent.txSignature.slice(0, 12)}...{sent.txSignature.slice(-6)}</span>
                  <Copy className="w-3 h-3" />
                  {copied && <span className="text-[#22C55E]">{t.send.copied}</span>}
                </button>
              </div>
            </div>

            {onChainSig ? (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs text-[#22C55E]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Ed25519 signature verified on-chain
                </div>
                <a
                  href={explorerUrl(onChainSig)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#0d1f12] border border-[#166534]/60 text-sm text-[#22C55E] hover:bg-[#0d2a16] hover:border-[#22c55e]/40 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on Solana Explorer
                </a>
              </div>
            ) : (
              <p className="text-xs text-[#4B5563]">
                {walletAddress ? 'On-chain anchoring skipped' : 'Connect wallet to anchor commitment on-chain'}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setSent(null); setOnChainSig(null); setAmount(''); setReceiver('') }}
                className="flex-1 py-2.5 rounded-xl border border-[#1f2d45] text-sm text-[#9CA3AF] hover:text-white hover:border-[#374151] transition-colors"
              >
                {t.send.newTx}
              </button>
              <button
                onClick={() => router.push(`/audit/${sent.id}`)}
                className="flex-1 py-2.5 rounded-xl bg-[#1e3a6e] border border-[#1e40af] text-sm text-[#60A5FA] hover:bg-[#1d4ed8]/30 transition-colors flex items-center justify-center gap-2"
              >
                {t.send.viewInAudit} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 max-w-5xl">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white">{t.send.title}</h1>
              <p className="text-sm text-[#9CA3AF] mt-1">{t.send.subtitle}</p>
            </div>

            <div className="bg-[#111827] border border-[#1f2d45] rounded-2xl p-6 space-y-5">
              {/* From wallet */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#D1D5DB]">From</span>
                {walletAddress ? (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#22C55E]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                      {walletAddress.slice(0, 6)}…{walletAddress.slice(-6)}
                    </div>
                    <button
                      onClick={handleAirdrop}
                      disabled={airdropping}
                      title="Request 0.5 devnet SOL for gas"
                      className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-md border transition-all disabled:opacity-50 ${
                        airdropDone
                          ? 'text-[#22C55E] border-[#166534]/60 bg-[#0d1f12]'
                          : 'text-[#F59E0B] border-[#92400e]/50 bg-[#1a1200] hover:border-[#F59E0B]/50'
                      }`}
                    >
                      {airdropping ? (
                        <div className="w-2.5 h-2.5 border border-[#F59E0B] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Zap className="w-2.5 h-2.5" />
                      )}
                      {airdropDone ? 'Got SOL' : airdropping ? '' : '+ SOL'}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={connect}
                    disabled={connecting}
                    className="flex items-center gap-1.5 text-xs text-[#3B82F6] hover:text-[#60A5FA] transition-colors disabled:opacity-50"
                  >
                    <Wallet className="w-3.5 h-3.5" />
                    {connecting ? t.nav.connecting : t.nav.connectWallet}
                  </button>
                )}
              </div>

              <div className="h-px bg-[#1f2d45]" />

              {/* Recipient */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#D1D5DB]">{t.send.recipient}</label>
                <input
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                  placeholder={t.send.recipientPlaceholder}
                  className="w-full bg-[#0d1117] border border-[#1f2d45] rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-[#4B5563] focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/30 transition-all"
                />
              </div>

              {/* Amount + Asset */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#D1D5DB]">{t.send.amount}</label>
                <div className="flex gap-3">
                  <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    min="0"
                    placeholder="0.00"
                    className="flex-1 bg-[#0d1117] border border-[#1f2d45] rounded-xl px-4 py-3 text-sm text-white placeholder-[#4B5563] focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/30 transition-all"
                  />
                  <select
                    value={asset}
                    onChange={(e) => setAsset(e.target.value as Asset)}
                    className="bg-[#0d1117] border border-[#1f2d45] rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-[#3B82F6] cursor-pointer"
                  >
                    <option value="USDC">USDC</option>
                    <option value="SOL">SOL</option>
                  </select>
                </div>
                {parseFloat(amount) > (pendingRule.hideAmountAbove ?? Infinity) && mode === 'rule-based' && (
                  <p className="text-xs text-[#F59E0B] mt-1">{t.send.amountWarning}</p>
                )}
              </div>

              {/* Privacy Mode */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#D1D5DB]">{t.send.privacyMode}</label>
                <PrivacyModeSelector value={mode} onChange={setMode} />
              </div>

              {/* Configure Rules */}
              {mode === 'rule-based' && (
                <div className="bg-[#0d1a2e] border border-[#1e3a6e] rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#60A5FA]">{t.send.rulesConfigured}</p>
                    <p className="text-xs text-[#4B6A9B] mt-0.5">{rulesSummary}</p>
                  </div>
                  <button
                    onClick={() => router.push('/rules')}
                    className="flex items-center gap-2 text-xs bg-[#1e3a6e] border border-[#1e40af] text-[#60A5FA] px-3 py-2 rounded-lg hover:bg-[#1d4ed8]/40 transition-colors"
                  >
                    <Settings2 className="w-3.5 h-3.5" />
                    {t.send.configure}
                  </button>
                </div>
              )}

              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={sending || !receiver || !amount}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] text-white font-semibold text-sm shadow-lg shadow-blue-500/20 hover:from-[#1d4ed8] hover:to-[#6d28d9] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
              >
                {sending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {sendingLabel}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t.send.sendBtn}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">{t.send.livePreview}</h2>
            <TransactionPreview receiver={receiver} amount={amount} asset={asset} mode={mode} rules={pendingRule} />
          </div>
        </div>
      )}
    </HydrationGuard>
  )
}

function Row({ label, value, highlight, mono }: { label: string; value: string; highlight?: boolean; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-[#9CA3AF]">{label}</span>
      <span className={`text-xs ${highlight ? 'text-[#60A5FA]' : 'text-[#F9FAFB]'} ${mono ? 'font-mono' : ''}`}>
        {value}
      </span>
    </div>
  )
}
