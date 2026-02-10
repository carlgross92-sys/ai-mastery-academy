import { prisma } from './prisma'
import { sendEmail, badgeEarnedEmail } from './email'

interface AwardedBadge {
  id: string
  name: string
  description: string
  icon: string
}

export async function checkAndAwardBadges(userId: string): Promise<AwardedBadge[]> {
  const newBadges: AwardedBadge[] = []

  // Get user data
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      badges: { include: { badge: true } },
      progress: { where: { completed: true } },
      quizAttempts: true,
    },
  })

  if (!user) return newBadges

  const earnedCriteria = new Set(user.badges.map(ub => ub.badge.criteria))
  const completedCount = user.progress.length

  // Get all badges
  const allBadges = await prisma.badge.findMany()

  // Get all lessons and modules for completion checks
  const modules = await prisma.module.findMany({
    include: { lessons: true },
  })

  const completedLessonIds = new Set(user.progress.map(p => p.lessonId))

  // Determine which lessons are accessible based on user tier
  const tierAccess: Record<string, string[]> = {
    free: ['free'],
    starter: ['free', 'starter'],
    pro: ['free', 'starter', 'pro'],
    master: ['free', 'starter', 'pro', 'master'],
  }
  const accessibleTiers = tierAccess[user.tier] || ['free']
  const accessibleModules = modules.filter(m => accessibleTiers.includes(m.tier))
  const totalAccessibleLessons = accessibleModules.reduce((sum, m) => sum + m.lessons.length, 0)

  for (const badge of allBadges) {
    if (earnedCriteria.has(badge.criteria)) continue

    let earned = false

    switch (badge.criteria) {
      case 'complete_1_lesson':
        earned = completedCount >= 1
        break
      case 'complete_5_lessons':
        earned = completedCount >= 5
        break
      case 'complete_module':
        earned = accessibleModules.some(
          m => m.lessons.length > 0 && m.lessons.every(l => completedLessonIds.has(l.id))
        )
        break
      case 'perfect_quiz':
        earned = user.quizAttempts.some(a => a.score === 100)
        break
      case 'complete_50_percent':
        earned = totalAccessibleLessons > 0 && completedCount >= totalAccessibleLessons * 0.5
        break
      case 'complete_course':
        earned = totalAccessibleLessons > 0 && completedCount >= totalAccessibleLessons
        break
    }

    if (earned) {
      await prisma.userBadge.create({
        data: { userId, badgeId: badge.id },
      })
      newBadges.push({
        id: badge.id,
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
      })
      // Send email notification
      const email = badgeEarnedEmail(user.name, badge.name, badge.icon)
      await sendEmail({ to: user.email, ...email })
    }
  }

  return newBadges
}
