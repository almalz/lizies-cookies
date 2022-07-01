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
import { useRouter } from 'next/router'
import { CalloutMessage } from '../components/Callout'
import PagePopup from '../components/PagePopup'
import { ProductSkeleton } from '../components/ProductsSkeleton'
import { useEffect, useState } from 'react'

const Cart = dynamic(() => import('../components/Cart'), { ssr: false })
const CartButton = dynamic(() => import('../components/CartButton'), {
  ssr: false,
})

export type DropPageProps = {
  pageContent: DroppageRecord
  popupMessage?: string
  popupTitle?: string
}

const Drop: NextPage<DropPageProps> = ({
  pageContent,
  popupMessage,
  popupTitle,
}) => {
  const [drop, setDrop] = useState<Drop>()

  const router = useRouter()

  useEffect(() => {
    const fetchDrop = async () => {
      const drop = await Products.getCurrentDrop()
      if (drop) setDrop(drop)
    }
    fetchDrop()
  }, [])

  return (
    <Layout
      seo={pageContent.seo || undefined}
      noIndex={pageContent.noindex}
      slug=""
    >
      <div className="relative bg-white sm:pb-8">
        <div className="absolute top-0 right-0 p-4 md:p-8 lg:p-16">
          <Cart onClick={() => router.push('/cart')} />
        </div>
        <div className="px-4 pb-8 pt-12 text-purple-700 sm:px-16 lg:gap-4 lg:pt-16 lg:pb-4">
          <H1>{injectVariables(pageContent.title!, drop)}</H1>

          <h2 className="font-body text-lg font-bold italic ">
            {injectVariables(pageContent.headline!, drop)}
          </h2>
          <div className="mr-24 max-w-max pt-4">
            {pageContent.callout && (
              <CalloutMessage message={pageContent.callout} />
            )}
          </div>
          <div className="flex items-center gap-1 pt-4 sm:pt-4">
            <GoInfo size="18" color="#a1a1a1" />
            <Link href="/faq#111365087">
              <a className="font-body text-base text-zinc-400 hover:underline">
                {injectVariables(pageContent.instructions!, drop)}
              </a>
            </Link>
          </div>
        </div>
        {drop ? <ProductList products={drop.products} /> : <ProductSkeleton />}
        <div className="flex items-center justify-center py-8 ">
          <CartButton onClick={() => router.push('/cart')} />
        </div>
      </div>
      {popupMessage && <PagePopup message={popupMessage} title={popupTitle} />}
    </Layout>
  )
}

export const getStaticProps: GetServerSideProps = async () => {
  const { data } = await client.query<DropPageQuery>({
    query: DropPageDocument,
    fetchPolicy: 'no-cache',
  })

  return {
    props: {
      pageContent: data?.droppage,
      popupMessage: data?.droppagepopup?.message,
      popupTitle: data?.droppagepopup?.title,
    },
  }
}

export default Drop
