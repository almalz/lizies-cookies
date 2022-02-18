import { Flex, Heading, Text } from '@chakra-ui/react'
import { NextPage } from 'next'

const ErrorPage: NextPage = () => {
  return (
    <Flex
      flexDir={'column'}
      pt={['16px', '16px', '32px', '64px']}
      px={['16px', '16px', '64px', '144px']}
      textAlign="center"
    >
      <Heading as="h1" size="2xl" mb={['8px', '8px', '16px', '16px']}>
        Ce drop n&#39;est plus disponible
      </Heading>
      <Text>
        Pour connaitre les drops en cours, rends-toi sur notre compte instagram.
      </Text>
    </Flex>
  )
}

export default ErrorPage
