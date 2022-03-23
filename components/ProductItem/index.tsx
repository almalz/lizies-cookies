import { Flex, Text, Center, Box } from '@chakra-ui/react'
import Image from 'next/image'
import { Product } from '../../types'
import ProductModal, { ProductModalRef } from './ProductModal'
import { useRef } from 'react'
import { RFlex } from '../Breakpoints'
import dynamic from 'next/dynamic'

const ProductForm = dynamic(() => import('../ProductForm'), { ssr: false })

export type ProductItemProps = {
  product: Product
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const modalRef = useRef<ProductModalRef>(null)

  return (
    <Flex
      p={['8px', '8px', '16px', '16px']}
      borderRadius="md"
      border="1px solid"
      borderColor="gray.200"
      direction={'row'}
      align={['center', 'center', 'normal', 'normal']}
      boxShadow="md"
      width="100%"
      height={['40%', '40%', '40%', '30%']}
    >
      <Center
        m="4px"
        borderRadius="md"
        overflow="hidden"
        height="100%"
        sx={{ img: { borderRadius: '0.25rem' } }}
      >
        <Box pos="relative" w="150px" h="150px" overflow="hidden">
          <Image
            src={product.pictures[0].url || ''}
            alt={product.pictures[0].alt || product.name || ''}
            layout="fill"
            quality={50}
          />
        </Box>
      </Center>
      <Flex
        px="16px"
        py="8px"
        flexDirection="column"
        flexGrow={1}
        width={['55%', '55%', '55%', '70%']}
      >
        <Flex
          flexGrow="2"
          flexDirection="column"
          gap={['8px', '8px', '16px', '16px']}
          pr="16px"
        >
          <Text
            fontWeight={'700'}
            fontSize={['lg', 'lg', 'xl', 'xl']}
            _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
            lineHeight={'1rem'}
            onClick={() => modalRef.current?.onOpenModal()}
            maxWidth="100%"
          >
            {product.name}
          </Text>
          <Text
            fontWeight={'400'}
            fontSize={['sm', 'sm', 'sm', 'sm']}
            color="gray.600"
            lineHeight={'1rem'}
            maxWidth="100%"
          >
            {product.description}
          </Text>
          <RFlex mobileOnly>
            <Text
              fontWeight={'700'}
              fontSize={['lg', 'lg', 'xl', 'xl']}
              whiteSpace="nowrap"
            >
              {`${product.unitPrice.toFixed(2)} €`}
            </Text>
          </RFlex>
        </Flex>

        <Flex
          pt={['8px', '8px', '0', '0']}
          align={'center'}
          justify={'end'}
          w={['100%', '100% ', 'auto', 'auto']}
        >
          <RFlex flexGrow={1} desktopOnly>
            <Text fontWeight={'700'} fontSize={'xl'} whiteSpace="nowrap">
              {`${product.unitPrice.toFixed(2)} €`}
            </Text>
          </RFlex>
          <Flex>
            <ProductForm product={product} zeroWhenNull />
          </Flex>
        </Flex>
      </Flex>
      <ProductModal product={product} ref={modalRef} />
    </Flex>
  )
}

export default ProductItem
