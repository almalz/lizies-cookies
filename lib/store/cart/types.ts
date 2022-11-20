import { SwellBilling, SwellShipping } from '../account/types'
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
  billing: SwellBilling
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

export type SwellOrder = {
  cart_id: string
  test: any
  items: SwellCartItem[]
  billing: SwellBilling
  shipping: SwellShipping
  shipment_rating: SwellShippingServices
  shipment_discount: number
  schedule: any
  coupon_code: any
  coupon_id: any
  discounts: any
  taxes: any
  item_tax_included: any
  shipment_tax: any
  shipment_tax_included: any
  promotion_ids: []
  account_id: string
  account_logged_in: any
  account_info_saved: any
  account_credit_applied: any
  account_credit_amount: any
  giftcards: any
  currency: string
  display_currency: any
  display_locale: any
  notes: any
  comments: any
  gift: any
  gift_message: any
  metadata: { delivery_date: string }
  shipment_delivery: boolean
  date_trial_end: any
  sub_total: number
  shipment_price: number
  shipment_total: number
  item_tax: number
  tax_included_total: number
  item_discount: number
  discount_total: number
  grand_total: number
  item_quantity_returned: number
  return_item_total: number
  return_item_tax: number
  return_item_tax_included: number
  return_total: number
  payment_balance: number
  paid: false
  refunded: false
  item_quantity_delivered: number
  item_quantity_deliverable: number
  delivered: false
  item_quantity: number
  item_quantity_canceled: number
  item_quantity_cancelable: number
  item_quantity_shipment_deliverable: number
  item_quantity_returnable: number
  item_quantity_invoiced: number
  item_quantity_invoiceable: number
  item_quantity_credited: number
  item_quantity_creditable: number
  item_shipment_weight: number
  shipment_tax_included_total: number
  tax_total: number
  giftcard_total: number
  guest: boolean
  date_created: string
  hold: boolean
  closed: boolean
  status: string
  payment_total: number
  refund_total: number
  number: string
  id: string
}
