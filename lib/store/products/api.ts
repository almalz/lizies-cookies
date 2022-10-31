import { isAfter, isBefore } from 'date-fns'
import swell from '../swell'
import { Drop, SwellCategory, SwellProduct } from './types'

const TODAY = new Date(Date.now())

export const Products = {
  getAllProducts: async () => {
    const {results} = await swell.products.list({
      limit: 50,
      page: 1,
    })
    return results
  },

  getProduct: async () => {
    const product = await swell.products.get('blue-shoes')
    return product
  },

  getCurrentDrop: async () => {
    const { results: categories }: { results: SwellCategory[] } =
      await swell.categories.list({
        limit: 100,
        page: 1,
      })

    const dropCategories = categories
      .filter((cat) => cat.isDrop)
      .map((cat) => {
        return { ...cat.content, ...cat, content: null }
      })
      .filter(
        (cat) =>
          isAfter(new Date(cat.expirationDate!), TODAY) &&
          isBefore(new Date(cat.releaseDate!), TODAY)
      )
      .sort((a, b) => {
        return (
          new Date(a.deliveryDate).getTime() -
          new Date(b.deliveryDate).getTime()
        )
      })

    if (!dropCategories || dropCategories.length < 1) return null

    let nextIncommingDrop = dropCategories[0]

    const { results: products }: { results: SwellProduct[] } =
      await swell.products.list({
        category: nextIncommingDrop.id,
      })

    const drop: Drop = { ...nextIncommingDrop, products }

    return drop
  },
}
