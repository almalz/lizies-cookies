import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
// @ts-ignore
import swellNode from 'swell-node'
import Layout from '../components/Layout'
import { SwellOrder } from '../lib/store/cart/types'
import { H1, H3, Paragraph } from '../components/Typography'
import Image from 'next/image'
import client from '../lib/apolloClient'
import {
  ConfirmOrderPageDocument,
  ConfirmOrderPageQuery,
  ConfirmorderpageRecord,
} from '../types/generated/graphql'
import { add, isBefore } from 'date-fns'
import { useEffect } from 'react'
import { useCart } from '../lib/store'
import { formatPrice, injectVariables } from '../lib/utils'

const fetchWholeOrder = async (id: string) => {
  try {
    const res: any = await swellNode.get('/orders/{id}', {
      id: id,
      expand: ['items.product', 'account'],
    })
    if (res.items) {
      res.items = res.items.map((item: any) => {
        return {
          ...item,
          image_url:
            item.product.images[0].file.url + '?height=1500&width=1500',
          name: item.product.name,
        }
      })
      return res
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

type ConfirmOrderPageProps = {
  order: SwellOrder
  pageContent: ConfirmorderpageRecord
}

const ConfirmOrderPage: NextPage<ConfirmOrderPageProps> = ({
  order,
  pageContent,
}) => {
  const isPickup = order.shipping?.pickup || false
  const { clearCart } = useCart()

  let headline, body

  useEffect(() => {
    clearCart()
  }, [clearCart])

  if (isPickup) {
    headline = pageContent.headlinePickup
    body = pageContent.bodyPickup
  } else {
    headline = pageContent.headlineDelivery
    body = pageContent.bodyDelivery
  }

  console.log({ order })

  return (
    <Layout seo={undefined} noIndex={true} slug="">
      <div className="flex flex-col gap-8 px-8 py-12 text-purple-700 sm:gap-12 sm:px-[20%] lg:py-20">
        <div>
          <H1>{injectVariables(pageContent.title!, order)}</H1>
          <h2 className="mt-4 font-body text-2xl font-bold">
            {injectVariables(headline!, { ...order, ...order.content })}
          </h2>
        </div>
        <Paragraph markdown>{injectVariables(body!, order)}</Paragraph>
        <div className="flex flex-col gap-4 rounded-md border-2 border-pink-500 bg-pink-100 p-4 sm:p-8">
          <H3>Résumé de la commande</H3>
          <div>
            <Paragraph>
              {'Numéro de commande: '}{' '}
              <span className="font-bold">{order.number}</span>
            </Paragraph>
            <Paragraph>
              {'Méthode de livraison: '}
              <span className="font-bold">{order.shipping.service_name}</span>
            </Paragraph>
            <p className="mt-4 font-body text-lg">
              {'Montant total: '}
              <span className="font-bold">
                {formatPrice(order.grand_total)}
              </span>
            </p>
          </div>
          <div className="mt-4 flex flex-col divide-y ">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-1 gap-2 px-2 py-4 sm:px-4"
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
                <div className="flex-1 text-purple-700">
                  <h3 className="font-title text-lg sm:text-xl">
                    {item.product.name}
                  </h3>
                  <Paragraph>quantité: {item.quantity}</Paragraph>
                </div>
                <span className="sm:text-md font-body text-purple-700">
                  {item.price_total && formatPrice(item.price_total!)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { orderId },
}: GetServerSidePropsContext) => {
  swellNode.init(
    process.env.NEXT_PUBLIC_SWELL_STORE_ID,
    process.env.SWELL_SECRET_KEY
  )

  if (!orderId) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  }

  const order = (await fetchWholeOrder(orderId as string)) as SwellOrder

  if (!order) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  }

  const orderCreationData = new Date(order.date_created)

  const after1h = add(orderCreationData, { hours: 9999999 })

  // if "now" is not before the order creation date + 1h, the page does not existis

  if (!isBefore(new Date(), after1h)) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  }

  const { data } = await client.query<ConfirmOrderPageQuery>({
    query: ConfirmOrderPageDocument,
  })

  return {
    props: { order, pageContent: data?.confirmorderpage },
  }
}

export default ConfirmOrderPage
