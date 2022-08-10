import { GetStaticProps, NextPage } from 'next'
import Layout from '../components/Layout'
import { H1, Paragraph, ParagraphLg } from '../components/Typography'
import client from '../lib/apolloClient'
import Image from 'next/image'

import {
  CateringPageDocument,
  CateringPageQuery,
  CateringpageRecord,
} from '../types/generated/graphql'
import { ButtonLink } from '../components/Button'

export type CateringPageProps = {
  pagecontent: CateringpageRecord
}

const CateringPage: NextPage<CateringPageProps> = ({ pagecontent }) => {
  return (
    <Layout
      seo={pagecontent?.seo || undefined}
      noIndex={pagecontent?.noindex || false}
      slug="catering"
    >
      <div>
        <div className="flex flex-col gap-y-8 px-8 pt-16 text-purple-700 sm:px-[10%] md:pt-16">
          <H1 className="pb-">{pagecontent.title}</H1>
          <ParagraphLg markdown>{pagecontent.headline}</ParagraphLg>
        </div>
        <div className="flex flex-col-reverse items-center gap-10 py-16 px-10 sm:gap-24 sm:px-[10%] md:py-28 lg:flex-row lg:items-stretch lg:gap-[20%] 2xl:px-[20%]">
          <div className="relative h-96 w-full lg:h-auto lg:flex-1">
            <Image
              src={pagecontent.whiteSectionImage!.url}
              alt={pagecontent.whiteSectionImage!.alt!}
              layout="fill"
              objectFit="cover"
            />
            {pagecontent.whiteSectionImage?.author && (
              <Paragraph className="absolute bottom-1 left-2 text-white">
                {`Crédit photo : ${pagecontent.whiteSectionImage?.author}`}
              </Paragraph>
            )}
          </div>
          <div className="flex max-w-xl flex-1 flex-col gap-12 text-purple-700">
            <h2 className="font-body text-5xl font-bold text-purple-700">
              {pagecontent.whiteSectionTitle}
            </h2>
            <ParagraphLg markdown>{pagecontent.whiteSectionBody}</ParagraphLg>
            <div className="text-center">
              <ButtonLink
                href={pagecontent.whiteSectionFile?.url || '/'}
                isExtrenal
              >
                {pagecontent.whiteSectionCtaLabel}
              </ButtonLink>
            </div>
          </div>
        </div>
        <div className="bg-purple-700">
          <div className="flex flex-col-reverse items-center gap-10 bg-purple-700 px-10 pt-16 pb-8 sm:gap-24 sm:px-[10%] md:pt-28 lg:flex-row-reverse lg:items-stretch lg:gap-[20%] 2xl:px-[20%]">
            <div className="relative h-96 w-full lg:h-auto lg:flex-1">
              <Image
                src={pagecontent.purpleSectionImage!.url}
                alt={pagecontent.purpleSectionImage!.alt!}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex max-w-xl flex-1 flex-col gap-12 text-pink-500">
              <h2 className="font-body text-5xl font-bold text-pink-500">
                {pagecontent.purpleSectionTitle}
              </h2>
              <ParagraphLg markdown>
                {pagecontent.purpleSectionBody}
              </ParagraphLg>
              <div className="text-center">
                <ButtonLink
                  href={pagecontent.purpleSectionFile?.url || '/'}
                  isExtrenal
                >
                  {' '}
                  {pagecontent.purpleSectionCtaLabel}
                </ButtonLink>
              </div>
            </div>
          </div>
          <div className="bg-purple-700 px-8 py-8 sm:px-16 md:px-24 lg:px-32 lg:py-12 xl:px-60 xl:py-20">
            <div className="flex flex-col items-center gap-y-6 bg-pink-500 py-8 xl:py-16 2xl:gap-y-12 2xl:px-60">
              <h3 className="font-subtitle text-4xl text-purple-500 lg:text-5xl">
                {pagecontent.contactCallout}
              </h3>
              <ButtonLink color="purple" href="/contact">
                {pagecontent.contactCtaLabel}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query<CateringPageQuery>({
    query: CateringPageDocument,
  })

  return {
    props: {
      pagecontent: data.cateringpage,
    },
    revalidate: 60,
  }
}

export default CateringPage
