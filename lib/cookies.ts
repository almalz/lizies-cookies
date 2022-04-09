import Cookies from 'universal-cookie'
const cookies = new Cookies()

export const setCookiesExpiration = (cookieName: string, date: Date) => {
  const existingCookie = cookies.get(cookieName)

  if (existingCookie) {
    cookies.set(cookieName, existingCookie, { expires: date, path: '/' })
  }
}
