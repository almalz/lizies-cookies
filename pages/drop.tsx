import { Flex, Box } from '@chakra-ui/react'
import { NextPage, GetServerSideProps } from 'next'
import { RBox, RFlex } from '../components/Breakpoints'
import Layout from '../components/Layout'
import client from '../lib/apolloClient'
import {
  DroppageRecord,
  DropPageDocument,
  DropPageQuery,
  PoppermessageRecord,
} from '../types/generated/graphql'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Products } from '../lib/store/products/api'
import { Drop } from '../lib/store/products/types'

const Cart = dynamic(() => import('../components/Cart'), { ssr: false })

const ThresholdModal = dynamic(() => import('../components/ThresholdModal'), {
  ssr: false,
})

export type DropPageProps = {
  drop: Drop
  pageBody: DroppageRecord
  popperMessage: PoppermessageRecord | null
}

const Home: NextPage<DropPageProps> = ({ drop, pageBody, popperMessage }) => {
  return (
    <Layout
      seo={pageBody.seo || undefined}
      noIndex={pageBody.noindex}
      slug=""
    ></Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const drop = await Products.getNextIncommingDrop()

  const { data } = await client.query<DropPageQuery>({
    query: DropPageDocument,
    fetchPolicy: 'no-cache',
  })

  if (!drop) {
    return {
      redirect: {
        permanent: false,
        destination: '/nodrop',
      },
    }
  }

  return {
    props: {
      drop: drop,
      pageBody: data?.droppage,
      popperMessage: data?.poppermessage,
    },
  }
}

export default Home
