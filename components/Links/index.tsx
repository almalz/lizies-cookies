import { Flex, Link } from '@chakra-ui/react'

export type Link = {
  label: string
  href: string
  isExtrenal: boolean
}

const LINKS: Link[] = [
  { label: 'FAQ', href: '/faq', isExtrenal: false },
  { label: 'Mentions légales', href: '/legal', isExtrenal: false },
  {
    label: 'Politique de confidentialité',
    href: '/privacy',
    isExtrenal: false,
  },
  { label: 'CGV', href: '/terms', isExtrenal: false },
  {
    label: 'Contact',
    href: 'mailto:hello@liziescookies.fr',
    isExtrenal: true,
  },
]

const Links: React.FC = () => {
  return (
    <Flex justify="space-around" flexWrap="wrap">
      {LINKS.map((link: Link) => (
        <Link
          key={`${link.href}-${link.label}`}
          href={link.href}
          isExternal={link.isExtrenal}
          fontWeight={600}
          fontSize="sm"
          color="gray.600"
          mx="4px"
        >
          {link.label}
        </Link>
      ))}
    </Flex>
  )
}

export default Links
