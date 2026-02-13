import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { sendEmail, paymentConfirmationEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: Request) {
  try {
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET is not configured')
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 503 }
      )
    }

    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message)
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      )
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      const userId = session.metadata?.userId
      const tier = session.metadata?.tier

      if (!userId || !tier) {
        console.error('Missing metadata in checkout session:', session.id)
        return NextResponse.json(
          { error: 'Missing metadata' },
          { status: 400 }
        )
      }

      // Update user tier
      await prisma.user.update({
        where: { id: userId },
        data: {
          tier: tier,
          stripeCustomerId: session.customer as string || undefined,
        },
      })

      // Create payment record
      await prisma.payment.create({
        data: {
          userId: userId,
          stripeSessionId: session.id,
          amount: session.amount_total || 0,
          tier: tier,
          status: 'completed',
        },
      })

      // Send payment confirmation email
      const user = await prisma.user.findUnique({ where: { id: userId } })
      if (user) {
        const email = paymentConfirmationEmail(user.name, tier)
        await sendEmail({ to: user.email, ...email })
      }

      console.log(`User ${userId} upgraded to ${tier}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
