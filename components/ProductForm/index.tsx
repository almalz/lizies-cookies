import { useState, useCallback, useEffect } from 'react'
import { useCart } from '../../lib/store'
import { SwellProduct } from '../../lib/store/products/types'
import NumberInput from '../NumberInput'

export type ProductFormProps = {
  product: SwellProduct
}

const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
  const { getProductCartQuantity, updateItems } = useCart()

  const handleAdd = useCallback(async () => {
    updateItems({
      productId: product.id,
      quantity: getProductCartQuantity(product.id) + 1,
    })
  }, [getProductCartQuantity, product.id, updateItems])

  const handleRemove = useCallback(async () => {
    updateItems({
      productId: product.id,
      quantity: getProductCartQuantity(product.id) - 1,
    })
  }, [getProductCartQuantity, product.id, updateItems])

  return (
    <NumberInput
      value={getProductCartQuantity(product.id)}
      label={`${product.name}`}
      onAdd={handleAdd}
      onRemove={handleRemove}
    />
  )
}

export default ProductForm
