import { Cart } from '../cart/api'
import swell from '../swell'

export const handleConfirmOrderPayement = async ({
  paymentIntentId,
  paymentMethodId,
}: {
  paymentIntentId: string
  paymentMethodId: string
}) => {
  const billing = {
    method: paymentMethodId,
    intent: {
      stripe: {
        id: paymentIntentId,
      },
    },
  }
  const cart = await swell.cart.update({ billing: { ...billing } })
  const order = await Cart.submitOrder()
  console.log({ order, billing, cart })
  return order
}
