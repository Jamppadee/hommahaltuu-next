import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const { profileId } = await req.json();
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_intent_data: { capture_method: 'manual' }, // pidä kate, vapautetaan myöhemmin
    line_items: [
      { price: process.env.STRIPE_PRICE_ID!, quantity: 1 },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile/${profileId}?paid=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile/${profileId}?canceled=1`,
    metadata: { profileId },
  });
  return NextResponse.json({ id: session.id, url: session.url });
}
