'use client'

import type { TransactionStatus } from '@/lib/types'
import { useT } from '@/lib/useT'

const STYLE: Record<TransactionStatus, string> = {
  created:        'bg-[#1f2937] text-[#9CA3AF] border-[#374151]',
  rule_applied:   'bg-[#1c2a1c] text-[#22C55E] border-[#166534]',
  pending_reveal: 'bg-[#2a1c0a] text-[#F59E0B] border-[#92400e]',
  revealed:       'bg-[#1c2533] text-[#3B82F6] border-[#1e40af]',
}

export function StatusBadge({ status }: { status: TransactionStatus }) {
  const t = useT()
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${STYLE[status]}`}>
      {t.status[status]}
    </span>
  )
}
