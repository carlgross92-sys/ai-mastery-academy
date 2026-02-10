// Email system - logs to console. Swap in Resend/SendGrid later.

interface EmailParams {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailParams) {
  console.log(`\n📧 EMAIL SENT`)
  console.log(`   To: ${to}`)
  console.log(`   Subject: ${subject}`)
  console.log(`   Body preview: ${html.replace(/<[^>]*>/g, '').substring(0, 100)}...`)
  console.log('')
}

export function welcomeEmail(name: string) {
  return {
    subject: 'Welcome to AI Mastery Academy!',
    html: `
      <h1>Welcome, ${name}!</h1>
      <p>You've taken the first step toward mastering AI. Your free tier gives you access to Module 1 — start learning today.</p>
      <p><a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/course">Start Learning</a></p>
    `,
  }
}

export function paymentConfirmationEmail(name: string, tier: string) {
  return {
    subject: `You're now a ${tier.charAt(0).toUpperCase() + tier.slice(1)} member!`,
    html: `
      <h1>Payment Confirmed</h1>
      <p>Hey ${name}, your upgrade to <strong>${tier}</strong> tier is complete. You now have access to all ${tier}-tier modules.</p>
      <p><a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/course">Continue Learning</a></p>
    `,
  }
}

export function badgeEarnedEmail(name: string, badgeName: string, badgeIcon: string) {
  return {
    subject: `You earned a badge: ${badgeName}!`,
    html: `
      <h1>${badgeIcon} Badge Earned!</h1>
      <p>Congrats ${name}, you just earned the <strong>${badgeName}</strong> badge.</p>
      <p><a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard">View Your Badges</a></p>
    `,
  }
}

export function certificateEarnedEmail(name: string, courseName: string, certId: string) {
  return {
    subject: `Your certificate is ready!`,
    html: `
      <h1>Certificate of Completion</h1>
      <p>Congratulations ${name}! You've completed <strong>${courseName}</strong>.</p>
      <p><a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/certificate/${certId}">View Your Certificate</a></p>
    `,
  }
}
