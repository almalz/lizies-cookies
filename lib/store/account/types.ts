export type SwellAccount = {
  email: string
  currency?: string
  name?: string
  firstName?: string
  lastName?: string
  shipping?: SwellShipping
  billing: SwellBilling
  date_created?: string
  type?: string
  orderCount?: number
  orderValue?: number
  balance?: number
  dateUpdated?: string
  emailOptin?: boolean
  cartAbandonedCount?: number
  dateFirstCartAbandoned?: string
  dateLastCartAbandoned?: string
  id?: string
}

export type SwellBilling = {
  name?: string
  firstName?: string
  lastName?: string
  phone?: string
  address1?: string
  address2?: string
  city?: string
  zip?: string
  state?: string
  country?: string
}

export type SwellShipping = {
  name?: string
  firstName?: string
  lastName?: string
  phone?: string
  address1?: string
  address2?: string
  city?: string
  zip?: string
  state?: string
  country?: string
  service_name?: string
  pickup?: boolean
}
