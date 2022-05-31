import { NextPage, GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import client from '../lib/apolloClient'
import {
  DroppageRecord,
  DropPageDocument,
  DropPageQuery,
} from '../types/generated/graphql'
import dynamic from 'next/dynamic'
import { Products } from '../lib/store/products/api'
import { Drop } from '../lib/store/products/types'
import { H1 } from '../components/Typography'
import { injectVariables } from '../lib/utils'
import { GoInfo } from 'react-icons/go'
import Link from 'next/link'
import ProductList from '../components/ProductList'

const Cart = dynamic(() => import('../components/Cart'), { ssr: false })

const ThresholdModal = dynamic(() => import('../components/ThresholdModal'), {
  ssr: false,
})

export type DropPageProps = {
  drop: Drop
  pageContent: DroppageRecord
}

const Drop: NextPage<DropPageProps> = ({ drop, pageContent }) => {
  return (
    <Layout
      seo={pageContent.seo || undefined}
      noIndex={pageContent.noindex}
      slug=""
    >
      <div className="bg-white pb-8">
        <div className="px-4 pb-8 pt-12 text-purple-700 sm:px-16 lg:gap-4 lg:pt-16 lg:pb-4">
          <H1>{injectVariables(pageContent.title!, drop)}</H1>
          <h2 className="font-body text-lg font-bold italic ">
            {injectVariables(pageContent.headline!, drop)}
          </h2>
          <div className="flex items-center gap-1 pt-8 sm:pt-4">
            <GoInfo size="18" color="#a1a1a1" />
            <Link href="#">
              <a className="font-body text-base text-zinc-400 hover:underline">
                {injectVariables(pageContent.instructions!, drop)}
              </a>
            </Link>
          </div>
        </div>
        <ProductList products={drop.products} />
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const drop = await Products.getCurrentDrop()

  const { data } = await client.query<DropPageQuery>({
    query: DropPageDocument,
    fetchPolicy: 'no-cache',
  })

  return {
    props: {
      drop: drop,
      pageContent: data?.droppage,
    },
  }
}

export default Drop
