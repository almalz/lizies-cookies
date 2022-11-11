import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import client from '../lib/apolloClient'
import '../styles/global.css'
import { StoreProvider } from '../lib/store'

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!, {
  locale: 'fr',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <StoreProvider>
            <Elements stripe={stripe}>
              <Component {...pageProps} />
            </Elements>
          </StoreProvider>
        </ChakraProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
