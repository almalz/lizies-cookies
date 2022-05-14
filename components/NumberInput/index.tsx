import { forwardRef, Ref, useCallback } from 'react'
import {
  Button,
  HStack,
  FormLabel,
  FormControl,
  Box,
  Text,
} from '@chakra-ui/react'

export type NumberInputProps = {
  value?: number | null
  label: string
  onAdd?: () => void
  onRemove?: () => void
  disabled?: boolean
}

const NumberInput = forwardRef(
  (
    { value, label, onAdd, onRemove, disabled = false }: NumberInputProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    const handleAddClick = useCallback(() => {
      onAdd && onAdd()
    }, [onAdd])

    const handleRemoveClick = useCallback(() => {
      onRemove && onRemove()
    }, [onRemove])

    return (
      <FormControl>
        <FormLabel htmlFor={label} visibility="hidden" h={0} w={0} />
        <HStack maxW="120px">
          <Button
            bg="gray.900"
            color="white"
            borderRadius={100}
            fontWeight="700"
            onClick={handleRemoveClick}
            isDisabled={disabled}
            _hover={{ background: '#718096' }}
          >
            -
          </Button>
          <Box
            w="45px"
            px={['0', '0', 'auto', 'auto']}
            fontSize={['md', 'md', 'lg', 'lg']}
            textAlign="center"
          >
            <Text fontWeight="300">{value}</Text>
          </Box>
          <Button
            bg="gray.900"
            color="white"
            borderRadius={100}
            fontWeight="700"
            onClick={handleAddClick}
            ref={ref}
            isDisabled={disabled}
            _hover={{ background: '#718096' }}
          >
            +
          </Button>
        </HStack>
      </FormControl>
    )
  }
)

NumberInput.displayName = 'NumberInput'

export default NumberInput
