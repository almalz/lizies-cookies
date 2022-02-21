import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import client from '../lib/apolloClient'
import '../assets/global.css'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  const API_KEY = process.env.NEXT_PUBLIC_SNIPCART_API_KEY

  return (
    <>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
      <script
        async
        src="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.js"
      ></script>
      <div
        id="snipcart"
        data-config-modal-style="side"
        data-api-key={API_KEY}
        data-config-add-product-behavior="none"
        hidden
      ></div>
    </>
  )
}

export default MyApp
