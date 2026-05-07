'use client'

import { useState, useEffect, useCallback } from 'react'
import { useVeilPayStore } from './store'

type PhantomProvider = {
  isPhantom?: boolean
  publicKey?: { toString(): string }
  connect(opts?: { onlyIfTrusted?: boolean }): Promise<{ publicKey: { toString(): string } }>
  disconnect(): Promise<void>
  on(event: string, cb: () => void): void
  removeListener(event: string, cb: () => void): void
}

function getProvider(): PhantomProvider | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as { solana?: PhantomProvider }
  return w.solana?.isPhantom ? w.solana : null
}

export function usePhantomWallet() {
  const { walletAddress, setWalletAddress } = useVeilPayStore()
  const [connecting, setConnecting] = useState(false)

  useEffect(() => {
    const provider = getProvider()
    if (!provider) return

    // Silent reconnect if previously trusted
    provider.connect({ onlyIfTrusted: true })
      .then(({ publicKey }) => setWalletAddress(publicKey.toString()))
      .catch(() => {})

    const onDisconnect = () => setWalletAddress(null)
    provider.on('disconnect', onDisconnect)
    return () => provider.removeListener('disconnect', onDisconnect)
  }, [setWalletAddress])

  const connect = useCallback(async () => {
    const provider = getProvider()
    if (!provider) {
      window.open('https://phantom.app/', '_blank')
      return
    }
    setConnecting(true)
    try {
      const { publicKey } = await provider.connect()
      setWalletAddress(publicKey.toString())
    } catch {
      // user rejected
    } finally {
      setConnecting(false)
    }
  }, [setWalletAddress])

  const disconnect = useCallback(async () => {
    const provider = getProvider()
    await provider?.disconnect()
    setWalletAddress(null)
  }, [setWalletAddress])

  return { address: walletAddress, connecting, connect, disconnect }
}
