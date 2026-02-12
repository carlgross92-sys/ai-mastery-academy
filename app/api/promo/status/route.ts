import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PROMO_CONFIG, isPromoExpiredByTime } from '@/lib/promo'

export const dynamic = 'force-dynamic'

export async function GET() {
  // Check env var kill switch
  if (process.env.PROMO_ACTIVE === 'false') {
    return NextResponse.json({ active: false })
  }

  // Check time
  if (isPromoExpiredByTime()) {
    return NextResponse.json({ active: false })
  }

  // Count all completed purchases since promo start
  const purchaseCount = await prisma.payment.count({
    where: {
      status: 'completed',
      createdAt: { gte: PROMO_CONFIG.startDate },
    },
  })

  const spotsRemaining = Math.max(0, PROMO_CONFIG.maxSpots - purchaseCount)

  if (spotsRemaining === 0) {
    return NextResponse.json({ active: false })
  }

  // Build per-tier pricing info
  const tiers: Record<string, { promoPrice: number; originalPrice: number }> = {}
  for (const [tier, config] of Object.entries(PROMO_CONFIG.tiers)) {
    tiers[tier] = {
      promoPrice: config.promoPriceDisplay,
      originalPrice: config.originalPriceDisplay,
    }
  }

  return NextResponse.json({
    active: true,
    spotsRemaining,
    tiers,
    endDate: PROMO_CONFIG.endDate.toISOString(),
  })
}
