import { Circle } from '@chakra-ui/react'
import Image from 'next/image'
import { useCallback } from 'react'
import CartIcon from '../../assets/icons/cart.svg'
import Snipcart from '../../lib/snipcart'

const Cart: React.FC = () => {
  const handleClick = useCallback(() => {
    Snipcart?.cart?.open()
  }, [])

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
          <span className="snipcart-items-count"></span>
        </Circle>
      </Circle>
    </button>
  )
}

export default Cart
