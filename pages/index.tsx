import { NextPage, GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import client from '../lib/apolloClient'
import {
  HomepageRecord,
  HomePageDocument,
  HomePageQuery,
} from '../types/generated/graphql'
import { Products } from '../lib/store/products/api'
import { Drop } from '../lib/store/products/types'
import { Hero } from '../components/Sections/Hero'

export type DropPageProps = {
  drop: Drop
  pageContent: HomepageRecord
}

const Home: NextPage<DropPageProps> = ({ drop, pageContent }) => {
  console.log(pageContent)
  return (
    <Layout
      seo={pageContent.seo || undefined}
      noIndex={pageContent.noindex}
      slug=""
      hideNavbar
    >
      <Hero
        heroImageUrl={pageContent.heroImage!.url}
        heroCtaLabel={pageContent.heroCtaLabel!}
      />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const drop = await Products.getNextIncommingDrop()

  const { data } = await client.query<HomePageQuery>({
    query: HomePageDocument,
  })

  return {
    props: {
      drop: drop,
      pageContent: data?.homepage,
    },
  }
}

export default Home
