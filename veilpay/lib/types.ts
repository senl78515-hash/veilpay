export type Role =
  | 'public'
  | 'user'
  | 'auditor'
  | 'companyAdmin'
  | 'daoGovernance'

export type PrivacyMode = 'public' | 'private' | 'rule-based'

export type Asset = 'USDC' | 'SOL'

export type PrivacyRule = {
  hideAmountAbove?: number
  hideSender: boolean
  hideReceiver: boolean
  revealTo: Role[]
  delayMinutes?: number
}

export type PublicView = {
  amount: string
  sender: string
  receiver: string
}

export type TransactionStatus =
  | 'created'
  | 'rule_applied'
  | 'pending_reveal'
  | 'revealed'

export type ZKProof = {
  proofId: string
  commitment: string
  verified: boolean
  provider: 'mock-v1'
  createdAt: number
}

export type Transaction = {
  id: string
  sender: string
  receiver: string
  amount: number
  asset: Asset
  timestamp: number
  privacyMode: PrivacyMode
  rules: PrivacyRule
  publicView: PublicView
  encryptedPayload: string
  commitment: string
  proof: ZKProof
  status: TransactionStatus
  revealedBy?: Role
  revealedAt?: number
  txSignature: string
}

export type RawTransactionInput = {
  receiver: string
  amount: number
  asset: Asset
  privacyMode: PrivacyMode
  rules: PrivacyRule
}

export const ROLE_LABELS: Record<Role, string> = {
  public: 'Public Viewer',
  user: 'Transaction User',
  auditor: 'Auditor',
  companyAdmin: 'Company Admin',
  daoGovernance: 'DAO Governance',
}

export const DEFAULT_RULE: PrivacyRule = {
  hideAmountAbove: 1000,
  hideSender: true,
  hideReceiver: true,
  revealTo: ['auditor'],
  delayMinutes: 10,
}
