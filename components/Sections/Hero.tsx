import Image from 'next/image'
import { useRouter } from 'next/router'
import { Button } from '../Button'
import { Navbar } from '../Navbar'

type HeroProps = {
  heroImageUrl: string
  heroCtaLabel: string
}

export const Hero: React.FC<HeroProps> = ({ heroImageUrl, heroCtaLabel }) => {
  const router = useRouter()

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col items-center gap-y-12 bg-purple-700 px-6 pt-6 pb-12	">
        <div className="relative w-11/12 flex-1 overflow-hidden">
          <Image
            src={heroImageUrl}
            alt="image de fond naughty_cookies"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <Button color="pink" onClick={() => router.push('/drop')}>
            {heroCtaLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
