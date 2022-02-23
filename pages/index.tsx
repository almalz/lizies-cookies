import { Flex, Box } from '@chakra-ui/react'
import format from 'date-fns/format'
import { NextPage, GetServerSideProps } from 'next'
import Snipcart from '../lib/snipcart'
import { RBox, RFlex } from '../components/Breakpoints'
import Cart from '../components/Cart'
import DropSummary from '../components/DropSummary'
import Layout from '../components/Layout'
import Links from '../components/Links'
import ProductList from '../components/ProductList'
import client from '../lib/apolloClient'
import { Drop } from '../types'
import {
  NextIncomingDropsDocument,
  NextIncomingDropsQuery,
} from '../types/generated/graphql'
import { useEffect, useState } from 'react'

export type DropPageProps = {
  drop: Drop
}

const Home: NextPage<DropPageProps> = ({ drop }) => {
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    let unsubscribe: () => void
    if (typeof window !== 'undefined' && Snipcart?.store?.subscribe) {
      unsubscribe = Snipcart?.store?.subscribe(async () => {
        if (typeof window !== 'undefined') {
          const _itemCount = (await Snipcart?.store?.itemCount()) || 0
          setItemCount(_itemCount)
        }
      })
    }

    return () => {
      unsubscribe && unsubscribe()
    }
  }, [])

  return (
    <Layout
      title={drop.title || "Lizie's cookies"}
      description={drop.description || "Lizie's cookies"}
    >
      <Flex h={['100%', '100%', '100%', '100%']} pos="fixed">
        <RBox desktopOnly w="40%" h="100%">
          <Flex
            h="100%"
            flexDir={'column'}
            boxShadow="inner"
            px={['0', '0', '64px', '64px']}
            pt={['0', '0', '64px', '64px']}
            pb={['0', '0', '16px', '24px']}
          >
            <DropSummary drop={drop} />
            <Box mt="auto">
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
        >
          <RBox
            mobileOnly
            pos="relative"
            px={['16px', '16px', '96px', '0px']}
            py={['16px', '16px', '32px', '0px']}
          >
            <RFlex
              mobileOnly
              pos="absolute"
              top={['4', '4', '8', '0']}
              right={['4', '4', '24', '0']}
            >
              <Cart itemCount={itemCount} />
            </RFlex>
            <DropSummary drop={drop} />
          </RBox>

          <Flex
            flexDir={'column'}
            h="100%"
            px={['16px', '16px', '96px', '96px']}
            pt={['8px', '8px', '2%', '2%']}
          >
            <RFlex desktopOnly justifyContent="end" py="8px">
              <Cart itemCount={itemCount} />
            </RFlex>
            <Box pb={['32px', '64px', '96px', '96px']}>
              <ProductList products={drop.products} />
            </Box>
            <RBox mobileOnly px="32px" pb="32px">
              <Links />
            </RBox>
          </Flex>
        </Box>
      </Flex>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const TODAY = format(Date.now(), 'yyyy-MM-dd')

  const { data } = await client.query<NextIncomingDropsQuery>({
    query: NextIncomingDropsDocument,
    variables: { TODAY: TODAY },
  })

  // 1st drop of all drops where 'endDate' is gte TODAY ordered by endDate_ASC
  const nextIncomingDrop: Drop = data.allDrops[0] as Drop

  return {
    props: {
      drop: nextIncomingDrop,
    },
  }
}

export default Home
