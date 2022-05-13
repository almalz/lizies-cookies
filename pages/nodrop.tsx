import { Box } from '@chakra-ui/react'
import { add, format, isBefore } from 'date-fns'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import MarkdownRenderer from '../components/MarkdownRenderer'
import client from '../lib/apolloClient'
import { useProducts } from '../lib/store'
import { Products } from '../lib/store/products/api'
import { Drop } from '../types'
import {
  NoDropPageQuery,
  NoDropPageDocument,
  NodroppageRecord,
} from '../types/generated/graphql'

export type NoDropPageProps = {
  nodroppage: NodroppageRecord
  drop: Drop
}

const NoDropPage: NextPage<NoDropPageProps> = ({ nodroppage }) => {
  const router = useRouter()
  const { currentDropId } = useProducts()

  useEffect(() => {
    if (currentDropId) {
      router.reload()
    }
  }, [router, currentDropId])

  return (
    <Layout
      seo={nodroppage?.seo || undefined}
      noIndex={nodroppage?.noindex}
      slug="nodrop"
    >
      <Box shadow={'inner'}>
        <Box
          py={['32px', '32px', '32px', '120px']}
          px={['32px', '64px', '120px', '240px']}
        >
          {nodroppage.body && <MarkdownRenderer data={nodroppage.body.value} />}
        </Box>
      </Box>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { nodroppage } = (
    await client.query<NoDropPageQuery>({
      query: NoDropPageDocument,
      fetchPolicy: 'no-cache',
    })
  ).data

  const drop = await Products.getNextIncommingDrop()

  if (drop) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  return {
    props: {
      nodroppage: nodroppage,
    },
  }
}

export default NoDropPage
