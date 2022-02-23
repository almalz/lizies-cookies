import { Heading, Text, Flex } from '@chakra-ui/react'
import format from 'date-fns/format'
import { Drop } from '../../types'
import Carousel from '../Carousel'
import { RBox } from '../Breakpoints'
import { DroppageRecord } from '../../types/generated/graphql'
import Countdown from 'react-countdown'
import { injectVariables } from '../../lib/utils'

export type DropSummaryProps = {
  pageBody: DroppageRecord
  drop: Drop
}

const formatDate = (date: Date) => format(new Date(date), 'dd.MM.yyyy')

const DropSummary: React.FC<DropSummaryProps> = ({ drop, pageBody }) => {
  return (
    <Flex flexDirection={'column'}>
      <Heading as="h1" size="xl" mb="32px" w={['80%', '80%', '100%', '100%']}>
        {pageBody.title && injectVariables(pageBody.title, drop)}
      </Heading>
      <Text as="i" color="gray.700" mb="16px">
        {'Fin du drop dans '}
        <Countdown
          date={drop.endDate}
          renderer={(props) => (
            <span>{`${props.days} jour(s) ${props.hours} h ${props.minutes} min ${props.seconds} s`}</span>
          )}
        />
      </Text>
      <Text color="gray.700" mb={['4px', '4px', '32px', '32px']}>
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
