import { Cart } from '../cart/api'
import { SwellOrder } from '../cart/types'
import swell from '../swell'

export const handleConfirmOrderPayement = async ({
  paymentIntentId,
  paymentMethodId,
  onSuccess,
}: {
  paymentIntentId: string
  paymentMethodId: string
  onSuccess: (order: SwellOrder) => void
}) => {
  const billing = {
    method: paymentMethodId,
    intent: {
      stripe: {
        id: paymentIntentId,
      },
    },
  }
  await swell.cart.update({ billing: { ...billing } })
  const order = await Cart.submitOrder()
  if (order) onSuccess(order)
  return order
}
