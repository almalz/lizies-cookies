import Image from 'next/image'
import { SwellCartItem } from '../../lib/store/cart/types'
import ProductForm from '../ProductForm'
import { Paragraph } from '../Typography'
import { HiOutlineTrash } from 'react-icons/hi'
import { Button } from '../Button'
import { useCart } from '../../lib/store'

export type CartItemProps = {
  item: SwellCartItem
  isFirst?: boolean
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}

export const CartItem: React.FC<CartItemProps> = ({ item, isFirst }) => {
  const { updateItems } = useCart()

  return (
    <div
      className={`relative flex border-b border-purple-700 py-4 sm:px-2 sm:py-8 ${
        isFirst && 'border-t'
      }`}
    >
      <div className="relative m-1 aspect-square h-20 w-20 sm:m-0 ">
        {item?.product?.images ? (
          <Image
            src={item.product.images[0].file.url}
            alt={item.product.name}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="bg-gray-300" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 px-4">
        <div className="flex-1 text-purple-700">
          <h3 className="font-title text-2xl sm:text-4xl ">
            {item.product.name}
          </h3>
          <Paragraph className="" markdown>
            {item.product.description}
          </Paragraph>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:px-2 sm:pt-4">
          <div>
            <span className="font-body text-purple-700 sm:text-xl">
              {item.priceTotal && formatPrice(item.priceTotal!)}
            </span>
          </div>
          <div className="self-end">
            <ProductForm product={item.product} />
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 p-2 sm:p-4 lg:p-8">
        <Button
          className="px-0 py-0"
          noBorders
          onClick={() =>
            updateItems({
              productId: item.product?.id,
              quantity: 0,
            } as SwellCartItem)
          }
        >
          <HiOutlineTrash size="24" color="#F3A1A2"></HiOutlineTrash>
        </Button>
      </div>
    </div>
  )
}
