import Head from 'next/head'

export type LayoutProps = {
  title: string
  description: string
}

const Layout: React.FC<LayoutProps> = ({ title, description }) => {
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
    </Head>
  )
}

export default Layout
