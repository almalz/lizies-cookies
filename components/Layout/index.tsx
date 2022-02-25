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
        title={seo?.title || "Lizie's cookies"}
        description={seo?.description || "Lizie's cookies"}
        openGraph={{
          title: seo?.title || "Lizie's cookies",
          description: seo?.description || "Lizie's cookies",
          url: `${BASE_URL}/${slug}`,
          type: 'website',
        }}
      />
      {children}
    </>
  )
}

export default Layout
