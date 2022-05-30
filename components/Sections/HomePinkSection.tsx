import { H2, H3, ParagraphXl, Paragraph } from '../Typography'

type PinkSectionProps = {
  pinkSectionHeading: string
  pinkSectionSubheading: string
  pinkSectionLeftTitle: string
  pinkSectionLeftBody: string
  pinkSectionRightTitle: string
  pinkSectionRightBody: string
}

export const PinkSection: React.FC<PinkSectionProps> = ({
  pinkSectionHeading,
  pinkSectionSubheading,
  pinkSectionLeftTitle,
  pinkSectionLeftBody,
  pinkSectionRightTitle,
  pinkSectionRightBody,
}) => {
  return (
    <div className="flex flex-col items-center gap-y-10 bg-pink-500 py-16 px-14 text-center text-purple-700 sm:py-36">
      <H2>{pinkSectionHeading}</H2>
      <ParagraphXl>{pinkSectionSubheading}</ParagraphXl>
      <div className="flex flex-col gap-16 px-8 sm:flex-row">
        <div className="flex flex-col items-center gap-y-2">
          <H3>{pinkSectionLeftTitle}</H3>
          <Paragraph markdown>{pinkSectionLeftBody}</Paragraph>
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <H3>{pinkSectionRightTitle}</H3>
          <Paragraph markdown>{pinkSectionRightBody}</Paragraph>
        </div>
      </div>
    </div>
  )
}
