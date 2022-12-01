import { isAfter, isBefore } from 'date-fns'
import swell from '../swell'

export const Products = {
  getAllProducts: async () => {
    const { results } = await swell.products.list({
      limit: 50,
      page: 1,
    })
    return results
  },

  getProduct: async () => {
    const product = await swell.products.get('blue-shoes')
    return product
  },
}
