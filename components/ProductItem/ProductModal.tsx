import { forwardRef, useImperativeHandle, Ref, useRef } from 'react'
import Image from 'next/image'
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
import { formatPrice } from '../../lib/utils'
import ProductForm from '../ProductForm'
import { Paragraph } from '../Typography'

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
          <ModalContent
            maxW="1000px"
            maxH="90%"
            borderRadius="none"
            m={['16px', '16px', '10%', '15%', '15%']}
            overflow="auto"
            className="border-3 border-purple-700"
          >
            <ModalCloseButton color="pink" size="lg" />
            <ModalBody>
              <div className="flex flex-col items-center pt-4 sm:flex-row sm:items-start">
                <div className="relative m-1 aspect-square w-[80%] self-center sm:w-full">
                  <Image
                    src={product.images![0].file.url}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex h-full w-full flex-col justify-end px-4 py-4 sm:p-8">
                  <div className="text-left text-purple-700 ">
                    <h3 className="font-title text-2xl sm:text-4xl ">
                      {product.name}
                    </h3>
                    <div className="flex flex-col gap-4 py-4 sm:py-8">
                      <div className="flex-1">
                        <Paragraph className="" markdown>
                          {product.description}
                        </Paragraph>
                      </div>
                      {product.content?.ingredients && (
                        <div className="flex">
                          <Paragraph className="flex" markdown>
                            {'**Ingrédients** : ' +
                              product.content?.ingredients}
                          </Paragraph>
                        </div>
                      )}
                      {product.content?.allergens && (
                        <div className="flex">
                          <Paragraph className="block" markdown>
                            {'**Allergènes** : ' + product.content?.allergens}
                          </Paragraph>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col items-start justify-between gap-1 pt-2 sm:flex-none sm:flex-row sm:items-center sm:pt-4">
                    <div>
                      <span className="font-body text-xl text-purple-700 sm:text-3xl">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <div className="flex w-full justify-end">
                      <ProductForm product={product} />
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }
)

ProductModal.displayName = 'ProductModal'

export { ProductModal }
