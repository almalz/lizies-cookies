import { useRef, useState, useCallback, useEffect } from 'react'
import { ProductModalRef } from '../ProductItem/ProductModal'
import Snipcart from '../../lib/snipcart'
import { Product } from '../../types'
import NumberInput from '../NumberInput'

export type ProductFormProps = {
  product: Product
  zeroWhenNull?: boolean
}

const STEP = Number(process.env.NEXT_PUBLIC_INPUT_STEP) || 1
const MAX = Number(process.env.NEXT_PUBLIC_MAX_QTY) || 24

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  zeroWhenNull = false,
}) => {
  const [value, setValue] = useState<number | null>(zeroWhenNull ? 0 : null)

  // value loading on mount
  useEffect(() => {
    const syncItemcount = async () => {
      const initialValue = await Snipcart?.store?.getItemById(product.id)
        ?.quantity
      setValue(initialValue)
    }
    syncItemcount()
  }, [product])

  //value subscription when cart changes
  useEffect(() => {
    let unsubscribe: () => void
    if (typeof window !== 'undefined') {
      unsubscribe = Snipcart?.store?.subscribe(async () => {
        if (typeof window !== 'undefined') {
          const itemCount =
            (await Snipcart?.store?.getItemById(product.id)?.quantity) || 0
          setValue(itemCount)
        }
      })
    }

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
      url: window.location.origin,
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
