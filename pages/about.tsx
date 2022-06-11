import { GetStaticProps, NextPage } from 'next'
import Layout from '../components/Layout'
import { H1, ParagraphXl } from '../components/Typography'
import client from '../lib/apolloClient'
import Image from 'next/image'

import {
  AboutPageDocument,
  AboutPageQuery,
  AboutpageRecord,
} from '../types/generated/graphql'

export type AboutPageProps = {
  pagecontent: AboutpageRecord
}

const AboutPage: NextPage<AboutPageProps> = ({ pagecontent }) => {
  return (
    <Layout
      seo={pagecontent?.seo || undefined}
      noIndex={pagecontent?.noindex || false}
      slug="about"
    >
      <div>
        <div className="px-8 pt-16 text-purple-700 sm:px-[10%] md:pt-16">
          <H1>{pagecontent.title}</H1>
        </div>
        <div className="flex flex-col-reverse items-center gap-10 py-16 px-10 sm:gap-24 sm:px-[10%] md:py-32 lg:flex-row lg:items-stretch lg:gap-[10%]">
          <div className="relative h-96 w-full lg:h-auto lg:flex-1">
            <Image
              src={pagecontent.firstsectionimage!.url}
              alt={pagecontent.firstsectionimage!.alt!}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="flex max-w-xl flex-1 flex-col gap-12 text-purple-500">
            <h2 className="font-subtitle text-5xl text-pink-500">
              {pagecontent.firstsectiontitle}
            </h2>
            <ParagraphXl className="text-xl md:text-2xl" markdown>
              {pagecontent.firstsectionbody}
            </ParagraphXl>
          </div>
        </div>
        <div className="flex flex-col-reverse items-center gap-10 bg-purple-700 py-16 px-10 sm:gap-24 sm:px-[10%] md:py-32 lg:flex-row-reverse lg:items-stretch lg:gap-[10%]">
          <div className="relative h-96 w-full lg:h-auto lg:flex-1">
            <Image
              src={pagecontent.secondsectionimage!.url}
              alt={pagecontent.secondsectionimage!.alt!}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="flex max-w-xl flex-1 flex-col gap-12 text-pink-500">
            <h2 className="font-subtitle text-5xl text-pink-500">
              {pagecontent.secondsectiontitle}
            </h2>
            <ParagraphXl className="text-xl md:text-2xl" markdown>
              {pagecontent.secondsectionbody}
            </ParagraphXl>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query<AboutPageQuery>({
    query: AboutPageDocument,
  })

  return {
    props: {
      pagecontent: data.aboutpage,
    },
    revalidate: 60,
  }
}

export default AboutPage
