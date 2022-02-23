import { Box } from '@chakra-ui/react'
import { GetStaticProps, NextPage } from 'next'
import BackButton from '../components/BackButton'
import Layout from '../components/Layout'
import MarkdownRenderer from '../components/MarkdownRenderer'
import client from '../lib/apolloClient'
import {
  NoDropPageQuery,
  NoDropPageDocument,
  NodroppageRecord,
} from '../types/generated/graphql'

export type NoDropPageProps = {
  nodroppage: NodroppageRecord
}

const NoDropPage: NextPage<NoDropPageProps> = ({ nodroppage }) => {
  return (
    <Layout
      title={'Aucun drop en cours'}
      description={"Lizie's Cookies - aucun drop en cours"}
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

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query<NoDropPageQuery>({
    query: NoDropPageDocument,
  })

  return {
    props: {
      nodroppage: data.nodroppage,
    },
  }
}

export default NoDropPage
