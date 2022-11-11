import { Box, useRadio, UseRadioProps } from '@chakra-ui/react'
import clsx from 'clsx'
import { HiCheckCircle } from 'react-icons/hi'

export const RadioCard: React.FC<UseRadioProps> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <div
        {...checkbox}
        className={clsx(
          'flex h-24 cursor-pointer flex-row items-center gap-2 rounded-md  border-2 px-5 py-3 hover:bg-pink-100',
          props.isChecked ? 'border-pink-500 bg-pink-100' : 'border-gray-200'
        )}
      >
        <HiCheckCircle
          className={clsx('fill-purple-500', !props.isChecked && 'opacity-0')}
          size={24}
        />
        <div>{props.children}</div>
      </div>
    </Box>
  )
}
