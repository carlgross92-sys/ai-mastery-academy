'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminModulesPage() {
  const [modules, setModules] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/modules')
      .then(r => r.json())
      .then(data => { setModules(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-black mb-8">Modules</h1>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading...</div>
      ) : (
        <div className="space-y-3">
          {modules.map((mod, idx) => (
            <Link
              key={mod.id}
              href={`/admin/modules/${mod.id}`}
              className="flex items-center gap-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:bg-slate-800/60 transition"
            >
              <div className="text-3xl">{mod.icon || '📚'}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs text-slate-500 font-medium">MODULE {idx + 1}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize ${
                    mod.tier === 'master' ? 'bg-amber-500/20 text-amber-300' :
                    mod.tier === 'pro' ? 'bg-purple-500/20 text-purple-300' :
                    mod.tier === 'starter' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-slate-700 text-slate-400'
                  }`}>
                    {mod.tier}
                  </span>
                </div>
                <h3 className="font-bold truncate">{mod.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{mod._count.lessons} lessons</p>
              </div>
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
