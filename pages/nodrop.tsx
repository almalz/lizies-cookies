import { Box } from '@chakra-ui/react'
import { format } from 'date-fns'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import MarkdownRenderer from '../components/MarkdownRenderer'
import client from '../lib/apolloClient'
import { Drop } from '../types'
import {
  NoDropPageQuery,
  NoDropPageDocument,
  NodroppageRecord,
  NextIncomingDropsDocument,
  NextIncomingDropsQuery,
} from '../types/generated/graphql'

export type NoDropPageProps = {
  nodroppage: NodroppageRecord
  drop: Drop
}

const NoDropPage: NextPage<NoDropPageProps> = ({ nodroppage, drop }) => {
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
  const TODAY = format(Date.now(), 'yyyy-MM-dd')

  const { nodroppage } = (
    await client.query<NoDropPageQuery>({
      query: NoDropPageDocument,
    })
  ).data

  const { data } = await client.query<NextIncomingDropsQuery>({
    query: NextIncomingDropsDocument,
    variables: { TODAY: TODAY },
  })

  // 1st drop of all drops where 'endDate' is gte TODAY ordered by endDate_ASC
  const nextIncomingDrop: Drop = (data.allDrops[0] as Drop) || null

  if (nextIncomingDrop) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  return {
    props: {
      drop: nextIncomingDrop,
      nodroppage: nodroppage,
    },
  }
}

export default NoDropPage
