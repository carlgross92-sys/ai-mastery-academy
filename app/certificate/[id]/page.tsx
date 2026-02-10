import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import PrintButton from './PrintButton'

export default async function CertificatePage({ params }: { params: { id: string } }) {
  const certificate = await prisma.certificate.findUnique({
    where: { id: params.id },
    include: { user: true, course: true },
  })

  if (!certificate) notFound()

  const date = new Date(certificate.earnedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8 print:bg-white print:p-0">
      <div className="w-full max-w-3xl">
        {/* Print button */}
        <div className="text-center mb-6 print:hidden">
          <PrintButton />
        </div>

        {/* Certificate */}
        <div className="relative bg-white text-slate-900 rounded-2xl overflow-hidden shadow-2xl print:shadow-none print:rounded-none">
          {/* Border decoration */}
          <div className="absolute inset-0 border-[12px] border-double border-amber-400/30 rounded-2xl print:rounded-none pointer-events-none" />

          <div className="relative p-12 md:p-16 text-center">
            {/* Header */}
            <div className="mb-2 text-sm font-semibold tracking-[0.3em] text-amber-600 uppercase">
              Certificate of Completion
            </div>

            {/* Decorative line */}
            <div className="mx-auto w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-8" />

            {/* Presented to */}
            <div className="text-sm text-slate-500 mb-2">This certifies that</div>
            <div className="text-4xl md:text-5xl font-black text-slate-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              {certificate.user.name}
            </div>

            {/* Course */}
            <div className="text-sm text-slate-500 mb-2">has successfully completed</div>
            <div className="text-xl md:text-2xl font-bold text-slate-800 mb-8">
              {certificate.course.title}
            </div>

            {/* Date */}
            <div className="text-sm text-slate-500 mb-1">Awarded on</div>
            <div className="text-lg font-semibold text-slate-700 mb-8">{date}</div>

            {/* Decorative line */}
            <div className="mx-auto w-48 h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-6" />

            {/* Logo & cert number */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-black">
                AI
              </div>
              <span className="font-bold text-lg text-slate-800">AI Mastery Academy</span>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Certificate No: {certificate.certNumber}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
