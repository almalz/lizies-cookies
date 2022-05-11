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
import Snipcart from '../../lib/store'
import { useEffect } from 'react'

const MAX = Number(process.env.NEXT_PUBLIC_MAX_QTY)

const ThresholdModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    let unsubscribe: () => void
    unsubscribe = Snipcart?.store?.subscribe(async () => {
      const itemCount = await Snipcart?.store?.itemCount()
      itemCount > MAX && onOpen()
    })

    return () => {
      unsubscribe && unsubscribe()
    }
  }, [onOpen])

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
                window.open('mailto:hello@liziescookies.fr', '_blank')
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
