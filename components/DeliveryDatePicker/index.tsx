import { Select } from '@chakra-ui/react'
import { useDeliveryConfigQuery } from '../../types/generated/graphql'
import { addDays, format, isSameDay } from 'date-fns'
import fr from 'date-fns/locale/fr'

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

  if (loading || !data) {
    return null
  }

  const { deliveryconfig, allExcludeddeliverydates } = data

  const dates = generateAllDates(
    deliveryconfig!.deliveryRange,
    deliveryconfig!.nbDaysBeforeDelivery,
    allExcludeddeliverydates.map((d) => new Date(d.date))
  )

  return (
    <Select variant="filled" placeholder="Select option">
      {dates.map(({ dateString, date }) => (
        <option value="date" key={date.toString()}>
          {dateString}
        </option>
      ))}
    </Select>
  )
}

export default DeliveryDatePicker
