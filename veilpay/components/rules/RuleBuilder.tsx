'use client'

import { DollarSign, UserX, Users, Clock } from 'lucide-react'
import type { PrivacyRule, Role } from '@/lib/types'
import { useT } from '@/lib/useT'

interface Props {
  rule: PrivacyRule
  onChange: (patch: Partial<PrivacyRule>) => void
}

const ROLES: { value: Role }[] = [
  { value: 'auditor' },
  { value: 'companyAdmin' },
  { value: 'daoGovernance' },
]

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-9 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${checked ? 'bg-[#3B82F6]' : 'bg-[#374151]'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${checked ? 'translate-x-4' : 'translate-x-0'}`}
      />
    </button>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">{title}</p>
      <div className="bg-[#0d1117] border border-[#1f2d45] rounded-xl overflow-hidden">{children}</div>
    </div>
  )
}

function RuleRow({ icon: Icon, label, sub, right }: { icon: React.ElementType; label: string; sub?: string; right: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#1f2d45] last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-[#111827] flex items-center justify-center flex-shrink-0">
          <Icon className="w-3.5 h-3.5 text-[#6B7280]" />
        </div>
        <div>
          <p className="text-sm text-white">{label}</p>
          {sub && <p className="text-xs text-[#6B7280] mt-0.5">{sub}</p>}
        </div>
      </div>
      <div className="ml-4">{right}</div>
    </div>
  )
}

export function RuleBuilder({ rule, onChange }: Props) {
  const t = useT()

  function toggleRole(role: Role) {
    const next = rule.revealTo.includes(role)
      ? rule.revealTo.filter((r) => r !== role)
      : [...rule.revealTo, role]
    onChange({ revealTo: next })
  }

  return (
    <div className="space-y-5">
      <Section title={t.rules.sectionAmount}>
        <RuleRow
          icon={DollarSign}
          label={t.rules.hideAmountLabel}
          sub={t.rules.hideAmountSub}
          right={
            <Toggle
              checked={rule.hideAmountAbove !== undefined}
              onChange={(v) => onChange({ hideAmountAbove: v ? 1000 : undefined })}
            />
          }
        />
        {rule.hideAmountAbove !== undefined && (
          <div className="px-4 pb-3.5 flex items-center gap-3">
            <span className="text-xs text-[#9CA3AF] whitespace-nowrap">{t.rules.hideAmountPrefix}</span>
            <input
              type="number"
              value={rule.hideAmountAbove}
              onChange={(e) => onChange({ hideAmountAbove: Math.max(0, parseFloat(e.target.value) || 0) })}
              className="w-28 bg-[#111827] border border-[#1f2d45] rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#3B82F6] transition-colors"
            />
            <span className="text-xs text-[#9CA3AF]">{t.rules.hideAmountSuffix}</span>
          </div>
        )}
      </Section>

      <Section title={t.rules.sectionIdentity}>
        <RuleRow
          icon={UserX}
          label={t.rules.hideSenderLabel}
          sub={t.rules.hideSenderSub}
          right={<Toggle checked={rule.hideSender} onChange={(v) => onChange({ hideSender: v })} />}
        />
        <RuleRow
          icon={UserX}
          label={t.rules.hideReceiverLabel}
          sub={t.rules.hideReceiverSub}
          right={<Toggle checked={rule.hideReceiver} onChange={(v) => onChange({ hideReceiver: v })} />}
        />
      </Section>

      <Section title={t.rules.sectionDisclosure}>
        {ROLES.map(({ value }) => {
          const roleLabel = t.roles[value as keyof typeof t.roles]
          return (
            <RuleRow
              key={value}
              icon={Users}
              label={t.rules.allowReveal(roleLabel)}
              sub={t.rules.allowRevealSub(roleLabel)}
              right={
                <Toggle
                  checked={rule.revealTo.includes(value)}
                  onChange={() => toggleRole(value)}
                />
              }
            />
          )
        })}
      </Section>

      <Section title={t.rules.sectionTime}>
        <RuleRow
          icon={Clock}
          label={t.rules.delayLabel}
          sub={t.rules.delaySub}
          right={
            <Toggle
              checked={rule.delayMinutes !== undefined && rule.delayMinutes > 0}
              onChange={(v) => onChange({ delayMinutes: v ? 10 : 0 })}
            />
          }
        />
        {rule.delayMinutes !== undefined && rule.delayMinutes > 0 && (
          <div className="px-4 pb-3.5 flex items-center gap-3">
            <span className="text-xs text-[#9CA3AF] whitespace-nowrap">{t.rules.delayPrefix}</span>
            <input
              type="number"
              value={rule.delayMinutes}
              min={1}
              onChange={(e) => onChange({ delayMinutes: Math.max(1, parseInt(e.target.value) || 1) })}
              className="w-20 bg-[#111827] border border-[#1f2d45] rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#3B82F6] transition-colors"
            />
            <span className="text-xs text-[#9CA3AF]">{t.rules.delaySuffix}</span>
            <span className="text-xs text-[#F59E0B] bg-[#1c1408] border border-[#92400e] px-2 py-0.5 rounded-full ml-1">
              {t.rules.demoMode}
            </span>
          </div>
        )}
      </Section>
    </div>
  )
}
