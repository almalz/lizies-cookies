import { Flex, Box } from '@chakra-ui/react'
import { NextPage, GetServerSideProps } from 'next'
import { RBox, RFlex } from '../components/Breakpoints'
import DropSummary from '../components/DropSummary'
import Layout from '../components/Layout'
import Links, { SocialLinks } from '../components/Links'
import PopperMessage from '../components/PopperMessage'
import ProductList from '../components/ProductList'
import client from '../lib/apolloClient'
import {
  DroppageRecord,
  DropPageDocument,
  DropPageQuery,
  PoppermessageRecord,
} from '../types/generated/graphql'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Products } from '../lib/store/products/api'
import { Drop } from '../lib/store/products/types'
import { useProducts } from '../lib/store'

const Cart = dynamic(() => import('../components/Cart'), { ssr: false })

const ThresholdModal = dynamic(() => import('../components/ThresholdModal'), {
  ssr: false,
})

const TODAY = new Date(Date.now()).toISOString()

export type DropPageProps = {
  drop: Drop
  pageBody: DroppageRecord
  popperMessage: PoppermessageRecord | null
}

const Home: NextPage<DropPageProps> = ({ drop, pageBody, popperMessage }) => {
  const router = useRouter()
  const { currentDropId } = useProducts()

  useEffect(() => {
    if (!currentDropId) {
      router.push('/nodrop')
    } else if (currentDropId !== drop.id) {
      router.reload()
    }
  }, [router, drop.id, currentDropId])

  return (
    <Layout seo={pageBody.seo || undefined} noIndex={pageBody.noindex} slug="">
      <Flex h={['100%', '100%', '100%', '100vh']}>
        <RBox desktopOnly w="45%" h="100%" overflowY="auto">
          <Flex
            h="100%"
            flexDir={'column'}
            boxShadow="inner"
            px={['0', '0', '64px', '64px']}
            pt={['0', '0', '0', '10vh']}
          >
            {pageBody && <DropSummary drop={drop} pageBody={pageBody} />}
            <Box mt="auto" pb="32px" w={'100%'}>
              <SocialLinks />
              <Links />
            </Box>
          </Flex>
        </RBox>
        <Box
          pos="relative"
          w={['100%', '100%', '100%', '60%']}
          h="100%"
          boxShadow="2xl"
          overflowY="auto"
          maxH={['auto', 'auto', 'auto', '100%']}
        >
          <RBox
            mobileOnly
            pos="relative"
            px={['16px', '16px', '96px', '0px']}
            pt={['16px', '16px', '32px', '0px']}
          >
            <RFlex
              mobileOnly
              pos="sticky"
              justifyContent={'flex-end'}
              pr={['16px', '16px', '0px', '0px']}
              pt={['16px', '16px', '32px', '0px']}
              minH="75px"
            >
              <Cart />
            </RFlex>
            {pageBody && <DropSummary drop={drop} pageBody={pageBody} />}
          </RBox>

          <Flex
            justifyContent="center"
            alignItems={['start', 'start', 'start', 'start']}
            pt={['0px', '0px', '0px', '5vh', '10vh']}
            h="100%"
          >
            <RFlex
              px={['16px', '16px', '96px', '96px']}
              pt={['32px', '32px', '2%', '2%']}
              flexDir={'column'}
              h="100%"
            >
              <RBox
                desktopOnly
                pos="fixed"
                right="0"
                pr={['0px', '0px', '0px', '2%', '2%']}
              >
                <Cart />
              </RBox>
              <RBox desktopOnly pb={['32px', '32px', '32px', '96px']}>
                <ProductList products={drop.products} />
              </RBox>
              <RBox mobileOnly px="32px" pb="32px" gap="32px">
                <SocialLinks />
                <Links />
              </RBox>
            </RFlex>
          </Flex>
        </Box>
        <ThresholdModal />
      </Flex>
      {popperMessage?.message && (
        <PopperMessage
          message={popperMessage.message}
          delay={popperMessage.delay}
          updatedAt={popperMessage.updatedAt}
        />
      )}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const drop = await Products.getNextIncommingDrop()

  const { data } = await client.query<DropPageQuery>({
    query: DropPageDocument,
    fetchPolicy: 'no-cache',
  })

  if (!drop) {
    return {
      redirect: {
        permanent: false,
        destination: '/nodrop',
      },
    }
  }

  return {
    props: {
      drop: drop,
      pageBody: data?.droppage,
      popperMessage: data?.poppermessage,
    },
  }
}

export default Home
