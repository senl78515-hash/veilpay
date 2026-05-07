'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Transaction, PrivacyRule, Role, RawTransactionInput } from './types'
import { DEFAULT_RULE } from './types'
import { applyRules } from './ruleEngine'
import { generateProof, createCommitment, mockTxSignature } from './mockZkProvider'
import { DEMO_TRANSACTIONS } from './mockTransactions'
import type { Locale } from './i18n'

const FALLBACK_SENDER = '1Ab2Cd3Ef4Gh5Ij6Kl7Mn8Op9Qr0St1Uv'

type VeilPayStore = {
  transactions: Transaction[]
  pendingRule: PrivacyRule
  currentRole: Role
  locale: Locale
  walletAddress: string | null
  hydrated: boolean
  addTransaction: (input: RawTransactionInput) => Transaction
  revealTransaction: (id: string, role: Role) => void
  setPendingRule: (patch: Partial<PrivacyRule>) => void
  setCurrentRole: (role: Role) => void
  resetPendingRule: () => void
  resetDemo: () => void
  setLocale: (locale: Locale) => void
  setWalletAddress: (addr: string | null) => void
  setHydrated: () => void
}

export const useVeilPayStore = create<VeilPayStore>()(
  persist(
    (set, get) => ({
      transactions: DEMO_TRANSACTIONS,
      pendingRule: { ...DEFAULT_RULE },
      currentRole: 'public',
      locale: 'en',
      walletAddress: null,
      hydrated: false,

      setHydrated: () => set({ hydrated: true }),
      setLocale: (locale) => set({ locale }),
      setWalletAddress: (addr) => set({ walletAddress: addr }),

      addTransaction: (input) => {
        const sender = get().walletAddress ?? FALLBACK_SENDER
        const id = `tx_${Date.now()}`
        const timestamp = Date.now()
        const proof = generateProof(
          { id, sender, receiver: input.receiver, amount: input.amount, timestamp },
          input.rules
        )
        const tx: Transaction = {
          id,
          sender,
          receiver: input.receiver,
          amount: input.amount,
          asset: input.asset,
          timestamp,
          privacyMode: input.privacyMode,
          rules: input.rules,
          publicView: applyRules(
            { amount: input.amount, asset: input.asset, sender, receiver: input.receiver },
            input.privacyMode,
            input.rules
          ),
          encryptedPayload: btoa(JSON.stringify({ amount: input.amount, sender, receiver: input.receiver })),
          commitment: createCommitment(sender, input.receiver, input.amount, timestamp),
          proof,
          status: input.privacyMode === 'public' ? 'created' : 'pending_reveal',
          txSignature: mockTxSignature(sender, timestamp),
        }
        set((s) => ({ transactions: [tx, ...s.transactions] }))
        return tx
      },

      revealTransaction: (id, role) => {
        set((s) => ({
          transactions: s.transactions.map((tx) =>
            tx.id === id
              ? { ...tx, status: 'revealed', revealedBy: role, revealedAt: Date.now() }
              : tx
          ),
        }))
      },

      setPendingRule: (patch) => {
        set((s) => ({ pendingRule: { ...s.pendingRule, ...patch } }))
      },

      resetPendingRule: () => {
        set({ pendingRule: { ...DEFAULT_RULE } })
      },

      resetDemo: () => {
        set({ transactions: DEMO_TRANSACTIONS, pendingRule: { ...DEFAULT_RULE }, currentRole: 'public' })
      },

      setCurrentRole: (role) => set({ currentRole: role }),
    }),
    {
      name: 'veilpay-store',
      partialize: (state) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { walletAddress, hydrated, ...rest } = state
        return rest
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated()
      },
    }
  )
)
