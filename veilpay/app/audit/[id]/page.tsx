'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { useVeilPayStore } from '@/lib/store'
import { useT } from '@/lib/useT'
import { RevealPanel } from '@/components/audit/RevealPanel'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { describeRules } from '@/lib/ruleEngine'
import { HydrationGuard } from '@/components/shared/HydrationGuard'
import type { Role } from '@/lib/types'

const ROLES_SWITCHABLE: Role[] = ['public', 'auditor', 'companyAdmin', 'daoGovernance']

export default function AuditDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const t = useT()
  const { transactions, currentRole, setCurrentRole } = useVeilPayStore()

  const tx = transactions.find((tx) => tx.id === id)

  return (
    <HydrationGuard>
      {!tx ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-[#6B7280]">Transaction not found.</p>
          <button onClick={() => router.push('/audit')} className="mt-4 text-sm text-[#3B82F6] hover:text-[#60A5FA]">
            {t.auditDetail.breadcrumb}
          </button>
        </div>
      ) : (
        <div className="max-w-4xl space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/audit')}
              className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.auditDetail.breadcrumb}
            </button>
            <ChevronRight className="w-4 h-4 text-[#374151]" />
            <span className="text-sm font-mono text-[#9CA3AF]">{tx.id}</span>
            <StatusBadge status={tx.status} />
          </div>

          {/* Role Switcher */}
          <div className="bg-[#111827] border border-[#1f2d45] rounded-xl p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">{t.auditDetail.viewingAs}</p>
              <p className="text-xs text-[#9CA3AF] mt-0.5">{t.auditDetail.viewingAsSub}</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-end">
              {ROLES_SWITCHABLE.map((role) => {
                const active = currentRole === role
                const isAuthorized = tx.rules.revealTo.includes(role)
                return (
                  <button
                    key={role}
                    onClick={() => setCurrentRole(role)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 ${
                      active
                        ? 'bg-[#1e3a6e] text-[#60A5FA] border-[#1e40af]'
                        : 'text-[#6B7280] border-[#1f2d45] hover:border-[#374151] hover:text-[#9CA3AF]'
                    }`}
                  >
                    {t.roles[role as keyof typeof t.roles]}
                    {isAuthorized && role !== 'public' && (
                      <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-[#22C55E] inline-block" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Meta cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <MetaCard label={t.auditDetail.metaMode}  value={tx.privacyMode} accent />
            <MetaCard label={t.auditDetail.metaAsset} value={tx.asset} />
            <MetaCard label={t.auditDetail.metaDate}  value={new Date(tx.timestamp).toLocaleDateString()} />
            <MetaCard
              label={t.auditDetail.metaProof}
              value={tx.proof.verified ? t.auditDetail.verified : 'Unverified'}
              green={tx.proof.verified}
            />
          </div>

          {/* Privacy Policy */}
          {describeRules(tx.rules, tx.asset, t).length > 0 && (
            <div className="bg-[#111827] border border-[#1f2d45] rounded-xl p-4">
              <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">
                {t.auditDetail.policyTitle}
              </p>
              <div className="flex flex-wrap gap-2">
                {describeRules(tx.rules, tx.asset, t).map((line, i) => (
                  <span key={i} className="text-xs text-[#9CA3AF] bg-[#0d1117] border border-[#1f2d45] px-2.5 py-1 rounded-lg">
                    {line}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reveal Panel */}
          <RevealPanel tx={tx} currentRole={currentRole} />
        </div>
      )}
    </HydrationGuard>
  )
}

function MetaCard({ label, value, accent, green }: { label: string; value: string; accent?: boolean; green?: boolean }) {
  return (
    <div className="bg-[#111827] border border-[#1f2d45] rounded-xl px-4 py-3">
      <p className="text-xs text-[#6B7280]">{label}</p>
      <p className={`text-sm font-semibold mt-0.5 capitalize ${green ? 'text-[#22C55E]' : accent ? 'text-[#60A5FA]' : 'text-white'}`}>
        {value}
      </p>
    </div>
  )
}
