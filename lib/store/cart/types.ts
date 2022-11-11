import { SwellProduct } from '../products/types'

export type SwellCoupon = {
  description?: string | null
  id: string
  name: string
}

export type SwellCart = {
  accountLoggedIn?: any
  account?: {
    email: string
    firstName: string
    id: string
    lastName: string
    name: string
  }
  billing: any
  checkoutId: string
  checkoutUrl: string
  coupon?: SwellCoupon
  currency: string
  dateAbandoned?: string
  dateCreated: string
  discountTotal: number
  discounts?: any
  giftcardTotal: number
  grandTotal?: number
  guest: boolean
  id: string
  itemDiscount: number
  itemQuantity: number
  itemShipmentWeight: number
  itemTax: number
  items?: SwellCartItem[]
  promotionIds: any
  promotions: any
  shipmentDelivery: boolean
  shipmentDiscount: number
  shipmentPrice: number
  shipmentTotal: number
  shipping: any
  subTotal: number
  taxIncludedTotal: number
  taxTotal: number
  taxes?: any
}

export type SwellCartItem = {
  discountEach?: number
  discountTotal?: number
  id?: string
  price?: number
  priceTotal?: number
  product: SwellProduct
  shipmentWeight?: number
  taxEach?: number
  taxTotal?: number
  variant?: any
  options?: any
  productId: string
  quantity: number
}

export type SwellShippingService = {
  description?: string
  id: string
  name: string
  pickup: boolean
  price: number
}

export type SwellShippingServices = {
  dateCreated: string
  fingerprint: string
  services: SwellShippingService[]
}
