import Image from 'next/image'
import { ButtonLink } from '../Button'
import { Navbar } from '../Navbar'

type HeroProps = {
  heroImageUrl: string
  heroImageAlt: string
  heroCtaLabel: string
}

const Hero: React.FC<HeroProps> = ({
  heroImageUrl,
  heroImageAlt,
  heroCtaLabel,
}) => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div
        className="flex flex-1 flex-col items-center gap-y-12 bg-purple-700 px-6 pt-6 pb-12"
        style={{ marginTop: '-1px' }}
      >
        <div className="relative w-11/12 flex-1 overflow-hidden">
          <Image
            src={heroImageUrl}
            alt={heroImageAlt}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div>
          <ButtonLink color="pink" href="/drop">
            {heroCtaLabel}
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}

export default Hero
