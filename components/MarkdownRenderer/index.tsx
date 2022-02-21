import { StructuredText, renderNodeRule } from 'react-datocms'
import { isHeading, isParagraph } from 'datocms-structured-text-utils'
import { Text, As } from '@chakra-ui/react'
import { H, HeadingTagType } from './Heading'

export type MarkdownRenderer = {
  data: any
}

const MarkdownRenderer: React.FC<MarkdownRenderer> = ({ data }) => {
  return (
    <StructuredText
      data={data}
      customNodeRules={[
        renderNodeRule(isHeading, ({ node, children, key }) => {
          const HeadingTag = `h${node.level}`

          return (
            <H
              tag={HeadingTag as HeadingTagType}
              as={HeadingTag as As}
              key={key}
            >
              {children}
            </H>
          )
        }),

        renderNodeRule(isParagraph, ({ node, children, key }) => {
          return (
            <Text
              key={key}
              mt={['4px', '4px', '8px', '8px']}
              mb={['8px', '8px', '16px', '16px']}
            >
              {children}
            </Text>
          )
        }),
      ]}
    />
  )
}

export default MarkdownRenderer
