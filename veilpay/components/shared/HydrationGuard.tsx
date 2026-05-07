'use client'

import { useEffect, useState } from 'react'

/**
 * Renders children only after client-side hydration is complete.
 * Prevents Zustand-persist from causing a visible flash when localStorage
 * state differs from the initial server-rendered state.
 */
export function HydrationGuard({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  if (!ready) return fallback ? <>{fallback}</> : null
  return <>{children}</>
}
