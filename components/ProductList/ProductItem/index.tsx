import {
  Button,
  Flex,
  Text,
  Center,
  NumberInput,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { ProductRecord } from '../../../types/generated/graphql'
import Image from 'next/image'
import { Product } from '../../../types'
import { ChangeEvent, useCallback, useState } from 'react'

export type ProductItemProps = {
  product: Product
}

const IMAGE_SIZE = ['144px', '144px', '72px', '72px']

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [productQty, setProductQty] = useState<number>(0)

  return (
    <Flex
      p="8px"
      maxWidth={['150px', '250px', '650px', '650px']}
      borderRadius="md"
      border="1px"
      direction={['column', 'column', 'row', 'row']}
      align={['auto', 'auto', 'center', 'center']}
    >
      <Center
        width={IMAGE_SIZE}
        height={IMAGE_SIZE}
        borderRadius="md"
        overflow="hidden"
      >
        <Image
          src={product.pictures[0].url || ''}
          alt={product.pictures[0].alt || product.name || ''}
          width="200px"
          height="200px"
        />
      </Center>
      <Flex
        pl="16px"
        align={['center', 'center', 'start ', 'start']}
        justify={['start', 'start', 'end ', 'end']}
        flexGrow="2"
      >
        <Text
          fontWeight={'700'}
          fontSize={['sm', 'md', 'md', 'md']}
          _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          {product.name}
        </Text>
      </Flex>
      <Flex
        pl={['0', '0', '16px', '16px']}
        pt={['8px', '8px', '0', '0']}
        align={['center', 'center', 'end ', 'end']}
        justify={['center', 'center ', 'end', 'end']}
      >
        <NumberInput
          w="80px"
          value={productQty}
          onChange={(value) => setProductQty(Number(value))}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
      <Flex
        px={['8px', '16px', '0', '0']}
        pl={['0', '0', '16px', '16px']}
        pt={['8px', '8px', '0', '0']}
        align={['end', 'end ', 'end', 'end']}
        justify={['center', 'center ', 'end', 'end']}
        w={['100%', '100% ', 'auto', 'auto']}
      >
        <Button
          w={['100%', '100%', 'auto', 'auto']}
          fontSize={['sm', 'sm', 'md', 'md']}
        >
          Ajouter
        </Button>
      </Flex>
    </Flex>
  )
}

export default ProductItem
