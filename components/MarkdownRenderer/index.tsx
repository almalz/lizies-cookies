import { StructuredText, renderNodeRule } from 'react-datocms'
import {
  isHeading,
  isParagraph,
  isListItem,
  isList,
} from 'datocms-structured-text-utils'
import { As } from '@chakra-ui/react'
import { H, HeadingTagType } from './Heading'
import clsx from 'clsx'

export type MarkdownRenderer = {
  data: any
  className?: string
}

const MarkdownRenderer: React.FC<MarkdownRenderer> = ({ data, className }) => {
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
              className="mt-16 font-title text-purple-700"
              fontFamily="Chloé"
            >
              {children}
            </H>
          )
        }),

        renderNodeRule(isParagraph, ({ node, children, key }) => {
          return (
            <p
              key={key}
              className={
                'mt-1 mb-2 font-body text-purple-700 md:mt-2 md:mb-4 ' +
                className
              }
            >
              {children}
            </p>
          )
        }),

        renderNodeRule(isList, ({ node, children, key }) => {
          return (
            <ul className="pl-2 sm:pl-4" key={key}>
              {children}
            </ul>
          )
        }),

        renderNodeRule(isListItem, ({ node, children, key }) => {
          return (
            <li className={clsx('list-disc pl-2 sm:pl-4', className)} key={key}>
              {children}
            </li>
          )
        }),
      ]}
    />
  )
}

export default MarkdownRenderer
