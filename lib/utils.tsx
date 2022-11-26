import { format, isValid } from 'date-fns'
import fr from 'date-fns/locale/fr'

export const injectVariables = (
  text: string,
  variableSource: Record<string, any> | undefined
) => {
  if (!variableSource || Object.keys(variableSource).length === 0) {
    return (
      <span
        className="animate-pulse"
        style={{ backgroundColor: ' rgb(229 231 235)', color: 'transparent' }}
      >
        {text}
      </span>
    )
  }

  const keys = Object.keys(variableSource)

  keys.forEach((key) => {
    const placeholder = `%${key}%`

    if (
      variableSource[key] &&
      text &&
      (typeof variableSource[key] === 'string' ||
        typeof variableSource[key] === 'number')
    ) {
      const searchRegExp = new RegExp(placeholder, 'g')
      let replaceWith: any

      if (typeof variableSource[key] === 'string') {
        if (
          (variableSource[key] as string).includes('-') &&
          (variableSource[key] as string).includes(':') &&
          (variableSource[key] as string).includes('.') &&
          isValid(new Date(variableSource[key]))
        ) {
          replaceWith = formatDate(variableSource[key])
        } else {
          replaceWith = variableSource[key]
        }
      } else {
        replaceWith = variableSource[key]
      }

      text = text.replace(searchRegExp, replaceWith)
    }
  })
  return text
}

const formatDate = (date: Date) =>
  format(new Date(date), 'EEEE dd MMM yyyy', { locale: fr })

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}
