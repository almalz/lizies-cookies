import { useState, useCallback, useEffect } from 'react'
import { SwellProduct } from '../../lib/store/products/types'
import NumberInput from '../NumberInput'

export type ProductFormProps = {
  product: SwellProduct
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
  const { Snipcart, loading, setLoading }: any = {}

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
  }, [product, defaultValue, Snipcart?.store])

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
  }, [Snipcart?.store, product])

  const handleAdd = useCallback(async () => {
    setLoading(true)
    await Snipcart?.items?.add({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: STEP,
      quantityStep: STEP,
      maxQuantity: MAX,
      url: `${DOMAIN_NAME}/api/snipcartProducts`,
    })
    setLoading(false)
  }, [Snipcart?.items, product.id, product.name, product.price, setLoading])

  const handleRemove = useCallback(async () => {
    setLoading(true)
    await Snipcart?.items?.remove(product.id, STEP)
    setLoading(false)
  }, [Snipcart?.items, product.id, setLoading])

  return (
    <NumberInput
      value={value}
      label={`${product.name}`}
      onAdd={handleAdd}
      onRemove={handleRemove}
      disabled={loading}
    />
  )
}

export default ProductForm
