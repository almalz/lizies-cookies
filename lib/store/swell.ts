// @ts-ignore
import swell from 'swell-js'

const options = {
  useCamelCase: true,
}

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY,
  options
)

export default swell
