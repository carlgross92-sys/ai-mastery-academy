'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// ── Promo state type ──
type PromoTierInfo = { promoPrice: number; originalPrice: number }
type PromoStatus = {
  active: boolean
  spotsRemaining?: number
  tiers?: Record<string, PromoTierInfo>
  endDate?: string
}

// ── Countdown Timer Component ──
function CountdownTimer({ endDate }: { endDate: string }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const diff = new Date(endDate).getTime() - Date.now()
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [endDate])

  return (
    <div className="flex items-center justify-center gap-3">
      {[
        { value: time.days, label: 'Days' },
        { value: time.hours, label: 'Hrs' },
        { value: time.minutes, label: 'Min' },
        { value: time.seconds, label: 'Sec' },
      ].map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="w-14 h-14 rounded-lg bg-slate-900 border border-orange-500/30 flex items-center justify-center text-2xl font-black text-orange-400">
            {String(unit.value).padStart(2, '0')}
          </div>
          <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{unit.label}</div>
        </div>
      ))}
    </div>
  )
}

const tiers = [
  {
    name: 'Free',
    price: 0,
    originalPrice: null,
    period: 'forever',
    tier: 'free',
    paymentPlan: null,
    badge: null,
    modules: 'Modules 1-2 (6 lessons)',
    features: [
      'AI Architecture & Cognition module',
      'AI Tool Landscape module',
      'Full progress tracking',
      'All quizzes & exercises',
    ],
    cta: 'Start Free',
    href: '/register',
    highlighted: false,
    gradient: 'from-slate-600 to-slate-500',
    borderColor: 'border-slate-800',
    iconColor: 'text-slate-400',
  },
  {
    name: 'Starter',
    price: 47,
    originalPrice: 150,
    period: 'lifetime access',
    tier: 'starter',
    paymentPlan: null,
    badge: null,
    modules: 'Modules 1-4 (13 lessons)',
    features: [
      'Prompt Engineering Mastery',
      'Business AI Integration',
      'Ready-to-use prompt templates',
      'All quizzes & exercises',
    ],
    cta: 'Get Started',
    href: null,
    highlighted: false,
    gradient: 'from-green-500 to-emerald-500',
    borderColor: 'border-slate-800',
    iconColor: 'text-green-400',
  },
  {
    name: 'Pro',
    price: 247,
    originalPrice: 800,
    period: 'lifetime access',
    tier: 'pro',
    paymentPlan: 'or 3 payments of $83',
    badge: 'BEST VALUE',
    modules: 'Modules 1-8 (25 lessons) + certificate',
    features: [
      'Everything in Starter',
      'Advanced AI Workflows & Automation',
      'AI for Content & Marketing',
      'AI for Data & Analytics',
      'Custom AI Solutions & GPTs',
      'Certificate of Completion',
      'Priority support',
    ],
    cta: 'Upgrade to Pro',
    href: null,
    highlighted: true,
    gradient: 'from-blue-500 to-purple-500',
    borderColor: 'border-blue-500/50',
    iconColor: 'text-blue-400',
  },
  {
    name: 'Master',
    price: 797,
    originalPrice: 2400,
    period: 'lifetime access',
    tier: 'master',
    paymentPlan: 'or 4 payments of $200',
    badge: null,
    modules: 'All 12 modules (37 lessons)',
    features: [
      'Everything in Pro',
      'AI Strategy & Leadership',
      'AI Product Development',
      'AI Ethics & Governance',
      'Future of AI & Your Roadmap',
      'Private mastermind community',
      'Lifetime updates',
    ],
    cta: 'Become a Master',
    href: null,
    highlighted: false,
    gradient: 'from-purple-500 to-pink-500',
    borderColor: 'border-slate-800',
    iconColor: 'text-purple-400',
  },
]

