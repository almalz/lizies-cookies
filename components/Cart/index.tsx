import { Circle } from '@chakra-ui/react'
import Image from 'next/image'
import CartIcon from '../../assets/icons/cart.svg'

export type CartProps = {
  itemCount?: number
}

const Cart: React.FC<CartProps> = ({ itemCount }) => {
  return (
    <button>
      <Circle
        p="4px"
        pos="relative"
        sx={{ border: '2px transparent solid' }}
        _hover={{ border: '2px black solid' }}
      >
        <Image src={CartIcon} width={42} height={42} alt="cart_icon" />
        {itemCount && (
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
            {itemCount}
          </Circle>
        )}
      </Circle>
    </button>
  )
}

export default Cart
