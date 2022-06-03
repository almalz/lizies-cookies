import { forwardRef, useImperativeHandle, Ref, useRef } from 'react'
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react'
import { SwellProduct } from '../../lib/store/products/types'
import { Button } from '../Button'

export type ProductModalProps = {
  product: SwellProduct
}

export type ProductModalRef = {
  onOpenModal: () => void
}

const ProductModal = forwardRef(
  ({ product }: ProductModalProps, ref: Ref<ProductModalRef>) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef<HTMLButtonElement>(null)

    useImperativeHandle(ref, () => ({
      onOpenModal() {
        onOpen()
      },
    }))

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
          <ModalOverlay />
          <ModalContent maxW="800px" mx={['16px', '16px', 'auto', 'auto']}>
            <ModalCloseButton />
            <ModalBody></ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }
)

ProductModal.displayName = 'ProductModal'

export { ProductModal }
