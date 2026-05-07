import type { Transaction } from './types'
import { applyRules } from './ruleEngine'
import { generateProof, createCommitment, mockTxSignature } from './mockZkProvider'

const now = Date.now()

const tx1: Transaction = (() => {
  const sender = '7xA9mK3pL8nQr2wE5tYuJcVbXdFgHs1Z'
  const receiver = '4Bs2nP81qM7kR3eW6yTiUcVaXdFgHj9K'
  const amount = 1200
  const asset = 'USDC'
  const timestamp = now - 30_000
  const rules = {
    hideAmountAbove: 1000,
    hideSender: true,
    hideReceiver: true,
    revealTo: ['auditor' as const],
    delayMinutes: 10,
  }
  const proof = generateProof({ id: 'tx_demo_001', sender, receiver, amount, timestamp }, rules)
  return {
    id: 'tx_demo_001',
    sender,
    receiver,
    amount,
    asset,
    timestamp,
    privacyMode: 'rule-based',
    rules,
    publicView: applyRules({ amount, asset, sender, receiver }, 'rule-based', rules),
    encryptedPayload: btoa(JSON.stringify({ amount, sender, receiver })),
    commitment: createCommitment(sender, receiver, amount, timestamp),
    proof,
    status: 'pending_reveal',
    txSignature: mockTxSignature(sender, timestamp),
  }
})()

const tx2: Transaction = (() => {
  const sender = '9cT4vN82rL6mS1aQ7xBiWdFgPkHj3E5Y'
  const receiver = '2Dt5oQ93sM8nT2bR8yCjXeGhQlIk4F6Z'
  const amount = 500
  const asset = 'USDC'
  const timestamp = now - 120_000
  const rules = {
    hideSender: true,
    hideReceiver: false,
    revealTo: ['auditor' as const, 'companyAdmin' as const],
    delayMinutes: 0,
  }
  const proof = generateProof({ id: 'tx_demo_002', sender, receiver, amount, timestamp }, rules)
  return {
    id: 'tx_demo_002',
    sender,
    receiver,
    amount,
    asset,
    timestamp,
    privacyMode: 'rule-based',
    rules,
    publicView: applyRules({ amount, asset, sender, receiver }, 'rule-based', rules),
    encryptedPayload: btoa(JSON.stringify({ amount, sender, receiver })),
    commitment: createCommitment(sender, receiver, amount, timestamp),
    proof,
    status: 'revealed',
    revealedBy: 'auditor',
    revealedAt: now - 60_000,
    txSignature: mockTxSignature(sender, timestamp),
  }
})()

const tx3: Transaction = (() => {
  const sender = '5Eu6pR04tN9oU3cS9zDkYfHiRmJl5G7A'
  const receiver = '3Fv7qS15uO0pV4dT0aElZgIjSnKm6H8B'
  const amount = 2800
  const asset = 'SOL'
  const timestamp = now - 10_000
  const rules = {
    hideAmountAbove: 100,
    hideSender: true,
    hideReceiver: true,
    revealTo: ['auditor' as const, 'daoGovernance' as const],
    delayMinutes: 10,
  }
  const proof = generateProof({ id: 'tx_demo_003', sender, receiver, amount, timestamp }, rules)
  return {
    id: 'tx_demo_003',
    sender,
    receiver,
    amount,
    asset,
    timestamp,
    privacyMode: 'private',
    rules,
    publicView: applyRules({ amount, asset, sender, receiver }, 'private', rules),
    encryptedPayload: btoa(JSON.stringify({ amount, sender, receiver })),
    commitment: createCommitment(sender, receiver, amount, timestamp),
    proof,
    status: 'rule_applied',
    txSignature: mockTxSignature(sender, timestamp),
  }
})()

export const DEMO_TRANSACTIONS: Transaction[] = [tx1, tx2, tx3]
