import Head from 'next/head'

export type LayoutProps = {
  title: string
  description: string
}

const LayoutProps: React.FC<LayoutProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} key={title} />
    </Head>
  )
}
