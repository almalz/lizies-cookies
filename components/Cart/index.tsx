import { Box, Circle } from '@chakra-ui/react'
import Image from 'next/image'
import { relative } from 'path'
import CartIcon from '../../assets/icons/cart.svg'

export type CartProps = {
  itemCount?: number
}

const Cart: React.FC<CartProps> = ({ itemCount }) => {
  return (
    <button>
      <Box pos="relative">
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
      </Box>
    </button>
  )
}

export default Cart
