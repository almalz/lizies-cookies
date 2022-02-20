import Head from 'next/head'

export type LayoutProps = {
  title: string
  description: string
}

const Layout: React.FC<LayoutProps> = ({ title, description }) => {
  const API_KEY = process.env.NEXT_PUBLIC_SNIPCART_API_KEY

  return (
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
    </Head>
  )
}

export default Layout
