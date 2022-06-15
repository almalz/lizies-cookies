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

const ProductsSection: React.FC<ProductsSectionProps> = ({
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
              <div className="flex h-full w-full flex-col gap-10 pb-8 sm:flex-row sm:gap-4 sm:px-10 sm:py-8 md:px-24 md:py-20 lg:px-32 lg:py-32">
                <div className="relative h-1/2 w-full overflow-hidden sm:h-[25rem] sm:flex-1 md:h-[25rem] lg:h-[35rem] ">
                  <Image
                    src={product.images![0].file.url}
                    alt={product.name!}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-8 px-10 py-2 text-purple-700 sm:gap-12 sm:px-8 md:my-12 md:ml-8 md:mr-4 md:px-0 lg:my-24 lg:ml-16 lg:mr-16 lg:px-14">
                  <H2>{product.name!}</H2>
                  <ParagraphXl markdown>
                    {product.content?.sliderText || ''}
                  </ParagraphXl>
                  <div className="z-10 flex flex-1 items-center justify-center sm:left-auto md:bottom-[15%] md:right-[10%] md:hidden lg:bottom-[20%] lg:right-[25%]">
                    <div className="flex h-fit w-max flex-row items-center justify-center">
                      <ButtonLink color="purple" href="/drop">
                        {buttonLabel}
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-[10%] z-10 hidden items-center justify-center sm:left-auto md:bottom-[15%] md:right-[10%] md:flex lg:bottom-[20%] lg:right-[25%]">
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

export default ProductsSection
