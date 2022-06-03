import { GetServerSideProps, NextPage } from 'next'
import Layout from '../components/Layout'
import { H1 } from '../components/Typography'
import client from '../lib/apolloClient'
import {
  CartpageRecord,
  CartPageQuery,
  CartPageDocument,
} from '../types/generated/graphql'
import { useCart } from '../lib/store'
import { Spinner } from '@chakra-ui/react'
import { SwellCart, SwellCartItem } from '../lib/store/cart/types'
import { CartItem } from '../components/CartItem'
import { CartSummary } from '../components/CartSummary'
import { Button } from '../components/Button'
import { HiArrowNarrowLeft } from 'react-icons/hi'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export type CartPageProps = {
  pageContent: CartpageRecord
}

const EmptyCart: React.FC<{
  emptycartmessage: string
  backButtonLabel: string
}> = ({ emptycartmessage, backButtonLabel }) => {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12  sm:py-20">
      <h2 className="font-body text-3xl font-bold text-pink-500 ">
        {emptycartmessage}
      </h2>
      <Button
        color="purple"
        className="border-0 underline"
        onClick={() => router.push('/drop')}
      >
        <span className="flex items-center gap-2">
          <HiArrowNarrowLeft />
          {backButtonLabel}
        </span>
      </Button>
    </div>
  )
}

const CartItemsList: React.FC<{ cartItems: SwellCartItem[] }> = ({
  cartItems,
}) => {
  return (
    <div className="px-2 py-2">
      {cartItems.map((item, index) => (
        <CartItem key={item.productId} item={item} isFirst={index === 0} />
      ))}
    </div>
  )
}

const Cart: NextPage<CartPageProps> = ({ pageContent }) => {
  const { cartCache, loading, pullCart } = useCart()

  const [cart, setCart] = useState<SwellCart | undefined>(cartCache)

  useEffect(() => {
    const syncCart = async () => {
      const newCart = await pullCart()
      if (newCart) setCart(newCart)
    }
    syncCart()
  }, [pullCart])

  return (
    <Layout
      seo={pageContent.seo || undefined}
      noIndex={pageContent.noindex || true}
      slug=""
    >
      <div className="min-h-screen sm:pt-16 md:px-24 lg:px-[20%]">
        <div className="py-8 px-4 text-purple-700">
          <H1>{pageContent.title}</H1>
        </div>
        {loading && !cart ? (
          <div className="flex h-60 items-center justify-center ">
            <Spinner size="xl" />
          </div>
        ) : cart?.items && cart?.items.length > 0 ? (
          <>
            <CartItemsList cartItems={cart?.items as any} />
            <CartSummary cart={cart} pageContent={pageContent} />
          </>
        ) : (
          <EmptyCart
            emptycartmessage={
              pageContent.emptycartmessage || 'Ton panier est vide'
            }
            backButtonLabel={pageContent.backButtonLabel || 'retour au drop'}
          />
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query<CartPageQuery>({
    query: CartPageDocument,
  })

  return {
    props: {
      pageContent: data?.cartpage,
    },
  }
}

export default Cart
