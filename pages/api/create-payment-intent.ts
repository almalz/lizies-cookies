import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { SwellCart } from '../../lib/store/cart/types'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== 'POST') {
    res.status(404)
  }

  try {
    const { cart }: { cart: SwellCart } = req.body
    console.log({ cart }, cart.grandTotal)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: cart.grandTotal! * 100, // amount required in cents
      currency: cart.currency,
    })

    console.info(`Sucessfuly created paiment intent`)
    return res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Failed to create payment intent',
      error,
    })
  }
}

export default handler
