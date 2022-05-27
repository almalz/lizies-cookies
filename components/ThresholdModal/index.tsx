import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useCart } from '../../lib/store'

const MAX = Number(process.env.NEXT_PUBLIC_MAX_QTY)

const ThresholdModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { cartItemsCount } = useCart()

  useEffect(() => {
    if (cartItemsCount && cartItemsCount > MAX) {
      onOpen()
    }
  }, [cartItemsCount, onOpen])

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mt="20%" mx={['2rem', '4rem', '0', '0']}>
        <ModalHeader>{'Une grosse commande ?'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {`Pour les commandes supérieurs à ${MAX} cookies, merci de nous contacter par email.`}
        </ModalBody>
        <ModalFooter>
          <Button
            color="white"
            bg="gray.900"
            mr={3}
            onClick={() => {
              if (typeof window !== 'undefined')
                window.open('mailto:hello@naughtycookies.fr', '_blank')
            }}
          >
            Nous contacter
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ThresholdModal
