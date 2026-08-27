'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useStore, ActiveTheme } from '../_store/store'
import { Send, RotateCcw } from 'lucide-react'
import clsx from 'clsx'

interface CharacterData {
  name: string
  avatar: string
  tagline: string
  welcome: string
  suggestions: string[]
  getResponse: (input: string) => string
}

const CHARACTERS: Record<ActiveTheme, CharacterData> = {
  BRUTAL: {
    name: 'Brutal Code Reviewer',
    avatar: '👾',
    tagline: 'Merciless, specific, no sugarcoating.',
    welcome:
      "Welcome to Code Jail. Paste your code and let's see how much of a crime scene it is today.",
    suggestions: [
      'Review my print("Hello World") script.',
      'Is my bubble sort code good?',
    ],
    getResponse: (input: string) => {
      const clean = input.toLowerCase()
      if (clean.includes('hello') || clean.includes('hi')) {
        return "Hello? Focus. Let's see some code. I don't get paid in greeting cards."
      }
      if (clean.includes('print')) {
        return 'A single print statement? Outstanding. We have a regular Linus Torvalds over here. Try writing some actual logic next time.'
      }
      if (clean.includes('sort') || clean.includes('bubble')) {
        return "Bubble sort? In 2026? What's next, storing data on floppy disks? Use a modern sorting algorithm or let a library handle it, please."
      }
      if (clean.includes('react') || clean.includes('next')) {
        return "Next.js? React? Let me guess, you're using 50 client components and nesting imports like Russian dolls. Check your hooks before you crash your browser."
      }
      const fallbacks = [
        'This code looks like it was written by a caffeinated squirrel. Delete it and start over.',
        "I've seen compiler errors with more style than this. Refactor immediately.",
        "LGTM? More like Let's Go Trash this Mess. Your code is a hazard to public safety.",
      ]
      return fallbacks[Math.floor(Math.random() * fallbacks.length)]
    },
  },
  STOIC: {
    name: 'Stoic Coach',
    avatar: '🏛️',
    tagline: 'Marcus Aurelius-inspired, focuses on what is in your control.',
    welcome:
      'Greetings, traveller. Let us sit and examine what is troubling your mind. Remember, we suffer more often in imagination than in reality.',
    suggestions: [
      'I am stressed about the future.',
      'How do I deal with traffic anger?',
    ],
    getResponse: (input: string) => {
      const clean = input.toLowerCase()
      if (clean.includes('hello') || clean.includes('hi')) {
        return 'Welcome, friend. May you find peace today. Tell me, what lies in your thoughts?'
      }
      if (
        clean.includes('stress') ||
        clean.includes('anxi') ||
        clean.includes('future')
      ) {
        return 'The future is a shadow. Focus on the present action. You control your thoughts, not external events. Realize this, and you will find strength.'
      }
      if (
        clean.includes('anger') ||
        clean.includes('angry') ||
        clean.includes('mad')
      ) {
        return 'Anger is a temporary madness. When you are angry, you harm yourself more than the person who offended you. Pause. Take a breath. Choose wisdom.'
      }
      if (
        clean.includes('fail') ||
        clean.includes('mistake') ||
        clean.includes('wrong')
      ) {
        return "Mistakes are but lessons. Marcus Aurelius said: 'The impediment to action advances action. What stands in the way becomes the way.' Embrace the obstacle."
      }
      const fallbacks = [
        'Is this obstacle within your control, or outside it? Focus your energy only on the former.',
        'Do not seek for things to happen the way you want them to; rather, wish that what happens happens the way it happens: then you will be happy.',
        'Look within. Inside is the fountain of good, and it will ever bubble up, if you will ever dig.',
      ]
      return fallbacks[Math.floor(Math.random() * fallbacks.length)]
    },
  },
  NOIR: {
    name: 'Noir Detective',
    avatar: '🕵️',
    tagline: 'Raymond Chandler noir voice, everything is a mystery.',
    welcome:
      "The rain was hitting the glass pane like a cheap typewriter. I was pouring myself a lukewarm coffee when you walked in. What's your case, kid?",
    suggestions: [
      'Who stole my cup of coffee?',
      "It's a dark and stormy night.",
    ],
    getResponse: (input: string) => {
      const clean = input.toLowerCase()
      if (clean.includes('hello') || clean.includes('hi')) {
        return "You walk in without knocking, spitting hello like it's a nickel. Grab a chair. What's the case?"
      }
      if (
        clean.includes('coffee') ||
        clean.includes('stole') ||
        clean.includes('cup')
      ) {
        return "Ah, the missing coffee. A classic. It leaves a paper trail of caffeine stains, and the chief suspect is usually staring back at you in the mirror. Or maybe it's the intern."
      }
      if (
        clean.includes('rain') ||
        clean.includes('storm') ||
        clean.includes('night')
      ) {
        return 'The storm outside matches the mood in this city. A million stories, and half of them end in wet shoes and broken promises. Keep talking.'
      }
      if (
        clean.includes('case') ||
        clean.includes('clue') ||
        clean.includes('crime')
      ) {
        return 'Clues are like cheap perfume—they linger long after the culprit is gone. We need to look deeper into the shadows.'
      }
      const fallbacks = [
        'In this city, trust is a currency nobody can afford. Tell me the whole story.',
        "Something about this setup doesn't smell right. Like three-day-old fish wrapped in yesterday's news.",
        "I've walked down these streets long enough to know a trap when I see one. Go on.",
      ]
      return fallbacks[Math.floor(Math.random() * fallbacks.length)]
    },
  },
  STREET: {
    name: 'Street Food Vendor',
    avatar: '🍛',
    tagline: 'Life advice through food metaphors, Pidgin-inflected.',
    welcome:
      'Ah! My friend! Enter! The Suya is hot, the onions are plenty. Tell me, wetin dey play? Life problem? Make we discuss am over food!',
    suggestions: ['My boss is stressing me out.', "I don't have money."],
    getResponse: (input: string) => {
      const clean = input.toLowerCase()
      if (
        clean.includes('hello') ||
        clean.includes('hi') ||
        clean.includes('how')
      ) {
        return 'Aba! Long time no see! Welcome! Make I add small extra pepper for you? Wetin dey sub?'
      }
      if (
        clean.includes('boss') ||
        clean.includes('work') ||
        clean.includes('stress')
      ) {
        return 'Your boss dey make head swell? Look, no kill yourself for work o! Work go finish, but you get only one life. Eat Suya first, then go face them with power!'
      }
      if (
        clean.includes('money') ||
        clean.includes('broke') ||
        clean.includes('cash')
      ) {
        return 'No money? E go red, but e go clean! Even pepper soup need small time to boil before e sweet. Keep pushing, your time dey come!'
      }
      if (
        clean.includes('food') ||
        clean.includes('suya') ||
        clean.includes('pepper')
      ) {
        return 'My Suya is the best in Lagos! Real meat, correct spice. If you eat am, all your stress go scatter! Oya, order another plate!'
      }
      const fallbacks = [
        'No shaking, my friend! Life na turn-by-turn. Today fit red, tomorrow go green! Relax!',
        'No stress yourself. Bring your plate make I put correct spice. Everything go set!',
        'Oya, talk your mind! I dey hear you. But remember, chop first before you think!',
      ]
      return fallbacks[Math.floor(Math.random() * fallbacks.length)]
    },
  },
}

