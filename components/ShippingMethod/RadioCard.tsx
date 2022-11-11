import { Box, Spinner, useRadio, UseRadioProps } from '@chakra-ui/react'
import clsx from 'clsx'
import { HiCheckCircle } from 'react-icons/hi'

export const RadioCard: React.FC<UseRadioProps & { loading?: boolean }> = (
  props
) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <div
        {...checkbox}
        className={clsx(
          'flex h-24 cursor-pointer flex-row items-center gap-2 rounded-md border-2 border-pink-500 px-5 py-3 text-purple-500 hover:bg-pink-100',
          props.isChecked && 'bg-pink-100'
        )}
      >
        {props.loading && props.isChecked && (
          <Spinner color="#584473" size="sm" />
        )}
        {!props.loading && props.isChecked && (
          <HiCheckCircle
            className={clsx('fill-purple-500', !props.isChecked && 'opacity-0')}
            size={18}
          />
        )}
        <div className="w-full">{props.children}</div>
      </div>
    </Box>
  )
}

export const RadioCardSkeleton: React.FC = () => {
  return (
    <div className="flex h-24 animate-pulse flex-row items-center gap-2 rounded-md bg-gray-100 px-5 py-3" />
  )
}
