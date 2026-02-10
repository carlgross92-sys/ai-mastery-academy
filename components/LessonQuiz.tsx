'use client'

import { useState, useRef } from 'react'
import BadgeNotification from './BadgeNotification'

interface Question {
  id: string
  question: string
  type: string
  options?: string
  correctAnswer: string
  explanation?: string
}

interface LessonQuizProps {
  lessonId: string
  quizId: string | null
}

export default function LessonQuiz({ lessonId, quizId }: LessonQuizProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showExplanation, setShowExplanation] = useState<number | null>(null)
  const [animateScore, setAnimateScore] = useState(false)
  const [earnedBadges, setEarnedBadges] = useState<any[]>([])
  const scoreRef = useRef<HTMLDivElement>(null)

  const loadQuiz = async () => {
    if (!quizId) return
    setLoading(true)
    try {
      const res = await fetch(`/api/quiz/${quizId}`)
      const data = await res.json()
      setQuestions(data.questions || [])
      setAnswers(new Array(data.questions?.length || 0).fill(''))
      setQuizStarted(true)
    } catch (error) {
      console.error('Error loading quiz:', error)
    }
    setLoading(false)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizId, answers }),
      })
      const data = await res.json()
      setResult(data)
      setSubmitted(true)
      if (data.newBadges?.length > 0) {
        setEarnedBadges(data.newBadges)
      }
      setTimeout(() => setAnimateScore(true), 300)
    } catch (error) {
      console.error('Error submitting quiz:', error)
    }
    setLoading(false)
  }

  const answeredCount = answers.filter(a => a !== '').length

  if (!quizId) {
    return (
      <div className="my-12 p-8 rounded-2xl bg-slate-900/40 border border-slate-800/50 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-800/80 flex items-center justify-center">
          <svg className="w-7 h-7 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-slate-500 text-sm">No quiz available for this lesson yet.</p>
      </div>
    )
  }

  // ── Start Screen ──
  if (!quizStarted) {
    return (
      <div className="my-12 relative overflow-hidden rounded-2xl">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-pink-600/20" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative border border-blue-500/20 rounded-2xl p-10 text-center">
          {/* Quiz icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
            <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          </div>

          <h3 className="text-3xl font-black mb-3">
            <span className="text-gradient">Knowledge Check</span>
          </h3>
          <p className="text-lg text-slate-400 mb-8 max-w-md mx-auto">
            Test your understanding of the concepts covered in this lesson.
          </p>

          {/* Stats preview */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/60 border border-slate-700">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-slate-300">Multiple Choice</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/60 border border-slate-700">
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-medium text-slate-300">Instant Results</span>
            </div>
          </div>

          <button
            onClick={loadQuiz}
            disabled={loading}
            className="group relative px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl transition-all group-hover:shadow-lg group-hover:shadow-blue-500/25" />
            <div className="relative flex items-center gap-3">
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Loading Questions...
                </>
              ) : (
                <>
                  Start Quiz
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </div>
          </button>
        </div>
      </div>
    )
  }

  // ── Results Screen ──
  if (submitted && result) {
    const passed = result.passed
    const score = result.score || 0

    return (
      <div className="my-12">
        <BadgeNotification badges={earnedBadges} />
        {/* Score card */}
        <div ref={scoreRef} className={`relative overflow-hidden rounded-2xl mb-8 ${
          passed
            ? 'bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-green-500/10 border border-green-500/20'
            : 'bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/10 border border-amber-500/20'
        }`}>
          {/* Floating orbs */}
          {passed && (
            <>
              <div className="absolute top-4 right-8 w-3 h-3 rounded-full bg-green-400/40 animate-float" />
              <div className="absolute top-12 right-20 w-2 h-2 rounded-full bg-emerald-400/30 animate-float-delayed" />
              <div className="absolute bottom-8 left-12 w-2 h-2 rounded-full bg-green-400/20 animate-float" />
            </>
          )}

          <div className="relative p-10 text-center">
            {/* Score ring */}
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60" cy="60" r="52"
                  fill="none"
                  stroke={passed ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)'}
                  strokeWidth="8"
                />
                <circle
                  cx="60" cy="60" r="52"
                  fill="none"
                  stroke={passed ? '#22c55e' : '#f59e0b'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 52}`}
                  strokeDashoffset={animateScore ? `${2 * Math.PI * 52 * (1 - score / 100)}` : `${2 * Math.PI * 52}`}
                  style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-3xl font-black ${passed ? 'text-green-400' : 'text-amber-400'}`}>
                  {score}%
                </span>
                <span className="text-xs text-slate-500 font-medium">SCORE</span>
              </div>
            </div>

            <h3 className={`text-2xl font-black mb-2 ${passed ? 'text-green-300' : 'text-amber-300'}`}>
              {passed ? 'Excellent Work!' : 'Almost There!'}
            </h3>
            <p className="text-slate-400 max-w-sm mx-auto">
              {passed
                ? 'You\'ve demonstrated a solid understanding of the material. Keep up the momentum!'
                : `You need ${result.passingScore || 70}% to pass. Review the explanations below and try again.`
              }
            </p>

            {passed && (
              <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                +50 XP Earned
              </div>
            )}
          </div>
        </div>

        {/* Results breakdown */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Question Breakdown
          </h4>

          {result.results?.map((r: any, idx: number) => (
            <div
              key={idx}
              className={`rounded-xl border overflow-hidden transition-all duration-300 ${
                r.correct
                  ? 'bg-green-500/5 border-green-500/20'
                  : 'bg-red-500/5 border-red-500/20'
              }`}
            >
              <div className="p-5">
                <div className="flex items-start gap-3">
                  {/* Status icon */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    r.correct ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    {r.correct ? (
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-600">Q{idx + 1}</span>
                    </div>
                    <p className="font-semibold text-slate-200 mb-3">{questions[idx]?.question}</p>

                    {/* Options display */}
                    {questions[idx]?.type === 'mcq' && questions[idx]?.options && (
                      <div className="space-y-2 mb-3">
                        {JSON.parse(questions[idx].options || '[]').map((option: string, optIdx: number) => {
                          const isUserAnswer = r.userAnswer === optIdx.toString()
                          const isCorrectAnswer = r.correctAnswer === optIdx.toString()

                          return (
                            <div
                              key={optIdx}
                              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm ${
                                isCorrectAnswer
                                  ? 'bg-green-500/10 border border-green-500/30 text-green-300'
                                  : isUserAnswer
                                  ? 'bg-red-500/10 border border-red-500/30 text-red-300'
                                  : 'bg-slate-800/30 border border-transparent text-slate-500'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                isCorrectAnswer ? 'bg-green-500/30' : isUserAnswer ? 'bg-red-500/30' : 'bg-slate-700/50'
                              }`}>
                                {isCorrectAnswer ? (
                                  <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                ) : isUserAnswer ? (
                                  <svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                ) : null}
                              </div>
                              {option}
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Explanation toggle */}
                    {r.explanation && (
                      <button
                        onClick={() => setShowExplanation(showExplanation === idx ? null : idx)}
                        className="text-sm text-blue-400 hover:text-blue-300 transition flex items-center gap-1"
                      >
                        <svg className={`w-3.5 h-3.5 transition-transform ${showExplanation === idx ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {showExplanation === idx ? 'Hide' : 'Show'} Explanation
                      </button>
                    )}
                    {showExplanation === idx && r.explanation && (
                      <div className="mt-3 p-4 rounded-lg bg-slate-900/60 border border-slate-800 text-sm text-slate-400 leading-relaxed">
                        <div className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{r.explanation}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Retry button */}
        {!passed && (
          <div className="text-center mt-8">
            <button
              onClick={() => {
                setSubmitted(false)
                setResult(null)
                setAnswers(new Array(questions.length).fill(''))
                setCurrentQuestion(0)
                setAnimateScore(false)
                setShowExplanation(null)
              }}
              className="group px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 font-semibold transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 flex items-center gap-2 mx-auto"
            >
              <svg className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
          </div>
        )}
      </div>
    )
  }

  // ── Quiz Questions ──
  return (
    <div className="my-12">
      {/* Quiz header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-black">Knowledge Check</h3>
            <p className="text-xs text-slate-500">{answeredCount} of {questions.length} answered</p>
          </div>
        </div>

        {/* Progress dots */}
        <div className="hidden sm:flex items-center gap-1.5">
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentQuestion(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === currentQuestion
                  ? 'w-6 bg-gradient-to-r from-blue-500 to-purple-500'
                  : answers[idx]
                  ? 'bg-blue-500/40'
                  : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question card */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
        {/* Question progress bar */}
        <div className="h-1 bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${(answeredCount / questions.length) * 100}%` }}
          />
        </div>

        <div className="p-6 md:p-8">
          {/* Question number & navigation */}
          <div className="flex items-center justify-between mb-6">
            <span className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                disabled={currentQuestion === questions.length - 1}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Question text */}
          <h4 className="text-xl font-bold text-slate-100 mb-6 leading-relaxed">
            {questions[currentQuestion]?.question}
          </h4>

          {/* MCQ Options */}
          {questions[currentQuestion]?.type === 'mcq' && questions[currentQuestion]?.options && (
            <div className="space-y-3">
              {JSON.parse(questions[currentQuestion].options || '[]').map((option: string, optIdx: number) => {
                const isSelected = answers[currentQuestion] === optIdx.toString()
                const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F']

                return (
                  <button
                    key={optIdx}
                    onClick={() => {
                      const newAnswers = [...answers]
                      newAnswers[currentQuestion] = optIdx.toString()
                      setAnswers(newAnswers)
                    }}
                    className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 group ${
                      isSelected
                        ? 'bg-blue-500/10 border-blue-500/40 shadow-sm shadow-blue-500/10'
                        : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-600'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all ${
                      isSelected
                        ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md shadow-blue-500/25'
                        : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'
                    }`}>
                      {optionLetters[optIdx]}
                    </div>
                    <span className={`text-sm md:text-base transition-colors ${
                      isSelected ? 'text-white font-medium' : 'text-slate-300 group-hover:text-white'
                    }`}>
                      {option}
                    </span>
                    {isSelected && (
                      <div className="ml-auto">
                        <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          )}

          {/* True/False Options */}
          {questions[currentQuestion]?.type === 'true-false' && (
            <div className="grid grid-cols-2 gap-4">
              {['true', 'false'].map((value) => {
                const isSelected = answers[currentQuestion] === value
                return (
                  <button
                    key={value}
                    onClick={() => {
                      const newAnswers = [...answers]
                      newAnswers[currentQuestion] = value
                      setAnswers(newAnswers)
                    }}
                    className={`flex flex-col items-center gap-3 p-6 rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? value === 'true'
                          ? 'bg-green-500/10 border-green-500/40 shadow-sm shadow-green-500/10'
                          : 'bg-red-500/10 border-red-500/40 shadow-sm shadow-red-500/10'
                        : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-600'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isSelected
                        ? value === 'true'
                          ? 'bg-green-500/20'
                          : 'bg-red-500/20'
                        : 'bg-slate-800'
                    }`}>
                      {value === 'true' ? (
                        <svg className={`w-6 h-6 ${isSelected ? 'text-green-400' : 'text-slate-500'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className={`w-6 h-6 ${isSelected ? 'text-red-400' : 'text-slate-500'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className={`font-bold text-lg capitalize ${
                      isSelected
                        ? value === 'true' ? 'text-green-300' : 'text-red-300'
                        : 'text-slate-400'
                    }`}>
                      {value}
                    </span>
                  </button>
                )
              })}
            </div>
          )}

          {/* Navigation & submit */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-800/50">
            <div className="flex items-center gap-2">
              {currentQuestion < questions.length - 1 && answers[currentQuestion] && (
                <button
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold transition"
                >
                  Next Question
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || answers.some(a => !a)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-sm font-semibold transition-all shadow-lg shadow-blue-500/20 disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Quiz
                  <span className="text-xs opacity-60">({answeredCount}/{questions.length})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Question dots (mobile) */}
      <div className="flex items-center justify-center gap-2 mt-4 sm:hidden">
        {questions.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentQuestion(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentQuestion
                ? 'w-5 bg-blue-500'
                : answers[idx]
                ? 'bg-blue-500/40'
                : 'bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
