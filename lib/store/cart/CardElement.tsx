import { useEffect, useState } from 'react'
import swell from '../swell'

export const SwellCardElement = () => {
  const [tokenized, setTokenized] = useState(false)

  useEffect(() => {
    swell.payment.createElements({
      card: {
        elementId: '#card-element', // Default: #card-element
        options: {
          // Options are passed as a direct argument to stripe.js
          hidePostalCode: true,
        },
        onChange: (event) => {
          // Optional, called when the Element value changes
        },
        onReady: (event) => {
          // Optional, called when the Element is fully rendered
        },
        onFocus: (event) => {
          // Optional, called when the Element gains focus
        },
        onBlur: (event) => {
          // Optional, called when the Element loses focus
        },
        onEscape: (event) => {
          // Optional, called when the escape key is pressed within an Element
        },
        onClick: (event) => {
          // Optional, called when the Element is clicked
        },
        onSuccess: (result) => {
          // Optional, called on card payment success
          console.log('success')
          setTokenized(true)
        },

        onError: (err) => {
          console.error(err)
        },
      },
    })
  }, [])

  const handleTokenize = async () => {
    await swell.payment.tokenize({
      card: {
        onSuccess: () => {
          console.log('tokenize success')
        },
        onError: (err) => {
          console.log(err)
        },
      },
    })
  }

  const handleSumbit = async () => {
    await swell.cart.update({
      account: {
        email: '<email>', //An email is required to submit an order
      },
    })
    const order = await swell.cart.submitOrder()
    console.log(order)
  }

  return (
    <div className="container">
      <div id="" />
    </div>
  )
}