const comparisonFeatures = [
  { feature: 'Modules Included', free: '1-2', starter: '1-4', pro: '1-8', master: 'All 12' },
  { feature: 'Total Lessons', free: '6', starter: '13', pro: '25', master: '37' },
  { feature: 'Quizzes & Exercises', free: true, starter: true, pro: true, master: true },
  { feature: 'Progress Tracking', free: true, starter: true, pro: true, master: true },
  { feature: 'AI Architecture & Cognition', free: true, starter: true, pro: true, master: true },
  { feature: 'AI Tool Landscape & Selection', free: true, starter: true, pro: true, master: true },
  { feature: 'Prompt Engineering Mastery', free: false, starter: true, pro: true, master: true },
  { feature: 'Business AI Integration', free: false, starter: true, pro: true, master: true },
  { feature: 'Advanced AI Workflows', free: false, starter: false, pro: true, master: true },
  { feature: 'AI for Content & Marketing', free: false, starter: false, pro: true, master: true },
  { feature: 'AI for Data & Analytics', free: false, starter: false, pro: true, master: true },
  { feature: 'Custom AI Solutions & GPTs', free: false, starter: false, pro: true, master: true },
  { feature: 'Certificate of Completion', free: false, starter: false, pro: true, master: true },
  { feature: 'AI Strategy & Leadership', free: false, starter: false, pro: false, master: true },
  { feature: 'AI Product Development', free: false, starter: false, pro: false, master: true },
  { feature: 'AI Ethics & Governance', free: false, starter: false, pro: false, master: true },
  { feature: 'Future of AI & Your Roadmap', free: false, starter: false, pro: false, master: true },
  { feature: 'Private Mastermind Community', free: false, starter: false, pro: false, master: true },
  { feature: 'Lifetime Updates', free: true, starter: true, pro: true, master: true },
  { feature: 'Priority Support', free: false, starter: false, pro: true, master: true },
]

const testimonials = [
  {
    name: 'Sarah K.',
    role: 'Marketing Director',
    text: 'This course paid for itself within the first week. I automated 3 hours of daily reporting and my team now uses AI for all our content drafts. The ROI is insane.',
    tier: 'Pro',
  },
  {
    name: 'James R.',
    role: 'Freelance Developer',
    text: 'I went from zero AI knowledge to building automated workflows for clients in under a month. The coding module alone was worth 10x what I paid.',
    tier: 'Master',
  },
  {
    name: 'Michelle T.',
    role: 'Small Business Owner',
    text: 'Started with Free, upgraded to Starter within a day. The prompt engineering module completely changed how I interact with AI. Already saving 5+ hours a week.',
    tier: 'Starter',
  },
]

// Visual social proof — looks like real purchases are happening
const VISUAL_SOLD: Record<string, number> = {
  starter: 30,
  pro: 32,
  master: 20,
}
const VISUAL_TOTAL_SPOTS = 100

