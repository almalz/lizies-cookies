import { Flex, Link, HStack, Icon } from '@chakra-ui/react'
import {
  FaInstagram as InstagramIcon,
  FaFacebook as FacebookIcon,
  FaTiktok as TiktokIcon,
} from 'react-icons/fa'

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

export const SocialLinks: React.FC = () => {
  return (
    <HStack justify="space-around" w="150px" margin="auto" mb="16px">
      <Link href={'https://www.instagram.com/liziescookies/'} isExternal={true}>
        <Icon
          as={InstagramIcon}
          w={6}
          h={6}
          cursor="pointer"
          _hover={{ color: '#718096' }}
        />
      </Link>
      <Link href={'https://www.facebook.com/liziescookies'} isExternal={true}>
        <Icon
          as={FacebookIcon}
          w={6}
          h={6}
          cursor="pointer"
          _hover={{ color: '#718096' }}
        />
      </Link>
      <Link href={'https://www.tiktok.com/@liziescookies'} isExternal={true}>
        <Icon
          as={TiktokIcon}
          w={6}
          h={6}
          cursor="pointer"
          _hover={{ color: '#718096' }}
        />
      </Link>
    </HStack>
  )
}

export default Links
