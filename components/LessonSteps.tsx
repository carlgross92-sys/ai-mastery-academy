'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import VoiceReader from './VoiceReader'
import BadgeNotification from './BadgeNotification'

interface LessonStep {
  title: string
  content: string
}

interface LessonStepsProps {
  steps: LessonStep[]
  lessonId: string
  isCompleted: boolean
}

function ContentRenderer({ html }: { html: string }) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return
    const el = contentRef.current

    // Add copy buttons to all <pre> blocks
    el.querySelectorAll('pre').forEach((pre) => {
      if (pre.querySelector('.copy-btn')) return
      pre.style.position = 'relative'
      const btn = document.createElement('button')
      btn.className = 'copy-btn'
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`
      btn.style.cssText = 'position:absolute;top:8px;right:8px;padding:6px;background:rgba(148,163,184,0.1);border:1px solid rgba(148,163,184,0.2);border-radius:6px;color:#94a3b8;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:4px;font-size:11px;'
      btn.onmouseenter = () => { btn.style.background = 'rgba(148,163,184,0.2)'; btn.style.color = '#e2e8f0' }
      btn.onmouseleave = () => { btn.style.background = 'rgba(148,163,184,0.1)'; btn.style.color = '#94a3b8' }
      btn.onclick = () => {
        const code = pre.querySelector('code')?.textContent || pre.textContent || ''
        navigator.clipboard.writeText(code)
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg><span style="color:#4ade80">Copied!</span>`
        setTimeout(() => {
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`
        }, 2000)
      }
      pre.appendChild(btn)
    })

    // Style headings with icons based on content
    el.querySelectorAll('h3').forEach((h3) => {
      if (h3.dataset.enhanced) return
      h3.dataset.enhanced = 'true'
      const text = h3.textContent || ''

      // Detect section types by emoji or keywords
      if (text.includes('❌') || text.toLowerCase().includes('weak') || text.toLowerCase().includes('bad') || text.toLowerCase().includes('wrong') || text.toLowerCase().includes('before')) {
        wrapInCallout(h3, 'warning')
      } else if (text.includes('✅') || text.toLowerCase().includes('strong') || text.toLowerCase().includes('good') || text.toLowerCase().includes('after')) {
        wrapInCallout(h3, 'success')
      }
    })

    // Style h2 sections with special treatment
    el.querySelectorAll('h2').forEach((h2) => {
      if (h2.dataset.enhanced) return
      h2.dataset.enhanced = 'true'
      const text = h2.textContent || ''

      if (text.includes('Key Takeaway') || text.includes('✅')) {
        wrapSectionInBox(h2, 'takeaway')
      } else if (text.includes('Challenge') || text.includes('🎯')) {
        wrapSectionInBox(h2, 'challenge')
      } else if (text.includes('Coming Up') || text.includes('🚀')) {
        wrapSectionInBox(h2, 'next')
      }
    })

  }, [html])

  return (
    <div
      ref={contentRef}
      className="enhanced-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function wrapInCallout(heading: HTMLElement, type: 'warning' | 'success') {
  // Collect heading + following siblings until next heading
  const elements: Element[] = [heading]
  let sibling = heading.nextElementSibling
  while (sibling && !['H2', 'H3'].includes(sibling.tagName)) {
    elements.push(sibling)
    sibling = sibling.nextElementSibling
  }

  const wrapper = document.createElement('div')
  if (type === 'warning') {
    wrapper.className = 'my-4 p-4 rounded-xl border-l-4 border-red-500/50 bg-red-500/5'
  } else {
    wrapper.className = 'my-4 p-4 rounded-xl border-l-4 border-green-500/50 bg-green-500/5'
  }

  heading.parentNode?.insertBefore(wrapper, heading)
  elements.forEach(el => wrapper.appendChild(el))
}

function wrapSectionInBox(heading: HTMLElement, type: 'takeaway' | 'challenge' | 'next') {
  const elements: Element[] = [heading]
  let sibling = heading.nextElementSibling
  while (sibling && sibling.tagName !== 'H2') {
    elements.push(sibling)
    sibling = sibling.nextElementSibling
  }

  const wrapper = document.createElement('div')
  const styles: Record<string, string> = {
    takeaway: 'my-6 p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20',
    challenge: 'my-6 p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/5 border border-blue-500/20',
    next: 'my-6 p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20',
  }
  wrapper.className = styles[type]

  heading.parentNode?.insertBefore(wrapper, heading)
  elements.forEach(el => wrapper.appendChild(el))
}

export default function LessonSteps({ steps, lessonId, isCompleted }: LessonStepsProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completing, setCompleting] = useState(false)
  const [justCompleted, setJustCompleted] = useState(false)
  const [earnedBadges, setEarnedBadges] = useState<any[]>([])
  const [tocOpen, setTocOpen] = useState(false)
  const [readSections, setReadSections] = useState<Set<number>>(new Set([0]))
  const [autoPlayVoice, setAutoPlayVoice] = useState(false)
  const router = useRouter()

  const goToStep = useCallback((index: number) => {
    setCurrentStep(index)
    setReadSections(prev => new Set([...prev, index]))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      goToStep(currentStep + 1)
    } else if (!isCompleted && !justCompleted) {
      setCompleting(true)
      try {
        const res = await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lessonId }),
        })
        const data = await res.json()
        if (data.newBadges?.length > 0) {
          setEarnedBadges(data.newBadges)
        }
        setJustCompleted(true)
        router.refresh()
      } catch (error) {
        console.error('Error completing lesson:', error)
      }
      setCompleting(false)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentStep < steps.length - 1) goToStep(currentStep + 1)
      if (e.key === 'ArrowLeft' && currentStep > 0) goToStep(currentStep - 1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [currentStep, steps.length, goToStep])

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="relative">
      <BadgeNotification badges={earnedBadges} />
      {/* ── Floating Table of Contents ── */}
      <div className="fixed right-4 top-20 z-40 hidden xl:block">
        <button
          onClick={() => setTocOpen(!tocOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/90 backdrop-blur border border-slate-700 text-xs font-medium text-slate-400 hover:text-white transition shadow-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Sections
        </button>

        {tocOpen && (
          <div className="mt-2 w-64 p-3 rounded-xl bg-slate-900/95 backdrop-blur border border-slate-800 shadow-2xl">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">
              Table of Contents
            </div>
            <div className="space-y-0.5 max-h-[60vh] overflow-y-auto scrollbar-hide">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => { goToStep(idx); setTocOpen(false) }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition flex items-center gap-2 ${
                    idx === currentStep
                      ? 'bg-blue-500/20 text-blue-300 font-medium'
                      : readSections.has(idx)
                      ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      : 'text-slate-600 hover:bg-slate-800 hover:text-slate-400'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                    idx === currentStep
                      ? 'bg-blue-500 text-white'
                      : readSections.has(idx)
                      ? 'bg-slate-700 text-slate-400'
                      : 'bg-slate-800 text-slate-600'
                  }`}>
                    {readSections.has(idx) && idx !== currentStep ? (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span className="truncate">{step.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-4xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8 sticky top-16 z-30 py-3 -mx-4 px-4" style={{ background: 'linear-gradient(to bottom, rgba(10,15,30,1) 70%, rgba(10,15,30,0))' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-400">
                Section {currentStep + 1} of {steps.length}
              </span>
              <span className="hidden sm:inline text-xs text-slate-600">|</span>
              <span className="hidden sm:flex items-center gap-1 text-xs text-slate-600">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
                Use arrow keys to navigate
              </span>
            </div>
            <span className="text-sm font-bold text-gradient">{Math.round(progress)}%</span>
          </div>

          {/* Segmented progress */}
          <div className="flex items-center gap-1">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`h-1.5 rounded-full transition-all duration-300 flex-1 ${
                  index === currentStep
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-sm shadow-blue-500/50'
                    : index < currentStep || readSections.has(index)
                    ? 'bg-blue-500/30'
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
                aria-label={`Go to section ${index + 1}: ${steps[index].title}`}
              />
            ))}
          </div>
        </div>

        {/* Completion banner */}
        {(isCompleted || justCompleted) && (
          <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-green-300">Lesson Complete!</div>
              <div className="text-sm text-green-400/60">+100 XP earned. You&apos;re making great progress.</div>
            </div>
          </div>
        )}

        {/* Section header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-black shadow-lg shadow-blue-500/25">
              {currentStep + 1}
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">
                Section {currentStep + 1}
              </div>
              <h2 className="text-2xl md:text-3xl font-black">{currentStepData.title}</h2>
            </div>
          </div>
        </div>

        {/* Voice reader for current section */}
        <VoiceReader
          key={`voice-${currentStep}`}
          text={currentStepData.content}
          sectionLabel={`Section ${currentStep + 1}: ${currentStepData.title}`}
          onSectionComplete={currentStep < steps.length - 1 ? () => goToStep(currentStep + 1) : undefined}
          onToggleAutoPlay={() => setAutoPlayVoice(prev => !prev)}
          autoPlayNext={autoPlayVoice}
        />

        {/* Content with enhanced rendering */}
        <div className="lesson-content mb-12 min-h-[300px]">
          <ContentRenderer html={currentStepData.content} key={currentStep} />
        </div>

        {/* Bottom navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-800">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`group flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition ${
              currentStep === 0
                ? 'bg-slate-800/30 text-slate-700 cursor-not-allowed'
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          {/* Center: step count for mobile */}
          <div className="flex items-center gap-1 sm:hidden">
            <span className="text-xs text-slate-500">{currentStep + 1}/{steps.length}</span>
          </div>

          <button
            onClick={handleNext}
            disabled={completing || ((isCompleted || justCompleted) && currentStep === steps.length - 1)}
            className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${
              (isCompleted || justCompleted) && currentStep === steps.length - 1
                ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-default'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'
            } disabled:opacity-50`}
          >
            {completing ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Completing...
              </span>
            ) : (isCompleted || justCompleted) && currentStep === steps.length - 1 ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Completed
              </>
            ) : currentStep === steps.length - 1 ? (
              <>
                Complete Lesson
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
              </>
            ) : (
              <>
                Next Section
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Section quick nav (mobile) */}
        <div className="mt-6 xl:hidden">
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800 text-sm text-slate-400 hover:text-white transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Jump to Section ({currentStep + 1}/{steps.length})
          </button>

          {tocOpen && (
            <div className="mt-2 p-3 rounded-xl bg-slate-900/95 border border-slate-800 space-y-1">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => { goToStep(idx); setTocOpen(false) }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition flex items-center gap-2 ${
                    idx === currentStep
                      ? 'bg-blue-500/20 text-blue-300 font-medium'
                      : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${
                    idx === currentStep ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="truncate">{step.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
