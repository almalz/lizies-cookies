import { Box } from '@chakra-ui/react'
import { GetStaticProps, NextPage } from 'next'
import BackButton from '../components/BackButton'
import Layout from '../components/Layout'
import MarkdownRenderer from '../components/MarkdownRenderer'
import client from '../lib/apolloClient'
import {
  TermsPageQuery,
  TermsPageDocument,
  TermspageRecord,
} from '../types/generated/graphql'

export type TermsPageProps = {
  termspage: TermspageRecord
}

const TermsPage: NextPage<TermsPageProps> = ({ termspage }) => {
  return (
    <Layout seo={termspage?.seo || undefined} noIndex={termspage?.noindex}>
      <Box shadow={'inner'}>
        <BackButton />
        <Box
          py={['32px', '32px', '32px', '120px']}
          px={['32px', '64px', '120px', '240px']}
        >
          {termspage.body && <MarkdownRenderer data={termspage.body.value} />}
        </Box>
      </Box>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query<TermsPageQuery>({
    query: TermsPageDocument,
  })

  return {
    props: {
      termspage: data.termspage,
    },
  }
}

export default TermsPage
