import { Flex, Text, Center, Box, AspectRatio } from '@chakra-ui/react'
import Image from 'next/image'
import ProductModal, { ProductModalRef } from './ProductModal'
import { useRef } from 'react'
import { RFlex } from '../Breakpoints'
import dynamic from 'next/dynamic'
import { SwellProduct } from '../../lib/store/products/types'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'

const ProductForm = dynamic(() => import('../ProductForm'), { ssr: false })

export type ProductItemProps = {
  product: SwellProduct
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
        onClick={() => modalRef.current?.onOpenModal()}
        _hover={{ opacity: 0.8, cursor: 'pointer' }}
      >
        <Box pos="relative" w="150px" h="150px" overflow="hidden">
          <AspectRatio ratio={3 / 4} sx={{ transform: 'translateY(-25px)' }}>
            <Image
              src={product.images[0].file.url || ''}
              alt={product.name || ''}
              layout="fill"
              quality={50}
            />
          </AspectRatio>
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
          <div>
            <Text
              fontWeight={'400'}
              fontSize={['sm', 'sm', 'sm', 'sm']}
              color="gray.600"
              lineHeight={'1rem'}
              maxWidth="100%"
            >
              <ReactMarkdown>{product.description}</ReactMarkdown>
            </Text>
          </div>
          <RFlex mobileOnly className="price-mobile">
            <Text
              fontWeight={'700'}
              fontSize={['lg', 'lg', 'xl', 'xl']}
              whiteSpace="nowrap"
            >
              {`${product.price.toFixed(2)} €`}
            </Text>
          </RFlex>
        </Flex>

        <Flex
          pt={['8px', '8px', '0', '0']}
          align={'center'}
          justify={'end'}
          w={['100%', '100% ', 'auto', 'auto']}
        >
          <RFlex flexGrow={1} desktopOnly className="price-desktop">
            <Text fontWeight={'700'} fontSize={'xl'} whiteSpace="nowrap">
              {`${product.price.toFixed(2)} €`}
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
