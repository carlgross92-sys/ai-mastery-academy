'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminModuleDetailPage({ params }: { params: { moduleId: string } }) {
  const router = useRouter()
  const [mod, setMod] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('')
  const [tier, setTier] = useState('free')

  useEffect(() => {
    fetch(`/api/admin/modules/${params.moduleId}`)
      .then(r => r.json())
      .then(data => {
        setMod(data)
        setTitle(data.title)
        setDescription(data.description || '')
        setIcon(data.icon || '')
        setTier(data.tier)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [params.moduleId])

  const handleSave = async () => {
    setSaving(true)
    await fetch(`/api/admin/modules/${params.moduleId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, icon, tier }),
    })
    setSaving(false)
  }

  if (loading) return <div className="text-center py-12 text-slate-500">Loading...</div>
  if (!mod) return <div className="text-center py-12 text-slate-500">Module not found</div>

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/modules" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-3xl font-black">Edit Module</h1>
      </div>

      <div className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 text-white focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 text-white focus:border-blue-500 outline-none resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Icon (emoji)</label>
            <input
              value={icon}
              onChange={e => setIcon(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 text-white focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Tier</label>
            <select
              value={tier}
              onChange={e => setTier(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 text-white focus:border-blue-500 outline-none"
            >
              <option value="free">Free</option>
              <option value="starter">Starter</option>
              <option value="pro">Pro</option>
              <option value="master">Master</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Lessons List */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Lessons ({mod.lessons?.length || 0})</h2>
        <div className="space-y-2">
          {mod.lessons?.map((lesson: any, idx: number) => (
            <div key={lesson.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/50">
              <span className="text-sm text-slate-500 font-mono w-8">{idx + 1}.</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{lesson.title}</div>
                <div className="text-xs text-slate-500">{lesson.duration ? `${lesson.duration} min` : 'No duration set'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
