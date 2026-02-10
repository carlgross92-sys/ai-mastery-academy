import Link from 'next/link'

const modules = [
  { num: 1, title: 'AI Architecture & Cognition', icon: '🧠', color: 'from-blue-500 to-cyan-500', desc: 'How AI actually thinks', tier: 'free' },
  { num: 2, title: 'AI Tool Landscape', icon: '🗺️', color: 'from-purple-500 to-pink-500', desc: 'Choose the right tools', tier: 'free' },
  { num: 3, title: 'Prompt Engineering', icon: '🎯', color: 'from-green-500 to-emerald-500', desc: 'Master AI communication', tier: 'starter' },
  { num: 4, title: 'Business AI Integration', icon: '📊', color: 'from-orange-500 to-amber-500', desc: 'Real-world applications', tier: 'starter' },
  { num: 5, title: 'Advanced AI Workflows', icon: '⚡', color: 'from-pink-500 to-rose-500', desc: 'Multi-step automation', tier: 'pro' },
  { num: 6, title: 'Content & Marketing', icon: '✍️', color: 'from-indigo-500 to-blue-500', desc: 'AI-powered content', tier: 'pro' },
  { num: 7, title: 'Data & Analytics', icon: '📈', color: 'from-yellow-500 to-orange-500', desc: 'AI-driven insights', tier: 'pro' },
  { num: 8, title: 'Custom AI Solutions', icon: '💻', color: 'from-cyan-500 to-teal-500', desc: 'Build AI assistants', tier: 'pro' },
  { num: 9, title: 'AI Strategy & Leadership', icon: '🏢', color: 'from-red-500 to-pink-500', desc: 'Lead AI transformation', tier: 'master' },
  { num: 10, title: 'AI Product Development', icon: '🚀', color: 'from-emerald-500 to-green-500', desc: 'Build AI products', tier: 'master' },
  { num: 11, title: 'AI Ethics & Governance', icon: '⚖️', color: 'from-violet-500 to-purple-500', desc: 'Responsible AI use', tier: 'master' },
  { num: 12, title: 'Future & Your Roadmap', icon: '🌟', color: 'from-blue-600 to-violet-600', desc: 'Stay ahead forever', tier: 'master' },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Marketing Director',
    text: 'This course completely transformed how I work. I\'ve automated 60% of my content creation and saved 15+ hours every week.',
    rating: 5,
    avatar: 'SC',
    color: 'from-blue-500 to-purple-500',
  },
  {
    name: 'Marcus Thompson',
    role: 'Startup Founder',
    text: 'The ROI from this course is insane. I built an entire AI-powered product in 2 weeks using what I learned in the Advanced Workflows modules.',
    rating: 5,
    avatar: 'MT',
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Jennifer Park',
    role: 'Freelance Designer',
    text: 'The Content & Marketing module alone was worth the entire price. I now offer AI-enhanced services at 3x my old rate.',
    rating: 5,
    avatar: 'JP',
    color: 'from-pink-500 to-rose-500',
  },
]

