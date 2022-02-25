import { useState, useCallback, useEffect } from 'react'
import Snipcart from '../../lib/snipcart'
import { Product } from '../../types'
import NumberInput from '../NumberInput'

export type ProductFormProps = {
  product: Product
  zeroWhenNull?: boolean
}

const STEP = Number(process.env.NEXT_PUBLIC_INPUT_STEP) || 1
const MAX = Number(process.env.NEXT_PUBLIC_MAX_QTY) || 24
const DOMAIN_NAME = process.env.NEXT_PUBLIC_DOMAIN_NAME

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  zeroWhenNull = false,
}) => {
  const defaultValue = zeroWhenNull ? 0 : null
  const [value, setValue] = useState<number | null>(defaultValue)

  // value loading on mount
  useEffect(() => {
    const syncItemcount = async () => {
      if (typeof window !== 'undefined') {
        const initialValue = await Snipcart?.store?.getItemById(product.id)
          ?.quantity
        setValue(initialValue || defaultValue)
      }
    }
    syncItemcount()
  }, [product, defaultValue])

  //value subscription when cart changes
  useEffect(() => {
    let unsubscribe: () => void
    unsubscribe = Snipcart?.store?.subscribe(async () => {
      const itemCount =
        (await Snipcart?.store?.getItemById(product.id)?.quantity) || 0
      setValue(itemCount)
    })
    return () => {
      unsubscribe && unsubscribe()
    }
  }, [product])

  const handleAdd = useCallback(async () => {
    await Snipcart?.items?.add({
      id: product.id,
      name: product.name,
      price: product.unitPrice,
      quantity: STEP,
      quantityStep: STEP,
      maxQuantity: MAX,
      url: `${DOMAIN_NAME}/api/snipcartProducts`,
    })
  }, [product])

  const handleRemove = useCallback(async () => {
    await Snipcart?.items?.remove(product.id, STEP)
  }, [product])

  return (
    <NumberInput
      value={value}
      label={`${product.name}`}
      onAdd={handleAdd}
      onRemove={handleRemove}
    />
  )
}

export default ProductForm
