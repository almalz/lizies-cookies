export type SwellImage = {
  id: string
  file: {
    height: number
    md5: string
    url: string
    width: number
  }
}

export type SwellCategory = {
  isDrop?: boolean
  releaseDate?: string
  expirationDate?: string
  deliveryDate?: string
  name: string
  images?: SwellImage[]
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
  images?: SwellImage[]
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
    truncatedDescription?: string
    ingredients?: string
    allergens?: string
    sliderText?: string
  }
}

export type Drop = {
  products: SwellProduct[]
} & SwellCategory
