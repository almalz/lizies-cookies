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
import Link from 'next/link'

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

  useEffect(() => {
    const path = window.location.hash
    if (path && path.includes('#')) {
      const id = path.replace('#', '')
      if (id) {
        document.getElementById(id)?.scrollIntoView()
      }
    }
  })

  return (
    <Layout
      seo={faqpage?.seo || undefined}
      noIndex={faqpage?.noindex}
      slug="faq"
    >
      <div>
        <div className="py-8 px-8 text-purple-700 sm:px-16 md:px-40 lg:py-32 lg:px-60">
          {faqitems && defaultIndex !== undefined && (
            <>
              <div className="">
                <H1>{faqpage.title}</H1>
              </div>
              <Accordion
                className="pt-4 sm:pt-8"
                allowToggle
                defaultIndex={defaultIndex}
              >
                {faqitems.map((item) => (
                  <AccordionItem
                    key={item.id}
                    border="0"
                    className="pb-1 md:pb-4"
                  >
                    <div className="pt-4">
                      <Link href={`/faq#${item.id}`}>
                        <a className="flex hover:underline">
                          <AccordionButton
                            className="flex justify-between"
                            paddingLeft={0}
                            sx={{
                              _focus: {
                                boxShadow: '0 0 0 0px',
                                background: 'transparent',
                              },
                              _hover: {
                                boxShadow: '0 0 0 0px',
                                background: 'transparent',
                              },
                            }}
                          >
                            <div className="text-left" id={item.id}>
                              <h2 className="font-body text-xl font-bold sm:text-2xl">
                                {item.question}
                              </h2>
                            </div>
                            <AccordionIcon />
                          </AccordionButton>
                        </a>
                      </Link>
                    </div>
                    <AccordionPanel
                      pb={4}
                      pl={8}
                      className="bg-purple-100 bg-opacity-30 pb-2 pl-4 font-body"
                    >
                      {item.answer && (
                        <MarkdownRenderer
                          className="pt-2 pb-1 text-lg"
                          data={item.answer?.value}
                        />
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
