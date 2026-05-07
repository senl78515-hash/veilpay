'use client'

import { Globe, Lock, Sliders } from 'lucide-react'
import type { PrivacyMode } from '@/lib/types'
import { useT } from '@/lib/useT'

interface Props {
  value: PrivacyMode
  onChange: (m: PrivacyMode) => void
}

export function PrivacyModeSelector({ value, onChange }: Props) {
  const t = useT()

  const MODES: { value: PrivacyMode; label: string; desc: string; icon: React.ElementType }[] = [
    { value: 'public',     label: t.modeSelector.publicLabel,     desc: t.modeSelector.publicDesc,     icon: Globe },
    { value: 'private',    label: t.modeSelector.privateLabel,    desc: t.modeSelector.privateDesc,    icon: Lock },
    { value: 'rule-based', label: t.modeSelector.ruleBasedLabel,  desc: t.modeSelector.ruleBasedDesc,  icon: Sliders },
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {MODES.map((mode) => {
        const active = value === mode.value
        const Icon = mode.icon
        return (
          <button
            key={mode.value}
            onClick={() => onChange(mode.value)}
            className={`relative flex flex-col items-start gap-1.5 p-3.5 rounded-xl border-2 text-left transition-all duration-150 cursor-pointer ${
              active
                ? mode.value === 'rule-based'
                  ? 'border-[#3B82F6] bg-[#0d1a2e] shadow-lg shadow-blue-500/10'
                  : mode.value === 'private'
                  ? 'border-[#8B5CF6] bg-[#140d2e] shadow-lg shadow-purple-500/10'
                  : 'border-[#374151] bg-[#1a2030]'
                : 'border-[#1f2d45] bg-[#0d1117] hover:border-[#374151] hover:bg-[#111827]'
            }`}
          >
            {mode.value === 'rule-based' && (
              <span className="absolute top-2 right-2 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#1e3a6e] text-[#60A5FA] border border-[#1e40af]">
                {t.modeSelector.recommended}
              </span>
            )}
            <Icon
              className={`w-4 h-4 ${
                active
                  ? mode.value === 'rule-based' ? 'text-[#3B82F6]'
                  : mode.value === 'private'    ? 'text-[#8B5CF6]'
                  : 'text-[#9CA3AF]'
                  : 'text-[#4B5563]'
              }`}
            />
            <div>
              <div className={`text-sm font-semibold ${active ? 'text-white' : 'text-[#6B7280]'}`}>
                {mode.label}
              </div>
              <div className="text-xs text-[#6B7280] leading-tight mt-0.5">{mode.desc}</div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
