import type { Transaction, Role } from './types'

const DEMO_DELAY_SECONDS = 10
const MS_PER_MINUTE = 60_000

export function isDelayPassed(tx: Transaction): boolean {
  const delayMs = (tx.rules.delayMinutes ?? 0) * MS_PER_MINUTE
  const demoDelayMs = DEMO_DELAY_SECONDS * 1000
  const effectiveDelay = Math.min(delayMs, demoDelayMs)
  return Date.now() >= tx.timestamp + effectiveDelay
}

export function canReveal(tx: Transaction, role: Role): boolean {
  if (role === 'public') return false
  if (!tx.rules.revealTo.includes(role)) return false
  return isDelayPassed(tx)
}

export function getSecondsUntilReveal(tx: Transaction): number {
  const demoDelayMs = DEMO_DELAY_SECONDS * 1000
  const elapsed = Date.now() - tx.timestamp
  const remaining = demoDelayMs - elapsed
  return remaining > 0 ? Math.ceil(remaining / 1000) : 0
}

export function getRevealedView(tx: Transaction) {
  return {
    amount: `${tx.amount} ${tx.asset}`,
    sender: tx.sender,
    receiver: tx.receiver,
  }
}
