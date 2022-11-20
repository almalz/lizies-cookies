import { Cart } from '../cart/api'
import swell from '../swell'

export const handleConfirmOrderPayement = async ({
  paymentMethodId,
  paymentIntentId,
}: {
  paymentMethodId: string
  paymentIntentId: string
}) => {
  await Cart.submitOrder()
  const billing = {
    method: 'stripe',
    ideal: {
      token: '<payment_method_id>',
    },
    intent: {
      stripe: {
        id: '<payment_intent_id>',
      },
    },
  }
  await swell.cart.update({ billing })
}
