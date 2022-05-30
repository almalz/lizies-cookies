// import ProductItem from '../ProductItem'
import { VStack } from '@chakra-ui/react'
import { SwellProduct } from '../../lib/store/products/types'

export type ProductListProps = {
  products: SwellProduct[]
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <VStack spacing={6}>
      {/* {products.map((product: SwellProduct) => (
        <ProductItem key={product.id} product={product} />
      ))} */}
    </VStack>
  )
}

export default ProductList
