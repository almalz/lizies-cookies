import { As, Heading } from '@chakra-ui/react'

export type TypographyProps = {
  as?: As
}

export const Subtitle: React.FC<TypographyProps> = ({ children, as }) => (
  <Heading className="font-subtitle text-5xl" as={as}>
    {children}
  </Heading>
)

export const H1: React.FC<TypographyProps> = ({ children }) => (
  <h1 className="text-4xll font-title font-bold">{children}</h1>
)

export const H2: React.FC<TypographyProps> = ({ children }) => (
  <h2 className="font-body text-3xl font-bold">{children}</h2>
)

export const H3: React.FC<TypographyProps> = ({ children }) => (
  <h3 className="font-body text-xl font-bold">{children}</h3>
)

export const Paragraph: React.FC<TypographyProps> = ({ children }) => (
  <p className="font-body text-base">{children}</p>
)

export const ParagraphXl: React.FC<TypographyProps> = ({ children }) => (
  <p className="font-body text-xl sm:text-2xl">{children}</p>
)

export const Paragraph2Xl: React.FC<TypographyProps> = ({ children }) => (
  <p className="font-body text-2xl sm:text-3xl">{children}</p>
)
