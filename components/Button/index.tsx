import clsx from 'clsx'

export type ButtonProps = {
  color?: 'pink' | 'purple'
}
export const Button: React.FC<ButtonProps> = ({
  color = 'pink',
  children,
  ...props
}) => {
  return (
    <button
      className={clsx([
        'border-3 bg-transparent py-3 px-16 font-title text-lg hover:bg-opacity-10',
        color === 'pink' && 'border-pink-500 text-pink-500 hover:bg-pink-100',
        color === 'purple' &&
          'border-purple-700 text-purple-700 hover:bg-purple-200',
      ])}
      {...props}
    >
      {children}
    </button>
  )
}
