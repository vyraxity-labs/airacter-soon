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

export const useStore = create<AppState>((set) => ({
  theme: 'BRUTAL', // Default theme (starts code review style)
  chatHistory: [],
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
      return { theme }
    }),
  addMessage: (message) =>
    set((state) => ({
      chatHistory: [...state.chatHistory, message],
    })),
  clearChat: (initialMessage) =>
    set(() => ({
      chatHistory: initialMessage ? [{ role: 'assistant', content: initialMessage }] : [],
    })),
}))
