import { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { useState, useEffect, FormEventHandler, useCallback } from 'react'
import { Button } from '@chakra-ui/react'
import { useCart } from '../../lib/store'
import { OrderSummary } from './OrderSummary'
import clsx from 'clsx'
import { useCardElement } from '../../lib/store/checkout/useCardElement'

const PaymentForm: React.FC<{
  onComplete: (value: string) => void
}> = ({ onComplete }) => {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(true)

  // const cardStyle = {
  //   style: {
  //     base: {
  //       color: '#32325d',
  //       fontFamily: 'Arial, sans-serif',
  //       fontSmoothing: 'antialiased',
  //       fontSize: '16px',
  //       '::placeholder': {
  //         color: '#32325d',
  //       },
  //     },
  //     invalid: {
  //       fontFamily: 'Arial, sans-serif',
  //       color: '#fa755a',
  //       iconColor: '#fa755a',
  //     },
  //   },
  // }

  const handleChange = useCallback(
    async (event: StripeCardElementChangeEvent) => {
      // Listen for changes in the CardElement
      // and display any errors as the customer types their card details
      console.log({ event })
      setDisabled(event.empty)
      console.log(event.error)
      setError(event.error ? event.error.message : '')
    },
    []
  )

  const { CARD_ELEMENT_ID, onSumbit, onTokenize, tokenized } = useCardElement({
    onChange: handleChange,
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      console.log('submiting')
      e.preventDefault()
      setProcessing(true)

      await onTokenize()
      await onSumbit()

      setProcessing(false)
    },
    [onSumbit, onTokenize]
  )

  return (
    <>
      <OrderSummary />
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="my-4 rounded-md border-2 border-pink-500 bg-pink-100 p-4 text-white"
      >
        <div className="container">
          <div id={CARD_ELEMENT_ID} />
        </div>
        <div className="flex justify-center pt-8">
          <Button
            type="submit"
            disabled={disabled || succeeded}
            isLoading={processing}
            id="submit"
            color="white"
            bg="purple.700"
            _hover={{ background: '#805AD5' }}
            mb="16px"
          >
            Procéder au paiement
          </Button>
        </div>
        {error && (
          <div className={clsx('card-error', 'text-[#fa655a]')} role="alert">
            {error}
          </div>
        )}
        <p className={succeeded ? 'result-message' : 'result-message hidden'}>
          Payment succeeded, see the result in your
          <a href={`https://dashboard.stripe.com/test/payments`}>
            Stripe dashboard.
          </a>
          Refresh the page to pay again.
        </p>
      </form>
    </>
  )
}

export default PaymentForm
