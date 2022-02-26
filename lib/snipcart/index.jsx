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

export const SnipcartLayout = ({ children }) => {
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
        <address-fields>
          <fieldset className="snipcart-form__set">
            <div className="snipcart-form__field">
              <snipcart-label className="snipcart__font--tiny" for="phone">
                Téléphone
              </snipcart-label>
              <snipcart-input name="phone" required></snipcart-input>
              <snipcart-field-error name="phone"></snipcart-field-error>
            </div>

            <div className="snipcart-form__row">
              <div className="snipcart-form__field snipcart-form__cell--large">
                <snipcart-address-autocomplete
                  name="address1"
                  label="Adresse"
                  required
                ></snipcart-address-autocomplete>
                <snipcart-error-message name="address1"></snipcart-error-message>
              </div>
            </div>

            <div className="snipcart-form__field">
              <snipcart-label className="snipcart__font--tiny" for="city">
                {'Ville'}
              </snipcart-label>
              <snipcart-input name="city"></snipcart-input>
              <snipcart-error-message name="city"></snipcart-error-message>
            </div>

            <div className="snipcart-form__field snipcart-form__cell--tidy">
              <snipcart-label className="snipcart__font--tiny" for="postalCode">
                {'Code postal'}
              </snipcart-label>
              <snipcart-input name="postalCode" required></snipcart-input>
              <snipcart-error-message name="postalCode"></snipcart-error-message>
            </div>

            <div className="snipcart-form__field">
              <div className="snipcart-form__field-checkbox  snipcart-form__cell--tidy">
                <snipcart-checkbox name="is_pedestrian" />
                <snipcart-label
                  className="snipcart__font--tiny snipcart-form__label--checkbox"
                  for="is_pedestrian"
                >
                  {'Ma rue est piétonne'}
                </snipcart-label>
              </div>
            </div>
          </fieldset>
        </address-fields>
      </div>
    </>
  )
}
