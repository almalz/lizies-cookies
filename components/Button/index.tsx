import { Spinner } from '@chakra-ui/spinner'
import clsx from 'clsx'
import Link from 'next/link'

export type ButtonProps = {
  color?: 'pink' | 'purple' | 'white'
  onClick?: () => void
  className?: string
  padding?: string
  disabled?: boolean
  loading?: boolean
  noBorders?: boolean
  type?: 'button' | 'submit'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonLinkProps = {
  color?: 'pink' | 'purple' | 'white'
  href: string
  isExtrenal?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  color = 'pink',
  onClick,
  className,
  disabled = false,
  loading = false,
  type = 'button',
  noBorders = false,
  padding,
  children,
  ...props
}) => {
  disabled = disabled || loading
  return (
    <button
      type={type}
      className={clsx([
        !noBorders && 'border-3',
        'bg-transparent font-body text-lg font-bold hover:bg-opacity-10 ',
        disabled && 'cursor-default opacity-30',
        padding ? padding : 'py-3 px-8 sm:px-16',
        color === 'pink' && 'border-pink-500 text-pink-500 hover:bg-pink-300',
        color === 'purple' &&
          'border-purple-700 text-purple-700 hover:bg-purple-200',
        color === 'white' && 'border-white text-white hover:bg-neutral-100',
        ,
        className,
      ])}
      onClick={() => !disabled && onClick && onClick()}
      {...props}
    >
      {loading ? <Spinner size="xs" /> : <>{children}</>}
    </button>
  )
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  color = 'pink',
  href,
  isExtrenal,
  children,
  ...props
}) => {
  return (
    <>
      {isExtrenal ? (
        <a
          className={clsx([
            'border-3 bg-transparent py-3 px-16 font-title text-lg hover:bg-opacity-10',
            color === 'pink' &&
              'border-pink-500 text-pink-500 hover:bg-pink-100',
            color === 'purple' &&
              'border-purple-700 text-purple-700 hover:bg-purple-200',
            color === 'white' && 'border-white text-white hover:bg-neutral-100',
          ])}
          href={href}
          target="_blank"
          rel="noreferrer"
          {...props}
        >
          {children}
        </a>
      ) : (
        <Link href={href}>
          <a
            className={clsx([
              'border-3 bg-transparent py-3 px-16 font-title text-lg hover:bg-opacity-20',
              color === 'pink' &&
                'border-pink-500 text-pink-500 hover:bg-pink-100',
              color === 'purple' &&
                'border-purple-700 text-purple-700 hover:bg-purple-300',
              color === 'white' &&
                'border-white text-white hover:bg-neutral-100',
            ])}
            {...props}
          >
            {children}
          </a>
        </Link>
      )}
    </>
  )
}
