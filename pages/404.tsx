import { Box } from '@chakra-ui/react'
import { GetStaticProps, NextPage } from 'next'
import BackButton from '../components/BackButton'
import Layout from '../components/Layout'
import MarkdownRenderer from '../components/MarkdownRenderer'
import client from '../lib/apolloClient'
import {
  ErrorPageQuery,
  ErrorPageDocument,
  ErrorpageRecord,
} from '../types/generated/graphql'

export type ErrorPageProps = {
  errorpage: ErrorpageRecord
}

const ErrorPage: NextPage<ErrorPageProps> = ({ errorpage }) => {
  return (
    <Layout
      seo={errorpage?.seo || undefined}
      noIndex={errorpage?.noindex}
      slug="404"
    >
      <Box shadow={'inner'}>
        <Box
          py={['32px', '32px', '32px', '120px']}
          px={['32px', '64px', '120px', '240px']}
        >
          {errorpage.body && <MarkdownRenderer data={errorpage.body.value} />}
        </Box>
      </Box>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query<ErrorPageQuery>({
    query: ErrorPageDocument,
  })

  return {
    props: {
      errorpage: data.errorpage,
    },
  }
}

export default ErrorPage
