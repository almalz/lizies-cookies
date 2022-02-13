import ProductItem from './ProductItem'
import { Product } from '../../types'
import { VStack } from '@chakra-ui/react'

export type ProductListProps = {
  products: Product[]
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <VStack spacing={6}>
      {products.map((product: Product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </VStack>
  )
}

export default ProductList
