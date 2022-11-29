import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import client from '../lib/apolloClient'
import '../styles/global.css'
import { StoreProvider } from '../lib/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <StoreProvider>
            <Component {...pageProps} />
            {/* /Elements> */}
          </StoreProvider>
        </ChakraProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
