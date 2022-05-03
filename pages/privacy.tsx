import { Box } from '@chakra-ui/react'
import { GetStaticProps, NextPage } from 'next'
import BackButton from '../components/BackButton'
import Layout from '../components/Layout'
import MarkdownRenderer from '../components/MarkdownRenderer'
import client from '../lib/apolloClient'
import {
  PrivacyPageQuery,
  PrivacyPageDocument,
  PrivacypageRecord,
} from '../types/generated/graphql'

export type PrivacyPageProps = {
  privacypage: PrivacypageRecord
}

const PrivacyPage: NextPage<PrivacyPageProps> = ({ privacypage }) => {
  return (
    <Layout
      seo={privacypage?.seo || undefined}
      noIndex={privacypage?.noindex}
      slug="terms"
    >
      <Box shadow={'inner'}>
        <BackButton />
        <Box
          py={['32px', '32px', '32px', '120px']}
          px={['32px', '64px', '120px', '240px']}
        >
          {privacypage.body && (
            <MarkdownRenderer data={privacypage.body.value} />
          )}
        </Box>
      </Box>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query<PrivacyPageQuery>({
    query: PrivacyPageDocument,
  })

  return {
    props: {
      privacypage: data.privacypage,
    },
  }
}

export default PrivacyPage
