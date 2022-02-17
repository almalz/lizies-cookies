import { Heading, Text, Flex, Box } from '@chakra-ui/react'
import format from 'date-fns/format'
import { Drop } from '../../types'
import Carousel from '../Carousel'

export type DropSummaryProps = {
  drop: Drop
}

const formatDate = (date: Date) => format(new Date(2014, 1, 11), 'MM/dd/yyyy')

const DropSummary: React.FC<DropSummaryProps> = ({ drop }) => {
  return (
    <Flex flexDirection={'column'}>
      <Heading as="h1" size="2xl" mb="32px">{`Drop du ${formatDate(
        drop.deliveryDate
      )}`}</Heading>
      <Text
        as="i"
        color="gray.400"
        mb="16px"
      >{`Commandes possibles jusqu’au ${formatDate(
        drop.endDate
      )} à 23:59`}</Text>
      <Text
        color="gray.500"
        mb="32px"
      >{`Commandes disponibles le samedi matin \n
              À récupérer a l’arret de Tram ”Mairie du Bouscat” (ligne D).\n
              Livraison possible à Bordeaux ou au Bouscat.`}</Text>
      <Box display={['none', 'none', 'block', 'block']} mx="auto">
        <Carousel
          images={drop.pictures}
          width={['250px', '250px', '450px', '450px']}
          height={['30px', '300px', '500px', '500px']}
        />
      </Box>
    </Flex>
  )
}

export default DropSummary
