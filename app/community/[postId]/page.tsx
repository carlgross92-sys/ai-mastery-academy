'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function PostPage({ params }: { params: { postId: string } }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [post, setPost] = useState<any>(null)
  const [reply, setReply] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (session?.user?.tier !== 'master' && status === 'authenticated') router.push('/dashboard')
  }, [session, status, router])

  useEffect(() => {
    if (session?.user?.tier === 'master') {
      fetch(`/api/community/posts/${params.postId}`)
        .then(r => r.json())
        .then(data => { setPost(data); setLoading(false) })
        .catch(() => setLoading(false))
    }
  }, [params.postId, session])

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reply.trim()) return
    setSubmitting(true)

    try {
      const res = await fetch(`/api/community/posts/${params.postId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: reply }),
      })
      const newReply = await res.json()
      setPost((prev: any) => ({ ...prev, replies: [...prev.replies, newReply] }))
      setReply('')
    } catch (error) {
      console.error('Error posting reply:', error)
    }
    setSubmitting(false)
  }

  if (status === 'loading' || loading || !session) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading...</div>
  }

  if (!post) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500">Post not found</div>
  }

  return (
    <div className="min-h-screen">
      <section className="relative py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back */}
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Community
          </Link>

          {/* Post */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                {post.user.name?.charAt(0) || '?'}
              </div>
              <div>
                <div className="font-semibold">{post.user.name}</div>
                <div className="text-xs text-slate-500">
                  {new Date(post.createdAt).toLocaleDateString()} &middot;{' '}
                  <span className="capitalize">{post.category}</span>
                </div>
              </div>
            </div>
            <h1 className="text-2xl font-black mb-4">{post.title}</h1>
            <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">{post.content}</div>
          </div>

          {/* Replies */}
          <h3 className="text-lg font-bold mb-4">{post.replies.length} {post.replies.length === 1 ? 'Reply' : 'Replies'}</h3>

          <div className="space-y-4 mb-8">
            {post.replies.map((r: any) => (
              <div key={r.id} className="rounded-xl bg-slate-900/40 border border-slate-800/50 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-xs font-bold">
                    {r.user.name?.charAt(0) || '?'}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{r.user.name}</div>
                    <div className="text-xs text-slate-500">{new Date(r.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">{r.content}</div>
              </div>
            ))}
          </div>

          {/* Reply form */}
          <form onSubmit={handleReply} className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
            <h4 className="font-bold mb-3">Add a Reply</h4>
            <textarea
              value={reply}
              onChange={e => setReply(e.target.value)}
              placeholder="Write your reply..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none mb-4"
              required
            />
            <button
              type="submit"
              disabled={submitting || !reply.trim()}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-sm hover:from-blue-600 hover:to-purple-600 transition disabled:opacity-50"
            >
              {submitting ? 'Posting...' : 'Post Reply'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