export default function PricingPage() {
  const router = useRouter()
  const [loadingTier, setLoadingTier] = useState<string | null>(null)
  const [promo, setPromo] = useState<PromoStatus>({ active: false })

  // Fetch promo status on mount
  useEffect(() => {
    fetch('/api/promo/status')
      .then(res => res.json())
      .then(setPromo)
      .catch(() => setPromo({ active: false }))
  }, [])

  const handleCheckout = async (tier: string) => {
    setLoadingTier(tier)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      })
      const data = await res.json()

      if (res.status === 401) {
        // User not logged in — redirect to login, then bring them back to pricing
        router.push('/login?returnTo=/pricing')
        return
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Something went wrong. Please try again.')
        setLoadingTier(null)
      }
    } catch {
      alert('Something went wrong. Please try again.')
      setLoadingTier(null)
    }
  }

  return (
    <div className="min-h-screen">
      {/* ── Launch Promo Banner ── */}
      {promo.active && (
        <div className="bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 py-3 px-4">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <span className="text-white font-bold text-sm sm:text-base">
              Launch Special: All tiers up to 43% off!
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-bold uppercase tracking-wide animate-pulse">
              Only {VISUAL_TOTAL_SPOTS - Object.values(VISUAL_SOLD).reduce((a, b) => a + b, 0)} spots left
            </span>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-sm font-medium text-blue-300 mb-6">
            One-time payment. Lifetime access. No subscriptions.
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            Invest in Your <span className="text-gradient">AI Future</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-6">
            No subscriptions. No hidden fees. Pay once, learn forever.
          </p>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            If this course saves you just <span className="text-blue-400 font-semibold">5 hours per week</span> at $50/hour, that&apos;s{' '}
            <span className="text-green-400 font-bold">$13,000 per year</span> in value.
            Your investment pays for itself many times over.
          </p>

          {/* Promo countdown */}
          {promo.active && promo.endDate && (
            <div className="mt-8 inline-block p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30">
              <p className="text-orange-400 font-bold text-sm uppercase tracking-wider mb-3">Launch promo ends in</p>
              <CountdownTimer endDate={promo.endDate} />
            </div>
          )}
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {tiers.map((plan) => {
              const promoTier = promo.active && promo.tiers?.[plan.tier]
              const isTierPromo = !!promoTier

              return (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl p-8 card-hover backdrop-blur-sm ${
                    isTierPromo
                      ? 'bg-gradient-to-br from-orange-600/10 to-red-600/10 border-2 border-orange-500/50 shadow-xl shadow-orange-500/10'
                      : plan.highlighted
                      ? 'bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-2 border-blue-500/50 lg:scale-105 lg:-my-4 shadow-xl shadow-blue-500/10'
                      : 'bg-slate-900/60 border border-slate-800'
                  }`}
                >
                  {/* Badges */}
                  {isTierPromo ? (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-6 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold rounded-full shadow-lg shadow-orange-500/25 whitespace-nowrap animate-pulse">
                        LAUNCH SPECIAL
                      </span>
                    </div>
                  ) : plan.badge ? (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-6 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold rounded-full shadow-lg shadow-blue-500/25 whitespace-nowrap">
                        {plan.badge}
                      </span>
                    </div>
                  ) : null}

                  <div className="mb-6">
                    {/* Tier icon and name */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
                        {plan.tier === 'free' && (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                          </svg>
                        )}
                        {plan.tier === 'starter' && (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        )}
                        {plan.tier === 'pro' && (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                          </svg>
                        )}
                        {plan.tier === 'master' && (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                          </svg>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold">{plan.name}</h3>
                    </div>

                    {/* Pricing */}
                    {isTierPromo && promoTier ? (
                      <>
                        <div className="mb-1">
                          <span className="text-lg text-slate-500 line-through">${plan.price}</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-black text-orange-400">
                            ${promoTier.promoPrice}
                          </span>
                          <span className="text-slate-500">/ {plan.period}</span>
                        </div>
                        <p className="text-sm text-orange-400 font-semibold mt-2">
                          Launch Special — Save ${plan.price - promoTier.promoPrice}!
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="mb-1">
                          {plan.originalPrice && (
                            <span className="text-lg text-slate-500 line-through mr-2">${plan.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-5xl font-black">
                            ${plan.price}
                          </span>
                          <span className="text-slate-500">/ {plan.period}</span>
                        </div>
                        {plan.paymentPlan && (
                          <p className="text-sm text-slate-400 mt-2">{plan.paymentPlan}</p>
                        )}
                      </>
                    )}
                  </div>

                  {/* Social proof for promo */}
                  {isTierPromo && VISUAL_SOLD[plan.tier] && (
                    <div className="mb-4 px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/30 text-center">
                      <p className="text-orange-400 text-sm font-bold">
                        {VISUAL_SOLD[plan.tier]} of {VISUAL_TOTAL_SPOTS} spots claimed
                      </p>
                      <div className="mt-2 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                          style={{ width: `${(VISUAL_SOLD[plan.tier] / VISUAL_TOTAL_SPOTS) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Module access */}
                  <div className="px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm text-slate-300 mb-6">
                    {plan.modules}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  {plan.href ? (
                    <Link
                      href={plan.href}
                      className={`block w-full text-center px-6 py-4 rounded-xl font-semibold text-lg transition ${
                        plan.highlighted
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'
                          : 'bg-slate-800 hover:bg-slate-700 border border-slate-700'
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleCheckout(plan.tier)}
                      disabled={loadingTier !== null}
                      className={`block w-full text-center px-6 py-4 rounded-xl font-semibold text-lg transition disabled:opacity-60 disabled:cursor-not-allowed ${
                        isTierPromo
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40'
                          : plan.highlighted
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'
                          : 'bg-slate-800 hover:bg-slate-700 border border-slate-700'
                      }`}
                    >
                      {loadingTier === plan.tier ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing...
                        </span>
                      ) : isTierPromo && promoTier ? (
                        `Grab Your Spot — $${promoTier.promoPrice}`
                      ) : (
                        plan.cta
                      )}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">The Math Speaks for Itself</h2>
              <p className="text-slate-400">A simple look at the return on your investment</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="text-3xl font-black text-blue-400 mb-2">5 hrs/week</div>
                <div className="text-slate-400 text-sm">Time saved with AI skills</div>
              </div>
              <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="text-3xl font-black text-purple-400 mb-2">$50/hour</div>
                <div className="text-slate-400 text-sm">Average professional rate</div>
              </div>
              <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="text-3xl font-black text-green-400 mb-2">$13,000/yr</div>
                <div className="text-slate-400 text-sm">Value gained annually</div>
              </div>
            </div>
            <p className="text-center text-slate-300 mt-8 text-lg">
              Even the Master tier pays for itself <span className="text-green-400 font-bold">16x over</span> in the first year alone.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Compare Plans in Detail</h2>
          <p className="text-slate-400 text-center mb-12">Every feature, side by side</p>

          <div className="rounded-2xl border border-slate-800 overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="text-left px-6 py-4 text-slate-400 font-medium">Feature</th>
                  <th className="text-center px-4 py-4 font-semibold text-slate-400">Free</th>
                  <th className="text-center px-4 py-4 font-semibold text-green-400">Starter</th>
                  <th className="text-center px-4 py-4 font-semibold text-blue-400">Pro</th>
                  <th className="text-center px-4 py-4 font-semibold text-purple-400">Master</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, idx) => (
                  <tr key={row.feature} className={`border-b border-slate-800/50 ${idx % 2 === 0 ? 'bg-slate-900/20' : ''}`}>
                    <td className="px-6 py-3.5 text-slate-300 text-sm">{row.feature}</td>
                    {(['free', 'starter', 'pro', 'master'] as const).map((tier) => {
                      const val = row[tier]
                      return (
                        <td key={tier} className="text-center px-4 py-3.5">
                          {typeof val === 'boolean' ? (
                            val ? (
                              <svg className="w-5 h-5 text-green-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <span className="text-slate-600">&mdash;</span>
                            )
                          ) : (
                            <span className="text-slate-300 font-medium text-sm">{val}</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">What Our Students Say</h2>
          <p className="text-slate-400 text-center mb-12">Real results from real professionals</p>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 p-8 card-hover"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-300 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-sm text-slate-500">{t.role}</div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    t.tier === 'Master'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : t.tier === 'Pro'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-green-500/20 text-green-300 border border-green-500/30'
                  }`}>
                    {t.tier}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Money-Back Guarantee */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-10 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">30-Day Money-Back Guarantee</h3>
            <p className="text-slate-400 leading-relaxed max-w-xl mx-auto mb-6">
              Try the full course risk-free. If you don&apos;t feel it&apos;s worth every penny within 30 days,
              email us for a complete refund. No questions asked. No hoops to jump through.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No questions asked
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Full refund within 30 days
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Secure payment via Stripe
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Ready to <span className="text-gradient">Master AI</span>?
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            Join thousands of professionals who are already using AI to work smarter, not harder.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-semibold text-lg transition"
            >
              Start Free
            </Link>
            <button
              onClick={() => handleCheckout('pro')}
              disabled={loadingTier !== null}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 font-semibold text-lg transition disabled:opacity-60"
            >
              {loadingTier === 'pro' ? 'Processing...' : promo.active && promo.tiers?.pro ? `Get Pro Access - $${promo.tiers.pro.promoPrice}` : 'Get Pro Access - $247'}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
