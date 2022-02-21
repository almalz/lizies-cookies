import { Flex, Link } from '@chakra-ui/react'

export type Link = {
  label: string
  href: string
  isExtrenal: boolean
}

const LINKS: Link[] = [
  { label: 'Mentions légales', href: '/legal', isExtrenal: false },
  { label: 'CGV', href: '/terms', isExtrenal: false },
  { label: 'FAQ', href: '/', isExtrenal: false },
  { label: 'Contact', href: '/', isExtrenal: true },
]

const Links: React.FC = ({}) => {
  return (
    <Flex justify="space-between" flexWrap="wrap">
      {LINKS.map((link: Link) => (
        <Link
          key={`${link.href}-${link.label}`}
          href={link.href}
          isExternal={link.isExtrenal}
          fontWeight={600}
          fontSize="sm"
          color="gray.500"
          mx="4px"
        >
          {link.label}
        </Link>
      ))}
    </Flex>
  )
}

export default Links
