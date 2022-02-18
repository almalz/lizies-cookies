// import { Flex, Box } from '@chakra-ui/react'
// import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
// import { RBox, RFlex } from '../../components/Breakpoints'
// import Cart from '../../components/Cart'
// import DropSummary from '../../components/DropSummary'
// import Links from '../../components/Links'
// import ProductList from '../../components/ProductList'
// import client from '../../lib/apolloClient'
// import { Drop } from '../../types'
// import {
//   DropByIdDocument,
//   DropByIdQuery,
//   DropsDocument,
//   DropsQuery,
// } from '../../types/generated/graphql'

// export type DropPageProps = {
//   drop: Drop
// }

// const Drop: NextPage<DropPageProps> = ({ drop }) => {
//   return (
//     <Flex h={['100%', '100%', '100%', '100vh']}>
//       <RBox desktopOnly w="40%" h="100%">
//         <Flex
//           h="100%"
//           flexDir={'column'}
//           boxShadow="inner"
//           px={['', '', '64px', '64px']}
//           pt={['', '', '64px', '64px']}
//           pb={['', '', '16px', '24px']}
//         >
//           <DropSummary drop={drop} />
//           <Box mt="auto">
//             <Links />
//           </Box>
//         </Flex>
//       </RBox>
//       <Box
//         pos="relative"
//         w={['100%', '100%', '100%', '60%']}
//         h="100%"
//         pt={['', '', '', '']}
//         boxShadow="2xl"
//       >
//         <RBox
//           mobileOnly
//           pos="relative"
//           px={['16px', '16px', '96px', '']}
//           py={['16px', '16px', '32px', '']}
//         >
//           <RFlex
//             mobileOnly
//             pos="absolute"
//             top={['4', '4', '8', '']}
//             right={['4', '4', '24', '']}
//           >
//             <Cart />
//           </RFlex>
//           <DropSummary drop={drop} />
//         </RBox>

//         <Flex
//           flexDir={'column'}
//           h="100%"
//           px={['16px', '16px', '96px', '96px']}
//           pt={['8px', '8px', '5%', '5%']}
//           pb={['32px', '32px', '32px', '0px']}
//         >
//           <RFlex desktopOnly justifyContent="end" py="8px">
//             <Cart />
//           </RFlex>
//           <ProductList products={drop.products} />
//           <RBox mobileOnly mt={['32px', '32px', '64px', 'auto']} px="32px">
//             <Links />
//           </RBox>
//         </Flex>
//       </Box>
//     </Flex>
//   )
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const { data } = await client.query<DropsQuery>({
//     query: DropsDocument,
//   })

//   const paths = data.allDrops.map((drop) => ({
//     params: { slug: drop.slug! },
//   }))

//   return { paths, fallback: false }
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const { data } = await client.query<DropByIdQuery>({
//     query: DropByIdDocument,
//   })

//   const drop = data.drop

//   return {
//     props: {
//       drop,
//     },
//   }
// }

// export default Drop

export {}
