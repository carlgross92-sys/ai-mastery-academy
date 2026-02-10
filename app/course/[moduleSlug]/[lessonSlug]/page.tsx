import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import LessonSteps from '@/components/LessonSteps'
import LessonQuiz from '@/components/LessonQuiz'

const tierLevel: Record<string, number> = { free: 0, starter: 1, pro: 2, master: 3 }

const tierNames: Record<string, string> = {
  free: 'Free',
  starter: 'Starter',
  pro: 'Pro',
  master: 'Master',
}

const tierUnlockFeatures: Record<string, string[]> = {
  starter: [
    'Prompt Engineering Mastery module',
    'Business AI Integration module',
    'All quizzes & exercises',
    'Ready-to-use prompt templates',
  ],
  pro: [
    'Everything in Starter',
    'Advanced AI Workflows & Automation',
    'AI for Content & Marketing',
    'AI for Data & Analytics',
    'Custom AI Solutions & GPTs',
    'Certificate of Completion',
  ],
  master: [
    'Everything in Pro',
    'AI Strategy & Leadership',
    'AI Product Development',
    'AI Ethics & Governance',
    'Future of AI & Your Roadmap',
    'Private mastermind community',
  ],
}

function parseContentIntoSteps(htmlContent: string) {
  const steps = []
  const sections = htmlContent.split('<h2>')

  if (sections[0].trim()) {
    const match = sections[0].match(/<h1>(.*?)<\/h1>/)
    const title = match ? match[1] : 'Introduction'
    steps.push({
      title: title,
      content: sections[0]
    })
  }

  for (let i = 1; i < sections.length; i++) {
    const section = '<h2>' + sections[i]
    const titleMatch = section.match(/<h2>(.*?)<\/h2>/)
    const title = titleMatch ? titleMatch[1].replace(/[🎯✅💪🚀⚡📚🗺️🧠🌍🔗💰🎨✍️💬📊💻🎙️]/g, '').trim() : `Step ${i}`

    steps.push({
      title: title,
      content: section
    })
  }

  return steps
}

function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  const words = text.split(' ').length
  return Math.max(1, Math.ceil(words / 200))
}

