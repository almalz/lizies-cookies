import { CheckoutFormValues } from '../../components/CheckoutForm'
import { SwellAccount } from '../store/account/types'

export const checkoutFormToSwellAccount = ({
  firstName,
  lastName,
  email,
  phone,
  address1,
  address2,
  city,
  zip,
  state,
}: CheckoutFormValues) => {
  const account = {
    email,
    lastName,
    firstName,
    shipping: {
      firstName,
      lastName,
      phone,
      address1,
      address2,
      city,
      zip,
      state,
      country: 'FR',
    },
    billing: {
      firstName,
      lastName,
      phone,
      address1,
      address2,
      city,
      zip,
      state,
      country: 'FR',
    },
  } as SwellAccount
  return account
}

export const stringifyAccount = ({
  firstName,
  lastName,
  email,
  shipping: { address1, address2, city, zip, phone },
}: SwellAccount) => {
  const formatedAddress = `${firstName || ''} ${lastName || ''}\n${
    email ? email + '\n' : ''
  }${phone ? phone + '\n' : ''}${address1 ? address1 + '\n' : ''}${
    address2 ? address2 + '\n' : ''
  }${zip} ${city}`

  return formatedAddress
}
