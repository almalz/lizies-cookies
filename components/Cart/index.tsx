import { Circle, Spinner } from '@chakra-ui/react'
import Image from 'next/image'
import { useCallback } from 'react'
import { useCart } from '../../lib/store/cart/provider'

const Cart: React.FC = () => {
  const { loading, cartItemsCount, goToCheckout } = useCart()

  const handleClick = useCallback(() => {
    goToCheckout()
  }, [goToCheckout])

  return (
    <button onClick={handleClick} disabled={loading}>
      <Circle
        p="4px"
        pos="relative"
        size="58px"
        border="solid 3px transparent"
        _hover={{ border: 'solid rgba(32, 32, 32, 0.8) 3px' }}
      >
        <Image src={'/icons.cart.svg'} width={42} height={42} alt="cart_icon" />

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
