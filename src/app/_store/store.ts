import { create } from 'zustand'

export type ActiveTheme = 'STOIC' | 'BRUTAL' | 'NOIR' | 'STREET'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface AppState {
  theme: ActiveTheme
  chatHistory: ChatMessage[]
  setTheme: (theme: ActiveTheme) => void
  addMessage: (message: ChatMessage) => void
  clearChat: (initialMessage?: string) => void
}

const WELCOME_MESSAGES: Record<ActiveTheme, string> = {
  BRUTAL: "Welcome to Code Jail. Paste your code and let's see how much of a crime scene it is today.",
  STOIC: "Greetings, traveller. Let us sit and examine what is troubling your mind. Remember, we suffer more often in imagination than in reality.",
  NOIR: "The rain was hitting the glass pane like a cheap typewriter. I was pouring myself a lukewarm coffee when you walked in. What's your case, kid?",
  STREET: "Ah! My friend! Enter! The Suya is hot, the onions are plenty. Tell me, wetin dey play? Life problem? Make we discuss am over food!",
}

export const useStore = create<AppState>((set) => ({
  theme: 'BRUTAL', // Default theme (starts code review style)
  chatHistory: [{ role: 'assistant', content: WELCOME_MESSAGES.BRUTAL }],
  setTheme: (theme) =>
    set(() => {
      if (typeof window !== 'undefined') {
        // Remove all theme classes
        document.documentElement.classList.remove(
          'theme-stoic',
          'theme-brutal',
          'theme-noir',
          'theme-street'
        )
        // Add new theme class
        const classMap: Record<ActiveTheme, string> = {
          STOIC: 'theme-stoic',
          BRUTAL: 'theme-brutal',
          NOIR: 'theme-noir',
          STREET: 'theme-street',
        }
        document.documentElement.classList.add(classMap[theme])
      }
      return { 
        theme,
        chatHistory: [{ role: 'assistant', content: WELCOME_MESSAGES[theme] }]
      }
    }),
  addMessage: (message) =>
    set((state) => ({
      chatHistory: [...state.chatHistory, message],
    })),
  clearChat: (initialMessage) =>
    set((state) => ({
      chatHistory: initialMessage 
        ? [{ role: 'assistant', content: initialMessage }] 
        : [{ role: 'assistant', content: WELCOME_MESSAGES[state.theme] }],
    })),
}))
