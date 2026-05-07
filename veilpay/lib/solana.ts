import {
  Connection,
  Ed25519Program,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js'

const DEVNET_RPC = 'https://api.devnet.solana.com'
const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr')

type PhantomSigner = {
  isPhantom?: boolean
  publicKey?: { toString(): string; toBytes(): Uint8Array }
  signMessage(msg: Uint8Array, display?: 'utf8' | 'hex'): Promise<{ signature: Uint8Array }>
  signAndSendTransaction(tx: Transaction): Promise<{ signature: string }>
}

function getPhantom(): PhantomSigner | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as { solana?: PhantomSigner }
  return w.solana?.isPhantom ? w.solana : null
}

/**
 * Two-step on-chain anchoring:
 * 1. Ed25519Program verifies the sender signed this exact commitment (real crypto).
 * 2. Memo program writes the commitment to devnet as a permanent record.
 * Both instructions land in a single atomic transaction.
 */
export async function anchorCommitmentOnChain(
  commitment: string,
  walletAddress: string,
): Promise<string> {
  const phantom = getPhantom()
  if (!phantom) throw new Error('Phantom not found')

  const connection = new Connection(DEVNET_RPC, 'confirmed')
  const feePayer = new PublicKey(walletAddress)
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()

  const message = Buffer.from(`VeilPay:${commitment.slice(0, 40)}`)

  // Step 1: wallet signs the commitment hash (Phantom "Sign Message" popup)
  const { signature: ed25519Sig } = await phantom.signMessage(message, 'utf8')

  // Step 2: Ed25519 precompile instruction — Solana network verifies sig on-chain
  const ed25519Ix = Ed25519Program.createInstructionWithPublicKey({
    publicKey: feePayer.toBytes(),
    message,
    signature: ed25519Sig,
  })

  // Step 3: Memo instruction — anchors the commitment data as a readable record
  const memoIx = new TransactionInstruction({
    keys: [{ pubkey: feePayer, isSigner: true, isWritable: false }],
    programId: MEMO_PROGRAM_ID,
    data: message,
  })

  // Ed25519 instruction MUST be at index 0 (precompile requirement)
  const tx = new Transaction({ blockhash, lastValidBlockHeight, feePayer })
  tx.add(ed25519Ix)
  tx.add(memoIx)

  // Step 4: wallet approves & sends (Phantom "Approve Transaction" popup)
  const { signature } = await phantom.signAndSendTransaction(tx)
  return signature
}

/** Request 0.5 devnet SOL to the connected wallet for gas fees. */
export async function airdropDevnet(walletAddress: string): Promise<void> {
  const connection = new Connection(DEVNET_RPC, 'confirmed')
  const pubkey = new PublicKey(walletAddress)
  const sig = await connection.requestAirdrop(pubkey, 0.5 * LAMPORTS_PER_SOL)
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
  await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature: sig }, 'confirmed')
}

export function explorerUrl(signature: string) {
  return `https://explorer.solana.com/tx/${signature}?cluster=devnet`
}
