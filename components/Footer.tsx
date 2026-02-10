import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                AI
              </div>
              <span className="font-bold text-lg">AI Mastery Academy</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Master AI tools, frameworks, and strategies. Join 10,000+ professionals building the future.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link href="/course" className="text-sm text-slate-400 hover:text-white transition">All Modules</Link></li>
              <li><Link href="/pricing" className="text-sm text-slate-400 hover:text-white transition">Pricing</Link></li>
              <li><Link href="/dashboard" className="text-sm text-slate-400 hover:text-white transition">Dashboard</Link></li>
              <li><Link href="/register" className="text-sm text-slate-400 hover:text-white transition">Get Started</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/#modules" className="text-sm text-slate-400 hover:text-white transition">Course Curriculum</Link></li>
              <li><Link href="/#faq" className="text-sm text-slate-400 hover:text-white transition">FAQ</Link></li>
              <li><Link href="/#testimonials" className="text-sm text-slate-400 hover:text-white transition">Reviews</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/pricing" className="text-sm text-slate-400 hover:text-white transition">Refund Policy</Link></li>
              <li><Link href="/login" className="text-sm text-slate-400 hover:text-white transition">Sign In</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} AI Mastery Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-sm text-slate-500">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              30-day money-back guarantee
            </span>
            <span className="flex items-center gap-2 text-sm text-slate-500">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
              </svg>
              Secure payments
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
