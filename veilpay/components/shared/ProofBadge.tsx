'use client'

import { ShieldCheck, Cpu } from 'lucide-react'
import type { ZKProof } from '@/lib/types'
import { useT } from '@/lib/useT'

export function ProofBadge({ proof }: { proof: ZKProof }) {
  const t = useT()
  return (
    <div className="bg-[#0d1f12] border border-[#166534] rounded-lg p-3 space-y-1.5">
      <div className="flex items-center gap-2 text-[#22C55E] text-xs font-medium">
        <ShieldCheck className="w-3.5 h-3.5" />
        {t.reveal.zkVerified}
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <span className="text-[#9CA3AF]">{t.reveal.proofId}</span>
        <span className="text-[#F9FAFB] font-mono truncate">{proof.proofId}</span>
        <span className="text-[#9CA3AF]">{t.reveal.commitment}</span>
        <span className="text-[#F9FAFB] font-mono truncate">{proof.commitment}</span>
        <span className="text-[#9CA3AF]">{t.reveal.provider}</span>
        <span className="text-[#F9FAFB] flex items-center gap-1">
          <Cpu className="w-3 h-3 text-[#8B5CF6]" /> {proof.provider}
        </span>
      </div>
    </div>
  )
}
