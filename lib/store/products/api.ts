import swell from '../swell'
import { Drop, SwellCategory, SwellProduct } from './types'

export const Products = {
  getAllProducts: async () => {
    const products = await swell.products.list({
      limit: 25,
      page: 1,
    })
    return products
  },

  getProduct: async () => {
    const product = await swell.products.get('blue-shoes')
    return product
  },

  getNextIncommingDrop: async () => {
    const { results: categories }: { results: SwellCategory[] } =
      await swell.categories.list({
        limit: 100,
        page: 1,
      })

    const dropCategories = categories
      .filter((cat) => cat.content.isDrop)
      .map((cat) => {
        return { ...cat.content, ...cat, content: null }
      })
      .sort((a, b) => {
        return (
          new Date(a.deliveryDate).getTime() -
          new Date(b.deliveryDate).getTime()
        )
      })

    let nextIncommingDrop = dropCategories[0]

    const { results: products }: { results: SwellProduct[] } =
      await swell.products.list({
        category: nextIncommingDrop.id,
      })

    const drop: Drop = { ...nextIncommingDrop, products }

    return drop
  },
}
