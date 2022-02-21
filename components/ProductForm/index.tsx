import { useRef, useState, useCallback, useEffect } from 'react'
import { ProductModalRef } from '../ProductItem/ProductModal'
import Snipcart from '../../lib/snipcart'
import { Product } from '../../types'
import NumberInput from '../NumberInput'

export type ProductFormProps = {
  product: Product
  zeroWhenNull?: boolean
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  zeroWhenNull = false,
}) => {
  let initialValue
  if (typeof window !== 'undefined') {
    initialValue = Snipcart.store.getItemById(product.id)?.quantity
  }
  const [value, setValue] = useState<number | null>(
    initialValue ?? zeroWhenNull ? 0 : null
  )

  const STEP = Number(process.env.NEXT_PUBLIC_INPUT_STEP) || 1
  const MAX = Number(process.env.NEXT_PUBLIC_MAX_QTY) || 24

  const handleAdd = useCallback(async () => {
    await Snipcart.items.add({
      id: product.id,
      name: product.name,
      price: product.unitPrice,
      quantity: STEP,
      quantityStep: STEP,
      maxQuantity: MAX,
      url: window.location.origin,
    })
  }, [MAX, STEP, product.id, product.name, product.unitPrice])

  const handleRemove = useCallback(async () => {
    await Snipcart.items.remove(product.id, STEP)
  }, [STEP, product.id])

  useEffect(() => {
    let unsubscribe: () => void
    if (typeof window !== 'undefined') {
      unsubscribe = Snipcart.store.subscribe(async () => {
        const itemCount =
          (await Snipcart.store.getItemById(product.id)?.quantity) || 0
        setValue(itemCount)
      })
    }
    return () => {
      unsubscribe()
    }
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
