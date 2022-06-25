import { GetStaticProps, NextPage } from 'next'
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
    <Layout
      seo={termspage?.seo || undefined}
      noIndex={termspage?.noindex}
      slug="terms"
    >
      <div>
        <div className="px-[20%] py-8 lg:py-20">
          {termspage.body && <MarkdownRenderer data={termspage.body.value} />}
        </div>
      </div>
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
    revalidate: 60,
  }
}

export default TermsPage
