import { forwardRef, Ref, useCallback } from 'react'
import {
  Input,
  useNumberInput,
  Button,
  HStack,
  FormLabel,
  FormControl,
} from '@chakra-ui/react'

export type NumberInputProps = {
  onChange?: (v: number) => void
  onAdd?: () => void
  onRemove?: () => void
  value?: number
  label: string
}

const STEP = Number(process.env.NEXT_PUBLIC_INPUT_STEP) || 1
const MIN = Number(process.env.NEXT_PUBLIC_MIN_QTY) || 0
const MAX = Number(process.env.NEXT_PUBLIC_MAX_QTY) || 24

const NumberInput = forwardRef(
  (
    { onChange, value, onAdd, onRemove, label }: NumberInputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
      useNumberInput({
        step: STEP,
        defaultValue: value,
        min: MIN,
        max: MAX,
        precision: 0,
        onChange: (value) => {
          onChange && onChange(Number(value))
        },
      })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps({ readOnly: true })

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
            // {...dec}
            onClick={handleRemoveClick}
          >
            -
          </Button>
          <Input
            name={label}
            w="45px"
            px={['0', '0', 'auto', 'auto']}
            fontSize={['md', 'md', 'lg', 'lg']}
            textAlign="center"
            ref={ref}
            // {...input}
            value={value}
          ></Input>
          <Button
            bg="gray.900"
            color="white"
            borderRadius={100}
            fontWeight="700"
            // {...inc}
            onClick={handleAddClick}
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
