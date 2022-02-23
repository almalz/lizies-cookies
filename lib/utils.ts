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
      text = text.replace(searchRegExp, variableSource[key])
    }
  })
  return text
}
