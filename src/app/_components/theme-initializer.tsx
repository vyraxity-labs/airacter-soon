'use client'

import { useEffect } from 'react'
import { useStore } from '../_store/store'

export default function ThemeInitializer() {
  const theme = useStore((state) => state.theme)
  const setTheme = useStore((state) => state.setTheme)

  useEffect(() => {
    // Sync the initial theme with document element on client-side mount
    setTheme(theme)
  }, [setTheme, theme])

  return null
}
