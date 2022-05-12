import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react'
import { Cart } from './api'
import { SimpleCartItem } from './types'
import { simplifyCartItem } from './utils'

type CartContextProps = {
  loading: boolean
  cartItems: SimpleCartItem[] | undefined
  cartItemsCount: number | undefined
  updateItems: (product: SimpleCartItem) => void
  getProductCartQuantity: (productId: string) => number
}

const CartContext = createContext<CartContextProps | null>(null)

const CartProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [cartItems, setCartItems] = useState<SimpleCartItem[]>()

  const cartItemsCount = useMemo(() => {
    const res =
      cartItems
        ?.map((item) => item.quantity)
        .reduce((prev, curr) => prev + curr, 0) || 0
    return res
  }, [cartItems])

  //fetch current cart on mount
  useEffect(() => {
    const pullCart = async () => {
      setLoading(true)
      const cart = await Cart.get()
      console.log('cart pull: ', cart?.items)
      if (cart?.items) setCartItems(simplifyCartItem(cart.items))
      setLoading(false)
    }
    pullCart()
  }, [])

  useEffect(() => {
    const pushCart = async () => {
      if (cartItems !== undefined) {
        console.log('cart push: ', { cartItems })
        setLoading(true)
        await Cart.updateAllItems(cartItems || [])
        setLoading(false)
      }
    }
    pushCart()
  }, [cartItems])

  const updateItems = (product: SimpleCartItem) => {
    if (!cartItems) {
      setCartItems([product])
      return
    }

    if (product.quantity === 0) {
      setCartItems([
        ...cartItems.filter((item) => item.productId !== product.productId),
      ])
      return
    }

    setCartItems([
      ...cartItems.filter((item) => item.productId !== product.productId),
      product,
    ])
  }

  const getProductCartQuantity = useCallback(
    (productId: string) => {
      return cartItems
        ? cartItems.find((item) => item.productId === productId)?.quantity || 0
        : 0
    },
    [cartItems]
  )

  const value = {
    loading,
    cartItems,
    cartItemsCount,
    updateItems,
    getProductCartQuantity,
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export { CartProvider, useCart }
