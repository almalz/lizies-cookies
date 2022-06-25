import { GetStaticProps, NextPage } from 'next'
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
      slug="privacy"
    >
      <div>
        <div className="px-[20%] py-8 lg:py-20">
          {privacypage.body && (
            <MarkdownRenderer data={privacypage.body.value} />
          )}
        </div>
      </div>
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
    revalidate: 60,
  }
}

export default PrivacyPage
