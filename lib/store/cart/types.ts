import { SwellProduct } from '../products/types'

export type SimpleCartItem = {
  productId: string
  quantity: number
  options?: any
}

export type SwellCart = {
  accountLoggedIn?: any
  billing: any
  checkoutId: string
  checkoutUrl: string
  coupon?: any
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
  discountEach: number
  discountTotal: number
  id?: string
  price: number
  priceTotal: number
  product: SwellProduct
  productId: string
  quantity: number
  shipmentWeight: number
  taxEach: number
  taxTotal: number
  variant?: any
} & SimpleCartItem
