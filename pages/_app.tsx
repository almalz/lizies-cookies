import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import client from '../lib/apolloClient'
import '../assets/global.css'
import { SnipcartProvider } from '../lib/snipcart'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <SnipcartProvider>
            <Component {...pageProps} />
          </SnipcartProvider>
        </ChakraProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
