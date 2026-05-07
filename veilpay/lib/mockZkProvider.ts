import type { Transaction, PrivacyRule, ZKProof } from './types'

function hashString(s: string): string {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = (h * 0x01000193) >>> 0
  }
  return h.toString(16).padStart(8, '0')
}

export function createCommitment(
  sender: string,
  receiver: string,
  amount: number,
  timestamp: number
): string {
  const raw = `${sender}:${receiver}:${amount}:${timestamp}`
  const h1 = hashString(raw)
  const h2 = hashString(raw.split('').reverse().join(''))
  const h3 = hashString(`${h1}${h2}`)
  return `0x${h1}${h2}${h3}`.slice(0, 42)
}

export function generateProof(
  tx: Pick<Transaction, 'id' | 'sender' | 'receiver' | 'amount' | 'timestamp'>,
  rules: PrivacyRule
): ZKProof {
  const ruleHash = hashString(JSON.stringify(rules))
  const txHash = hashString(`${tx.id}${tx.sender}${tx.amount}`)
  const commitment = createCommitment(tx.sender, tx.receiver, tx.amount, tx.timestamp)

  return {
    proofId: `proof_${txHash}_${ruleHash}`.slice(0, 24),
    commitment,
    verified: true,
    provider: 'mock-v1',
    createdAt: Date.now(),
  }
}

export function verifyProof(proof: ZKProof): boolean {
  return (
    proof.provider === 'mock-v1' &&
    proof.commitment.startsWith('0x') &&
    proof.proofId.startsWith('proof_') &&
    proof.verified
  )
}

export function mockTxSignature(sender: string, timestamp: number): string {
  const h = hashString(`${sender}${timestamp}`)
  const suffix = hashString(`${timestamp}`)
  return `${h}${suffix}xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
    .slice(0, 88)
    .replace(/x/g, () => '0123456789abcdef'[Math.floor(Math.random() * 16)])
}
