import { CloseIcon } from '@chakra-ui/icons'
import { Box, Button, SlideFade, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import add from 'date-fns/add'

type PopperMessageProps = {
  delay?: number
  message: string
  updatedAt: string
}

const INITIAL_DELAY = 3 * 1000

const PopperMessage: React.FC<PopperMessageProps> = ({
  delay,
  message,
  updatedAt,
}) => {
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

    if (true) setTimeout(() => onOpen(), INITIAL_DELAY)
  }, [onOpen])

  useEffect(() => {
    if (delay) {
      setTimeout(() => isOpen && handleClose(), INITIAL_DELAY + delay * 1000)
    }
  }, [delay, handleClose, isOpen])

  return (
    <>
      {true && (
        <SlideFade in={isOpen} offsetY="0px">
          <Box
            pos="fixed"
            w="300px"
            m="24px"
            p="24px"
            pt="24px"
            pr="42px"
            right="0"
            bottom="0"
            borderRadius="xl"
            boxShadow="dark-lg"
            overflow="hidden"
            zIndex="10"
            bg="#FFF"
          >
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
            >
              <CloseIcon />
            </Button>
            <Box>
              <ReactMarkdown
                className="markdown"
                remarkPlugins={[remarkBreaks]}
              >
                {message}
              </ReactMarkdown>
            </Box>
          </Box>
        </SlideFade>
      )}
    </>
  )
}

export default PopperMessage
