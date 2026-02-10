'use client'

import { useState, useEffect } from 'react'

export default function AdminBadgesPage() {
  const [badges, setBadges] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/badges')
      .then(r => r.json())
      .then(data => { setBadges(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-black mb-8">Badges</h1>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map(badge => (
            <div key={badge.id} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{badge.icon}</div>
                <div>
                  <h3 className="font-bold">{badge.name}</h3>
                  <p className="text-xs text-slate-500">{badge.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <span className="text-xs text-slate-500 font-mono">{badge.criteria}</span>
                <span className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-300 text-sm font-bold">
                  {badge._count.users} earned
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
