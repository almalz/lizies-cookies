import Link from 'next/link'
import { FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa'

type Link = {
  label: string
  href: string
}

const Links: Link[] = [
  { label: 'contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
  { label: 'mentions légales', href: '/legal' },
  { label: 'CGV', href: '/terms' },
  { label: 'confidentialité', href: '/privacy' },
]

export const Footer: React.FC = () => {
  return (
    <footer className="absolute bottom-0 mt-auto flex h-[220px] w-full flex-col items-center gap-y-6 bg-pink-gray py-6 md:py-12">
      <ul className="flex items-center gap-x-8 px-2 py-2">
        <li>
          <Link href="https://www.instagram.com/naughtycookies_/">
            <a target="_blank">
              <FaInstagram className="text-purple-800 hover:text-purple-300" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="http://www.tiktok.com/@naughtycookies_">
            <a target="_blank">
              <FaTiktok className="text-purple-800 hover:text-purple-300" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="https://www.facebook.com/ngtycookies">
            <a target="_blank">
              <FaFacebook className="text-purple-800 hover:text-purple-300" />
            </a>
          </Link>
        </li>
      </ul>
      <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 px-12">
        {Links.map((link) => (
          <li
            key={link.label}
            className="font-body text-sm  text-purple-800 hover:text-purple-300"
          >
            <Link href={link.href}>
              <a>{link.label}</a>
            </Link>
          </li>
        ))}
      </ul>
      <span className="font-body text-white">© naughty cookies 2022</span>
    </footer>
  )
}
