'use client'

import { useState, useEffect } from 'react'

interface Badge {
  id: string
  name: string
  description: string
  icon: string
}

interface BadgeNotificationProps {
  badges: Badge[]
}

export default function BadgeNotification({ badges }: BadgeNotificationProps) {
  const [visible, setVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (badges.length > 0) {
      setVisible(true)
      const timer = setTimeout(() => setVisible(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [badges, currentIndex])

  useEffect(() => {
    if (!visible && currentIndex < badges.length - 1) {
      const next = setTimeout(() => {
        setCurrentIndex(prev => prev + 1)
        setVisible(true)
      }, 500)
      return () => clearTimeout(next)
    }
  }, [visible, currentIndex, badges.length])

  if (badges.length === 0 || currentIndex >= badges.length) return null

  const badge = badges[currentIndex]

  return (
    <div
      className={`fixed top-20 right-4 z-50 transition-all duration-500 ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 backdrop-blur-xl shadow-2xl shadow-yellow-500/10 max-w-sm">
        <div className="text-4xl animate-bounce">{badge.icon}</div>
        <div>
          <div className="text-xs font-bold text-yellow-400 uppercase tracking-wider">Badge Earned!</div>
          <div className="font-bold text-white">{badge.name}</div>
          <div className="text-xs text-slate-400">{badge.description}</div>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="ml-2 text-slate-500 hover:text-white transition flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
