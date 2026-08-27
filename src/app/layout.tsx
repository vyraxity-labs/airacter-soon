import './global.css'
import type { Metadata } from 'next'
import ThemeInitializer from './_components/theme-initializer'

export const metadata: Metadata = {
  title: 'Airacter - One AI Engine. Infinite Personas.',
  description: 'A platform for domain and regionally-grounded AI characters that speak, remember, and adapt.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="theme-brutal">
      <body className="antialiased min-h-screen flex flex-col relative">
        <ThemeInitializer />
        {/* Overlay container holds custom theme effects like scanlines, grain, grids */}
        <div className="overlay-container" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
