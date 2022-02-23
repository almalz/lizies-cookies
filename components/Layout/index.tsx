import Head from 'next/head'
import Script from 'next/script'

export type LayoutProps = {
  title: string
  description: string
}

const Layout: React.FC<LayoutProps> = ({ children, title, description }) => {
  const API_KEY = process.env.NEXT_PUBLIC_SNIPCART_API_KEY

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
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

export default Layout
