import { Flex, Box } from '@chakra-ui/react'
import format from 'date-fns/format'
import { NextPage, GetServerSideProps } from 'next'
import { RBox, RFlex } from '../components/Breakpoints'
import DropSummary from '../components/DropSummary'
import Layout from '../components/Layout'
import Links from '../components/Links'
import ProductList from '../components/ProductList'
import client from '../lib/apolloClient'
import { Drop } from '../types'
import {
  DroppageRecord,
  NextIncomingDropsDocument,
  NextIncomingDropsQuery,
} from '../types/generated/graphql'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Cart = dynamic(() => import('../components/Cart'), { ssr: false })
const ThresholdModal = dynamic(() => import('../components/ThresholdModal'), {
  ssr: false,
})

const REFRESH_INTERVAL =
  Number(process.env.NEXT_PUBLIC_DROP_REFRESH_INTERVAL) || 30000

const TODAY = new Date(Date.now()).toISOString()

export type DropPageProps = {
  drop: Drop
  pageBody: DroppageRecord
}

const Home: NextPage<DropPageProps> = ({ drop, pageBody }) => {
  return (
    <Layout seo={pageBody.seo || undefined} noIndex={pageBody.noindex} slug="">
      Site en construction
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query<NextIncomingDropsQuery>({
    query: NextIncomingDropsDocument,
    variables: { TODAY: TODAY },
    fetchPolicy: 'no-cache',
  })

  // 1st drop of all drops where 'endDate' is gte TODAY ordered by endDate_ASC
  const nextIncomingDrop: Drop = (data.allDrops[0] as Drop) || null

  if (!nextIncomingDrop) {
    return {
      redirect: {
        permanent: false,
        destination: '/nodrop',
      },
    }
  }

  return {
    props: {
      drop: nextIncomingDrop,
      pageBody: data?.droppage,
    },
  }
}

export default Home
