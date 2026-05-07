'use client'

import { EyeOff } from 'lucide-react'
import { useT } from '@/lib/useT'

interface Props {
  value: string
  revealed?: boolean
}

export function HiddenField({ value, revealed = false }: Props) {
  const t = useT()
  const isHidden = value === 'Hidden'

  if (isHidden && !revealed) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0f1623] border border-[#2a3a55] text-[#4B6A9B] text-sm font-mono hidden-pulse">
        <EyeOff className="w-3.5 h-3.5" />
        {t.hidden}
      </span>
    )
  }

  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#0d1f12] border border-[#166534] text-[#22C55E] text-sm font-mono reveal-animate">
      {value}
    </span>
  )
}
