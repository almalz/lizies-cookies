import { Item } from './types'
import { Store } from './store'
import { setCookiesExpiration } from '../cookies'

export const Cart = {
  open: () => Snipcart.api.theme.cart.open(),
  close: () => Snipcart.api.theme.cart.close(),
}

export const Items = {
  add: async (item: Item) => {
    try {
      await Snipcart.api.cart.items.add(item)
      setCartExpiration()
    } catch (error) {
      console.log(error)
    } finally {
      setCartExpiration()
    }
  },
  remove: async (id: string, value: number) => {
    try {
      const snipcartItem = await Store.getItemById(id)
      const { uniqueId, quantity } = snipcartItem
      const newQuantity = quantity - value >= 0 ? quantity - value : 0
      await Snipcart.api.cart.items.update({
        uniqueId,
        quantity: newQuantity,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setCartExpiration()
    }
  },
}

export const setCartExpiration = () => {
  const d = new Date()
  d.setHours(23, 59)
  setCookiesExpiration('snipcart-cart', d)
}
