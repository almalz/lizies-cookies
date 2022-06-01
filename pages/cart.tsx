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
import { SwellCartItem } from '../lib/store/cart/types'
import { CartItem } from '../components/CartItem'
import { CartSummary } from '../components/CartSummary'

export type CartPageProps = {
  pageContent: CartpageRecord
}

const EmptyCart: React.FC = () => {
  return <div>Panier vide</div>
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
  const { cart, loading } = useCart()

  console.log(cart)

  return (
    <Layout
      seo={pageContent.seo || undefined}
      noIndex={pageContent.noindex || true}
      slug=""
    >
      <div className="sm:pt-16 md:px-24 lg:px-[20%]">
        <div className="py-8 px-4 text-purple-700">
          <H1>{pageContent.title}</H1>
        </div>
        {loading && !cart ? (
          <Spinner />
        ) : cart?.items && cart?.items.length > 0 ? (
          <>
            <CartItemsList cartItems={cart?.items as any} />
            <CartSummary cart={cart} pageContent={pageContent} />
          </>
        ) : (
          <EmptyCart />
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query<CartPageQuery>({
    query: CartPageDocument,
    fetchPolicy: 'no-cache',
  })

  return {
    props: {
      pageContent: data?.cartpage,
    },
  }
}

export default Cart
