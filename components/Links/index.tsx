import { Flex, Link as NextLink } from '@chakra-ui/react'

export type TLink = {
  label: string
  href: string
  isExternal: boolean
  sx?: any
}

const LINKS: TLink[] = [
  { label: 'Mentions légales', href: '/legal', isExternal: false },
  { label: 'CGV', href: '/terms', isExternal: false },
  {
    label: 'Politique de confidentialité',
    href: '/privacy',
    isExternal: false,
  },
  {
    label: 'Foire aux questions',
    href: '/faq',
    isExternal: false,
    sx: { flex: '0 2 50%', textAlign: 'right' },
  },
  {
    label: 'Contact',
    href: 'mailto:hello@liziescookies.fr',
    isExternal: true,
    sx: { flex: '0 2 50%', textAlign: 'left' },
  },
]

const Link: React.FC<{ link: TLink }> = ({ link }) => {
  return (
    <NextLink
      key={`${link.href}-${link.label}`}
      href={link.href}
      isExternal={link.isExternal}
      fontWeight={600}
      fontSize="xs"
      color="gray.600"
      mx="8px"
      sx={link.sx}
    >
      {link.label}
    </NextLink>
  )
}

const Links: React.FC = () => {
  return (
    <Flex w="100%" justify="center" flexWrap="wrap">
      <Link link={LINKS[0]} />
      <Link link={LINKS[1]} />
      <Link link={LINKS[2]} />
      <Flex w="100%" justify="space-around">
        <Link link={LINKS[3]} />
        <Link link={LINKS[4]} />
      </Flex>
    </Flex>
  )
}

export default Links
