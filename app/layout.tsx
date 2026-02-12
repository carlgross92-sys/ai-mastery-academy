import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = process.env.NEXTAUTH_URL || 'https://ai-takeover-courses.vercel.app'

export const metadata: Metadata = {
  title: 'AI Mastery Academy - Master AI Before Your Competition Does',
  description: 'Master AI in 30 days. 12 modules. 60+ lessons. The CRAFT framework that saves business owners 15+ hours per week. Module 1 is completely free.',
  keywords: 'AI course, artificial intelligence, machine learning, ChatGPT, prompt engineering, AI tools, AI for business, automation',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'AI Mastery Academy',
    description: 'Master AI in 30 days. 12 modules. 60+ lessons. The CRAFT framework that saves business owners 15+ hours per week. Module 1 is completely free.',
    url: siteUrl,
    siteName: 'AI Mastery Academy',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Mastery Academy',
    description: 'Master AI in 30 days. 12 modules. 60+ lessons. Module 1 is completely free.',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/logo.svg',
  },
  other: {
    'theme-color': '#3b82f6',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta name="theme-color" content="#3b82f6" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.svg" />
      </head>
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
