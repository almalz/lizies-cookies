import Head from 'next/head'
import Script from 'next/script'
import { NextSeo } from 'next-seo'
import { SeoField } from '../../types/generated/graphql'

export type LayoutProps = {
  seo?: SeoField
  noIndex?: boolean
  slug?: string
}

const Layout: React.FC<LayoutProps> = ({
  children,
  seo,
  noIndex = false,
  slug,
}) => {
  const API_KEY = process.env.NEXT_PUBLIC_SNIPCART_API_KEY
  const BASE_URL = process.env.DOMAIN_NAME

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
      <NextSeo
        noindex={noIndex}
        title={seo?.title || "Lizie's cookies"}
        description={seo?.description || "Lizie's cookies"}
        openGraph={{
          title: seo?.title || "Lizie's cookies",
          description: seo?.description || "Lizie's cookies",
          url: `${BASE_URL}/${slug}`,
        }}
      />
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

export default Layout
