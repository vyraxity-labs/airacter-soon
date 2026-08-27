'use client'

import { useStore, ActiveTheme } from '../_store/store'
import clsx from 'clsx'

interface PersonaOption {
  key: ActiveTheme
  name: string
  role: string
  emoji: string
  colorClass: string
}

export const personas: PersonaOption[] = [
  {
    key: 'BRUTAL',
    name: 'Brutal Reviewer',
    role: 'Productivity',
    emoji: '👾',
    colorClass: 'border-green-500 text-green-500 shadow-green-500/20',
  },
  {
    key: 'STOIC',
    name: 'Stoic Coach',
    role: 'Wellness',
    emoji: '🏛️',
    colorClass: 'border-emerald-700 text-emerald-700 shadow-emerald-700/20',
  },
  {
    key: 'NOIR',
    name: 'Noir Detective',
    role: 'Creative',
    emoji: '🕵️',
    colorClass: 'border-neutral-500 text-neutral-400 shadow-neutral-500/10',
  },
  {
    key: 'STREET',
    name: 'Street Vendor',
    role: 'Entertainment',
    emoji: '🍛',
    colorClass: 'border-orange-500 text-orange-500 shadow-orange-500/20',
  },
]

export default function ThemeSwitcher() {
  const activeTheme = useStore((state) => state.theme)
  const setTheme = useStore((state) => state.setTheme)

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <p className="text-xs tracking-wider uppercase opacity-60">
        Select Active Persona Theme
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {personas.map((persona) => {
          const isActive = activeTheme === persona.key

          return (
            <button
              key={persona.key}
              onClick={() => setTheme(persona.key)}
              className={clsx(
                'relative flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-300 hover:-translate-y-0.5',
                isActive
                  ? 'bg-surface/90 text-primary border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.35)] scale-105'
                  : 'bg-surface/30 border-foreground/10 text-foreground/70 hover:bg-surface/50 hover:text-foreground'
              )}
            >
              <span className="text-xl leading-none">{persona.emoji}</span>
              <div className="text-left">
                <p className="font-semibold leading-tight">{persona.name}</p>
                <p className="text-[10px] opacity-60 leading-none mt-0.5">
                  {persona.role}
                </p>
              </div>
              {isActive && (
                <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
