import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import swell from '../lib/store/swell'
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
import { formatPrice } from '../lib/utils'
import { useEffect } from 'react'

type ShippingCategory = 'pickup' | 'delivery'

type ConfirmOrderPageProps = {
  order: SwellOrder
  pageContent: ConfirmorderpageRecord
}

const ConfirmOrderPage: NextPage<ConfirmOrderPageProps> = ({
  order,
  pageContent,
}) => {
  const shippingService: ShippingCategory = 'pickup'

  let headline, body

  if (shippingService === 'delivery') {
    headline = pageContent.headlineDelivery
    body = pageContent.bodyDelivery
  } else {
    headline = pageContent.headlinePickup
    body = pageContent.bodyDelivery
  }

  return (
    <Layout seo={undefined} noIndex={true} slug="">
      <div className="flex flex-col gap-8 px-[20%] py-12 text-purple-700 lg:py-20">
        <H1>{pageContent.title}</H1>
        <h2 className="font-body text-2xl font-bold">{headline}</h2>
        <Paragraph markdown>{body}</Paragraph>
        <div className="flex flex-col gap-4 rounded-md border-2 border-pink-500 bg-pink-100 p-8">
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
            <Paragraph>
              {'Montant total: '}
              <span className="font-bold">{order.grand_total + '€'}</span>
            </Paragraph>
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
    process.env.SWELL_SECRET_KEY,
    { useCamelCase: true }
  )

  if (!orderId) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  }

  const order = (await swellNode.get('/orders/{id}', {
    id: orderId,
  })) as SwellOrder

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
