'use client'

import { useStore } from './_store/store'
import ThemeSwitcher from './_components/theme-switcher'
import ThreeOrbit from './_components/three-orbit'
import Countdown3D from './_components/countdown-3d'
import ChatPreview from './_components/chat-preview'
import Features from './_components/features'
import clsx from 'clsx'

export default function Page() {
  const activeTheme = useStore((state) => state.theme)

  const getHeroText = () => {
    switch (activeTheme) {
      case 'STOIC':
        return 'Seek wisdom in reflection. Confront what you control.'
      case 'NOIR':
        return 'The city never sleeps. Neither do its secrets.'
      case 'STREET':
        return 'Oya, enter the zone! No time to check time.'
      case 'BRUTAL':
      default:
        return "Your code is an absolute catastrophe. Let's fix it."
    }
  }

  return (
    <main className='flex flex-col items-center justify-between min-h-screen px-6 py-12 md:py-24 max-w-7xl mx-auto z-10 w-full relative'>
      <ThreeOrbit />
      {/* Header */}
      <header className='flex justify-between items-center w-full mb-12'>
        <div className='flex items-center gap-2'>
          <span className='text-3xl font-extrabold tracking-wider text-primary'>
            AIRACTER
          </span>
          <span className='text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border border-primary/30 text-primary'>
            v2.0
          </span>
        </div>
        <div className='hidden sm:block text-xs font-semibold opacity-60'>
          Coming November 2026
        </div>
      </header>

      {/* Hero Section */}
      <section className='flex flex-col items-center justify-center flex-1 max-w-3xl text-center my-12 w-full'>
        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 border border-primary/25 text-primary mb-6 animate-pulse'>
          ⚡ System Engine Online
        </div>

        <h1 className='text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight'>
          One AI Engine.
          <br />
          <span className='text-primary font-black drop-shadow-sm'>
            Infinite Personas.
          </span>
        </h1>

        <p className='text-lg md:text-2xl opacity-80 min-h-15 font-medium leading-relaxed max-w-2xl px-4 transition-all duration-300'>
          &ldquo;{getHeroText()}&rdquo;
        </p>

        {/* 3D Countdown component container */}
        <div className='mt-12 w-full max-w-xl flex justify-center'>
          <Countdown3D />
        </div>

        <div className='mt-16 w-full max-w-lg p-6 rounded-2xl glass-card relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none' />
          <ThemeSwitcher />
        </div>

        <div className='mt-12 w-full max-w-2xl flex justify-center'>
          <ChatPreview />
        </div>
      </section>

      {/* Features Grid */}
      <Features />

      {/* Footer */}
      <footer className='w-full text-center mt-12 text-xs opacity-50 flex flex-col sm:flex-row justify-between items-center gap-4'>
        <p>© 2026 Airacter. Grounded AI Personas.</p>
        <div className='flex gap-4'>
          <span className='hover:text-primary transition-colors cursor-pointer'>
            Specs
          </span>
          <span className='hover:text-primary transition-colors cursor-pointer'>
            Nigeria (NGN) / Global (USD)
          </span>
        </div>
      </footer>
    </main>
  )
}
