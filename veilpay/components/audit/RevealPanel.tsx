'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff, Clock, Unlock, AlertCircle } from 'lucide-react'
import type { Transaction, Role } from '@/lib/types'
import { canReveal, getSecondsUntilReveal, getRevealedView } from '@/lib/privacyPolicy'
import { HiddenField } from '@/components/shared/HiddenField'
import { ProofBadge } from '@/components/shared/ProofBadge'
import { useVeilPayStore } from '@/lib/store'
import { useT } from '@/lib/useT'

interface Props {
  tx: Transaction
  currentRole: Role
}

export function RevealPanel({ tx, currentRole }: Props) {
  const t = useT()
  const { revealTransaction } = useVeilPayStore()
  const [secondsLeft, setSecondsLeft] = useState(() => getSecondsUntilReveal(tx))
  const [revealing, setRevealing] = useState(false)
  const [localRevealed, setLocalRevealed] = useState(tx.status === 'revealed')

  const isRevealed = localRevealed || tx.status === 'revealed'
  const revealAllowed = canReveal(tx, currentRole)
  const revealerIsAuthorized = tx.rules.revealTo.includes(currentRole) && currentRole !== 'public'
  const revealedView = getRevealedView(tx)

  useEffect(() => {
    if (isRevealed || secondsLeft <= 0) return
    const interval = setInterval(() => setSecondsLeft(getSecondsUntilReveal(tx)), 500)
    return () => clearInterval(interval)
  }, [tx, isRevealed, secondsLeft])

  function handleReveal() {
    if (!revealAllowed) return
    setRevealing(true)
    setTimeout(() => {
      revealTransaction(tx.id, currentRole)
      setLocalRevealed(true)
      setRevealing(false)
    }, 900)
  }

  const roleLabel = t.roles[currentRole as keyof typeof t.roles] ?? currentRole

  return (
    <div className="space-y-4">
      {/* Split view */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Public View */}
        <div className="bg-[#0d1117] border border-[#1f2d45] rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1f2d45] bg-[#0a0e19]">
            <EyeOff className="w-4 h-4 text-[#4B5563]" />
            <span className="text-sm font-semibold text-[#6B7280]">{t.reveal.publicViewTitle}</span>
            <span className="ml-auto text-xs text-[#374151] bg-[#111827] border border-[#1f2d45] px-2 py-0.5 rounded-full">
              {t.reveal.publicViewSub}
            </span>
          </div>
          <div className="p-4 space-y-3">
            <ViewField label={t.reveal.fieldAmount}    value={tx.publicView.amount} />
            <ViewField label={t.reveal.fieldSender}    value={tx.publicView.sender} />
            <ViewField label={t.reveal.fieldReceiver}  value={tx.publicView.receiver} />
            <div className="pt-1">
              <ViewField label={t.reveal.fieldTxHash}   value={`${tx.txSignature.slice(0, 10)}...${tx.txSignature.slice(-6)}`} visible />
              <ViewField label={t.reveal.fieldTimestamp} value={new Date(tx.timestamp).toLocaleString()} visible />
            </div>
          </div>
        </div>

        {/* Revealed View */}
        <div className={`border rounded-xl overflow-hidden transition-all duration-300 ${
          isRevealed ? 'bg-[#0d1f12] border-[#166534]' : 'bg-[#0d1117] border-[#1f2d45] opacity-60'
        }`}>
          <div className={`flex items-center gap-2 px-4 py-3 border-b ${
            isRevealed ? 'border-[#166534] bg-[#091610]' : 'border-[#1f2d45] bg-[#0a0e19]'
          }`}>
            <Eye className={`w-4 h-4 ${isRevealed ? 'text-[#22C55E]' : 'text-[#4B5563]'}`} />
            <span className={`text-sm font-semibold ${isRevealed ? 'text-[#22C55E]' : 'text-[#6B7280]'}`}>
              {t.reveal.revealedViewTitle}
            </span>
            {isRevealed && (
              <span className="ml-auto text-xs text-[#22C55E] bg-[#0d1f12] border border-[#166534] px-2 py-0.5 rounded-full">
                {t.reveal.revealedBy(t.roles[(tx.revealedBy ?? currentRole) as keyof typeof t.roles] ?? (tx.revealedBy ?? currentRole))}
              </span>
            )}
          </div>
          <div className="p-4 space-y-3">
            {isRevealed ? (
              <>
                <ViewField label={t.reveal.fieldAmount}    value={revealedView.amount}   visible revealed />
                <ViewField label={t.reveal.fieldSender}    value={revealedView.sender}   visible revealed />
                <ViewField label={t.reveal.fieldReceiver}  value={revealedView.receiver} visible revealed />
                <div className="pt-1">
                  <ViewField label={t.reveal.fieldTxHash}   value={`${tx.txSignature.slice(0, 10)}...${tx.txSignature.slice(-6)}`} visible />
                  <ViewField label={t.reveal.fieldTimestamp} value={new Date(tx.timestamp).toLocaleString()} visible />
                </div>
              </>
            ) : (
              <>
                <ViewField label={t.reveal.fieldAmount}   value="Hidden" />
                <ViewField label={t.reveal.fieldSender}   value="Hidden" />
                <ViewField label={t.reveal.fieldReceiver} value="Hidden" />
                <p className="text-xs text-[#4B5563] pt-2">{t.reveal.requiresReveal}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Proof */}
      {isRevealed && <ProofBadge proof={tx.proof} />}

      {/* Reveal Action */}
      {!isRevealed && (
        <div className="bg-[#0d1117] border border-[#1f2d45] rounded-xl p-4 space-y-3">
          <p className="text-sm font-semibold text-white">{t.reveal.revealTitle}</p>

          {currentRole === 'public' ? (
            <div className="flex items-start gap-2 text-xs text-[#F59E0B] bg-[#1c1408] border border-[#92400e] rounded-lg p-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{t.reveal.publicWarning}</span>
            </div>
          ) : !revealerIsAuthorized ? (
            <div className="flex items-start gap-2 text-xs text-[#EF4444] bg-[#1c0a0a] border border-[#7f1d1d] rounded-lg p-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                {t.reveal.notAuthorized(
                  roleLabel,
                  tx.rules.revealTo.filter((r) => r !== 'public').map((r) => t.roles[r as keyof typeof t.roles] ?? r).join(', ')
                )}
              </span>
            </div>
          ) : secondsLeft > 0 ? (
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-xs text-[#F59E0B] bg-[#1c1408] border border-[#92400e] rounded-lg p-3">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-medium">{t.reveal.delayTitle}</span>
                  <div className="text-[#9CA3AF]">
                    {t.reveal.delayPolicy(tx.rules.delayMinutes ?? 0)} •{' '}
                    <span className="text-[#F59E0B]">{t.reveal.delayDemo(secondsLeft)}</span>
                  </div>
                </div>
              </div>
              <div className="w-full bg-[#1f2937] rounded-full h-1.5">
                <div
                  className="bg-[#F59E0B] h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${((10 - secondsLeft) / 10) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            <button
              onClick={handleReveal}
              disabled={revealing}
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-gradient-to-r from-[#166534] to-[#15803d] text-white font-semibold text-sm hover:from-[#14532d] hover:to-[#166534] disabled:opacity-60 transition-all duration-150"
            >
              {revealing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t.reveal.revealing}
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  {t.reveal.revealBtn(roleLabel)}
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function ViewField({ label, value, visible, revealed }: { label: string; value: string; visible?: boolean; revealed?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs text-[#9CA3AF] flex-shrink-0">{label}</span>
      {visible || value !== 'Hidden' ? (
        <span className={`text-xs font-mono truncate ${revealed ? 'text-[#22C55E] reveal-animate' : 'text-[#F9FAFB]'}`}>
          {value}
        </span>
      ) : (
        <HiddenField value="Hidden" />
      )}
    </div>
  )
}
