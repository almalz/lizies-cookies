import { Flex, Box } from '@chakra-ui/react'
import format from 'date-fns/format'
import { NextPage, GetServerSideProps } from 'next'
import { RBox, RFlex } from '../components/Breakpoints'
import DropSummary from '../components/DropSummary'
import Layout from '../components/Layout'
import Links from '../components/Links'
import ProductList from '../components/ProductList'
import client from '../lib/apolloClient'
import { Drop } from '../types'
import {
  DroppageRecord,
  NextIncomingDropsDocument,
  NextIncomingDropsQuery,
} from '../types/generated/graphql'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Cart = dynamic(() => import('../components/Cart'), { ssr: false })
const ThresholdModal = dynamic(() => import('../components/ThresholdModal'), {
  ssr: false,
})

const REFRESH_INTERVAL =
  Number(process.env.NEXT_PUBLIC_DROP_REFRESH_INTERVAL) || 30000

const TODAY = new Date(Date.now()).toISOString()

export type DropPageProps = {
  drop: Drop
  pageBody: DroppageRecord
}

const Home: NextPage<DropPageProps> = ({ drop, pageBody }) => {
  const router = useRouter()

  // while on the page, check every 5 minutes, if a drop is still currently scheluded
  // if not, redirects to /nodrop page
  useEffect(() => {
    const interval = setInterval(async () => {
      const { data } = await client.query<NextIncomingDropsQuery>({
        query: NextIncomingDropsDocument,
        variables: { TODAY: TODAY },
        fetchPolicy: 'no-cache',
      })
      const _drop = data.allDrops[0]
      if (!_drop) {
        router.push('/nodrop')
      } else if (_drop.id !== drop.id) {
        router.reload()
      }
    }, REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [router, drop.id])

  return (
    <Layout seo={pageBody.seo || undefined} noIndex={pageBody.noindex} slug="">
      <Flex h={['100vh', '100vh', '100vh', '100vh']}>
        <RBox desktopOnly w="40%" h="100%">
          <Flex
            h="100%"
            flexDir={'column'}
            boxShadow="inner"
            px={['0', '0', '64px', '64px']}
            alignItems="center"
            justifyContent="center"
          >
            {pageBody && <DropSummary drop={drop} pageBody={pageBody} />}
            <Box mt="10%" w={['0', '0', '200px', '300px', '400px']} mx="auto">
              <Links />
            </Box>
          </Flex>
        </RBox>
        <Box
          pos="relative"
          w={['100%', '100%', '100%', '60%']}
          h="100%"
          boxShadow="2xl"
          overflowY="scroll"
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
              justifyContent={'end'}
              pr={['16px', '16px', '96px', '0px']}
              pt={['16px', '16px', '32px', '0px']}
            >
              <Cart />
            </RFlex>
            {pageBody && <DropSummary drop={drop} pageBody={pageBody} />}
          </RBox>

          <Flex
            justifyContent="center"
            alignItems={['start', 'start', 'start', 'start']}
            py={['0', '0', '0', '10vh']}
          >
            <RFlex
              px={['16px', '16px', '96px', '96px']}
              pt={['32px', '32px', '2%', '2%']}
              flexDir={'column'}
              h="100%"
            >
              <RFlex desktopOnly justifyContent="end" py="8px">
                <Cart />
              </RFlex>
              <Box pb={['32px', '64px', '96px', '96px']}>
                <ProductList products={drop.products} />
              </Box>
              <RBox mobileOnly px="32px" pb="32px">
                <Links />
              </RBox>
            </RFlex>
          </Flex>
        </Box>
        <ThresholdModal />
      </Flex>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query<NextIncomingDropsQuery>({
    query: NextIncomingDropsDocument,
    variables: { TODAY: TODAY },
    fetchPolicy: 'no-cache',
  })

  // 1st drop of all drops where 'endDate' is gte TODAY ordered by endDate_ASC
  const nextIncomingDrop: Drop = (data.allDrops[0] as Drop) || null

  if (!nextIncomingDrop) {
    return {
      redirect: {
        permanent: false,
        destination: '/nodrop',
      },
    }
  }

  return {
    props: {
      drop: nextIncomingDrop,
      pageBody: data?.droppage,
    },
  }
}

export default Home
