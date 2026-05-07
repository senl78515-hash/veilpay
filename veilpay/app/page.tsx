'use client'

import Link from 'next/link'
import { ArrowRight, Shield, Globe, Lock, Sliders, CheckCircle2, ChevronRight, Zap, Users, Clock } from 'lucide-react'
import { useT } from '@/lib/useT'

export default function LandingPage() {
  const t = useT()
  const l = t.landing

  return (
    <div className="space-y-0">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] rounded-full bg-[#3B82F6]/8 blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#8B5CF6]/8 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#3B82F6]/4 blur-[160px]" />
        </div>

        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 border border-[#1e3a6e] bg-[#0d1a2e] px-4 py-1.5 rounded-full text-xs text-[#60A5FA] font-medium">
            <Zap className="w-3 h-3 text-[#F59E0B]" />
            {l.heroEyebrow}
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
              {l.heroHeadline1}
            </h1>
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight"
              style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 60%, #EC4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              {l.heroHeadline2}
            </h1>
          </div>

          <p className="text-lg text-[#9CA3AF] max-w-xl mx-auto leading-relaxed">
            {l.heroSub}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/send"
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:from-[#1d4ed8] hover:to-[#6d28d9] transition-all duration-150 group"
            >
              {l.heroCta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <span className="text-xs text-[#4B5563] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse inline-block" />
              {l.heroCtaSub}
            </span>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#374151]">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#374151]" />
          <ChevronRight className="w-4 h-4 rotate-90" />
        </div>
      </section>

      {/* ── Problem ─────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-white">{l.problemTitle}</h2>
            <p className="text-[#9CA3AF]">{l.problemSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Fully Public */}
            <ProblemCard
              icon={Globe}
              label={l.problemPublicLabel}
              desc={l.problemPublicDesc}
              tag={l.problemPublicTag}
              tagClass="bg-[#1c0a0a] text-[#EF4444] border-[#7f1d1d]"
              borderClass="border-[#374151]"
              iconClass="text-[#6B7280]"
              strikethrough
            />
            {/* Fully Hidden */}
            <ProblemCard
              icon={Lock}
              label={l.problemPrivateLabel}
              desc={l.problemPrivateDesc}
              tag={l.problemPrivateTag}
              tagClass="bg-[#1c0a0a] text-[#EF4444] border-[#7f1d1d]"
              borderClass="border-[#374151]"
              iconClass="text-[#6B7280]"
              strikethrough
            />
            {/* VeilPay */}
            <ProblemCard
              icon={Sliders}
              label={l.problemVeilLabel}
              desc={l.problemVeilDesc}
              tag={l.problemVeilTag}
              tagClass="bg-[#0d1f12] text-[#22C55E] border-[#166534]"
              borderClass="border-[#3B82F6] shadow-lg shadow-blue-500/10"
              iconClass="text-[#3B82F6]"
              highlight
            />
          </div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#0d1117]/60">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-white">{l.howTitle}</h2>
            <p className="text-[#9CA3AF]">{l.howSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '01', icon: Sliders, title: l.step1Title, desc: l.step1Desc, color: 'text-[#3B82F6]', bg: 'bg-[#0d1a2e] border-[#1e3a6e]' },
              { n: '02', icon: Shield,  title: l.step2Title, desc: l.step2Desc, color: 'text-[#8B5CF6]', bg: 'bg-[#130d25] border-[#2d1b5e]' },
              { n: '03', icon: Users,   title: l.step3Title, desc: l.step3Desc, color: 'text-[#22C55E]', bg: 'bg-[#0d1f12] border-[#166534]' },
            ].map(({ n, icon: Icon, title, desc, color, bg }) => (
              <div key={n} className={`${bg} border rounded-xl p-5 space-y-3`}>
                <div className="flex items-center gap-3">
                  <span className={`text-3xl font-black ${color} opacity-30`}>{n}</span>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div>
                  <p className="font-semibold text-white">{title}</p>
                  <p className="text-sm text-[#9CA3AF] mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Case ────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold text-[#3B82F6] uppercase tracking-widest mb-2">{l.useCaseTitle}</p>
                <h2 className="text-3xl font-bold text-white">{l.useCaseScenario}</h2>
              </div>
              <ul className="space-y-3">
                {l.useCaseItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#D1D5DB]">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#22C55E] bg-[#0d1f12] border border-[#166534] px-3 py-1.5 rounded-full">
                <Shield className="w-3 h-3" />
                {l.useCaseBadge}
              </span>
            </div>

            {/* Visual mock */}
            <div className="bg-[#111827] border border-[#1f2d45] rounded-2xl p-5 space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 pb-2 border-b border-[#1f2d45]">
                <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
                <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                <span className="ml-2 text-[#4B5563] text-[11px]">Transaction Explorer</span>
              </div>
              {[
                { addr: '4Bs2...P81q', amt: '[Hidden]', status: 'rule-based' },
                { addr: '9cT4...E5Y',  amt: '[Hidden]', status: 'rule-based' },
                { addr: '5Eu6...G7A',  amt: '[Hidden]', status: 'private'    },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-[#1f2d45] last:border-0">
                  <span className="text-[#9CA3AF]">{row.addr}</span>
                  <span className="text-[#4B6A9B] hidden-pulse">{row.amt}</span>
                  <span className="text-[#374151] text-[11px]">{row.status}</span>
                </div>
              ))}
              <div className="pt-1 text-[#3B82F6] text-[11px] flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                Auditor reveal available after delay...
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ──────────────────────────────────────────── */}
      <section className="py-20 px-6 text-center border-t border-[#1f2d45]">
        <div className="max-w-xl mx-auto space-y-6">
          <p
            className="text-2xl font-bold"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            {l.footerTagline}
          </p>
          <Link
            href="/send"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] text-white font-semibold text-sm shadow-lg shadow-blue-500/20 hover:from-[#1d4ed8] hover:to-[#6d28d9] transition-all"
          >
            {l.heroCta} <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="flex items-center justify-center gap-3 text-xs text-[#4B5563]">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-[#F59E0B]" /> {l.builtOn}
            </span>
            <span>·</span>
            <span className="text-[#374151] border border-[#1f2d45] px-2 py-0.5 rounded-full">{l.hackathonBadge}</span>
          </div>
        </div>
      </section>
    </div>
  )
}

function ProblemCard({
  icon: Icon, label, desc, tag, tagClass, borderClass, iconClass, highlight, strikethrough,
}: {
  icon: React.ElementType; label: string; desc: string; tag: string
  tagClass: string; borderClass: string; iconClass: string
  highlight?: boolean; strikethrough?: boolean
}) {
  return (
    <div className={`relative bg-[#111827] border rounded-xl p-5 space-y-3 ${borderClass} ${highlight ? '' : 'opacity-70'}`}>
      {highlight && (
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent rounded-t-xl" />
      )}
      <div className="flex items-center justify-between">
        <Icon className={`w-5 h-5 ${iconClass}`} />
        <span className={`text-xs font-semibold border px-2 py-0.5 rounded-full ${tagClass}`}>{tag}</span>
      </div>
      <div>
        <p className={`font-semibold ${highlight ? 'text-white' : 'text-[#6B7280]'} ${strikethrough ? 'line-through' : ''}`}>
          {label}
        </p>
        <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}
