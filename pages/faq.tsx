import { Box } from '@chakra-ui/react'
import { GetStaticProps, NextPage } from 'next'
import BackButton from '../components/BackButton'
import Layout from '../components/Layout'
import client from '../lib/apolloClient'
import {
  FaqPageQuery,
  FaqPageDocument,
  FaqpageRecord,
} from '../types/generated/graphql'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Heading,
} from '@chakra-ui/react'
import { H } from '../components/MarkdownRenderer/Heading'
import MarkdownRenderer from '../components/MarkdownRenderer'

export type FaqPageProps = {
  faqpage: FaqpageRecord
}

const FaqPage: NextPage<FaqPageProps> = ({ faqpage }) => {
  return (
    <Layout
      seo={faqpage?.seo || undefined}
      noIndex={faqpage?.noindex}
      slug="faq"
    >
      <Box shadow={'inner'}>
        <BackButton />
        <Box
          py={['32px', '32px', '32px', '120px']}
          px={['32px', '64px', '120px', '240px']}
        >
          {faqpage.items && (
            <>
              <H as="h1" tag="h1" size="2xl">
                FAQ
              </H>
              <Accordion allowToggle defaultIndex={[0]}>
                {faqpage.items.map((item) => (
                  <AccordionItem key={item.id} border="0">
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <H as="h2" tag="h5" size="xl">
                          {item.question}
                        </H>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} pl={8}>
                      {item.answer && (
                        <MarkdownRenderer data={item.answer?.value} />
                      )}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </>
          )}
        </Box>
      </Box>
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
    },
  }
}

export default FaqPage