const faqs = [
  {
    q: 'Do I need any coding experience?',
    a: 'No! This course is designed for complete beginners. We start with the fundamentals and work up to advanced techniques. The Custom AI Solutions module touches on technical concepts, but we guide you through every step.',
  },
  {
    q: 'How long do I have access?',
    a: 'Lifetime access. Once you purchase, the course is yours forever — including all future updates and new modules we add.',
  },
  {
    q: 'What if I\'m not satisfied?',
    a: 'We offer a 30-day money-back guarantee. If you don\'t feel the course has provided value, just email us for a full refund.',
  },
  {
    q: 'How is this different from free YouTube tutorials?',
    a: 'We provide a structured, tested curriculum that builds on itself. Each module includes quizzes, real projects, and a clear progression path. No jumping between random videos hoping to learn.',
  },
  {
    q: 'Can I learn at my own pace?',
    a: 'Absolutely. There are no deadlines or schedules. Pick up where you left off anytime, and track your progress through the dashboard.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative py-24 md:py-32 px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-[128px] animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/15 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

        <div className="relative max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-sm font-medium text-blue-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            10,000+ professionals already enrolled
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[0.95] tracking-tight">
            Master AI Before
            <br />
            <span className="text-gradient">Your Competition</span>
            <br />
            <span className="text-slate-400">Does</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            The most comprehensive AI course on the internet. 12 modules. 60+ hands-on lessons.
            Go from &ldquo;what is AI&rdquo; to building automated systems that make you irreplaceable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/register"
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              Start Free - 2 Modules
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 glass rounded-xl text-lg font-semibold hover:bg-white/10 transition"
            >
              See Plans & Pricing
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: '12', label: 'Modules', sub: 'Deep-dive content' },
              { value: '60+', label: 'Lessons', sub: 'Step-by-step' },
              { value: '4.9', label: 'Rating', sub: 'From 2,400+ reviews' },
              { value: '$50K+', label: 'Avg. Savings', sub: 'Per year in time' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-gradient">{stat.value}</div>
                <div className="text-sm font-semibold text-slate-200 mt-1">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Makes This Different ── */}
      <section className="py-20 px-4 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Not Another <span className="text-gradient">Generic AI Course</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Built by practitioners, not theorists. Every lesson includes actionable frameworks you can use immediately.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                ),
                title: 'Architecture-First Learning',
                desc: 'Understand how AI actually thinks. Design prompts that exploit the architecture itself for 10x better results.',
                gradient: 'from-blue-500/20 to-purple-500/20',
                border: 'border-blue-500/20',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                ),
                title: 'Real Economic Frameworks',
                desc: 'Build AI workflows worth $50K+ per year in time savings. ROI-focused from lesson one.',
                gradient: 'from-green-500/20 to-emerald-500/20',
                border: 'border-green-500/20',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                ),
                title: 'Systems Integration',
                desc: 'Chain multiple AI systems into powerful workflows that your competitors simply can\'t replicate.',
                gradient: 'from-orange-500/20 to-amber-500/20',
                border: 'border-orange-500/20',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className={`group p-8 rounded-2xl bg-gradient-to-br ${feature.gradient} border ${feature.border} card-hover`}
              >
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full Curriculum / Modules ── */}
      <section id="modules" className="py-20 px-4 bg-slate-900/30 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              12 Modules. <span className="text-gradient">60+ Lessons.</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              A complete journey from AI beginner to AI expert. Each module builds on the last.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((mod) => (
              <div
                key={mod.num}
                className="group relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-600 card-hover"
              >
                {/* Module number */}
                <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br ${mod.color} flex items-center justify-center text-xs font-black shadow-lg`}>
                  {mod.num}
                </div>

                {/* Tier badge */}
                {mod.tier !== 'free' && (
                  <div className={`absolute top-4 right-4 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    mod.tier === 'starter' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                    mod.tier === 'pro' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}>
                    {mod.tier}
                  </div>
                )}

                <div className="text-4xl mb-3">{mod.icon}</div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-gradient transition-all">
                  {mod.title}
                </h3>
                <p className="text-sm text-slate-500">{mod.desc}</p>

                {/* Gradient line at bottom */}
                <div className={`mt-4 h-0.5 rounded-full bg-gradient-to-r ${mod.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition shadow-xl shadow-blue-500/25"
            >
              Start Free - 2 Modules &rarr;
            </Link>
            <p className="text-sm text-slate-500 mt-3">No credit card required</p>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-20 px-4 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-1 mb-4">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-lg font-bold">4.9/5</span>
              <span className="text-slate-400 ml-1">(2,400+ reviews)</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black">
              Real Results From <span className="text-gradient">Real People</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 card-hover"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-300 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-sm font-bold`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Before / After Comparison ── */}
      <section className="py-20 px-4 bg-slate-900/30 border-t border-slate-800/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Before vs. <span className="text-gradient">After</span> AI Mastery
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-300">Without This Course</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Spending 4+ hours on tasks AI can do in minutes',
                  'Using ChatGPT like a glorified Google search',
                  'Missing opportunities to automate workflows',
                  'Falling behind competitors who use AI tools',
                  'Creating basic content that doesn\'t convert',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 text-red-400">&#10005;</span>
                    <span className="text-slate-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="p-8 rounded-2xl bg-green-500/5 border border-green-500/20">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-300">After AI Mastery Academy</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Automated workflows saving 15+ hours per week',
                  'Prompts engineered for your exact business needs',
                  'Multi-tool AI systems running in the background',
                  'Generating content, code, and designs with AI',
                  'Building products and services 10x faster',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 text-green-400">&#10003;</span>
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 px-4 border-t border-slate-800/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-lg">
                  {faq.q}
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-slate-400 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-4 relative overflow-hidden border-t border-slate-800/50">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[128px]" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Stop Watching. <span className="text-gradient">Start Mastering.</span>
          </h2>
          <p className="text-xl text-slate-400 mb-4 max-w-2xl mx-auto">
            Every day you wait, your competition gets further ahead. Two full modules are completely free — no credit card, no risk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/register"
              className="group px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-xl font-bold hover:from-blue-600 hover:to-purple-600 transition shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1"
            >
              Start Free Today
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Free to start
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              30-day guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Lifetime access
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
