'use client'

import { ChevronRight, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import type { PrivacyRule } from '@/lib/types'
import { describeRules } from '@/lib/ruleEngine'
import { useT } from '@/lib/useT'

interface Props { rule: PrivacyRule }

const SAMPLE = { amount: 1200, asset: 'USDC', sender: '7xA9...K92p', receiver: '4Bs2...P81q' }

export function RulePreview({ rule }: Props) {
  const t = useT()
  const lines = describeRules(rule, 'USDC', t)
  const amountHidden = rule.hideAmountAbove !== undefined && SAMPLE.amount > rule.hideAmountAbove

  const revealers = rule.revealTo
    .filter((r) => r !== 'public')
    .map((r) => t.roles[r as keyof typeof t.roles] ?? r)

  return (
    <div className="space-y-4">
      <div className="bg-[#0d1117] border border-[#1f2d45] rounded-xl p-5 space-y-4">
        <p className="text-sm font-semibold text-white">{t.rulePreview.title}</p>
        {lines.length > 0 ? (
          <div className="space-y-2">
            {lines.map((line, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-[#9CA3AF]">
                <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-[#3B82F6] flex-shrink-0" />
                <span>{line}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#4B5563]">{t.rulePreview.empty}</p>
        )}
      </div>

      {/* Sample Transaction View */}
      <div className="bg-[#0d1117] border border-[#1f2d45] rounded-xl p-5 space-y-3">
        <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
          {t.rulePreview.sampleTitle}
        </p>
        <div className="space-y-2">
          <ViewRow label={t.rulePreview.publicAmount}   value={amountHidden ? 'Hidden' : `${SAMPLE.amount} ${SAMPLE.asset}`} t={t} />
          <ViewRow label={t.rulePreview.publicSender}   value={rule.hideSender   ? 'Hidden' : SAMPLE.sender}   t={t} />
          <ViewRow label={t.rulePreview.publicReceiver} value={rule.hideReceiver ? 'Hidden' : SAMPLE.receiver} t={t} />
        </div>
        {revealers.length > 0 && (
          <div className="mt-2 pt-3 border-t border-[#1f2d45] space-y-1.5">
            {revealers.map((r) => (
              <div key={r} className="flex items-start gap-2 text-xs text-[#22C55E]">
                <ShieldCheck className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                <span>{t.rulePreview.canRevealFull(r)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ZK Info */}
      <div className="bg-[#130d25] border border-[#2d1b5e] rounded-xl p-4 space-y-2">
        <p className="text-xs font-semibold text-[#A78BFA]">{t.rulePreview.zkTitle}</p>
        <p className="text-xs text-[#7C6AAA] leading-relaxed">{t.rulePreview.zkDesc}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {['createCommitment()', 'generateProof()', 'verifyProof()'].map((fn) => (
            <span key={fn} className="text-xs font-mono text-[#8B5CF6] bg-[#1a0d35] border border-[#4c1d95] px-2 py-0.5 rounded">
              {fn}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ViewRow({ label, value, t }: { label: string; value: string; t: ReturnType<typeof useT> }) {
  const hidden = value === 'Hidden'
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-[#6B7280]">{label}</span>
      {hidden ? (
        <span className="flex items-center gap-1 text-xs font-mono text-[#4B6A9B] bg-[#0f1623] border border-[#2a3a55] px-2 py-0.5 rounded hidden-pulse">
          <EyeOff className="w-3 h-3" /> {t.hidden}
        </span>
      ) : (
        <span className="flex items-center gap-1 text-xs font-mono text-[#22C55E]">
          <Eye className="w-3 h-3" /> {value}
        </span>
      )}
    </div>
  )
}
