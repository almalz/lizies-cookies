import { forwardRef, Ref, useCallback } from 'react'
import { Button, HStack, FormLabel, FormControl, Box } from '@chakra-ui/react'

export type NumberInputProps = {
  value?: number | null
  label: string
  onAdd?: () => void
  onRemove?: () => void
}

const NumberInput = forwardRef(
  (
    { value, label, onAdd, onRemove }: NumberInputProps,
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
        <HStack maxW="320px">
          <Button
            bg="gray.900"
            color="white"
            borderRadius={100}
            fontWeight="700"
            onClick={handleRemoveClick}
          >
            -
          </Button>
          <Box
            w="45px"
            px={['0', '0', 'auto', 'auto']}
            fontSize={['md', 'md', 'lg', 'lg']}
            textAlign="center"
          >
            {value}
          </Box>
          <Button
            bg="gray.900"
            color="white"
            borderRadius={100}
            fontWeight="700"
            onClick={handleAddClick}
            ref={ref}
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
