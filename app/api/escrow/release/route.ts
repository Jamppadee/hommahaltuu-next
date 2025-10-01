import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const { payment_intent_id } = await req.json();
    const pi = await stripe.paymentIntents.capture(payment_intent_id);
    return NextResponse.json({ ok: true, pi });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
  }
}
