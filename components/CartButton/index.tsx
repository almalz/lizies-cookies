import { Button, ButtonProps, Circle, Spinner } from '@chakra-ui/react'
import Image from 'next/image'
import { useCallback, useState, useEffect } from 'react'
import CartIcon from '../../assets/icons/cart.svg'
import { useSnipcart } from '../../lib/snipcart'

const CartButton: React.FC<ButtonProps> = (props) => {
  const { Snipcart, loading } = useSnipcart()

  const [itemCount, setItemCount] = useState<number | null>(null)

  const handleClick = useCallback(() => {
    Snipcart?.cart?.open()
  }, [Snipcart?.cart])

  // value loading on mount
  // The time out helps give time to Snipcart to load
  useEffect(() => {
    const syncItemcount = async () => {
      if (typeof window !== 'undefined') {
        setTimeout(async () => {
          const _itemCount = await Snipcart?.store?.itemCount()
          setItemCount(_itemCount || null)
        }, 1000)
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
    <Button onClick={handleClick} disabled={loading} {...props}>
      {loading ? (
        <Spinner color="White" size="xs" />
      ) : (
        `Voir mon panier ${itemCount ? `(${itemCount || 0})` : ''}`
      )}
    </Button>
  )
}

export default CartButton
