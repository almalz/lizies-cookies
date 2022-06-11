import { GetStaticProps, NextPage } from 'next'
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
      seo={legalpage?.seo || undefined}
      noIndex={legalpage?.noindex}
      slug="legal"
    >
      <div>
        <div className="px-[20%] py-8 lg:py-20">
          {legalpage.body && <MarkdownRenderer data={legalpage.body.value} />}
        </div>
      </div>
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
    revalidate: 60,
  }
}

export default LegalPage
