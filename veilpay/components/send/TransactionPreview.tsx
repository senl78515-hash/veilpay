'use client'

import { EyeOff, ShieldCheck, Clock, Users } from 'lucide-react'
import type { PrivacyMode, PrivacyRule, Asset } from '@/lib/types'
import { applyRules } from '@/lib/ruleEngine'
import { useT } from '@/lib/useT'

interface Props {
  receiver: string
  amount: string
  asset: Asset
  mode: PrivacyMode
  rules: PrivacyRule
}

const SENDER_PREVIEW = '1Ab2...t1Uv'

function Field({ label, value, hidden: isHidden }: { label: string; value: string; hidden?: boolean }) {
  const t = useT()
  const h = isHidden ?? value === 'Hidden'
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#1f2d45] last:border-0">
      <span className="text-xs text-[#9CA3AF]">{label}</span>
      {h ? (
        <span className="flex items-center gap-1.5 text-xs font-mono text-[#4B6A9B] bg-[#0f1623] border border-[#2a3a55] px-2 py-0.5 rounded hidden-pulse">
          <EyeOff className="w-3 h-3" /> {t.hidden}
        </span>
      ) : (
        <span className="text-xs font-mono text-[#F9FAFB] truncate max-w-[160px]">{value}</span>
      )}
    </div>
  )
}

export function TransactionPreview({ receiver, amount, asset, mode, rules }: Props) {
  const t = useT()
  const num = parseFloat(amount) || 0
  const view = applyRules(
    { amount: num, asset, sender: '1Ab2Cd3Ef4Gh5Ij6Kl7Mn8Op9Qr0St1Uv', receiver: receiver || '...' },
    mode,
    rules
  )

  const authorizedRoles = rules.revealTo
    .filter((r) => r !== 'public')
    .map((r) => t.roles[r as keyof typeof t.roles] ?? r)

  const modeLabel =
    mode === 'rule-based' ? t.modeSelector.ruleBasedLabel
    : mode === 'private'  ? t.modeSelector.privateLabel
    :                       t.modeSelector.publicLabel

  const modeBadgeClass =
    mode === 'rule-based' ? 'bg-[#1e3a6e] text-[#60A5FA] border-[#1e40af]'
    : mode === 'private'  ? 'bg-[#2d1b5e] text-[#A78BFA] border-[#4c1d95]'
    :                       'bg-[#1f2937] text-[#9CA3AF] border-[#374151]'

  return (
    <div className="bg-[#0d1117] border border-[#1f2d45] rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-white">{t.preview.title}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${modeBadgeClass}`}>
          {modeLabel}
        </span>
      </div>

      {/* Public View */}
      <div>
        <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-2 font-medium">
          {t.preview.publicView}
        </p>
        <div className="bg-[#111827] border border-[#1f2d45] rounded-lg px-3 py-1">
          <Field label={t.reveal.fieldAmount}   value={view.amount} />
          <Field
            label={t.reveal.fieldSender}
            value={view.sender === '1Ab2Cd3Ef4Gh5Ij6Kl7Mn8Op9Qr0St1Uv' ? SENDER_PREVIEW : view.sender}
          />
          <Field
            label={t.reveal.fieldReceiver}
            value={view.receiver.length > 20 ? `${view.receiver.slice(0, 6)}...${view.receiver.slice(-4)}` : view.receiver}
          />
        </div>
      </div>

      {/* Authorized access */}
      {authorizedRoles.length > 0 && mode !== 'public' && (
        <div>
          <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-2 font-medium">
            {t.preview.authorizedAccess}
          </p>
          <div className="bg-[#0d1f12] border border-[#166534] rounded-lg p-3 space-y-1.5">
            <div className="flex items-start gap-2">
              <Users className="w-3.5 h-3.5 text-[#22C55E] mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                {authorizedRoles.map((r) => (
                  <div key={r} className="text-xs text-[#22C55E]">
                    {t.preview.canReveal(r)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delay */}
      {rules.delayMinutes !== undefined && rules.delayMinutes > 0 && mode !== 'public' && (
        <div className="flex items-center gap-2 text-xs text-[#F59E0B] bg-[#1c1408] border border-[#92400e] rounded-lg px-3 py-2">
          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
          {t.preview.delayNote(rules.delayMinutes)}
          <span className="ml-auto text-[#6B7280]">({t.preview.demoNote})</span>
        </div>
      )}

      {/* ZK note */}
      {mode !== 'public' && (
        <div className="flex items-center gap-2 text-xs text-[#6B7280]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
          {t.preview.zkNote}
        </div>
      )}
    </div>
  )
}
