'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const categories = [
  { id: 'all', label: 'All Posts' },
  { id: 'general', label: 'General' },
  { id: 'wins', label: 'Wins & Milestones' },
  { id: 'questions', label: 'Questions' },
  { id: 'resources', label: 'Resources' },
]

export default function CommunityPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState<any[]>([])
  const [category, setCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (session?.user?.tier !== 'master' && status === 'authenticated') router.push('/dashboard')
  }, [session, status, router])

  useEffect(() => {
    if (session?.user?.tier === 'master') {
      setLoading(true)
      fetch(`/api/community/posts?category=${category}`)
        .then(r => r.json())
        .then(data => { setPosts(data.posts || []); setLoading(false) })
        .catch(() => setLoading(false))
    }
  }, [category, session])

  if (status === 'loading' || !session) return null

  return (
    <div className="min-h-screen">
      <section className="relative py-12 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-black mb-2">Mastermind Community</h1>
              <p className="text-slate-400">Connect with fellow AI masters</p>
            </div>
            <Link
              href="/community/new"
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-sm hover:from-blue-600 hover:to-purple-600 transition shadow-lg shadow-blue-500/25"
            >
              New Post
            </Link>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  category === cat.id
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Posts list */}
          {loading ? (
            <div className="text-center py-12 text-slate-500">Loading...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-2">No posts yet</h3>
              <p className="text-slate-400 mb-6">Be the first to start a discussion!</p>
              <Link
                href="/community/new"
                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-sm"
              >
                Create First Post
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {posts.map(post => (
                <Link
                  key={post.id}
                  href={`/community/${post.id}`}
                  className="block p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:bg-slate-800/60 transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {post.user.name?.charAt(0) || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white mb-1 truncate">{post.title}</h3>
                      <p className="text-sm text-slate-400 line-clamp-2">{post.content}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                        <span>{post.user.name}</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 capitalize">{post.category}</span>
                        <span>{post._count.replies} {post._count.replies === 1 ? 'reply' : 'replies'}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
