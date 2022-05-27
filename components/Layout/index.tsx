import { NextSeo } from 'next-seo'
import { SeoField } from '../../types/generated/graphql'

export type LayoutProps = {
  seo?: SeoField
  noIndex?: boolean
  slug?: string
}

const BASE_URL = process.env.DOMAIN_NAME

const Layout: React.FC<LayoutProps> = ({
  children,
  seo,
  noIndex = false,
  slug,
}) => {
  return (
    <>
      <NextSeo
        noindex={noIndex}
        title={seo?.title || 'Naughty cookies'}
        description={seo?.description || 'Naughty cookies'}
        openGraph={{
          title: seo?.title || 'Naughty cookies',
          description: seo?.description || 'Naughty cookies',
          url: `${BASE_URL}/${slug}`,
          type: 'website',
        }}
      />
      {children}
    </>
  )
}

export default Layout
