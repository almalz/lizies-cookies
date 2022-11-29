import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react'
import { forwardRef } from 'react'

export type InputProps = {
  label?: string
  helperText?: string
  className?: string
} & ChakraInputProps

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, className, ...props }, ref) => {
    return (
      <FormControl className={className} fontSize={['sm', 'sm', 'md']}>
        {label && (
          <FormLabel
            className="font-body"
            m={0}
            color="#2E1550"
            fontSize={['sm', 'sm', 'md']}
          >
            {label}
          </FormLabel>
        )}
        <ChakraInput
          ref={ref}
          fontSize={['sm', 'sm', 'md']}
          borderColor="rgb(107 114 128)"
          borderWidth={1}
          _focus={{ borderColor: 'rgb(243 161 162)', borderWidth: '2px' }}
          {...props}
        />
        {helperText && (
          <FormHelperText fontSize={['sm', 'sm', 'md']}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    )
  }
)

Input.displayName = 'Input'
