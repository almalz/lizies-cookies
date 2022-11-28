import { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { useState, useEffect, FormEventHandler, useCallback } from 'react'
import { Button } from '@chakra-ui/react'
import { useCart } from '../../lib/store'
import { OrderSummary } from './OrderSummary'
import clsx from 'clsx'
import { useCardElement } from '../../lib/store/checkout/useCardElement'
import { useRouter } from 'next/router'
import { Cart } from '../../lib/store/cart/api'
import { useCheckout } from '../../lib/store/checkout/provider'
import { sendOrderConfirmationEmail } from '../../lib/mailer'

const PaymentForm: React.FC<{
  onComplete: (value: string) => void
}> = ({ onComplete }) => {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const router = useRouter()
  const { deliveryDate } = useCheckout()
  const { addOrderContent } = useCart()

  const handleChange = useCallback(
    async (event: StripeCardElementChangeEvent) => {
      setDisabled(event.empty)
      console.log(event.error)
      setError(event.error ? event.error.message : undefined)
    },
    []
  )

  const handleError = useCallback(async (error) => {
    console.log({ error })
    setError(`Le paiement a échoué : votre carte a été refusée`)
    setProcessing(false)
  }, [])

  const handleSucess = useCallback(
    async (result) => {
      try {
        const order = await Cart.submitOrder()
        if (order && deliveryDate) {
          await addOrderContent({ delivery_date: deliveryDate }, order.id)
          setProcessing(false)
          await sendOrderConfirmationEmail(order.id, deliveryDate)
          setSucceeded(true)
          router.push({
            pathname: '/confirmOrder',
            query: { orderId: order.number },
          })
        }
      } catch (error) {
        handleError(error)
      }
    },
    [addOrderContent, deliveryDate, router, handleError]
  )

  const { CARD_ELEMENT_ID, onTokenize } = useCardElement({
    onChange: handleChange,
    onSuccess: handleSucess,
    onError: handleError,
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setProcessing(true)
    try {
      await onTokenize()
    } catch (error) {
      handleError(error)
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
