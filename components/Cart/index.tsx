import { Button, ButtonProps, Circle, Spinner } from '@chakra-ui/react'
import Image from 'next/image'
import { useCallback, useState, useEffect } from 'react'
import CartIcon from '../../assets/icons/cart.svg'
import { useCart } from '../../lib/store/cart/provider'

const Cart: React.FC = () => {
  const { loading, cartItemsCount } = useCart()

  const [itemCount, setItemCount] = useState<number | null | undefined>(
    cartItemsCount
  )

  const handleClick = useCallback(() => {}, [])

  // value loading on mount
  // The time out helps give time to Snipcart to load
  // useEffect(() => {
  //   const syncItemcount = async () => {
  //     const cart = await Cart.get()
  //     console.log(cart)
  //   }
  //   syncItemcount()
  // }, [Cart])

  // //value subscription when cart changes
  // useEffect(() => {
  //   let unsubscribe: () => void
  //   if (typeof window !== 'undefined' && Snipcart && Snipcart.store) {
  //     unsubscribe = Snipcart?.store?.subscribe(async () => {
  //       if (typeof window !== 'undefined' && Snipcart) {
  //         const _itemCount = await Snipcart?.store?.itemCount()
  //         setItemCount(_itemCount || null)
  //       }
  //     })
  //   }
  //   return () => {
  //     unsubscribe && unsubscribe()
  //   }
  // }, [Snipcart, Snipcart.store])

  return (
    <button onClick={handleClick} disabled={loading}>
      <Circle p="4px" pos="relative" size="58px">
        <Image src={CartIcon} width={42} height={42} alt="cart_icon" />

        <Circle
          pos="absolute"
          top="-1"
          right="-1"
          size="28px"
          zIndex={2}
          bg="gray.900"
          color="white"
          fontWeight={700}
          fontSize="md"
          border="2px solid"
          borderColor="white"
        >
          {loading ? (
            <Spinner color="White" size="xs" />
          ) : (
            <span>{cartItemsCount || 0}</span>
          )}
        </Circle>
      </Circle>
    </button>
  )
}

export default Cart
