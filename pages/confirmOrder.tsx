import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import swell from '../lib/store/swell'
// @ts-ignore
import swellNode from 'swell-node'
import Layout from '../components/Layout'
import { SwellOrder } from '../lib/store/cart/types'
import { H1, H2, H3, ParagraphXl } from '../components/Typography'
import client from '../lib/apolloClient'
import {
  ConfirmOrderPageDocument,
  ConfirmOrderPageQuery,
  ConfirmorderpageRecord,
} from '../types/generated/graphql'
import { add, isAfter, isBefore } from 'date-fns'

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
      <div className="flex flex-col gap-8 px-[20%] py-8 lg:py-20">
        <H1>{pageContent.title}</H1>
        <H3>{headline}</H3>
        <ParagraphXl markdown>{body}</ParagraphXl>
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

  const after1h = add(orderCreationData, { hours: 24 })

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
