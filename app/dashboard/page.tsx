import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import CertificateSection from './CertificateSection'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      progress: {
        where: { completed: true },
        include: { lesson: { include: { module: true } } },
        orderBy: { completedAt: 'desc' },
      },
      badges: {
        include: { badge: true },
      },
    }
  })

  const totalLessons = await prisma.lesson.count()
  const completedLessons = user?.progress.length || 0
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
  const xp = completedLessons * 100

  // Get modules for progress breakdown
  const modules = await prisma.module.findMany({
    include: {
      lessons: true,
    },
    orderBy: { order: 'asc' },
  })

  const completedLessonIds = new Set(user?.progress.map(p => p.lessonId) || [])

  // Certificate check
  const course = await prisma.course.findFirst({ where: { published: true } })
  const certificate = course ? await prisma.certificate.findUnique({
    where: { userId_courseId: { userId: session.user.id, courseId: course.id } },
  }) : null

  const isPro = ['pro', 'master'].includes(user?.tier || '')
  const tierAccess: Record<string, string[]> = {
    free: ['free'],
    starter: ['free', 'starter'],
    pro: ['free', 'starter', 'pro'],
    master: ['free', 'starter', 'pro', 'master'],
  }
  const accessibleTiers = tierAccess[user?.tier || 'free'] || ['free']
  const accessibleLessons = modules.filter(m => accessibleTiers.includes(m.tier)).flatMap(m => m.lessons)
  const allAccessibleComplete = accessibleLessons.length > 0 && accessibleLessons.every(l => completedLessonIds.has(l.id))
  const certEligible = isPro && allAccessibleComplete

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-12 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black mb-2">
                Welcome back, {user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-slate-400">
                {progressPercent === 0
                  ? 'Ready to start your AI mastery journey?'
                  : progressPercent === 100
                  ? 'You\'ve completed the entire course!'
                  : 'Keep up the great work. You\'re making progress!'}
              </p>
            </div>
            <Link
              href="/course"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition shadow-lg shadow-blue-500/25"
            >
              Continue Learning &rarr;
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {/* Overall Progress */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 card-hover">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="text-sm text-slate-400 font-medium">Progress</span>
            </div>
            <div className="text-3xl font-black text-gradient">{progressPercent}%</div>
            <div className="text-xs text-slate-500 mt-1">{completedLessons} of {totalLessons} lessons</div>
            <div className="mt-3 w-full bg-slate-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* XP */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 card-hover">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <span className="text-sm text-slate-400 font-medium">Total XP</span>
            </div>
            <div className="text-3xl font-black text-gradient-gold">{xp.toLocaleString()}</div>
            <div className="text-xs text-slate-500 mt-1">+100 XP per lesson</div>
          </div>

          {/* Badges */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 card-hover">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <span className="text-sm text-slate-400 font-medium">Badges</span>
            </div>
            <div className="text-3xl font-black">{user?.badges.length || 0}</div>
            <div className="text-xs text-slate-500 mt-1">Achievements unlocked</div>
          </div>

          {/* Modules Completed */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 card-hover">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <span className="text-sm text-slate-400 font-medium">Modules</span>
            </div>
            <div className="text-3xl font-black">
              {modules.filter(m => m.lessons.every(l => completedLessonIds.has(l.id)) && m.lessons.length > 0).length}
              <span className="text-lg text-slate-500">/{modules.length}</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">Modules completed</div>
          </div>
        </div>

        {/* Module Progress Breakdown */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-xl font-bold">Module Progress</h2>
          </div>
          <div className="divide-y divide-slate-800/50">
            {modules.map((mod, idx) => {
              const modCompleted = mod.lessons.filter(l => completedLessonIds.has(l.id)).length
              const modTotal = mod.lessons.length
              const modPercent = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0

              return (
                <div key={mod.id} className="p-6 hover:bg-slate-800/30 transition">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{mod.icon || '📚'}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-slate-500 font-medium">MODULE {idx + 1}</span>
                        {modPercent === 100 && (
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-green-500/20 text-green-300 rounded-full border border-green-500/30">
                            COMPLETE
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold truncate">{mod.title}</h3>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold">{modPercent}%</div>
                      <div className="text-xs text-slate-500">{modCompleted}/{modTotal}</div>
                    </div>
                  </div>
                  <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${
                        modPercent === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                      }`}
                      style={{ width: `${modPercent}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        {user?.progress && user.progress.length > 0 && (
          <div className="mt-8 rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-800">
              <h2 className="text-xl font-bold">Recent Activity</h2>
            </div>
            <div className="divide-y divide-slate-800/50">
              {user.progress.slice(0, 5).map((p) => (
                <div key={p.id} className="px-6 py-4 flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">Completed: {p.lesson.title}</p>
                    <p className="text-xs text-slate-500">{p.lesson.module.title}</p>
                  </div>
                  <div className="text-xs text-slate-500 flex-shrink-0">
                    {p.completedAt ? new Date(p.completedAt).toLocaleDateString() : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Badges Section */}
        {user?.badges && user.badges.length > 0 && (
          <div className="mt-8 rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
            <h2 className="text-xl font-bold mb-6">Your Badges</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {user.badges.map((ub) => (
                <div key={ub.id} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 text-center card-hover">
                  <div className="text-4xl mb-2">{ub.badge.icon}</div>
                  <div className="font-semibold text-sm">{ub.badge.name}</div>
                  <div className="text-xs text-slate-500 mt-1">{ub.badge.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificate Section */}
        <div className="mt-8 rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
          <h2 className="text-xl font-bold mb-4">Certificate</h2>
          {certificate ? (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-amber-300">Certificate Earned!</div>
                <div className="text-sm text-slate-400">You&apos;ve completed the course.</div>
              </div>
              <Link
                href={`/certificate/${certificate.id}`}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 font-semibold text-black text-sm hover:from-amber-600 hover:to-yellow-600 transition"
              >
                View Certificate
              </Link>
            </div>
          ) : certEligible ? (
            <CertificateSection />
          ) : (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-slate-400">Certificate Locked</div>
                <div className="text-sm text-slate-500">
                  {!isPro
                    ? 'Upgrade to Pro or Master tier to earn a certificate.'
                    : 'Complete all lessons in your tier to unlock your certificate.'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
