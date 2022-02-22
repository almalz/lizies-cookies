import { useRef, useState, useCallback, useEffect } from 'react'
import { ProductModalRef } from '../ProductItem/ProductModal'
import SnipcartClient from '../../lib/snipcart'
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
    // initialValue = SnipcartClient.store.getItemById(product.id)?.quantity
  }
  const [value, setValue] = useState<number | null>(
    initialValue ?? zeroWhenNull ? 0 : null
  )

  const STEP = Number(process.env.NEXT_PUBLIC_INPUT_STEP) || 1
  const MAX = Number(process.env.NEXT_PUBLIC_MAX_QTY) || 24

  const handleAdd = useCallback(async () => {
    await SnipcartClient.items.add({
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
    await SnipcartClient.items.remove(product.id, STEP)
  }, [STEP, product.id])

  useEffect(() => {
    let unsubscribe: () => void
    if (typeof window !== 'undefined') {
      document.addEventListener('snipcart.ready', () => {
        unsubscribe = SnipcartClient.store.subscribe(async () => {
          const itemCount =
            (await SnipcartClient?.store?.getItemById(product.id)?.quantity) ||
            0
          setValue(itemCount)
        })
      })
    }
    return () => {
      unsubscribe()
    }
  }, [product])

  // useEffect(() => {
  //   let unsubscribe: () => void

  //   unsubscribe = Snipcart.store.subscribe(async () => {
  //     const itemCount =
  //       (
  //         await Snipcart?.store
  //           .getState()
  //           .cart.items.items.find((item: any) => item.id == product.id)
  //       )?.quantity || 0
  //     setValue(itemCount)
  //   })

  //   return () => {
  //     unsubscribe()
  //   }
  // }, [product])

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
