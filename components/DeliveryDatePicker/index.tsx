import { Select } from '@chakra-ui/react'
import { useDeliveryConfigQuery } from '../../types/generated/graphql'
import { addDays, format } from 'date-fns'
import fr from 'date-fns/locale/fr'

const formatDate = (date: Date) =>
  format(new Date(date), 'EEEE dd MMM yyyy', { locale: fr })




const generateAllDates = (
  dateRange: number,
  offset: number,
  excludedDates?: Date[]
) => {
  const today = new Date()

  const daysWithOffset = addDays(today, offset || 0)

  const dates = [
    { date: daysWithOffset, dateString: formatDate(daysWithOffset) },
  ]
  
  const index = 1

  while (index < dateRange) {
    const dateToAdd = addDays(dates[dates.length - 1].date, 1)
    if()
    dates.push({ date: dateToAdd, dateString: formatDate(dateToAdd) })
  }

  return dates
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
    deliveryconfig!.nbDaysBeforeDelivery
  )

  console.log(dates)

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
