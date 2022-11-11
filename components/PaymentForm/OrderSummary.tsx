import { CartpageRecord, useCartPageQuery } from '../../types/generated/graphql'
import { CouponsManager } from '../CouponsManager'
import { useCart } from '../../lib/store'
import Image from 'next/image'
import { useEffect } from 'react'

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}

export const OrderSummary: React.FC = () => {
  const { data } = useCartPageQuery()
  const { cart, pullCart } = useCart()

  useEffect(() => {
    pullCart()
  }, [pullCart])

  const pageContent = data?.cartpage as CartpageRecord

  if (!pageContent || !cart || !cart.items) {
    return null
  }

  const items = cart?.items.sort((a, b) => {
    return a.productId > b.productId ? 1 : -1
  })

  return (
    <div className="flex flex-col gap-8 py-8 px-12 lg:px-[20%]">
      {items.map((item) => (
        <div key={item.id}>
          <div className="flex flex-1  gap-2 px-4">
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
            <div className="flex-1 text-purple-700">
              <h3 className="font-title text-xl ">{item.product.name}</h3>
            </div>
            <span className="sm:text-md font-body text-purple-700">
              {item.priceTotal && formatPrice(item.priceTotal!)}
            </span>
          </div>
        </div>
      ))}
      <CouponsManager pageContent={pageContent} />
      <div className="flex flex-col gap-2 font-body text-xl capitalize text-purple-700">
        <div className={`flex flex-row`}>
          <span className="flex-1">{pageContent.subtotalLabel} :</span>
          <span>{formatPrice(cart.subTotal)}</span>
        </div>
        <div className={`flex flex-row`}>
          <span className="flex-1">{pageContent.deliveryLabel} :</span>
          <span>{formatPrice(cart.shipmentPrice)}</span>
        </div>

        {cart.coupon && (
          <div className="flex flex-row">
            <span className="flex-1">{pageContent.discountLabel} :</span>
            <span>{formatPrice(-cart.discountTotal)}</span>
          </div>
        )}
        <div className="flex flex-row font-bold">
          <span className="flex-1">{pageContent.totalLabel} :</span>
          <span>{formatPrice(cart.grandTotal ?? cart.subTotal)}</span>
        </div>
      </div>
    </div>
  )
}
