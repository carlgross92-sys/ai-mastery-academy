'use client'

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-white hover:from-blue-600 hover:to-purple-600 transition"
    >
      Print Certificate
    </button>
  )
}
