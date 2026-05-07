'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shield, Send, Settings, Eye, Zap, Languages, ArrowRight, Wallet } from 'lucide-react'
import { useVeilPayStore } from '@/lib/store'
import { useT } from '@/lib/useT'
import { usePhantomWallet } from '@/lib/usePhantomWallet'

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const { locale, setLocale } = useVeilPayStore()
  const t = useT()
  const isLanding = path === '/'

  const NAV = [
    { href: '/send',  label: t.nav.send,  icon: Send },
    { href: '/rules', label: t.nav.rules, icon: Settings },
    { href: '/audit', label: t.nav.audit, icon: Eye },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[#1f2d45] bg-[#0d1117]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-white">
              Veil<span className="text-[#3B82F6]">Pay</span>
            </span>
          </Link>

          {/* Nav — hidden on landing */}
          {!isLanding && (
            <nav className="flex items-center gap-1">
              {NAV.map(({ href, label, icon: Icon }) => {
                const active = path.startsWith(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      active
                        ? 'bg-[#1e2d47] text-[#3B82F6]'
                        : 'text-[#9CA3AF] hover:text-white hover:bg-[#111827]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </Link>
                )
              })}
            </nav>
          )}

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={() => setLocale(locale === 'en' ? 'zh' : 'en')}
              className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white bg-[#111827] border border-[#1f2d45] hover:border-[#374151] px-3 py-1.5 rounded-full transition-all duration-150"
              title={locale === 'en' ? '切换为中文' : 'Switch to English'}
            >
              <Languages className="w-3.5 h-3.5" />
              {locale === 'en' ? '中文' : 'EN'}
            </button>

            {/* Wallet button */}
            <WalletButton />

            {/* On landing: Launch Demo; on app pages: network badge */}
            {isLanding ? (
              <Link
                href="/send"
                className="flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-3.5 py-1.5 rounded-full hover:from-[#1d4ed8] hover:to-[#6d28d9] transition-all"
              >
                {t.nav.launchDemo}
                <ArrowRight className="w-3 h-3" />
              </Link>
            ) : (
              <div className="flex items-center gap-2 text-xs text-[#9CA3AF] bg-[#111827] border border-[#1f2d45] px-3 py-1.5 rounded-full">
                <Zap className="w-3 h-3 text-[#F59E0B]" />
                {t.nav.network}
              </div>
            )}
          </div>
        </div>
      </header>

      {isLanding ? (
        <main className="flex-1">{children}</main>
      ) : (
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">{children}</main>
      )}
    </div>
  )
}

function WalletButton() {
  const t = useT()
  const { address, connecting, connect, disconnect } = usePhantomWallet()

  if (address) {
    return (
      <button
        onClick={disconnect}
        className="group flex items-center gap-1.5 text-xs text-[#22C55E] bg-[#0d1f12] border border-[#166534]/60 hover:border-red-500/50 hover:text-red-400 hover:bg-[#1a0a0a] px-3 py-1.5 rounded-full transition-all duration-150"
        title="Disconnect wallet"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] group-hover:bg-red-400 transition-colors" />
        {address.slice(0, 4)}…{address.slice(-4)}
      </button>
    )
  }

  return (
    <button
      onClick={connect}
      disabled={connecting}
      className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white bg-[#111827] border border-[#1f2d45] hover:border-[#374151] px-3 py-1.5 rounded-full transition-all duration-150 disabled:opacity-50"
    >
      {connecting ? (
        <div className="w-3 h-3 border border-[#9CA3AF] border-t-transparent rounded-full animate-spin" />
      ) : (
        <Wallet className="w-3.5 h-3.5" />
      )}
      {connecting ? t.nav.connecting : t.nav.connectWallet}
    </button>
  )
}
