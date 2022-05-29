import Image from 'next/image'
import Link from 'next/link'

export const Navbar: React.FC = () => {
  return (
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
          <div></div>
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
        </div>
      </div>
    </>
  )
}
