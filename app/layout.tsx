import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Mastery Academy - Master AI Before Your Competition Does',
  description: 'The most comprehensive AI course platform. 12 modules, 60+ lessons, real projects, and lifetime access. Join 10,000+ professionals mastering AI.',
  keywords: 'AI course, artificial intelligence, machine learning, ChatGPT, prompt engineering, AI tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-slate-950 text-white">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
