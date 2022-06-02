import { Paragraph } from '../Typography'

export type CalloutMessageProps = {
  message: string
}

export const CalloutMessage: React.FC<CalloutMessageProps> = ({ message }) => {
  return (
    <div className="rounded-sm border-l-4 border-pink-500 bg-pink-500 bg-opacity-30 py-4 pr-8 pl-6 text-purple-700">
      <Paragraph markdown>{message}</Paragraph>
    </div>
  )
}
