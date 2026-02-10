import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

const tierLevel: Record<string, number> = { free: 0, starter: 1, pro: 2, master: 3 }

const tierNames: Record<string, string> = {
  free: 'Free',
  starter: 'Starter',
  pro: 'Pro',
  master: 'Master',
}

const moduleColors: Record<number, string> = {
  0: 'from-blue-500 to-cyan-500',
  1: 'from-purple-500 to-pink-500',
  2: 'from-green-500 to-emerald-500',
  3: 'from-orange-500 to-amber-500',
  4: 'from-pink-500 to-rose-500',
  5: 'from-indigo-500 to-blue-500',
  6: 'from-yellow-500 to-orange-500',
  7: 'from-cyan-500 to-teal-500',
  8: 'from-red-500 to-pink-500',
  9: 'from-emerald-500 to-green-500',
  10: 'from-violet-500 to-purple-500',
  11: 'from-blue-600 to-violet-600',
}

export default async function CoursePage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  const userTier = session.user.tier || 'free'
  const userLevel = tierLevel[userTier] ?? 0

  const course = await prisma.course.findFirst({
    where: { published: true },
    include: {
      modules: {
        include: {
          lessons: {
            orderBy: { order: 'asc' }
          }
        },
        orderBy: { order: 'asc' }
      }
    }
  })

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold mb-2">No course available yet</h2>
          <p className="text-slate-400">Check back soon!</p>
        </div>
      </div>
    )
  }

  const userProgress = await prisma.progress.findMany({
    where: { userId: session.user.id }
  })

  const progressMap = new Map(userProgress.map(p => [p.lessonId, p]))
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const totalCompleted = userProgress.filter(p => p.completed).length
  const overallPercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0

  return (
    <div className="min-h-screen">
      {/* Course Header */}
      <section className="relative py-12 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-sm text-blue-300 mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                {course.modules.length} Modules &middot; {totalLessons} Lessons
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-3">{course.title}</h1>
              <p className="text-lg text-slate-400">{course.description}</p>
            </div>

            {/* Overall progress ring */}
            <div className="flex-shrink-0 flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${overallPercent * 2.51} ${251 - overallPercent * 2.51}`}
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                  {overallPercent}%
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold">Overall Progress</div>
                <div className="text-xs text-slate-500">{totalCompleted} of {totalLessons} complete</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <div className="max-w-6xl mx-auto px-4 pb-16 space-y-6">
        {course.modules.map((module, idx) => {
          const moduleTier = module.tier || 'free'
          const requiredLevel = tierLevel[moduleTier] ?? 0
          const hasAccess = userLevel >= requiredLevel
          const completedLessons = module.lessons.filter(
            l => progressMap.get(l.id)?.completed
          ).length
          const totalModLessons = module.lessons.length
          const modPercent = totalModLessons > 0 ? Math.round((completedLessons / totalModLessons) * 100) : 0
          const isComplete = modPercent === 100 && totalModLessons > 0
          const color = moduleColors[idx] || 'from-blue-500 to-purple-500'

          if (!hasAccess) {
            // Locked module - show overlay
            const requiredTierName = tierNames[moduleTier] || moduleTier

            return (
              <div
                key={module.id}
                className="relative rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden"
              >
                {/* Module header - blurred/dimmed */}
                <div className="p-6 relative">
                  {/* Blur overlay */}
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-10" />

                  {/* Locked content preview (behind blur) */}
                  <div className="opacity-40">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-lg font-black flex-shrink-0 shadow-lg`}>
                          {module.icon || (idx + 1)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                              Module {idx + 1}
                            </span>
                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                              moduleTier === 'pro'
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                : moduleTier === 'master'
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                                : 'bg-green-500/20 text-green-300 border-green-500/30'
                            }`}>
                              {moduleTier.toUpperCase()}
                            </span>
                          </div>
                          <h2 className="text-xl font-bold">{module.title}</h2>
                          {module.description && (
                            <p className="text-sm text-slate-400 mt-1">{module.description}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Placeholder lesson items */}
                    <div className="grid md:grid-cols-2 gap-2 mt-4">
                      {module.lessons.slice(0, 4).map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/40 border border-slate-800"
                        >
                          <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-slate-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{lesson.title}</div>
                            {lesson.duration && (
                              <div className="text-xs text-slate-500 mt-0.5">{lesson.duration} min</div>
                            )}
                          </div>
                        </div>
                      ))}
                      {module.lessons.length > 4 && (
                        <div className="flex items-center justify-center p-4 rounded-xl bg-slate-800/20 border border-slate-800/50">
                          <span className="text-sm text-slate-500">+{module.lessons.length - 4} more lessons</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Lock overlay content */}
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      moduleTier === 'master'
                        ? 'bg-purple-500/20 border border-purple-500/30'
                        : moduleTier === 'pro'
                        ? 'bg-blue-500/20 border border-blue-500/30'
                        : 'bg-green-500/20 border border-green-500/30'
                    }`}>
                      <svg className={`w-8 h-8 ${
                        moduleTier === 'master'
                          ? 'text-purple-400'
                          : moduleTier === 'pro'
                          ? 'text-blue-400'
                          : 'text-green-400'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-1">{module.title}</h3>
                    <p className="text-sm text-slate-400 mb-4">
                      {totalModLessons} lesson{totalModLessons !== 1 ? 's' : ''} &middot; Unlock with {requiredTierName}
                    </p>
                    <Link
                      href="/pricing"
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition shadow-lg ${
                        moduleTier === 'master'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-purple-500/25'
                          : moduleTier === 'pro'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-blue-500/25'
                          : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-green-500/25'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Unlock with {requiredTierName}
                    </Link>
                  </div>
                </div>
              </div>
            )
          }

          // Accessible module - render normally
          return (
            <div
              key={module.id}
              className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden card-hover"
            >
              {/* Module header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    {/* Module number circle */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-lg font-black flex-shrink-0 shadow-lg`}>
                      {module.icon || (idx + 1)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                          Module {idx + 1}
                        </span>
                        {isComplete && (
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-green-500/20 text-green-300 rounded-full border border-green-500/30">
                            COMPLETE
                          </span>
                        )}
                        {module.tier !== 'free' && (
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                            module.tier === 'pro'
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                              : module.tier === 'master'
                              ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                              : 'bg-green-500/20 text-green-300 border-green-500/30'
                          }`}>
                            {module.tier?.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-bold">{module.title}</h2>
                      {module.description && (
                        <p className="text-sm text-slate-400 mt-1">{module.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Module progress */}
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="text-2xl font-black">{modPercent}%</div>
                    <div className="text-xs text-slate-500">{completedLessons}/{totalModLessons} lessons</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 rounded-full h-1.5 mb-6">
                  <div
                    className={`h-1.5 rounded-full transition-all bg-gradient-to-r ${color}`}
                    style={{ width: `${modPercent}%` }}
                  />
                </div>

                {/* Lessons grid */}
                <div className="grid md:grid-cols-2 gap-2">
                  {module.lessons.map((lesson) => {
                    const isCompleted = progressMap.get(lesson.id)?.completed

                    return (
                      <Link
                        key={lesson.id}
                        href={`/course/${module.slug}/${lesson.slug}`}
                        className="group flex items-center gap-3 p-4 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-600 hover:bg-slate-800/70 transition"
                      >
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCompleted
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-slate-700 text-slate-500'
                        }`}>
                          {isCompleted ? (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-slate-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm group-hover:text-white transition truncate">
                            {lesson.title}
                          </div>
                          {lesson.duration && (
                            <div className="text-xs text-slate-500 mt-0.5">{lesson.duration} min</div>
                          )}
                        </div>
                        <svg className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
