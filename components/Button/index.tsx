import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react'
import { Button as ChakraButton } from '@chakra-ui/react'

export type ButtonProps = {
  label?: string
} & ChakraButtonProps

const Button: React.FC<ButtonProps> = ({ label, ...props }) => (
  <ChakraButton {...props}>{label}</ChakraButton>
)

export default Button
