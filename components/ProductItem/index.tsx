import Image from 'next/image'
import { SwellProduct } from '../../lib/store/products/types'
import ProductForm from '../ProductForm'
import { Paragraph } from '../Typography'

export type ProductItemProps = {
  product: SwellProduct
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}

const DESCRIPTION_MAX_LENGTH = 60

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className="border-1 flex items-center border border-purple-700 sm:h-[35rem] sm:flex-col sm:p-2">
      <div className="relative m-1 aspect-square h-40 w-40 sm:m-0 sm:h-96 sm:w-full">
        <Image
          src={product.images![0].file.url}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col py-2 px-4 sm:py-4">
        <div className="flex-1 text-purple-700 sm:p-2">
          <h3 className="font-title text-2xl sm:text-4xl ">{product.name}</h3>
          <div className="flex-1">
            <Paragraph className="block leading-4 sm:hidden" markdown>
              {product.content?.truncatedDescription ||
                product.description.slice(0, DESCRIPTION_MAX_LENGTH)}
            </Paragraph>
            <Paragraph className="hidden sm:block" markdown>
              {product.description}
            </Paragraph>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-1 pt-2 sm:flex-row sm:items-center sm:px-2 sm:pt-4">
          <div>
            <span className="font-body text-xl text-purple-700 sm:text-3xl">
              {formatPrice(product.price)}
            </span>
          </div>
          <div className="self-center">
            <ProductForm product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}
