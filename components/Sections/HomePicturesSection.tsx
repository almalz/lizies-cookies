import Image from 'next/image'

type Picture = {
  alt: string
  url: string
}

type PictureSectionProps = {
  topLeftPicture: Picture
  bottomLeftPicture: Picture
  rightPicture: Picture
}

export const PictureSection: React.FC<PictureSectionProps> = ({
  topLeftPicture,
  bottomLeftPicture,
  rightPicture,
}) => {
  return (
    <div className="flex w-full justify-center bg-white sm:max-h-section">
      <div className="flex h-full w-full sm:max-w-6xl sm:gap-8 sm:p-40 ">
        <div className="flex h-full w-full flex-col items-stretch justify-between gap-8 p-4 sm:p-0">
          <div className="aspect-w-1 aspect-h-1 relative w-full sm:aspect-w-3 sm:aspect-h-2">
            <Image
              src={topLeftPicture.url}
              alt={topLeftPicture.alt}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="aspect-w-1 aspect-h-1 relative w-full sm:aspect-w-3 sm:aspect-h-2">
            <Image
              src={bottomLeftPicture.url}
              alt={bottomLeftPicture.alt}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="hidden sm:flex sm:w-full">
          <div className=" relative w-full">
            <Image
              src={rightPicture.url}
              alt={rightPicture.alt}
              layout="fill"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
