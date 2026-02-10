'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

export default function Navbar() {
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-black tracking-tight group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-shadow">
              AI
            </div>
            <span className="font-bold text-lg hidden sm:inline">
              <span className="text-gradient">AI Mastery</span>{' '}
              <span className="text-slate-300">Academy</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/course" className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition">
              Courses
            </Link>
            <Link href="/pricing" className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition">
              Pricing
            </Link>

            {session ? (
              <>
                <Link href="/dashboard" className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition">
                  Dashboard
                </Link>
                {session.user.tier === 'master' && (
                  <Link href="/community" className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition">
                    Community
                  </Link>
                )}
                {session.user.isAdmin && (
                  <Link href="/admin" className="px-4 py-2 text-sm text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-lg transition">
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="ml-2 px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 rounded-lg transition border border-slate-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition">
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="ml-2 px-5 py-2 text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition shadow-lg shadow-blue-500/25"
                >
                  Start Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900/95 backdrop-blur">
          <div className="px-4 py-4 space-y-1">
            <Link
              href="/course"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition"
            >
              Courses
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition"
            >
              Pricing
            </Link>

            {session ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition"
                >
                  Dashboard
                </Link>
                {session.user.tier === 'master' && (
                  <Link
                    href="/community"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition"
                  >
                    Community
                  </Link>
                )}
                {session.user.isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-lg transition"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => { signOut(); setMobileOpen(false) }}
                  className="block w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block mx-4 mt-2 px-4 py-3 text-center font-semibold bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
                >
                  Start Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