export default async function LessonPage({
  params,
}: {
  params: { moduleSlug: string; lessonSlug: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  const lesson = await prisma.lesson.findFirst({
    where: {
      slug: params.lessonSlug,
      module: { slug: params.moduleSlug }
    },
    include: {
      module: {
        include: {
          course: true,
          lessons: {
            orderBy: { order: 'asc' }
          }
        }
      },
      quiz: true,
    }
  })

  if (!lesson) notFound()

  // Access gating check
  const userTier = session.user.tier || 'free'
  const moduleTier = lesson.module.tier || 'free'
  const userLevel = tierLevel[userTier] ?? 0
  const requiredLevel = tierLevel[moduleTier] ?? 0

  if (userLevel < requiredLevel) {
    // User does not have access - render upgrade page
    const requiredTierName = tierNames[moduleTier] || moduleTier
    const features = tierUnlockFeatures[moduleTier] || []

    return (
      <div className="min-h-screen">
        {/* Header */}
        <div className="relative border-b border-slate-800 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/80" />
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl" />

          <div className="relative max-w-5xl mx-auto px-4 py-5">
            <nav className="flex items-center gap-2 text-sm mb-5">
              <Link href="/course" className="text-slate-500 hover:text-slate-300 transition flex items-center gap-1.5 group">
                <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                All Modules
              </Link>
              <svg className="w-3.5 h-3.5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-slate-500 truncate max-w-[140px]">{lesson.module.title}</span>
              <svg className="w-3.5 h-3.5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-slate-300 font-medium truncate max-w-[200px]">{lesson.title}</span>
            </nav>
          </div>
        </div>

        {/* Locked Content */}
        <div className="max-w-2xl mx-auto px-4 py-20">
          <div className="text-center">
            {/* Lock Icon */}
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
              <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>

            {/* Lesson Title Preview */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-sm text-slate-400 mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              {lesson.title}
            </div>

            <h1 className="text-3xl md:text-4xl font-black mb-4">
              This lesson requires{' '}
              <span className={`${
                moduleTier === 'master' ? 'text-purple-400' :
                moduleTier === 'pro' ? 'text-blue-400' :
                'text-green-400'
              }`}>
                {requiredTierName}
              </span>{' '}
              access
            </h1>
            <p className="text-lg text-slate-400 mb-10">
              Upgrade your plan to unlock this lesson and all {requiredTierName}-tier content.
            </p>

            {/* Features they'll unlock */}
            {features.length > 0 && (
              <div className="text-left max-w-md mx-auto mb-10">
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
                  What you&apos;ll unlock with {requiredTierName}
                </h3>
                <ul className="space-y-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 font-semibold text-lg transition"
            >
              View Pricing Plans
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // User has access - render lesson normally
  const progress = await prisma.progress.findUnique({
    where: {
      userId_lessonId: {
        userId: session.user.id,
        lessonId: lesson.id,
      }
    }
  })

  const currentIndex = lesson.module.lessons.findIndex(l => l.id === lesson.id)
  const nextLesson = lesson.module.lessons[currentIndex + 1]
  const prevLesson = lesson.module.lessons[currentIndex - 1]
  const steps = parseContentIntoSteps(lesson.content)
  const readingTime = estimateReadingTime(lesson.content)

  return (
    <div className="min-h-screen">
      {/* Lesson header with gradient mesh */}
      <div className="relative border-b border-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/80" />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 py-5">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-5">
            <Link href="/course" className="text-slate-500 hover:text-slate-300 transition flex items-center gap-1.5 group">
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Modules
            </Link>
            <svg className="w-3.5 h-3.5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-500 truncate max-w-[140px]">{lesson.module.title}</span>
            <svg className="w-3.5 h-3.5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-300 font-medium truncate max-w-[200px]">{lesson.title}</span>
          </nav>

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              {/* Module badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-3">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                {lesson.module.title}
              </div>

              <h1 className="text-2xl md:text-3xl font-black leading-tight mb-3">{lesson.title}</h1>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {readingTime} min read
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  {steps.length} sections
                </span>
                {lesson.quiz && (
                  <span className="flex items-center gap-1.5 text-purple-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>
                    Includes quiz
                  </span>
                )}
                {progress?.completed && (
                  <span className="flex items-center gap-1.5 text-green-400 font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Completed
                  </span>
                )}
              </div>
            </div>

            {/* Lesson position indicator */}
            <div className="hidden md:flex flex-col items-center gap-1 px-5 py-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
              <div className="text-2xl font-black text-gradient">{currentIndex + 1}</div>
              <div className="w-8 h-px bg-slate-700" />
              <div className="text-sm text-slate-500">{lesson.module.lessons.length}</div>
            </div>
          </div>

          {/* Lesson dots progress */}
          <div className="flex items-center gap-1.5 mt-5">
            {lesson.module.lessons.map((l, idx) => (
              <div
                key={l.id}
                className={`h-1 rounded-full flex-1 transition-all ${
                  idx === currentIndex
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                    : idx < currentIndex
                    ? 'bg-blue-500/30'
                    : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lesson content */}
      <div className="max-w-5xl mx-auto py-8 px-4">
        <LessonSteps
          steps={steps}
          lessonId={lesson.id}
          isCompleted={progress?.completed || false}
        />

        {/* Divider before quiz */}
        <div className="relative my-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center">
            <div className="px-4 bg-[#0a0f1e]">
              <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <LessonQuiz
          lessonId={lesson.id}
          quizId={lesson.quiz?.id || null}
        />

        {/* Prev/Next Navigation */}
        <div className="flex justify-between mt-16 pt-8 border-t border-slate-800">
          {prevLesson ? (
            <Link
              href={`/course/${lesson.module.slug}/${prevLesson.slug}`}
              className="group flex items-center gap-3 px-6 py-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-600 transition-all hover:shadow-lg hover:shadow-slate-900/50 max-w-[45%]"
            >
              <svg className="w-5 h-5 text-slate-500 group-hover:text-slate-300 group-hover:-translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <div className="min-w-0">
                <div className="text-xs text-slate-600 mb-0.5 font-medium">Previous Lesson</div>
                <div className="font-semibold text-sm truncate text-slate-300 group-hover:text-white transition">{prevLesson.title}</div>
              </div>
            </Link>
          ) : (
            <Link
              href="/course"
              className="group flex items-center gap-3 px-6 py-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-600 transition-all"
            >
              <svg className="w-5 h-5 text-slate-500 group-hover:text-slate-300 group-hover:-translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <div className="min-w-0">
                <div className="text-xs text-slate-600 mb-0.5 font-medium">Back to</div>
                <div className="font-semibold text-sm text-slate-300 group-hover:text-white transition">All Modules</div>
              </div>
            </Link>
          )}

          {nextLesson ? (
            <Link
              href={`/course/${lesson.module.slug}/${nextLesson.slug}`}
              className="group flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 hover:border-blue-400/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 max-w-[45%]"
            >
              <div className="text-right min-w-0">
                <div className="text-xs text-blue-400/70 mb-0.5 font-medium">Next Lesson</div>
                <div className="font-semibold text-sm truncate text-slate-200 group-hover:text-white transition">{nextLesson.title}</div>
              </div>
              <svg className="w-5 h-5 text-blue-400 group-hover:text-blue-300 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="group flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 hover:border-green-400/50 transition-all max-w-[45%]"
            >
              <div className="text-right min-w-0">
                <div className="text-xs text-green-400/70 mb-0.5 font-medium">Module Complete</div>
                <div className="font-semibold text-sm text-green-300 group-hover:text-green-200 transition">View Dashboard</div>
              </div>
              <svg className="w-5 h-5 text-green-400 group-hover:text-green-300 transition flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
