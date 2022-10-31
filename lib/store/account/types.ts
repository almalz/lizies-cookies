export type SwellAccount = {
  email: string
  currency?: string
  name?: string
  firstName?: string
  lastName?: string
  shipping?: {
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
  billing: {
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
