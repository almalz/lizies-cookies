import { useCallback } from 'react'
import { FormLabel, FormControl } from '@chakra-ui/react'
import { HiPlus, HiMinus } from 'react-icons/hi'
import { Button } from '../Button'

export type NumberInputProps = {
  value?: number | null
  label: string
  onAdd?: () => void
  onRemove?: () => void
  disabled?: boolean
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  label,
  onAdd,
  onRemove,
  disabled = false,
}) => {
  const handleAddClick = useCallback(() => {
    onAdd && onAdd()
  }, [onAdd])

  const handleRemoveClick = useCallback(() => {
    onRemove && onRemove()
  }, [onRemove])

  return (
    <div className="flex items-center">
      <FormControl className="flex items-center justify-center">
        <FormLabel htmlFor={label} visibility="hidden" margin={0} h={0} w={0} />
        <div className="flex w-28 flex-row items-center justify-between md:w-32 xl:w-32">
          <div>
            <Button
              onClick={handleRemoveClick}
              className="px-1.5 py-1.5 sm:px-2 sm:py-2"
              disabled={!value}
            >
              <HiMinus />
            </Button>
          </div>
          <div className="flex flex-1 justify-center leading-4">
            <span className="font-body text-xl text-pink-500 sm:text-2xl">
              {value}
            </span>
          </div>
          <div>
            <Button
              onClick={handleAddClick}
              className="px-1.5 py-1.5 sm:px-2 sm:py-2"
            >
              <HiPlus />
            </Button>
          </div>
        </div>
      </FormControl>
    </div>
  )
}

export default NumberInput
