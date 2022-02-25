import React from 'react'
import { Cart, Items } from './api'
import { Store } from './store'
import Head from 'next/head'
import Script from 'next/script'

const _Snipcart = {
  cart: Cart,
  items: Items,
  store: Store,
}

export default _Snipcart

const API_KEY = process.env.NEXT_PUBLIC_SNIPCART_API_KEY

export const SnipcartLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.css"
        />
      </Head>
      <main className="main">{children}</main>
      <Script
        async
        src="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.js"
        strategy="beforeInteractive"
      ></Script>
      <div
        hidden
        id="snipcart"
        data-config-modal-style="side"
        data-api-key={API_KEY}
        data-config-add-product-behavior="none"
      ></div>
    </>
  )
}
