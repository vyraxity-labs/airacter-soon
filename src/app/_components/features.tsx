'use client'

import { useMotionValue, useTransform, motion } from 'framer-motion'
import { 
  Globe, 
  MessageSquare, 
  Database, 
  Coins, 
  Award, 
  Users,
  LucideIcon
} from 'lucide-react'

interface FeatureItem {
  title: string
  description: string
  icon: LucideIcon
}

const FEATURES: FeatureItem[] = [
  {
    title: 'Regional & Domain Experts',
    description: 'AI characters grounded in local context—from FIRS tax regulations and local business policies to inflected regional personas.',
    icon: Globe,
  },
  {
    title: 'WhatsApp & Telegram Bridges',
    description: 'Chat with your characters directly inside the web interface, or bridge them into the messaging channels your audience already uses.',
    icon: MessageSquare,
  },
  {
    title: 'Grounded Document Memory',
    description: 'Upload files and PDFs to grant your characters context-aware knowledge bases using high-speed pgvector RAG (Retrieval-Augmented Generation).',
    icon: Database,
  },
  {
    title: 'Token-Metered Ledger',
    description: 'Fair pricing priced locally (NGN & USD) tracked on an append-only token transaction ledger with advanced FIFO grant expiry.',
    icon: Coins,
  },
  {
    title: 'Creator Revenue Share',
    description: 'Build free or premium characters, specify custom token unlock rules, and earn monthly payouts based on platform usage share.',
    icon: Award,
  },
  {
    title: 'Interactive Topic Rooms',
    description: 'Engage in collaborative spaces where group conversations are animated by resident expert bots that moderate and respond to tags.',
    icon: Users,
  },
]

function FeatureCard({ title, description, icon: Icon }: FeatureItem) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Map normalized mouse inputs to slight rotation tilts (-12 to 12 degrees)
  const rotateX = useTransform(y, [-0.5, 0.5], [12, -12])
  const rotateY = useTransform(x, [-0.5, 0.5], [-12, 12])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    // Normalize coordinates relative to card center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5
    const mouseY = (e.clientY - rect.top) / height - 0.5
    
    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div className="flex h-full" style={{ perspective: '800px' }}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="p-6 rounded-2xl glass-card border border-foreground/5 shadow-md flex flex-col items-start gap-4 transition-all duration-200 hover:shadow-glow cursor-default select-none relative overflow-hidden h-full theme-transition"
      >
        {/* Glow backdrop inside card */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
        
        <div 
          style={{ transform: 'translateZ(30px)' }}
          className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary theme-transition"
        >
          <Icon size={24} />
        </div>
        
        <h3 
          style={{ transform: 'translateZ(20px)' }}
          className="font-bold text-lg text-primary tracking-tight leading-snug theme-transition"
        >
          {title}
        </h3>
        
        <p 
          style={{ transform: 'translateZ(10px)' }}
          className="text-xs md:text-sm opacity-70 leading-relaxed font-sans"
        >
          {description}
        </p>
      </motion.div>
    </div>
  )
}

export default function Features() {
  return (
    <section className="w-full flex flex-col items-center gap-8 py-16 border-t border-foreground/5 mt-20 select-none theme-transition">
      <div className="text-center max-w-2xl mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 leading-tight text-foreground">
          Platform Architecture & Features
        </h2>
        <p className="text-sm md:text-base opacity-75 max-w-lg mx-auto leading-relaxed">
          Airacter integrates robust billing, regional scaling, and social channels to deliver domain-specific AI experts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-4">
        {FEATURES.map((feat, idx) => (
          <FeatureCard key={idx} {...feat} />
        ))}
      </div>
    </section>
  )
}
