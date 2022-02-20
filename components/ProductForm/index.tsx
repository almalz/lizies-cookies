import { useRef, useState, useCallback, useEffect } from 'react'
import { ProductModalRef } from '../ProductItem/ProductModal'
import Snipcart from '../../lib/snipcart'
import { Product } from '../../types'
import NumberInput from '../NumberInput'

export type ProductFormProps = {
  product: Product
}

const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
  let initialValue
  if (typeof window !== 'undefined') {
    initialValue = Snipcart.store.getItemById(product.id)?.quantity
  }
  const [value, setValue] = useState(initialValue || null)

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
  }, [STEP, product])

  const handleRemove = useCallback(async () => {
    await Snipcart.items.remove(product.id, STEP)
  }, [product])

  useEffect(() => {
    Snipcart.store.subscribe(async () => {
      const itemCount =
        (await Snipcart.store.getItemById(product.id)?.quantity) || 0
      setValue(itemCount)
      console.log(itemCount)
    })
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
