import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { SwellCart } from '../../lib/store/cart/types'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

const CURRENCY = 'EUR'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
    return
  }
  const {
    cart,
    payment_intent_id,
  }: { cart: SwellCart; payment_intent_id?: string } = req.body
  // Validate the amount that was passed from the client.
  if (!cart.grandTotal) {
    res.status(500).json({ statusCode: 400, message: 'Invalid amount.' })
    return
  }

  const amount = cart.grandTotal * 100

  if (payment_intent_id) {
    try {
      const current_intent = await stripe.paymentIntents.retrieve(
        payment_intent_id
      )
      // If PaymentIntent has been created, just update the amount.
      if (current_intent) {
        const updated_intent = await stripe.paymentIntents.update(
          payment_intent_id,
          {
            amount,
          }
        )
        res.status(200).json(updated_intent)
        return
      }
    } catch (e) {
      if ((e as any).code !== 'resource_missing') {
        const errorMessage =
          e instanceof Error ? e.message : 'Internal server error'
        res.status(500).json({ statusCode: 500, message: errorMessage })
        return
      }
    }
  }
  try {
    // Create PaymentIntent from body params.
    const params: Stripe.PaymentIntentCreateParams = {
      amount,
      currency: CURRENCY,
      automatic_payment_methods: {
        enabled: true,
      },
    }
    const paymentIntent: Stripe.PaymentIntent =
      await stripe.paymentIntents.create(params)

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Internal server error'
    res.status(500).json({ statusCode: 500, message: errorMessage })
  }
}
