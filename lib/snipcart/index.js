/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from 'react'
import { Cart, Items } from './api'
import { Store } from './store'
import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'

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

  let router
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    router = useRouter()
  }

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
        <address-fields section="top">
          <div class="snipcart-form__field">
            <snipcart-label class="snipcart-form__label" for="phone">
              Téléphone
            </snipcart-label>
            <snipcart-input name="phone" required></snipcart-input>
          </div>
        </address-fields>
      </div>
    </>
  )
}
