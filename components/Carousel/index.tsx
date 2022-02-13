import Image from 'next/image'
import { File } from '../../types'
import { Carousel as RRCarousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Box } from '@chakra-ui/react'

type CssUnit = 'px' | '' | 'em' | 'rem' | '%'
type Value = number
type CssSize = `${Value}${CssUnit}`

export type CarouselProps = {
  images: File[]
  width: CssSize | CssSize[]
  height: CssSize | CssSize[]
}

const Carousel: React.FC<CarouselProps> = ({ images, width, height }) => {
  return (
    <Box w={width} h={height} borderRadius="md" overflow="hidden">
      <RRCarousel
        showArrows
        showIndicators
        swipeable
        emulateTouch
        autoPlay
        showStatus={false}
        infiniteLoop
        useKeyboardArrows
      >
        {images.map((image) => {
          return (
            <Image
              key={image.id}
              src={image.url || ''}
              alt={image.alt || ''}
              height="500px"
              width="450px"
            />
          )
        })}
      </RRCarousel>
    </Box>
  )
}
export default Carousel
