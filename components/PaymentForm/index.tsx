import { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { useState, useEffect, FormEventHandler, useCallback } from 'react'
import { Button } from '@chakra-ui/react'
import { useCart } from '../../lib/store'
import { OrderSummary } from './OrderSummary'
import clsx from 'clsx'
import { useCardElement } from '../../lib/store/checkout/useCardElement'
import { useRouter } from 'next/router'
import { Cart } from '../../lib/store/cart/api'

const PaymentForm: React.FC<{
  onComplete: (value: string) => void
}> = ({ onComplete }) => {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const router = useRouter()
  const handleChange = useCallback(
    async (event: StripeCardElementChangeEvent) => {
      // Listen for changes in the CardElement
      // and display any errors as the customer types their card details
      setDisabled(event.empty)
      console.log(event.error)
      setError(event.error ? event.error.message : '')
    },
    []
  )

  const { CARD_ELEMENT_ID, onTokenize } = useCardElement({
    onChange: handleChange,
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setProcessing(true)
    onTokenize()

    try {
      // const order: SwellOrder = await handleConfirmOrderPayement({
      //   paymentIntentId: payload?.paymentIntent.id,
      //   paymentMethodId: payload.paymentIntent.payment_method as string,
      //   onSuccess: async (order) => {
      //     if (deliveryDate) {
      //       await addOrderContent(
      //         { delivery_date: formatDate(deliveryDate) },
      //         order.id
      //       )
      //     }
      //   },
      // })
      const order = await Cart.submitOrder()

      if (order) {
        setProcessing(false)
        setSucceeded(true)
        router.push({
          pathname: '/confirmOrder',
          query: { orderId: order.number },
        })
        setError(undefined)
      } else {
        throw new Error()
      }
    } catch (error) {
      setError(`Le paiement a échoué : ${error}`)
      setProcessing(false)
    }
  }

  return (
    <>
      <OrderSummary />
      <form
        id="payment-form"
        className="my-4 rounded-md border-2 border-pink-500 bg-pink-100 p-4 text-white"
        onSubmit={handleSubmit}
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
      </form>
    </>
  )
}

export default PaymentForm
