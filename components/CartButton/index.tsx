import { Button, ButtonProps, Spinner } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useCart } from '../../lib/store'

const CartButton: React.FC<ButtonProps> = (props) => {
  const { loading, cartItemsCount, goToCheckout } = useCart()

  const handleClick = useCallback(() => {
    goToCheckout()
  }, [goToCheckout])

  return (
    <Button onClick={handleClick} disabled={loading} {...props}>
      {loading ? (
        <Spinner color="White" size="xs" />
      ) : (
        `Voir mon panier ${cartItemsCount ? `(${cartItemsCount || 0})` : ''}`
      )}
    </Button>
  )
}

export default CartButton
