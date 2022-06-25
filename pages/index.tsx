import { NextPage, GetStaticProps } from 'next'
import dynamic from 'next/dynamic'

import client from '../lib/apolloClient'
import {
  HomepageRecord,
  HomePageDocument,
  HomePageQuery,
} from '../types/generated/graphql'
import { Products } from '../lib/store/products/api'
import { Drop } from '../lib/store/products/types'

const Layout = dynamic(() => import('../components/Layout'))
const Hero = dynamic(() => import('../components/Sections/Hero'))

const WhiteSection = dynamic(
  () => import('../components/Sections/HomeWhiteSection')
)
const ProductsSection = dynamic(
  () => import('../components/Sections/HomeProductsSection')
)
const PinkSection = dynamic(
  () => import('../components/Sections/HomePinkSection')
)
const PictureSection = dynamic(
  () => import('../components/Sections/HomePicturesSection')
)
const PurpleSection = dynamic(
  () => import('../components/Sections/HomePurpleSection')
)

export type DropPageProps = {
  drop: Drop
  pageContent: HomepageRecord
}

const Home: NextPage<DropPageProps> = ({ drop, pageContent }) => {
  return (
    <Layout
      seo={pageContent.seo || undefined}
      noIndex={pageContent.noindex}
      slug=""
      hideNavbar
    >
      <Hero
        heroImageUrl={pageContent.heroImage!.url}
        heroCtaLabel={pageContent.heroCtaLabel!}
        heroImageAlt={pageContent.heroImage!.alt!}
      />
      <WhiteSection
        whiteSectionHeading={pageContent.whiteSectionHeading!}
        whiteSectionBody={pageContent.whiteSectionBody!}
      />
      {drop && (
        <ProductsSection
          products={drop?.products}
          buttonLabel={pageContent.productsSectionCtaLabel!}
        />
      )}
      <PinkSection
        pinkSectionHeading={pageContent.pinkSectionHeading!}
        pinkSectionSubheading={pageContent.pinkSectionSubheading!}
        pinkSectionLeftTitle={pageContent.pinkSectionLeftTitle!}
        pinkSectionLeftBody={pageContent.pinkSectionLeftBody!}
        pinkSectionRightTitle={pageContent.pinkSectionRightTitle!}
        pinkSectionRightBody={pageContent.pinkSectionRightBody!}
        pinkSectionCtaLabel={pageContent.pinkSectionCtaLabel!}
      />
      <PictureSection
        topLeftPicture={{
          alt: pageContent.topLeftImage?.alt!,
          url: pageContent.topLeftImage?.url!,
        }}
        bottomLeftPicture={{
          alt: pageContent.bottomLeftImage?.alt!,
          url: pageContent.bottomLeftImage?.url!,
        }}
        rightPicture={{
          alt: pageContent.rightImage?.alt!,
          url: pageContent.rightImage?.url!,
        }}
      />
      <PurpleSection
        purpleSectionHeading={pageContent.purpleSectionHeading!}
        purpleSectionBody={pageContent.purpleSectionBody!}
      />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const drop = await Products.getCurrentDrop()

  const { data } = await client.query<HomePageQuery>({
    query: HomePageDocument,
  })

  return {
    props: {
      drop: drop,
      pageContent: data?.homepage,
    },
    revalidate: 60,
  }
}

export default Home
