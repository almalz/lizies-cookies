import { useForm } from 'react-hook-form'
import { Input } from './Input'
import { AddressAutofill } from '@mapbox/search-js-react'
import { Button } from '@chakra-ui/react'
import {
  checkoutFormToSwellAccount,
  stringifyAccount,
} from '../../lib/checkout/utils'
import { useCallback, useEffect, useState } from 'react'
import { Cart } from '../../lib/store/cart/api'
import { SwellAccount } from '../../lib/store/account/types'

export type CheckoutFormValues = {
  firstName: string
  lastName: string
  email: string
  address1: string
  phone: string
  address2: string
  city: string
  zip: string
  state: string
}

const CheckoutForm: React.FC<{ onComplete: (value: string) => void }> = ({
  onComplete,
}) => {
  const [loading, setLoading] = useState(false)

  const getInitialValues = useCallback(() => {
    let data = sessionStorage.getItem('checkoutForm')
    if (data) {
      try {
        data = JSON.parse(data)
      } catch (err) {
        console.error(err)
      }
      return data as CheckoutFormValues | null
    }
    return
  }, [])

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    defaultValues: getInitialValues() || undefined,
  })

  const onSubmit = async (values: CheckoutFormValues) => {
    setLoading(true)
    const res = await fetch('/api/account', {
      method: 'POST',
      body: JSON.stringify({ account: checkoutFormToSwellAccount(values) }),
    })
    const account: SwellAccount = await res.json()
    try {
      await Cart.updateCartAccount(account)
    } catch (error) {
      console.error(error)
    }
    onComplete(stringifyAccount(account))
    setLoading(false)
  }

  const formValues = getValues()

  useEffect(() => {
    sessionStorage.setItem('checkoutForm', JSON.stringify(formValues))
  }, [formValues])

  return (
    <form
      className="flex flex-col gap-4 md:gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4 md:flex-row">
        <Input
          type="text"
          label="Prénom"
          placeholder="Prénom"
          isInvalid={!!errors.firstName}
          {...register('firstName', { required: true, maxLength: 80 })}
        />
        <Input
          type="text"
          label="Nom"
          placeholder="Nom"
          isInvalid={!!errors.lastName}
          {...register('lastName', { required: true, maxLength: 100 })}
        />
      </div>
      <Input
        type="email"
        label="Email"
        placeholder="contact@naughtycookies.fr"
        isInvalid={!!errors.email}
        {...register('email', { required: true })}
      />
      <Input
        type="tel"
        label="Téléphone"
        placeholder="0612345678"
        isInvalid={!!errors.phone}
        {...register('phone', {
          required: true,
          minLength: 6,
          pattern: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
        })}
      />
      <AddressAutofill
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN!}
        options={{ country: 'FR', language: 'fr' }}
      >
        <Input
          type="text"
          label="Adresse"
          placeholder="12 rue St-Catherine"
          autoComplete="address-line1"
          isInvalid={!!errors.address1}
          {...register('address1', { required: true })}
        />
      </AddressAutofill>
      <Input
        type="text"
        label="Apt, étage, batiment, ..."
        placeholder="Complément d'adresse"
        autoComplete="address-line2"
        isInvalid={!!errors.address2}
        {...register('address2')}
      />
      <div className="flex flex-col gap-4 md:flex-row">
        <Input
          type="text"
          label="Ville"
          placeholder="Bordeaux"
          autoComplete="address-level2"
          isInvalid={!!errors.city}
          {...register('city', { required: true })}
        />

        <Input
          type="text"
          label="Code postal"
          placeholder="33000"
          autoComplete="postal-code"
          isInvalid={!!errors.zip}
          {...register('zip', { required: true })}
        />
        <Input
          type="text"
          label="Région"
          placeholder="Nouvelle-Aquitaine"
          autoComplete="address-level1"
          isInvalid={!!errors.state}
          {...register('state', { required: true })}
        />
      </div>
      <Button
        className="mt-4"
        bgColor="#2E1550"
        color="#fff"
        type="submit"
        isLoading={loading}
        isDisabled={loading}
        _disabled={{ background: '#2E1550', opacity: 0.7 }}
        _hover={{ background: '#2E1550', opacity: 0.5 }}
        disabled={Object.keys(errors).length > 0}
      >
        Continuer
      </Button>
    </form>
  )
}

export default CheckoutForm
