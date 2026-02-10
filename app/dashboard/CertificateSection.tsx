'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CertificateSection() {
  const [generating, setGenerating] = useState(false)
  const router = useRouter()

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      const res = await fetch('/api/certificate', { method: 'POST' })
      const data = await res.json()
      if (data.certificateId) {
        router.push(`/certificate/${data.certificateId}`)
      }
    } catch (error) {
      console.error('Error generating certificate:', error)
    }
    setGenerating(false)
  }

  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      </div>
      <div className="flex-1">
        <div className="font-semibold text-green-300">Ready to Generate!</div>
        <div className="text-sm text-slate-400">You&apos;ve completed all lessons. Claim your certificate.</div>
      </div>
      <button
        onClick={handleGenerate}
        disabled={generating}
        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 font-semibold text-sm hover:from-green-600 hover:to-emerald-600 transition disabled:opacity-50"
      >
        {generating ? 'Generating...' : 'Generate Certificate'}
      </button>
    </div>
  )
}
