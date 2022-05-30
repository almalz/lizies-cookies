import { H2, ParagraphXl } from '../Typography'

type WhiteSectionProps = {
  whiteSectionHeading: string
  whiteSectionBody: string
}

export const WhiteSection: React.FC<WhiteSectionProps> = ({
  whiteSectionHeading,
  whiteSectionBody,
}) => {
  return (
    <div className="flex flex-col items-center gap-y-12 bg-white px-16 py-24 sm:gap-y-24 sm:py-40 sm:px-60">
      <H2>{whiteSectionHeading}</H2>
      <ParagraphXl>{whiteSectionBody}</ParagraphXl>
    </div>
  )
}
