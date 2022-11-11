import { Select } from '@chakra-ui/react'
import { useDeliveryConfigQuery } from '../../types/generated/graphql'
import { addDays, format, isSameDay, isValid } from 'date-fns'
import fr from 'date-fns/locale/fr'
import { ChangeEvent, useState } from 'react'

const formatDate = (date: Date) =>
  format(new Date(date), 'EEEE dd MMM yyyy', { locale: fr })

const includesDate = (d: Date, dateArray: Date[]) => {
  for (const date of dateArray) {
    if (isSameDay(date, d)) {
      return true
    }
  }
  return false
}

const generateAllDates = (
  dateRange: number,
  offset: number,
  excludedDates?: Date[]
) => {
  const today = new Date()

  const daysWithOffset = addDays(today, offset || 0)

  let dateBuffer = daysWithOffset
  let index = 0

  const result = []

  while (index < dateRange) {
    const dateToAdd = addDays(dateBuffer, 1)
    dateBuffer = dateToAdd
    if (excludedDates && excludedDates.length > 0) {
      if (!includesDate(dateToAdd, excludedDates)) {
        result.push({ date: dateToAdd, dateString: formatDate(dateToAdd) })
      }
    }
    index++
  }

  return result
}

const DeliveryDatePicker: React.FC<{
  onComplete: (value: string) => void
}> = ({ onComplete }) => {
  const { data, loading } = useDeliveryConfigQuery()

  const [selectedDate, setSelectedDate] = useState<string | undefined>()

  if (loading || !data) {
    return null
  }

  const { deliveryconfig, allExcludeddeliverydates } = data

  const dates = generateAllDates(
    deliveryconfig!.deliveryRange,
    deliveryconfig!.nbDaysBeforeDelivery,
    allExcludeddeliverydates.map((d) => new Date(d.date))
  )

  const handleDateSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const date = e.target.value
    setSelectedDate(date)
    if (isValid(new Date(date))) {
      onComplete(date)
      setSelectedDate(undefined)
    }
  }

  return (
    <Select
      variant="filled"
      placeholder="Select option"
      onChange={handleDateSelect}
      value={selectedDate}
      color="#2E1550"
      bg="#fdecec"
      cursor="pointer"
      _hover={{ background: '#fad9da' }}
      fontFamily="Chloé"
      fontWeight="500"
    >
      {dates.map(({ dateString, date }) => (
        <option value={dateString} key={date.toString()}>
          {dateString}
        </option>
      ))}
    </Select>
  )
}

export default DeliveryDatePicker
