import { useEffect, useState } from 'react'
import swell from '../swell'

type useCardElementProps = {
  onSuccess?: (args: any) => void
  onError?: (args: any) => void
  onChange?: (args: any) => void
}

export const useCardElement = ({
  onSuccess,
  onError,
  onChange,
}: useCardElementProps = {}) => {
  const CARD_ELEMENT_ID = 'card-element'
  const [tokenized, setTokenized] = useState(false)

  const onTokenize = async () => {
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

  const onSumbit = async () => {
    const order = await swell.cart.submitOrder()
  }

  useEffect(() => {
    swell.payment.createElements({
      card: {
        elementId: `#${CARD_ELEMENT_ID}`, // Default: #card-element
        options: {
          // Options are passed as a direct argument to stripe.js
          hidePostalCode: true,
        },
        onChange: onChange,
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
  }, [onChange])

  return { CARD_ELEMENT_ID, onSumbit, onTokenize, tokenized }
}
