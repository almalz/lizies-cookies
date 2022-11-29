import { CloseIcon } from '@chakra-ui/icons'
import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useCallback } from 'react'
import add from 'date-fns/add'
import { H2, ParagraphXl } from '../Typography'

type PopperMessageProps = {
  delay?: number
  message: string
  title?: string
}

const INITIAL_DELAY = 2 * 1000

const PagePopup: React.FC<PopperMessageProps> = ({ delay, message, title }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const handleClose = useCallback(() => {
    sessionStorage.setItem('messageDismissed', Date.now().toString())
    onClose()
  }, [onClose])

  useEffect(() => {
    const dismissedAt = Number(sessionStorage.getItem('messageDismissed'))

    let show = !dismissedAt

    if (dismissedAt) {
      show = add(new Date(dismissedAt), { hours: 1 }).getTime() < Date.now()
    }

    if (true) {
      setTimeout(() => onOpen(), INITIAL_DELAY)
    }
  }, [onOpen])

  useEffect(() => {
    if (delay) {
      setTimeout(() => isOpen && handleClose(), INITIAL_DELAY + delay * 1000)
    }
  }, [delay, handleClose, isOpen])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay>
          <ModalContent>
            <div className="absolute inset-0 z-10 m-8 h-min border-2 border-pink-500 bg-white p-8">
              <Button
                aria-label="Close message"
                pos="absolute"
                top="0"
                right="0"
                m="8px"
                p="8px"
                borderRadius="lg"
                bg="transparent"
                onClick={() => handleClose()}
                className="text-pink-500"
              >
                <CloseIcon />
              </Button>
              <div className="pt-8 text-purple-700">
                {title && (
                  <div className="pb-8 text-pink-500">
                    <H2>{title}</H2>
                  </div>
                )}
                <ParagraphXl className="font-body">{message}</ParagraphXl>
              </div>
            </div>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  )
}

export default PagePopup
