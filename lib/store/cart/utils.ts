import { SwellCartItem } from './types'

export const simplifyCartItem = (items: SwellCartItem[]) => {
  return items.map((item) => {
    return {
      productId: item.productId,
      quantity: item.quantity,
    }
  }) as SwellCartItem[]
}
