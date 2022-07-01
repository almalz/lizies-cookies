import Image from 'next/image'
import { useCallback, useRef } from 'react'
import { SwellProduct } from '../../lib/store/products/types'
import { formatPrice } from '../../lib/utils'
import ProductForm from '../ProductForm'
import { Paragraph } from '../Typography'
import { ProductModal, ProductModalRef } from './ProductModal'

export type ProductItemProps = {
  product: SwellProduct
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const modalRef = useRef<ProductModalRef>(null)

  const openProductModal = useCallback(() => {
    modalRef.current?.onOpenModal()
  }, [])

  return (
    <div className="border-1 group flex items-center border border-purple-700 sm:h-[40rem] sm:flex-col sm:p-2">
      <button
        className="relative m-1 aspect-square w-full group-hover:opacity-50 sm:m-0 sm:h-2/3 sm:w-full"
        onClick={() => openProductModal()}
        type="button"
      >
        <Image
          src={product.images![0].file.url}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          priority
        />
      </button>
      <div className="flex h-full w-full flex-col justify-between py-2 px-4 sm:h-1/3 sm:py-4 lg:px-[3%]">
        <button
          className="text-left text-purple-700 group-hover:opacity-30 sm:p-2"
          onClick={() => openProductModal()}
          type="button"
        >
          <h3 className="font-title text-2xl sm:text-4xl ">{product.name}</h3>
          <div className="flex-1">
            <Paragraph className="hidden sm:block" markdown>
              {product.description}
            </Paragraph>
          </div>
        </button>
        <div className="flex flex-1 flex-col items-start justify-between gap-1 pt-2 sm:flex-none sm:flex-row sm:items-center sm:px-2 sm:pt-4">
          <div>
            <span className="font-body text-xl text-purple-700 sm:text-3xl">
              {formatPrice(product.price)}
            </span>
          </div>
          <div className="flex w-full justify-end">
            <ProductForm product={product} />
          </div>
        </div>
      </div>
      <ProductModal product={product} ref={modalRef} />
    </div>
  )
}
