import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react'
import { FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa'
import { HiOutlineMenuAlt4, HiX } from 'react-icons/hi'

import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

type Naveitem = {
  label: string
  href: string
  isActive?: boolean
}

const NAVITEMS: Naveitem[] = [
  { label: 'drop en cours', href: '/drop' },
  { label: 'à propos', href: '/about' },
  { label: 'faq', href: '/faq' },
  { label: 'contact', href: '/contact' },
]

export const Navbar: React.FC = ({}) => {
  return (
    <Accordion as="nav" allowMultiple>
      <AccordionItem>
        {({ isExpanded }: { isExpanded: boolean }) => (
          <>
            <div className="sm:hidden">
              <div className="flex w-full items-center justify-between bg-purple-700 px-8 py-4">
                <Link href="/">
                  <a>
                    <Image
                      src="/images/logo.svg"
                      alt="logo"
                      width="100px"
                      height="40px"
                    />
                  </a>
                </Link>
                <div>
                  <AccordionButton>
                    {isExpanded ? (
                      <HiX className="text-white" size="24px" />
                    ) : (
                      <HiOutlineMenuAlt4 className="text-white" size="24px" />
                    )}
                  </AccordionButton>
                </div>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="flex w-full gap-x-16 bg-purple-700 px-16 pt-8 pb-4">
                <Link href="/">
                  <a>
                    <Image
                      src="/images/logo.svg"
                      alt="logo"
                      width="200px"
                      height="80px"
                    />
                  </a>
                </Link>
                <ul className="flex flex-1 items-center gap-x-8 px-8">
                  {NAVITEMS.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href}>
                        <a className="font-body text-base font-bold text-white hover:text-pink-200">
                          {item.label}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="flex items-center gap-x-8 px-4 py-4">
                  <li>
                    <Link href="https://www.instagram.com/_naughtycookies/">
                      <a target="_blank">
                        <FaInstagram className="text-white hover:text-pink-200" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.tiktok.com/@naughtycookies">
                      <a target="_blank">
                        <FaTiktok className="text-white hover:text-pink-200" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.facebook.com/naughtycookies">
                      <a target="_blank">
                        <FaFacebook className="text-white hover:text-pink-200" />
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <AccordionPanel className="sm:hidden">
              <ul className="flex min-h-full flex-col gap-y-4 bg-purple-700 p-4">
                {NAVITEMS.map((item) => (
                  <li
                    key={item.label}
                    className={clsx(
                      'cursor-pointer rounded-md p-4 hover:bg-purple-600',
                      item.isActive && 'bg-purple-800'
                    )}
                  >
                    <Link href={item.href}>
                      <a className="font-body text-base font-bold text-white">
                        {item.label}
                      </a>
                    </Link>
                  </li>
                ))}
                <li className="flex justify-center">
                  <ul className="flex items-center gap-x-8 px-2 py-2">
                    <li>
                      <Link href="https://www.instagram.com/_naughtycookies/">
                        <a target="_blank">
                          <FaInstagram className="text-white hover:text-pink-200" />
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.tiktok.com/@naughtycookies">
                        <a target="_blank">
                          <FaTiktok className="text-white hover:text-pink-200" />
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.facebook.com/naughtycookies">
                        <a target="_blank">
                          <FaFacebook className="text-white hover:text-pink-200" />
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
