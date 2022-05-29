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
    <div className="flex w-full sm:gap-8 sm:p-40">
      <div className="flex w-full flex-col items-center gap-4 bg-white p-4 sm:p-0">
        <div className="relative aspect-[2/3] w-full sm:aspect-square">
          <Image
            src={topLeftPicture.url}
            alt={topLeftPicture.alt}
            layout="fill"
          />
        </div>
        <div className="relative aspect-[2/3] w-full sm:aspect-square">
          <Image
            src={bottomLeftPicture.url}
            alt={bottomLeftPicture.alt}
            layout="fill"
          />
        </div>
      </div>
      <div className="flex w-full">
        <div className="relative h-192 w-full">
          <Image src={rightPicture.url} alt={rightPicture.alt} layout="fill" />
        </div>
      </div>
    </div>
  )
}
