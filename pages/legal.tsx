import { Box } from '@chakra-ui/react'
import { GetStaticProps, NextPage } from 'next'
import BackButton from '../components/BackButton'
import Layout from '../components/Layout'
import MarkdownRenderer from '../components/MarkdownRenderer'
import client from '../lib/apolloClient'
import {
  LegalPageQuery,
  LegalPageDocument,
  LegalpageRecord,
} from '../types/generated/graphql'

export type LegalPageProps = {
  legalpage: LegalpageRecord
}

const LegalPage: NextPage<LegalPageProps> = ({ legalpage }) => {
  return (
    <Layout
      title={'Mentions légales'}
      description={"Lizie's Cookies - Mentions légales"}
    >
      <Box shadow={'inner'}>
        <BackButton />
        <Box
          py={['32px', '32px', '32px', '120px']}
          px={['32px', '64px', '120px', '240px']}
        >
          {legalpage.body && <MarkdownRenderer data={legalpage.body.value} />}
        </Box>
      </Box>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query<LegalPageQuery>({
    query: LegalPageDocument,
  })

  return {
    props: {
      legalpage: data.legalpage,
    },
  }
}

export default LegalPage
