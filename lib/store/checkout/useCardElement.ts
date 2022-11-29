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
        onSuccess: (result: any) => {
          onSuccess && onSuccess(result)
        },
        onError: (err: any) => {
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
        onError: (err: any) => {
          console.error(err)
        },
      },
    })
  }, [onChange])

  return { CARD_ELEMENT_ID, onTokenize }
}
