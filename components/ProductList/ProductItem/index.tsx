import { Flex, Text, Center } from '@chakra-ui/react'
import Image from 'next/image'
import { Product } from '../../../types'
import NumberInput from '../../NumberInput'
import { useState } from 'react'

export type ProductItemProps = {
  product: Product
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [value, setValue] = useState(0)

  return (
    <Flex
      p={['8px', '8px', '16px', '16px']}
      borderRadius="md"
      border="1px"
      direction={'row'}
      boxShadow="xl"
    >
      <Center
        m="4px"
        borderRadius="md"
        overflow="hidden"
        minHeight="100%"
        minWidth={['45%', '45%', 'auto', 'auto']}
        sx={{ img: { borderRadius: '0.25rem' } }}
      >
        <Image
          src={product.pictures[0].url || ''}
          alt={product.pictures[0].alt || product.name || ''}
          width="170px"
          height="170px"
        />
      </Center>
      <Flex px="16px" py="8px" flexDirection="column" flexGrow={1}>
        <Flex
          flexGrow="2"
          flexDirection="column"
          gap={['8px', '8px', '16px', '16px']}
          pr="16px"
        >
          <Text
            fontWeight={'700'}
            fontSize={['md', 'md', 'xl', 'xl']}
            _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
            lineHeight={'1rem'}
          >
            {product.name}
          </Text>
          <Text
            fontWeight={'400'}
            fontSize={['xs', 'xs', 'sm', 'sm']}
            color="gray.500"
            lineHeight={'0.9rem'}
          >
            {product.description}
          </Text>
          <Flex display={['flex', 'flex', 'none', 'none']}>
            <Text
              fontWeight={'700'}
              fontSize={['md', 'md', 'xl', 'xl']}
              whiteSpace="nowrap"
            >
              {`${product.unitPrice.toFixed(2)} €`}
            </Text>
          </Flex>
        </Flex>

        <Flex
          pt={['8px', '8px', '0', '0']}
          align={'center'}
          justify={['center', 'center ', 'end', 'end']}
          w={['100%', '100% ', 'auto', 'auto']}
        >
          <Flex flexGrow={1} display={['none', 'none', 'flex', 'flex']}>
            <Text fontWeight={'700'} fontSize={'xl'} whiteSpace="nowrap">
              {`${product.unitPrice.toFixed(2)} €`}
            </Text>
          </Flex>
          <Flex>
            <NumberInput value={value} onChange={(value) => setValue(value)} />

            {/* <Button
              w={['100%', '100%', 'auto', 'auto']}
              ml={['8px', '8px', '16px', '16px']}
              fontSize={['sm', 'sm', 'md', 'md']}
              bg="gray.900"
              color="white"
              display="none"
            >
              Ajouter
            </Button> */}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ProductItem
