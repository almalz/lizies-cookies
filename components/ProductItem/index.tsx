import Image from 'next/image'
import { useCallback, useRef } from 'react'
import { SwellProduct } from '../../lib/store/products/types'
import ProductForm from '../ProductForm'
import { Paragraph } from '../Typography'
import { ProductModal, ProductModalRef } from './ProductModal'

export type ProductItemProps = {
  product: SwellProduct
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const modalRef = useRef<ProductModalRef>(null)

  const openProductModal = useCallback(() => {
    modalRef.current?.onOpenModal()
  }, [])

  return (
    <div className="border-1 flex items-center border border-purple-700 sm:h-[35rem] sm:flex-col sm:p-2">
      <button
        className="relative m-1 aspect-square h-2/3 w-40 sm:m-0 sm:h-96 sm:w-full"
        onClick={() => openProductModal()}
        type="button"
      >
        <Image
          src={product.images![0].file.url}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      </button>
      <div className="flex w-full flex-1 flex-col py-2 px-4 sm:py-4">
        <div
          className="flex-1 text-purple-700 hover:opacity-30 sm:p-2"
          onClick={() => openProductModal()}
        >
          <h3 className="font-title text-2xl sm:text-4xl ">{product.name}</h3>
          <div className="flex-1">
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
      <ProductModal product={product} ref={modalRef} />
    </div>
  )
}
