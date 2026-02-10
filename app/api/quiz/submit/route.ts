import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { checkAndAwardBadges } from '@/lib/badges'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { quizId, answers } = await req.json()

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: { questions: true }
  })

  if (!quiz) {
    return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
  }

  let correctCount = 0
  const results = quiz.questions.map((q, idx) => {
    const userAnswer = answers[idx]
    const isCorrect = userAnswer === q.correctAnswer
    if (isCorrect) correctCount++
    return {
      questionId: q.id,
      correct: isCorrect,
      userAnswer,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
    }
  })

  const score = Math.round((correctCount / quiz.questions.length) * 100)
  const passed = score >= quiz.passingScore

  const attempt = await prisma.quizAttempt.create({
    data: {
      userId: session.user.id,
      quizId,
      score,
      passed,
      answers: JSON.stringify(answers),
    }
  })

  const newBadges = await checkAndAwardBadges(session.user.id)

  return NextResponse.json({
    score,
    passed,
    results,
    attemptId: attempt.id,
    newBadges,
  })
}
