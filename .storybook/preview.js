import '../assets/global.css'
import * as NextImage from 'next/image'
const OriginalNextImage = NextImage.default
import 'react-responsive-carousel/lib/styles/carousel.min.css'

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
