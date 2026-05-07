'use client'

import { useVeilPayStore } from '@/lib/store'
import { TransactionCard } from '@/components/audit/TransactionCard'
import { useT } from '@/lib/useT'
import { ShieldOff, RotateCcw } from 'lucide-react'
import { HydrationGuard } from '@/components/shared/HydrationGuard'

export default function AuditPage() {
  const t = useT()
  const { transactions, resetDemo } = useVeilPayStore()

  const hidden   = transactions.filter((tx) => tx.status === 'pending_reveal' || tx.status === 'rule_applied').length
  const revealed = transactions.filter((tx) => tx.status === 'revealed').length
  const pub      = transactions.filter((tx) => tx.status === 'created').length

  function handleReset() {
    if (window.confirm(t.audit.resetConfirm)) resetDemo()
  }

  return (
    <HydrationGuard>
      <div className="max-w-3xl space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">{t.audit.title}</h1>
            <p className="text-sm text-[#9CA3AF] mt-1">{t.audit.subtitle(transactions.length)}</p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-xs text-[#9CA3AF] hover:text-white border border-[#1f2d45] hover:border-[#374151] px-3 py-2 rounded-lg transition-colors flex-shrink-0 mt-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {t.audit.resetDemo}
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Stat label={t.audit.statTotal}    value={transactions.length} color="text-white" />
          <Stat label={t.audit.statHidden}   value={hidden}              color="text-[#F59E0B]" />
          <Stat label={t.audit.statRevealed} value={revealed}            color="text-[#22C55E]" />
          <Stat label={t.audit.statPublic}   value={pub}                 color="text-[#9CA3AF]" />
        </div>

        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShieldOff className="w-10 h-10 text-[#374151] mb-4" />
            <p className="text-[#6B7280] text-sm">{t.audit.empty}</p>
            <p className="text-[#4B5563] text-xs mt-1">{t.audit.emptySub}</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {transactions.map((tx) => (
              <TransactionCard key={tx.id} tx={tx} />
            ))}
          </div>
        )}
      </div>
    </HydrationGuard>
  )
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-[#111827] border border-[#1f2d45] rounded-xl px-4 py-3">
      <p className="text-xs text-[#6B7280]">{label}</p>
      <p className={`text-2xl font-bold mt-0.5 ${color}`}>{value}</p>
    </div>
  )
}
