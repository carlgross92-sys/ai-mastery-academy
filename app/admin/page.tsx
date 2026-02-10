import { prisma } from '@/lib/prisma'

export default async function AdminDashboard() {
  const [
    totalUsers,
    totalPayments,
    totalProgress,
    totalQuizAttempts,
    passedQuizAttempts,
    users,
    modules,
    recentUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'completed' } }),
    prisma.progress.count({ where: { completed: true } }),
    prisma.quizAttempt.count(),
    prisma.quizAttempt.count({ where: { passed: true } }),
    prisma.user.findMany({ select: { tier: true } }),
    prisma.module.findMany({
      include: {
        lessons: {
          include: { _count: { select: { progress: true } } },
        },
      },
      orderBy: { order: 'asc' },
    }),
    prisma.user.findMany({
      select: { id: true, name: true, email: true, tier: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
  ])

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0)
  const revenue = (totalPayments._sum.amount || 0) / 100
  const completionRate = totalUsers > 0 && totalLessons > 0
    ? Math.round((totalProgress / (totalUsers * totalLessons)) * 100)
    : 0
  const quizPassRate = totalQuizAttempts > 0
    ? Math.round((passedQuizAttempts / totalQuizAttempts) * 100)
    : 0

  const tierCounts = users.reduce((acc, u) => {
    acc[u.tier] = (acc[u.tier] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div>
      <h1 className="text-3xl font-black mb-8">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="text-sm text-slate-400 mb-1">Total Users</div>
          <div className="text-3xl font-black">{totalUsers}</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="text-sm text-slate-400 mb-1">Revenue</div>
          <div className="text-3xl font-black text-green-400">${revenue.toLocaleString()}</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="text-sm text-slate-400 mb-1">Avg Completion</div>
          <div className="text-3xl font-black">{completionRate}%</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="text-sm text-slate-400 mb-1">Quiz Pass Rate</div>
          <div className="text-3xl font-black">{quizPassRate}%</div>
        </div>
      </div>

      {/* Users by Tier */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
          <h2 className="text-lg font-bold mb-4">Users by Tier</h2>
          <div className="space-y-3">
            {['free', 'starter', 'pro', 'master'].map(tier => {
              const count = tierCounts[tier] || 0
              const pct = totalUsers > 0 ? (count / totalUsers) * 100 : 0
              const colors: Record<string, string> = {
                free: 'bg-slate-500',
                starter: 'bg-blue-500',
                pro: 'bg-purple-500',
                master: 'bg-amber-500',
              }
              return (
                <div key={tier}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="capitalize font-medium">{tier}</span>
                    <span className="text-slate-400">{count}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className={`${colors[tier]} h-2 rounded-full transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Module Completion Rates */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
          <h2 className="text-lg font-bold mb-4">Module Completion</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {modules.map(mod => {
              const totalCompletions = mod.lessons.reduce((sum, l) => sum + l._count.progress, 0)
              const maxCompletions = mod.lessons.length * totalUsers
              const pct = maxCompletions > 0 ? Math.round((totalCompletions / maxCompletions) * 100) : 0
              return (
                <div key={mod.id}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium truncate mr-2">{mod.icon} {mod.title}</span>
                    <span className="text-slate-400 flex-shrink-0">{pct}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recent Signups */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-lg font-bold">Recent Signups</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="text-left p-4 font-medium">Name</th>
                <th className="text-left p-4 font-medium">Email</th>
                <th className="text-left p-4 font-medium">Tier</th>
                <th className="text-left p-4 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map(u => (
                <tr key={u.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="p-4 font-medium">{u.name}</td>
                  <td className="p-4 text-slate-400">{u.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold capitalize ${
                      u.tier === 'master' ? 'bg-amber-500/20 text-amber-300' :
                      u.tier === 'pro' ? 'bg-purple-500/20 text-purple-300' :
                      u.tier === 'starter' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-slate-700 text-slate-400'
                    }`}>
                      {u.tier}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
