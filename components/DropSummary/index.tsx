import { Heading, Text, Flex } from '@chakra-ui/react'
import { Drop } from '../../types'
import Carousel from '../Carousel'
import { RBox } from '../Breakpoints'
import { DroppageRecord } from '../../types/generated/graphql'
import { injectVariables } from '../../lib/utils'
import { CountdownRenderProps } from 'react-countdown'
import dynamic from 'next/dynamic'

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
            date={drop.endDate}
            renderer={(props) => <RenderCountdown {...props} />}
          />
        )}
      </Text>

      <Text color="gray.800" mb={['4px', '4px', '32px', '32px']}>
        {pageBody.description}
      </Text>
      <RBox desktopOnly mx="auto">
        <Carousel
          images={drop.pictures}
          height={['30px', '300px', '300px', '300px', '400px']}
          width={['250px', '250px', '300px', '300px', '400px']}
        />
      </RBox>
    </Flex>
  )
}

export default DropSummary
