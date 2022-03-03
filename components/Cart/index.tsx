import { Circle, Spinner } from '@chakra-ui/react'
import Image from 'next/image'
import { useCallback, useState, useEffect } from 'react'
import CartIcon from '../../assets/icons/cart.svg'
import { useSnipcart } from '../../lib/snipcart'

const Cart: React.FC = () => {
  const { Snipcart, loading } = useSnipcart()

  const [itemCount, setItemCount] = useState<number | null>(null)

  const handleClick = useCallback(() => {
    Snipcart?.cart?.open()
  }, [Snipcart?.cart])

  // value loading on mount
  useEffect(() => {
    const syncItemcount = async () => {
      if (typeof window !== 'undefined') {
        const _itemCount = await Snipcart?.store?.itemCount()
        setItemCount(_itemCount || null)
      }
    }
    syncItemcount()
  }, [Snipcart?.store])

  //value subscription when cart changes
  useEffect(() => {
    let unsubscribe: () => void
    if (typeof window !== 'undefined' && Snipcart && Snipcart.store) {
      unsubscribe = Snipcart?.store?.subscribe(async () => {
        if (typeof window !== 'undefined' && Snipcart) {
          const _itemCount = await Snipcart?.store?.itemCount()
          setItemCount(_itemCount || null)
        }
      })
    }
    return () => {
      unsubscribe && unsubscribe()
    }
  }, [Snipcart, Snipcart.store])

  return (
    <button onClick={handleClick}>
      <Circle p="4px" pos="relative">
        <Image src={CartIcon} width={42} height={42} alt="cart_icon" />

        <Circle
          pos="absolute"
          top="-2"
          right="-2"
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
            <span>{itemCount || ''}</span>
          )}
        </Circle>
      </Circle>
    </button>
  )
}

export default Cart
