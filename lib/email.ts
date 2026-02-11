import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const FROM_EMAIL = process.env.EMAIL_FROM || 'AI Mastery Academy <onboarding@resend.dev>'

interface EmailParams {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailParams) {
  if (!resend) {
    console.log(`[Email] No RESEND_API_KEY set — logging instead:`)
    console.log(`  To: ${to}`)
    console.log(`  Subject: ${subject}`)
    return
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    })
  } catch (error) {
    console.error('[Email] Failed to send:', error)
  }
}

export function welcomeEmail(name: string) {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  return {
    subject: 'Welcome to AI Mastery Academy!',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1e293b;">Welcome, ${name}!</h1>
        <p style="color: #475569; font-size: 16px; line-height: 1.6;">You've taken the first step toward mastering AI. Your free tier gives you access to Modules 1 &amp; 2 — start learning today.</p>
        <a href="${baseUrl}/course" style="display: inline-block; padding: 12px 24px; background: linear-gradient(to right, #3b82f6, #8b5cf6); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 16px;">Start Learning</a>
      </div>
    `,
  }
}

export function paymentConfirmationEmail(name: string, tier: string) {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1)
  return {
    subject: `You're now a ${tierLabel} member!`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1e293b;">Payment Confirmed</h1>
        <p style="color: #475569; font-size: 16px; line-height: 1.6;">Hey ${name}, your upgrade to <strong>${tierLabel}</strong> tier is complete. You now have access to all ${tierLabel}-tier modules.</p>
        <a href="${baseUrl}/course" style="display: inline-block; padding: 12px 24px; background: linear-gradient(to right, #3b82f6, #8b5cf6); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 16px;">Continue Learning</a>
      </div>
    `,
  }
}

export function badgeEarnedEmail(name: string, badgeName: string, badgeIcon: string) {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  return {
    subject: `You earned a badge: ${badgeName}!`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1e293b;">${badgeIcon} Badge Earned!</h1>
        <p style="color: #475569; font-size: 16px; line-height: 1.6;">Congrats ${name}, you just earned the <strong>${badgeName}</strong> badge.</p>
        <a href="${baseUrl}/dashboard" style="display: inline-block; padding: 12px 24px; background: linear-gradient(to right, #3b82f6, #8b5cf6); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 16px;">View Your Badges</a>
      </div>
    `,
  }
}

export function certificateEarnedEmail(name: string, courseName: string, certId: string) {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  return {
    subject: `Your certificate is ready!`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1e293b;">Certificate of Completion</h1>
        <p style="color: #475569; font-size: 16px; line-height: 1.6;">Congratulations ${name}! You've completed <strong>${courseName}</strong>.</p>
        <a href="${baseUrl}/certificate/${certId}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(to right, #3b82f6, #8b5cf6); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 16px;">View Your Certificate</a>
      </div>
    `,
  }
}
