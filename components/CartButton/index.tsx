import { Spinner } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useCart } from '../../lib/store'
import { Button } from '../Button'

const CartButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const { loading, cartItemsCount, goToCheckout } = useCart()

  const handleClick = useCallback(() => {
    onClick && onClick()
  }, [onClick])

  return (
    <Button onClick={handleClick} disabled={loading} color="purple">
      {loading ? (
        <div className="px-20">
          <Spinner color="#2E1550" size="xs" />
        </div>
      ) : (
        `Voir mon panier ${cartItemsCount ? `(${cartItemsCount || 0})` : ''}`
      )}
    </Button>
  )
}

export default CartButton
