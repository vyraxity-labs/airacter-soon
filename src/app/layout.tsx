import './global.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Airacter - Coming Soon',
  description: 'One AI Engine. Infinite Personas.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
