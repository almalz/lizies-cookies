import { GetStaticProps, NextPage } from 'next'
import Layout from '../components/Layout'
import client from '../lib/apolloClient'
import {
  FaqPageQuery,
  FaqPageDocument,
  FaqpageRecord,
  FaqitemRecord,
} from '../types/generated/graphql'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { H1, H2 } from '../components/Typography'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export type FaqPageProps = {
  faqpage: FaqpageRecord
  faqitems: FaqitemRecord[]
}

const FaqPage: NextPage<FaqPageProps> = ({ faqpage, faqitems }) => {
  const router = useRouter()
  const [defaultIndex, setDefaultIndex] = useState<number | undefined>(
    undefined
  )

  useEffect(() => {
    const hash = location.hash.substring(1) || ''
    const index = faqitems.findIndex((item) => item.id === hash)
    setDefaultIndex(index < 0 ? 0 : index)
  }, [faqitems, router.asPath])

  return (
    <Layout
      seo={faqpage?.seo || undefined}
      noIndex={faqpage?.noindex}
      slug="faq"
    >
      <div>
        <div className="py-8 px-8 text-purple-700 sm:px-16 md:px-40 lg:px-60 lg:py-40">
          {faqitems && defaultIndex !== undefined && (
            <>
              <div className="">
                <H1>FAQ</H1>
              </div>
              <Accordion
                className="pt-8"
                allowToggle
                defaultIndex={defaultIndex}
              >
                {faqitems.map((item) => (
                  <AccordionItem key={item.id} border="0">
                    <AccordionButton>
                      <div className="flex-1 text-left">
                        <a
                          href={`#${item.id}`}
                          className="hover:underline"
                          aria-label="anchor"
                        >
                          <H2>{item.question}</H2>
                        </a>
                      </div>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel
                      pb={4}
                      pl={8}
                      className="text-body pb-2 pl-4"
                    >
                      {item.answer && (
                        <MarkdownRenderer data={item.answer?.value} />
                      )}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query<FaqPageQuery>({
    query: FaqPageDocument,
  })

  return {
    props: {
      faqpage: data.faqpage,
      faqitems: data.allFaqitems,
    },
    revalidate: 60,
  }
}

export default FaqPage
