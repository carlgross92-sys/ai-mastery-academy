'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewPostPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('general')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (session?.user?.tier !== 'master' && status === 'authenticated') router.push('/dashboard')
  }, [session, status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return
    setSubmitting(true)

    try {
      const res = await fetch('/api/community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category }),
      })
      const post = await res.json()
      if (post.id) router.push(`/community/${post.id}`)
    } catch (error) {
      console.error('Error creating post:', error)
    }
    setSubmitting(false)
  }

  if (status === 'loading' || !session) return null

  return (
    <div className="min-h-screen">
      <section className="relative py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/community"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-3xl font-black">New Post</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="general">General</option>
                <option value="wins">Wins & Milestones</option>
                <option value="questions">Questions</option>
                <option value="resources">Resources</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Content</label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Share your thoughts..."
                rows={8}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                required
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={submitting || !title.trim() || !content.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition shadow-lg shadow-blue-500/25 disabled:opacity-50"
              >
                {submitting ? 'Posting...' : 'Post'}
              </button>
              <Link href="/community" className="px-6 py-3 bg-slate-800 rounded-xl font-semibold hover:bg-slate-700 transition">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
