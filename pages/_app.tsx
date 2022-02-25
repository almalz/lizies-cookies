import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import client from '../lib/apolloClient'
import { SnipcartLayout } from '../lib/snipcart'
import '../assets/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <SnipcartLayout>
            <Component {...pageProps} />
          </SnipcartLayout>
        </ChakraProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
