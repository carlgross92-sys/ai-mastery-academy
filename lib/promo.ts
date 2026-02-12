// ── Launch Promo Configuration ──
// To end the promo early, set PROMO_ACTIVE=false in Vercel env vars.
// To revert all changes, delete this file and remove promo references.

export const PROMO_CONFIG = {
  // Promo dates — 7 days from launch
  startDate: new Date('2026-02-12T00:00:00Z'),
  endDate: new Date('2026-02-19T00:00:00Z'),

  // Spots (shared across all tiers)
  maxSpots: 50,

  // Per-tier promo pricing (in cents for Stripe)
  tiers: {
    starter: {
      originalPriceCents: 4700,   // $47
      promoPriceCents: 2700,      // $27
      originalPriceDisplay: 47,
      promoPriceDisplay: 27,
    },
    pro: {
      originalPriceCents: 24700,  // $247
      promoPriceCents: 14200,     // $142
      originalPriceDisplay: 247,
      promoPriceDisplay: 142,
    },
    master: {
      originalPriceCents: 79700,  // $797
      promoPriceCents: 45800,     // $458
      originalPriceDisplay: 797,
      promoPriceDisplay: 458,
    },
  },
}

export function isPromoExpiredByTime(): boolean {
  return new Date() >= PROMO_CONFIG.endDate
}

export function getPromoTimeRemaining(): { days: number; hours: number; minutes: number; seconds: number } | null {
  const now = new Date()
  const diff = PROMO_CONFIG.endDate.getTime() - now.getTime()
  if (diff <= 0) return null

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}
