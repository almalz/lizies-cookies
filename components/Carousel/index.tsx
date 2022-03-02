import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { File } from '../../types'
import { Box } from '@chakra-ui/react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { PrevButton, NextButton, DotButton } from './CarouselButtons'

type CssUnit = 'px' | '' | 'em' | 'rem' | '%' | 'vh' | 'vw'
type Value = number
type CssSize = `${Value}${CssUnit}`

export type CarouselProps = {
  images: File[]
  width: CssSize | CssSize[]
  height: CssSize | CssSize[]
}

const Carousel: React.FC<CarouselProps> = ({ images, width, height }) => {
  const autoplayOptions = { delay: 4000 }

  const autoplayRoot = (emblaRoot: any) => emblaRoot.parentElement

  const [viewportRef, embla] = useEmblaCarousel(
    {
      loop: true,
      skipSnaps: false,
    },
    [Autoplay(autoplayOptions, autoplayRoot)]
  )

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedIndex(embla.selectedScrollSnap())
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
  }, [embla, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    onSelect()
    setScrollSnaps(embla.scrollSnapList())
    embla.on('select', onSelect)
  }, [embla, setScrollSnaps, onSelect])

  return (
    <Box className="embla" w={width} h={height}>
      <Box className="embla__viewport" ref={viewportRef} w={width} h={height}>
        <Box className="embla__container" w="100%" h="100%">
          {images.map((image) => {
            return (
              <Box
                key={image.id}
                className="embla__slide"
                overflow="hidden"
                verticalAlign="center"
              >
                <Box
                  className="embla__slide__inner"
                  pos="relative"
                  h="100%"
                  w={width}
                >
                  <Image
                    key={image.id}
                    className="embla__slide__img"
                    src={image.url || ''}
                    alt={image.alt || ''}
                    layout="fill"
                    quality={50}
                    priority
                  />
                </Box>
              </Box>
            )
          })}
        </Box>
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo({ left: index })}
            />
          ))}
        </div>
      </Box>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </Box>
  )
}
export default Carousel
