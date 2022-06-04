import { Circle, Spinner } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useCart } from '../../lib/store/cart/provider'
import { HiOutlineShoppingBag } from 'react-icons/hi'

const Cart: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const { loading, cartItemsCount } = useCart()

  const handleClick = useCallback(() => {
    onClick && onClick()
  }, [onClick])

  return (
    <button onClick={handleClick} disabled={loading}>
      <Circle
        p="4px"
        pos="relative"
        size="58px"
        border="solid 3px transparent"
        _hover={{ backgroundColor: '#2E155011' }}
      >
        <HiOutlineShoppingBag size={42} color="#2E1550" />

        <Circle
          pos="absolute"
          top="-1"
          right="-1"
          size="28px"
          zIndex={2}
          bg="#2E1550"
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
