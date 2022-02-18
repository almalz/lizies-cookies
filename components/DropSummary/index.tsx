import { Heading, Text, Flex, Box } from '@chakra-ui/react'
import format from 'date-fns/format'
import { Drop } from '../../types'
import Carousel from '../Carousel'
import { RBox } from '../Breakpoints'

export type DropSummaryProps = {
  drop: Drop
}

const formatDate = (date: Date) => format(new Date(2014, 1, 11), 'MM/dd/yyyy')

const DropSummary: React.FC<DropSummaryProps> = ({ drop }) => {
  return (
    <Flex flexDirection={'column'}>
      <Heading
        as="h1"
        size="2xl"
        mb="32px"
        w={['80%', '80%', '100%', '100%']}
      >{`Drop du ${formatDate(drop.deliveryDate)}`}</Heading>
      <Text
        as="i"
        color="gray.400"
        mb="16px"
      >{`Commandes possibles jusqu’au ${formatDate(
        drop.endDate
      )} à 23:59`}</Text>
      <Text
        color="gray.500"
        mb={['4px', '4px', '32px', '32px']}
      >{`Commandes disponibles le samedi matin \n
              À récupérer a l’arret de Tram ”Mairie du Bouscat” (ligne D).\n
              Livraison possible à Bordeaux ou au Bouscat.`}</Text>
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
