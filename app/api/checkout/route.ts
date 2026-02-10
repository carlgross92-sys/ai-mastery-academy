import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const tierConfig: Record<string, { price: number; name: string; description: string }> = {
  starter: {
    price: 4700,
    name: 'AI Mastery Academy - Starter',
    description: 'Lifetime access to Modules 1-3: AI Foundations, Prompt Engineering, and ChatGPT + Claude + Gemini mastery.',
  },
  pro: {
    price: 24700,
    name: 'AI Mastery Academy - Pro',
    description: 'Lifetime access to Modules 1-8: Everything in Starter plus AI for Business, Image Generation, AI Writing, Automation & APIs, and AI-Assisted Coding. Includes Certificate of Completion.',
  },
  master: {
    price: 79700,
    name: 'AI Mastery Academy - Master',
    description: 'Lifetime access to all 12 Modules: Everything in Pro plus Voice & Video AI, AI Strategy & Leadership, Advanced Techniques, The Future of AI, coaching calls, and private mastermind community.',
  },
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'You must be logged in to purchase.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { tier } = body

    if (!tier || !tierConfig[tier]) {
      return NextResponse.json(
        { error: 'Invalid tier selected.' },
        { status: 400 }
      )
    }

    const config = tierConfig[tier]

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: session.user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: config.name,
              description: config.description,
            },
            unit_amount: config.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
        tier: tier,
      },
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?upgraded=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error: any) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Something went wrong.' },
      { status: 500 }
    )
  }
}
