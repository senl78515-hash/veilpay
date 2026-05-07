'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle2, RotateCcw } from 'lucide-react'
import { RuleBuilder } from '@/components/rules/RuleBuilder'
import { RulePreview } from '@/components/rules/RulePreview'
import { useVeilPayStore } from '@/lib/store'
import { useT } from '@/lib/useT'
import { useState } from 'react'
import { HydrationGuard } from '@/components/shared/HydrationGuard'

export default function RulesPage() {
  const router = useRouter()
  const t = useT()
  const { pendingRule, setPendingRule, resetPendingRule } = useVeilPayStore()
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => router.push('/send'), 800)
  }

  return (
    <HydrationGuard>
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/send')}
            className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.rules.backToSend}
          </button>
          <div className="w-px h-5 bg-[#1f2d45]" />
          <div>
            <h1 className="text-2xl font-bold text-white">{t.rules.title}</h1>
            <p className="text-sm text-[#9CA3AF] mt-0.5">{t.rules.subtitle}</p>
          </div>
        </div>
        <button
          onClick={resetPendingRule}
          className="flex items-center gap-2 text-xs text-[#9CA3AF] hover:text-white border border-[#1f2d45] hover:border-[#374151] px-3 py-2 rounded-lg transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {t.rules.resetDefaults}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        <div className="space-y-5">
          <RuleBuilder rule={pendingRule} onChange={setPendingRule} />
          <button
            onClick={handleSave}
            disabled={saved}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] text-white font-semibold text-sm shadow-lg shadow-blue-500/20 hover:from-[#1d4ed8] hover:to-[#6d28d9] disabled:opacity-75 transition-all duration-150"
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                {t.rules.saved}
              </>
            ) : (
              t.rules.saveBtn
            )}
          </button>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-medium text-[#9CA3AF] uppercase tracking-wider">
            {t.rules.livePreview}
          </h2>
          <RulePreview rule={pendingRule} />
        </div>
      </div>
    </div>
    </HydrationGuard>
  )
}
