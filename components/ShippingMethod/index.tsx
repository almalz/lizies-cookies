import { useRadioGroup } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Cart } from '../../lib/store/cart/api'
import {
  SwellShippingService,
  SwellShippingServices,
} from '../../lib/store/cart/types'
import { RadioCard } from './RadioCard'

const ShippingMethod: React.FC<{
  onComplete: (value: string) => void
}> = ({ onComplete }) => {
  const [shippingMethods, setshippingMethods] = useState<
    SwellShippingService[] | undefined
  >()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getOptions = async () => {
      setLoading(true)
      const res = (await Cart.getShippingMethods()) as SwellShippingServices
      setshippingMethods(res.services)
      setLoading(false)
    }
    getOptions()
  }, [])

  const handleSelect = async (value: string) => {
    const shippingMethodsId = shippingMethods?.find((s) => s.name === value)?.id
    if (shippingMethodsId) {
      await Cart.applyShipping(shippingMethodsId)
      onComplete(value)
    }
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'shippingMethods',
    onChange: handleSelect,
  })

  const group = getRootProps()

  if (loading) {
    return null
  }

  return (
    <div className="grid grid-cols-2 gap-2" {...group}>
      {shippingMethods &&
        shippingMethods.map(({ name, description }) => {
          const radio = getRadioProps({ value: name })
          return (
            <RadioCard key={name} {...radio}>
              <span className="mb-4 font-body font-bold">{name}</span>
              <p className="font-body text-sm">{description}</p>
            </RadioCard>
          )
        })}
    </div>
  )
}

export default ShippingMethod
