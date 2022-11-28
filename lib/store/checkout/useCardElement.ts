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

  const onTokenize = async () => {
    await swell.payment.tokenize({
      card: {
        onSuccess: (result) => {
          onSuccess && onSuccess(result)
        },
        onError: (err) => {
          onError && onError(err)
        },
      },
    })
  }

  useEffect(() => {
    swell.payment.createElements({
      config: {
        locale: 'fr',
      },
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
        },

        onError: (err) => {
          console.error(err)
        },
      },
    })
  }, [onChange])

  return { CARD_ELEMENT_ID, onTokenize }
}
