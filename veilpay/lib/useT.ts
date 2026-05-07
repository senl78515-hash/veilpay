'use client'

import { useVeilPayStore } from './store'
import { translations } from './i18n'

export function useT() {
  const locale = useVeilPayStore((s) => s.locale)
  return translations[locale]
}
