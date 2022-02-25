import { forwardRef, useImperativeHandle, Ref, useRef } from 'react'
import {
  Flex,
  Text,
  Center,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import Image from 'next/image'
import { Product } from '../../types'
import { RFlex } from '../Breakpoints'
import dynamic from 'next/dynamic'

const ProductForm = dynamic(() => import('../ProductForm'), { ssr: false })

export type ProductModalProps = {
  product: Product
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
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent
          maxW="800px"
          borderRadius="xl"
          mx={['16px', '16px', 'auto', 'auto']}
        >
          <ModalCloseButton ref={initialRef} />
          <Flex
            p={['8px', '8px', '32px', '32px']}
            borderRadius="xl"
            direction={['column', 'column', 'row', 'row']}
            boxShadow="xl"
          >
            <Center
              m="auto"
              borderRadius="xl"
              overflow="hidden"
              minHeight="100%"
              minWidth={'45%'}
              maxWidth={'75%'}
              sx={{ img: { borderRadius: '0.25rem' } }}
            >
              <Image
                src={product.pictures[0].url || ''}
                alt={product.pictures[0].alt || product.name || ''}
                width="300px"
                height="300px"
                quality={50}
              />
            </Center>
            <Flex
              pl={['8px', '8px', '32px', '32px']}
              px="16px"
              py="8px"
              flexDirection="column"
              flexGrow={1}
            >
              <Flex
                flexGrow="2"
                flexDirection="column"
                gap={['8px', '8px', '16px', '16px']}
                pr="16px"
              >
                <Text
                  fontWeight={'700'}
                  fontSize={['xl', 'xl', '3xl', '3xl']}
                  lineHeight={'1.8rem'}
                >
                  {product.name}
                </Text>
                <Text
                  fontWeight={'500'}
                  fontSize={['sm', 'sm', 'lg', 'lg']}
                  color="gray.700"
                  lineHeight={'1.2rem'}
                >
                  {product.description}
                </Text>
                {product.ingredients && (
                  <Text
                    fontWeight={'400'}
                    fontSize={['sm', 'sm', 'md', 'md']}
                    color="gray.500"
                    lineHeight={'1.2rem'}
                  >
                    {`ingrédients : ${product.ingredients}`}
                  </Text>
                )}
                {product.allergens && (
                  <Text
                    fontWeight={'400'}
                    fontSize={['sm', 'sm', 'md', 'md']}
                    color="gray.500"
                    lineHeight={'1.2rem'}
                  >
                    {`allergènes : ${product.allergens}`}
                  </Text>
                )}
                <RFlex mobileOnly>
                  <Text
                    fontWeight={'700'}
                    fontSize={['xl', 'xl', '3xl', '3xl']}
                    whiteSpace="nowrap"
                  >
                    {`${product.unitPrice.toFixed(2)} €`}
                  </Text>
                </RFlex>
              </Flex>

              <Flex
                pt={['8px', '8px', '24px', '24px']}
                align={'center'}
                justify={['center', 'center ', 'end', 'end']}
                w={['100%', '100% ', 'auto', 'auto']}
              >
                <RFlex flexGrow={1} desktopOnly>
                  <Text
                    fontWeight={'700'}
                    fontSize={['xl', 'xl', '3xl', '3xl']}
                    whiteSpace="nowrap"
                  >
                    {`${product.unitPrice.toFixed(2)} €`}
                  </Text>
                </RFlex>
                <Flex>
                  <ProductForm product={product} zeroWhenNull />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    )
  }
)

ProductModal.displayName = 'ProductModal'

export default ProductModal
