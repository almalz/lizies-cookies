import { H2, ParagraphXl } from '../Typography'

type PurpleSectionProps = {
  purpleSectionHeading: string
  purpleSectionBody: string
}

const PurpleSection: React.FC<PurpleSectionProps> = ({
  purpleSectionHeading,
  purpleSectionBody,
}) => {
  return (
    <div className="flex flex-col items-center gap-y-12 bg-purple-700 px-16 py-24 text-pink-500 lg:flex-row lg:gap-y-24 lg:py-40 lg:px-60">
      <div className="flex-1">
        <H2>{purpleSectionHeading}</H2>
      </div>
      <div className="flex-1">
        <ParagraphXl markdown>{purpleSectionBody}</ParagraphXl>
      </div>
    </div>
  )
}

export default PurpleSection
