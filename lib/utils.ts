import { format, isValid } from 'date-fns'
import fr from 'date-fns/locale/fr'

export const injectVariables = (
  text: string,
  variableSource: Record<string, any>
) => {
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

      if (isValid(new Date(variableSource[key]))) {
        replaceWith = formatDate(variableSource[key])
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
