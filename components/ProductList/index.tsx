import { ProductItem } from '../ProductItem'
import { SwellProduct } from '../../lib/store/products/types'

export type ProductListProps = {
  products: SwellProduct[]
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid gap-8 px-4 sm:grid-cols-1 sm:py-8 sm:px-16 md:grid-cols-2 xl:grid-cols-4">
      {products.map((product: SwellProduct) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList
