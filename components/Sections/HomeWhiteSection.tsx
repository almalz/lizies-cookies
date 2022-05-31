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
    <div className="flex flex-col items-center gap-y-12 bg-white px-16 py-24 lg:gap-y-24 lg:py-40 lg:px-60">
      <H2>{whiteSectionHeading}</H2>
      <ParagraphXl>{whiteSectionBody}</ParagraphXl>
    </div>
  )
}
