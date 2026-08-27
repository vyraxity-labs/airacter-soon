'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TimeRemaining {
  days: string
  hours: string
  minutes: string
  seconds: string
}

function RollingDigit({ value }: { value: string }) {
  return (
    <div
      className='relative w-8 aspect-2/3 md:w-10 overflow-hidden rounded-lg bg-surface/50 border border-foreground/10 flex items-center justify-center shadow-lg select-none theme-transition'
      style={{ perspective: '600px', transformStyle: 'preserve-3d' }}
    >
      {/* Horizontal divider line mimicking flip clock cards */}
      <div className='absolute left-0 right-0 top-1/2 h-px bg-foreground/10 z-10 pointer-events-none' />

      <AnimatePresence mode='popLayout'>
        <motion.span
          key={value}
          initial={{ rotateX: -90, y: '30%', opacity: 0 }}
          animate={{ rotateX: 0, y: 0, opacity: 1 }}
          exit={{ rotateX: 90, y: '-30%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 140, damping: 16 }}
          className='absolute inset-0 flex items-center justify-center font-bold text-2xl md:text-4xl font-mono text-primary select-none'
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

function TimeSegment({ value, label }: { value: string; label: string }) {
  return (
    <div className='flex flex-col items-center gap-2'>
      <div className='flex gap-1 md:gap-2'>
        {value.split('').map((char, index) => (
          <RollingDigit key={`${label}-${index}-${char}`} value={char} />
        ))}
      </div>
      <span className='text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-65 mt-1'>
        {label}
      </span>
    </div>
  )
}

export default function Countdown3D() {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  })
  const [isLaunched, setIsLaunched] = useState(false)

  useEffect(() => {
    // Target date: November 16, 2026 00:00:00 UTC
    const targetDate = new Date('2026-11-16T00:00:00Z').getTime()

    const calculateTime = () => {
      const now = new Date().getTime()
      const diff = targetDate - now

      if (diff <= 0) {
        setIsLaunched(true)
        setTimeRemaining({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
        })
        return
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24))
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeRemaining({
        days: d.toString().padStart(2, '0'),
        hours: h.toString().padStart(2, '0'),
        minutes: m.toString().padStart(2, '0'),
        seconds: s.toString().padStart(2, '0'),
      })
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className='flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl glass-card relative overflow-hidden w-full max-w-2xl border border-foreground/5 shadow-xl select-none theme-transition'>
      <div className='absolute top-0 left-0 w-full h-0.75 bg-linear-to-r from-transparent via-primary to-transparent opacity-60' />

      {isLaunched ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className='text-center py-4'
        >
          <h3 className='text-3xl font-extrabold tracking-wider text-primary blinking-cursor'>
            SYSTEM ENGINE IS LIVE
          </h3>
          <p className='text-xs opacity-60 mt-2 font-mono'>
            Redirecting to core interface...
          </p>
        </motion.div>
      ) : (
        <div className='flex items-center justify-center gap-3 md:gap-4 w-full'>
          <TimeSegment value={timeRemaining.days} label='Days' />
          <span className='text-2xl md:text-4xl font-black text-primary/70 pb-5 font-mono select-none'>
            :
          </span>
          <TimeSegment value={timeRemaining.hours} label='Hours' />
          <span className='text-2xl md:text-4xl font-black text-primary/70 pb-5 font-mono select-none'>
            :
          </span>
          <TimeSegment value={timeRemaining.minutes} label='Mins' />
          <span className='text-2xl md:text-4xl font-black text-primary/70 pb-5 font-mono select-none'>
            :
          </span>
          <TimeSegment value={timeRemaining.seconds} label='Secs' />
        </div>
      )}
    </div>
  )
}