function getRandomThinkingDelay() {
  return 1000 + Math.random() * 800
}

function getRandomStreamInterval() {
  return 20 + Math.random() * 15
}

export default function ChatPreview() {
  const activeTheme = useStore((state) => state.theme)
  const chatHistory = useStore((state) => state.chatHistory)
  const addMessage = useStore((state) => state.addMessage)
  const clearChat = useStore((state) => state.clearChat)

  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)

  const charData = CHARACTERS[activeTheme]

  // Scroll to bottom when history or typing state changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory, isTyping, streamingText])

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping || streamingText) return

    // Add user message
    addMessage({ role: 'user', content: text })
    setInputText('')
    setIsTyping(true)

    // Simulate thinking delay using static helper to satisfy react-hooks/purity
    await new Promise((resolve) =>
      setTimeout(resolve, getRandomThinkingDelay()),
    )
    setIsTyping(false)

    const fullResponse = charData.getResponse(text)
    let currentText = ''

    // Simulate streaming letter by letter
    const chars = fullResponse.split('')
    let i = 0

    const streamInterval = setInterval(() => {
      if (i < chars.length) {
        currentText += chars[i]
        setStreamingText(currentText)
        i++
      } else {
        clearInterval(streamInterval)
        addMessage({ role: 'assistant', content: fullResponse })
        setStreamingText('')
      }
    }, getRandomStreamInterval()) // Speed of typing simulation using static helper to satisfy react-hooks/purity
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend(inputText)
    }
  }

  return (
    <div className='w-full max-w-2xl rounded-2xl glass-card border border-foreground/5 shadow-2xl overflow-hidden flex flex-col h-120 theme-transition relative'>
      {/* Header bar */}
      <div className='px-6 py-4 border-b border-foreground/5 bg-surface/40 flex items-center justify-between z-10 theme-transition'>
        <div className='flex items-center gap-3'>
          <div className='text-3xl select-none'>{charData.avatar}</div>
          <div className='text-left'>
            <h4 className='font-bold text-sm md:text-base text-primary leading-tight'>
              {charData.name}
            </h4>
            <p className='text-[10px] md:text-xs opacity-65 leading-none mt-0.5 font-medium'>
              {charData.tagline}
            </p>
          </div>
        </div>
        <button
          onClick={() => clearChat(charData.welcome)}
          title='Reset conversation'
          className='p-2 rounded-lg hover:bg-foreground/5 text-foreground/60 hover:text-foreground transition-colors cursor-pointer'
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Messages Thread */}
      <div className='flex-1 overflow-y-auto p-6 space-y-4 flex flex-col scrollbar-thin scrollbar-thumb-foreground/10 select-text'>
        {chatHistory.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={clsx(
              'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed theme-transition relative',
              msg.role === 'user'
                ? clsx(
                    'self-end rounded-br-none font-sans text-primary-foreground',
                    activeTheme === 'NOIR' ? 'bg-teal-900' : 'bg-primary',
                  )
                : clsx(
                    'bg-surface/60 border border-foreground/5 self-start rounded-bl-none',
                    activeTheme === 'BRUTAL' &&
                      'font-mono text-green-400 border-green-500/20',
                    activeTheme === 'NOIR' &&
                      'font-mono tracking-tight text-white border-neutral-800',
                    activeTheme === 'STOIC' &&
                      'font-serif text-slate-800 leading-loose',
                    activeTheme === 'STREET' && 'font-sans text-yellow-100',
                  ),
            )}
          >
            {msg.content}
          </motion.div>
        ))}

        {/* Streaming Assistant Response */}
        {streamingText && (
          <div
            className={clsx(
              'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed self-start rounded-bl-none bg-surface/60 border border-foreground/5 theme-transition',
              activeTheme === 'BRUTAL' &&
                'font-mono text-green-400 border-green-500/20 blinking-cursor',
              activeTheme === 'NOIR' &&
                'font-mono tracking-tight text-white border-neutral-800 blinking-cursor',
              activeTheme === 'STOIC' &&
                'font-serif text-slate-800 leading-loose',
              activeTheme === 'STREET' && 'font-sans text-yellow-100',
            )}
          >
            {streamingText}
          </div>
        )}

        {/* Typing / Thinking Indicator */}
        {isTyping && (
          <div className='bg-surface/60 border border-foreground/5 rounded-2xl px-4 py-3 self-start rounded-bl-none flex items-center gap-1.5 w-16'>
            <span
              className='w-1.5 h-1.5 bg-primary rounded-full animate-bounce'
              style={{ animationDelay: '0ms' }}
            />
            <span
              className='w-1.5 h-1.5 bg-primary rounded-full animate-bounce'
              style={{ animationDelay: '150ms' }}
            />
            <span
              className='w-1.5 h-1.5 bg-primary rounded-full animate-bounce'
              style={{ animationDelay: '300ms' }}
            />
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested prompts deck */}
      {chatHistory.length === 1 && !isTyping && !streamingText && (
        <div className='px-6 py-2 flex flex-wrap gap-2 justify-start z-10 select-none'>
          {charData.suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(suggestion)}
              className='text-xs px-3 py-1.5 rounded-full bg-surface/40 hover:bg-surface/80 border border-foreground/5 text-primary transition-all duration-200 cursor-pointer'
            >
              &ldquo;{suggestion}&rdquo;
            </button>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className='p-4 border-t border-foreground/5 bg-surface/20 flex gap-2 items-center z-10 theme-transition select-none'>
        <textarea
          rows={1}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isTyping || !!streamingText}
          placeholder={`Type message to ${charData.name}...`}
          className='flex-1 rounded-xl bg-surface/50 border border-foreground/10 px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 text-foreground resize-none disabled:opacity-50 min-h-9.5 max-h-20'
        />
        <button
          onClick={() => handleSend(inputText)}
          disabled={!inputText.trim() || isTyping || !!streamingText}
          className='p-2.5 rounded-xl bg-primary text-primary-foreground disabled:opacity-50 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center h-9.5 w-9.5'
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}
