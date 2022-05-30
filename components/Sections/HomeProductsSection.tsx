import { useCallback } from 'react'
import { SwellProduct } from '../../lib/store/products/types'
import { H2, ParagraphXl } from '../Typography'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { ButtonLink } from '../Button'

type ProductsSectionProps = {
  products: SwellProduct[]
  buttonLabel: string
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  buttonLabel,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 400000 }),
  ])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative h-screen bg-pink-gray sm:h-4/5">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {products.map((product) => (
            <div className="embla__slide h-full" key={product.id}>
              <div className="flex h-full w-full flex-col gap-10 pb-8 sm:flex-row sm:gap-4 sm:p-28">
                <div className="relative h-1/2 w-full flex-[2] overflow-hidden sm:h-[35rem] ">
                  <Image
                    src={product.images![0].file.url}
                    alt={product.name!}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex flex-[3] flex-col gap-8 px-14 py-2 text-purple-700 sm:gap-12 sm:py-24 sm:pl-32 sm:pr-16">
                  <H2>{product.name!}</H2>
                  <ParagraphXl markdown>
                    {product.content?.sliderText || ''}
                  </ParagraphXl>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-[10%] z-10 flex justify-center sm:left-auto sm:right-[25%] sm:bottom-[20%]">
        <ButtonLink color="purple" href="/drop">
          {buttonLabel}
        </ButtonLink>
      </div>
      <div className="absolute inset-x-0 top-[20%] flex justify-between sm:inset-0 sm:px-8">
        <button className="embla__prev" onClick={scrollPrev}>
          <HiOutlineChevronLeft size={70} color="white" />
        </button>
        <button className="embla__next" onClick={scrollNext}>
          <HiOutlineChevronRight size={70} color="white" />
        </button>
      </div>
    </div>
  )
}
