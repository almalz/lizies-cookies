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
    </Head>
  )
}

export default Layout
