import { useState, useEffect, forwardRef, Ref } from 'react'
import { Input, useNumberInput, Button, HStack } from '@chakra-ui/react'

export type NumberInputProps = {
  onChange?: (v: number) => void
  value?: number
}

const NumberInput = forwardRef(
  ({ onChange, value }: NumberInputProps, ref: Ref<HTMLInputElement>) => {
    const [_value, setValue] = useState<number>(value || 0)
    useEffect(() => {
      onChange && onChange(_value)
    }, [_value, onChange])

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
      useNumberInput({
        step: 1,
        defaultValue: value,
        min: 0,
        max: 24,
        precision: 0,
        onChange: (value) => {
          setValue(Number(value))
        },
      })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()

    return (
      <HStack maxW="320px">
        <Button
          bg="gray.900"
          color="white"
          borderRadius={100}
          fontWeight="700"
          {...dec}
        >
          -
        </Button>
        <Input
          w="45px"
          px={['0', '0', 'auto', 'auto']}
          fontSize={['md', 'md', 'lg', 'lg']}
          textAlign="center"
          ref={ref}
          {...input}
        ></Input>
        <Button
          bg="gray.900"
          color="white"
          borderRadius={100}
          fontWeight="700"
          {...inc}
        >
          +
        </Button>
      </HStack>
    )
  }
)

NumberInput.displayName = 'NumberInput'

export default NumberInput
