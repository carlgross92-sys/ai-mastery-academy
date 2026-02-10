'use client'

import { useState, useEffect } from 'react'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchUsers = async (q = '') => {
    setLoading(true)
    const res = await fetch(`/api/admin/users?search=${encodeURIComponent(q)}`)
    const data = await res.json()
    setUsers(data.users || [])
    setLoading(false)
  }

  useEffect(() => { fetchUsers() }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchUsers(search)
  }

  const updateUser = async (userId: string, data: any) => {
    await fetch(`/api/admin/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    fetchUsers(search)
  }

  return (
    <div>
      <h1 className="text-3xl font-black mb-8">Users</h1>

      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 outline-none"
        />
        <button type="submit" className="px-5 py-2.5 bg-blue-500 rounded-xl font-semibold text-sm hover:bg-blue-600 transition">
          Search
        </button>
      </form>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading...</div>
      ) : (
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="text-left p-4 font-medium">Name</th>
                  <th className="text-left p-4 font-medium">Email</th>
                  <th className="text-left p-4 font-medium">Tier</th>
                  <th className="text-left p-4 font-medium">Progress</th>
                  <th className="text-left p-4 font-medium">Admin</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                    <td className="p-4 font-medium">{u.name}</td>
                    <td className="p-4 text-slate-400">{u.email}</td>
                    <td className="p-4">
                      <select
                        value={u.tier}
                        onChange={e => updateUser(u.id, { tier: e.target.value })}
                        className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs capitalize"
                      >
                        <option value="free">Free</option>
                        <option value="starter">Starter</option>
                        <option value="pro">Pro</option>
                        <option value="master">Master</option>
                      </select>
                    </td>
                    <td className="p-4 text-slate-400">
                      {u._count.progress} lessons &middot; {u._count.badges} badges
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => updateUser(u.id, { isAdmin: !u.isAdmin })}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                          u.isAdmin
                            ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                            : 'bg-slate-800 text-slate-500 hover:bg-slate-700'
                        }`}
                      >
                        {u.isAdmin ? 'Admin' : 'User'}
                      </button>
                    </td>
                    <td className="p-4 text-slate-500 text-xs">
                      Joined {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
