import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'AI Mastery Academy - Master AI in 30 Days'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0f1e 0%, #1a1040 50%, #0a0f1e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gradient orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            fontSize: '36px',
            fontWeight: 900,
            color: 'white',
            marginBottom: '24px',
          }}
        >
          AI
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 900,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: '8px',
          }}
        >
          AI Mastery Academy
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '28px',
            fontWeight: 600,
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
            backgroundClip: 'text',
            color: 'transparent',
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          Master AI Before Your Competition Does
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: '48px',
            marginBottom: '32px',
          }}
        >
          {[
            { value: '12', label: 'Modules' },
            { value: '60+', label: 'Lessons' },
            { value: 'Free', label: 'To Start' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: '36px', fontWeight: 900, color: '#60a5fa' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '16px', color: '#94a3b8' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            display: 'flex',
            padding: '16px 40px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            fontSize: '22px',
            fontWeight: 700,
            color: 'white',
          }}
        >
          Start Free - 2 Modules Included
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
