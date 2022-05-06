/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from 'react'
import { Cart, Items } from './api'
import { Store } from './store'
import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { __html } from './custom.js'

const _Snipcart = {
  cart: Cart,
  items: Items,
  store: Store,
}

export default _Snipcart
export { useSnipcart, SnipcartProvider } from './context'

const API_KEY = process.env.NEXT_PUBLIC_SNIPCART_API_KEY

export const SnipcartLayout = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    const onHashChanged = () => {
      if (location && location.hash === '') {
        setIsCartOpen(false)
      } else {
        setIsCartOpen(true)
      }
    }
    window.addEventListener('hashchange', onHashChanged)
    return () => {
      window.removeEventListener('hashchange', onHashChanged)
    }
  }, [])

  const router = useRouter()

  //prevent cart from opening from other pages than
  useEffect(() => {
    const onURLChanged = () => {
      if (location && location.pathname !== '/') {
        location.hash = ''
      }
    }
    window.addEventListener('hashchange', onURLChanged)
    router.events.on('routeChangeStart', onURLChanged)
    return () => {
      window.removeEventListener('hashchange', onURLChanged)
      router.events.off('routeChangeStart', onURLChanged)
    }
  }, [isCartOpen, router])

  useEffect(() => {
    const unsubscribe = Snipcart.events.on('payment.failed', (paymentError) => {
      console.log('event payment.failed : ', paymentError)
    })

    return () => unsubscribe()
  }, [])

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
      >
        <div dangerouslySetInnerHTML={{ __html: __html }} />
      </div>
    </>
  )
}
