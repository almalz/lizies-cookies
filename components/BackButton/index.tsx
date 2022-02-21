import { ArrowBackIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'
import { useCallback } from 'react'

const BackButton: React.FC = () => {
  const handleClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.history.back()
    }
  }, [])

  return (
    <Flex
      pos={['static', 'static', 'static', 'fixed']}
      top={[0, 0, 0, 32]}
      left={[0, 0, 0, 28]}
      pt={['32px', '32px', '64px', '0px']}
      pl={['16px', '32px', '96px', '0px']}
      cursor={'pointer'}
      alignItems="center"
      onClick={handleClick}
      as={'button'}
    >
      <ArrowBackIcon w={6} h={6} mr={2} />
      Retour
    </Flex>
  )
}

export default BackButton
