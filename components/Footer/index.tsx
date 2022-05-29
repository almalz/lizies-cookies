import Link from 'next/link'
import { FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa'

export const Footer: React.FC = () => {
  return (
    <footer className="flex w-full flex-col items-center gap-y-8 bg-pink-gray py-6">
      <ul className="flex items-center gap-x-8 px-2 py-2">
        <li>
          <Link href="https://www.instagram.com/_naughtycookies/">
            <a target="_blank">
              <FaInstagram className="text-white hover:text-purple-200" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="https://www.tiktok.com/@naughtycookies">
            <a target="_blank">
              <FaTiktok className="text-white hover:text-purple-200" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="https://www.facebook.com/naughtycookies">
            <a target="_blank">
              <FaFacebook className="text-white hover:text-purple-200" />
            </a>
          </Link>
        </li>
      </ul>
      <span className="font-body text-sm text-purple-800">
        © naughty cookies 2022
      </span>
    </footer>
  )
}
