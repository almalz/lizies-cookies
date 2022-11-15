import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react'
import { FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa'
import { HiOutlineMenuAlt4, HiX } from 'react-icons/hi'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

type NavItem = {
  label: string
  href: string
}

const NAVITEMS: NavItem[] = [
  { label: 'shop', href: '/shop' },
  { label: 'traiteur', href: '/catering' },
  { label: 'à propos', href: '/about' },
  { label: 'faq', href: '/faq' },
  { label: 'contact', href: '/contact' },
]

export const Navbar: React.FC = () => {
  const router = useRouter()

  return (
    <Accordion as="nav" allowMultiple className="bg-purple-700">
      <AccordionItem border="0">
        {({ isExpanded }: { isExpanded: boolean }) => (
          <>
            <div className="lg:hidden">
              <div className="flex w-full items-center justify-between bg-purple-700 px-8 py-4">
                <Link href="/">
                  <a>
                    <div className="imageContainer relative h-[40px] w-[100px]">
                      <Image
                        src="/images/logo.svg"
                        alt="logo"
                        layout="fill"
                        className="image"
                        priority
                      />
                    </div>
                  </a>
                </Link>
                <div>
                  <AccordionButton
                    sx={{ boxShadow: 'none' }}
                    _focus={{ boxShadow: 'none' }}
                  >
                    {isExpanded ? (
                      <HiX className="text-white" size="24px" />
                    ) : (
                      <HiOutlineMenuAlt4 className="text-white" size="24px" />
                    )}
                  </AccordionButton>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="flex w-full gap-x-16 bg-purple-700 px-16 pt-8 pb-4">
                <Link href="/">
                  <a>
                    <div className="imageContainer relative h-[80px] w-[200px]">
                      <Image
                        src="/images/logo.svg"
                        alt="logo"
                        layout="fill"
                        className="image"
                        priority
                      />
                    </div>
                  </a>
                </Link>
                <ul className="flex flex-1 items-center gap-x-8 px-8">
                  {NAVITEMS.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href}>
                        <a className="font-body text-base font-bold text-white hover:text-pink-500">
                          {item.label}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="flex items-center gap-x-8 px-4 py-4">
                  <li>
                    <Link href="https://www.instagram.com/naughtycookies_/">
                      <a target="_blank">
                        <FaInstagram className="text-white hover:text-pink-500" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="http://www.tiktok.com/@naughtycookies_">
                      <a target="_blank">
                        <FaTiktok className="text-white hover:text-pink-500" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.facebook.com/ngtycookies">
                      <a target="_blank">
                        <FaFacebook className="text-white hover:text-pink-500" />
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <AccordionPanel className="lg:hidden">
              <ul className="flex min-h-full flex-col gap-y-4 bg-purple-700 p-4">
                {NAVITEMS.map((item) => (
                  <li key={item.label} className="flex">
                    <Link href={item.href}>
                      <a
                        className={clsx(
                          'w-full cursor-pointer rounded-md p-4 hover:bg-purple-600',
                          'font-body text-base font-bold text-white',
                          router.pathname === item.href && 'bg-purple-800'
                        )}
                      >
                        {item.label}
                      </a>
                    </Link>
                  </li>
                ))}
                <li className="flex justify-center">
                  <ul className="flex items-center gap-x-8 px-2 py-2">
                    <li>
                      <Link href="https://www.instagram.com/naughtycookies_/">
                        <a target="_blank">
                          <FaInstagram className="text-white hover:text-pink-500" />
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="http://www.tiktok.com/@naughtycookies_">
                        <a target="_blank">
                          <FaTiktok className="text-white hover:text-pink-500" />
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.facebook.com/ngtycookies">
                        <a target="_blank">
                          <FaFacebook className="text-white hover:text-pink-500" />
                        </a>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
}
