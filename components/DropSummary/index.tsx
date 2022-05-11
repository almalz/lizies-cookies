import { Heading, Text, Flex, Box } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import { DroppageRecord } from '../../types/generated/graphql'
import { injectVariables } from '../../lib/utils'
import { CountdownRenderProps } from 'react-countdown'
import { add } from 'date-fns'
import dynamic from 'next/dynamic'
import { RBox } from '../Breakpoints'
import ProductList from '../ProductList'
import CartButton from '../CartButton'
import { Drop } from '../../lib/store/products/types'

const Countdown = dynamic(() => import('react-countdown'), { ssr: false })

export type DropSummaryProps = {
  pageBody: DroppageRecord
  drop: Drop
}

const RenderCountdown: React.FC<CountdownRenderProps> = (props) => {
  const { days, hours, minutes, seconds } = props

  return (
    <span>
      {(days ? (days > 1 ? `${days} jours ` : `${days} jour `) : '') +
        (hours ? `${hours} h ` : '') +
        (minutes ? `${minutes} min ` : '') +
        (seconds ? `${seconds} s ` : '')}
    </span>
  )
}

// a combunation of `remark-breaks` and the `.replace()` seems required to allow multiple new lines
const DropSummary: React.FC<DropSummaryProps> = ({ drop, pageBody }) => {
  return (
    <Flex flexDirection={'column'}>
      <Heading as="h1" size="xl" mb="32px" w={['80%', '80%', '100%', '100%']}>
        {pageBody.title && injectVariables(pageBody.title, drop)}
      </Heading>
      <Text color="gray.800" mb="16px">
        {'Fin du drop dans '}
        {typeof window !== 'undefined' && (
          <Countdown
            date={add(new Date(drop.expirationDate!), { hours: 24 })}
            renderer={(props) => <RenderCountdown {...props} />}
          />
        )}
      </Text>

      <Box color="gray.800" mb={['4px', '4px', '32px', '32px']}>
        <ReactMarkdown remarkPlugins={[remarkBreaks]}>
          {(
            pageBody?.headline && injectVariables(pageBody.headline, drop)
          )?.replace(/\n/gi, '\n &nbsp;') || ''}
        </ReactMarkdown>
      </Box>

      <RBox mobileOnly pt="32px" pb="32px">
        <ProductList products={drop.products} />
      </RBox>

      <RBox mobileOnly pt="16px" pb="48px" textAlign="center">
        {/* <CartButton w="100%" h="48px" color="white" bg="black" /> */}
      </RBox>

      <Box color="gray.800" mb={['4px', '4px', '32px', '32px']}>
        <ReactMarkdown remarkPlugins={[remarkBreaks]}>
          {(
            pageBody?.deliveryDescription &&
            injectVariables(pageBody.deliveryDescription, drop)
          )?.replace(/\n/gi, '\n &nbsp;') || ''}
        </ReactMarkdown>
      </Box>
      {/* <RBox desktopOnly mx="auto">
        <Carousel
          images={drop.pictures}
          height={['30px', '300px', '300px', '30vh', '30vh']}
          width={['250px', '250px', '300px', '30vw', '30vw']}
        />
      </RBox> */}
    </Flex>
  )
}

export default DropSummary
