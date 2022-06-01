import { Button } from '../Button'
import { useCart } from '../../lib/store'
import { CartpageRecord } from '../../types/generated/graphql'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react'
import clsx from 'clsx'

export type CouponsManagerProps = {
  pageContent: CartpageRecord
}

export const CouponsManager: React.FC<CouponsManagerProps> = ({
  pageContent,
}) => {
  const [couponValue, setCouponValue] = useState<string>('')
  const { applyCoupon, removeCoupon, coupon } = useCart()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setCouponValue(event.target.value)
  }, [])

  const handleSend = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const apply = async () => {
        setCouponValue('')
        setLoading(true)
        await applyCoupon(couponValue)
        setLoading(false)
      }
      apply()
    },
    [applyCoupon, couponValue]
  )

  const handleRemove = useCallback(() => {
    const remove = async () => {
      setLoading(true)
      await removeCoupon()
      setLoading(false)
    }
    remove()
  }, [removeCoupon])

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSend}>
        <div className="flex flex-col gap-4 lg:flex-row">
          <label htmlFor="coupon" className="hidden">
            {pageContent.couponPlaceholder}
          </label>
          <input
            className={clsx(
              'w-full rounded-none border-2 border-purple-700 py-1 px-2 font-body focus:border-pink-500 focus:outline-none focus:ring-pink-500',
              !!coupon && 'opacity-20'
            )}
            type="text"
            name="coupon"
            placeholder="code promo"
            value={couponValue}
            onChange={handleChange}
            disabled={!!coupon}
          />
          <div className="flex justify-center lg:w-80">
            <Button
              color="purple"
              className="w-full py-2 px-1 text-sm"
              loading={loading}
              type="submit"
            >
              {pageContent.couponButtonLabel}
            </Button>
          </div>
        </div>
        {coupon && (
          <div>
            <Tag
              size="md"
              borderRadius="full"
              variant="solid"
              sx={{ bg: '#D3C1C1' }}
            >
              <TagLabel>{coupon.name}</TagLabel>
              <TagCloseButton onClick={handleRemove} />
            </Tag>
          </div>
        )}
      </form>
    </div>
  )
}
