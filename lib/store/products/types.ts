export type SwellCategory = {
  isDrop?: boolean
  releaseDate?: string
  expirationDate?: string
  deliveryDate?: string
  name: string
  images?: any
  description?: string
  metaDescription?: string
  parentId?: string
  slug: string
  topId?: string
  content?: any
  id: string
  drop?: any
}

export type SwellProduct = {
  id: string
  currency: string
  description: string
  bundle?: null
  images?: any
  name?: string
  options: string
  price: number
  purchaseOptions: any
  sku?: string
  slug: string
  stockStatus: any
  stockTracking: boolean
  attributes: any
  tags: any
  metaTitle?: string
  metaDescription: string
  categories?: SwellCategory[]
  content?: {
    ingredients?: string
    allergens?: string
  }
}

export type Drop = {
  products: SwellProduct[]
} & SwellCategory
