import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react'
import clsx from 'clsx'

export type ButtonProps = {
  color?: 'pink' | 'purple'
} & ChakraButtonProps

export const Button: React.FC<ButtonProps> = ({
  color = 'pink',
  children,
  ...props
}) => {
  return (
    <ChakraButton
      className={clsx([
        'border-3 py-3 px-16 font-title text-lg',
        color === 'pink' && 'text-pink-500 border-pink-500 hover:bg-pink-100',
        color === 'purple' &&
          'text-purple-700 border-purple-700 hover:bg-purple-200',
      ])}
      {...props}
    >
      {children}
    </ChakraButton>
  )
}
