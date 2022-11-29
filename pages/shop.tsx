import { NextPage, GetStaticProps } from 'next'
import Layout from '../components/Layout'
import client from '../lib/apolloClient'
import {
  DroppageRecord,
  DropPageDocument,
  DropPageQuery,
} from '../types/generated/graphql'
import dynamic from 'next/dynamic'
import { Products } from '../lib/store/products/api'
import { H1 } from '../components/Typography'
import { injectVariables } from '../lib/utils'
import ProductList from '../components/ProductList'
import { useRouter } from 'next/router'
import { CalloutMessage } from '../components/Callout'
import PagePopup from '../components/PagePopup'
import { ProductSkeleton } from '../components/ProductsSkeleton'
import { useEffect, useState } from 'react'
import { SwellProduct } from '../lib/store/products/types'

const Cart = dynamic(() => import('../components/Cart'), { ssr: false })
const CartButton = dynamic(() => import('../components/CartButton'), {
  ssr: false,
})

export type DropPageProps = {
  pageContent: DroppageRecord
  popupMessage?: string
  popupTitle?: string
}

const Shop: NextPage<DropPageProps> = ({
  pageContent,
  popupMessage,
  popupTitle,
}) => {
  const [products, setProducts] = useState<SwellProduct[]>()

  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      const drop = await Products.getAllProducts()
      if (drop) setProducts(drop)
    }
    fetchProducts()
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
          <H1>{injectVariables(pageContent.title!, products)}</H1>
          <div className="mr-24 max-w-max pt-4">
            {pageContent.callout && (
              <CalloutMessage message={pageContent.callout} />
            )}
          </div>
        </div>
        {products ? <ProductList products={products} /> : <ProductSkeleton />}
        <div className="flex items-center justify-center py-8 md:py-12 ">
          <CartButton onClick={() => router.push('/cart')} />
        </div>
      </div>
      {popupMessage && <PagePopup message={popupMessage} title={popupTitle} />}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
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

export default Shop
