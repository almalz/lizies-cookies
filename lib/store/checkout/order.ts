import { Cart } from '../cart/api'
import swell from '../swell'

export const handleConfirmOrderPayement = async ({
  paymentIntentId,
}: {
  paymentIntentId: string
}) => {
  await Cart.submitOrder()
  const billing = {
    method: 'card',
    intent: {
      stripe: {
        id: paymentIntentId,
      },
    },
  }
  await swell.cart.update({ billing: { ...billing } })
}
