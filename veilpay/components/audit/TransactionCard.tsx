'use client'

import Link from 'next/link'
import { EyeOff, ChevronRight, ShieldCheck } from 'lucide-react'
import type { Transaction } from '@/lib/types'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { useT } from '@/lib/useT'

export function TransactionCard({ tx }: { tx: Transaction }) {
  const t = useT()

  const revealers = tx.rules.revealTo
    .filter((r) => r !== 'public')
    .map((r) => t.roles[r as keyof typeof t.roles] ?? r)

  return (
    <Link
      href={`/audit/${tx.id}`}
      className="block bg-[#111827] border border-[#1f2d45] rounded-xl p-4 hover:border-[#374151] hover:bg-[#131e2e] transition-all duration-150 group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-[#9CA3AF]">{tx.id}</span>
            <StatusBadge status={tx.status} />
            <span className="text-xs text-[#4B5563] bg-[#0d1117] border border-[#1f2d45] px-2 py-0.5 rounded-full capitalize">
              {tx.privacyMode}
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[#6B7280]">{t.reveal.fieldAmount}</span>
              {tx.publicView.amount === 'Hidden' ? (
                <span className="flex items-center gap-1 font-mono text-[#4B6A9B] hidden-pulse">
                  <EyeOff className="w-3 h-3" /> {t.hidden}
                </span>
              ) : (
                <span className="font-mono text-white">{tx.publicView.amount}</span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#6B7280]">{t.auditDetail.metaAsset}</span>
              <span className="text-white font-medium">{tx.asset}</span>
            </div>
            <span className="text-[#6B7280]">{new Date(tx.timestamp).toLocaleDateString()}</span>
          </div>

          {revealers.length > 0 && (
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-[#22C55E]" />
              <span className="text-xs text-[#22C55E]">
                {revealers.join(', ')} — {t.reveal.revealTitle.toLowerCase()}
              </span>
            </div>
          )}
        </div>

        <ChevronRight className="w-4 h-4 text-[#4B5563] group-hover:text-[#9CA3AF] transition-colors flex-shrink-0 mt-1" />
      </div>
    </Link>
  )
}
