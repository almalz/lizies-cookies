import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react'
import { Cart } from './api'
import { SwellCart, SwellCartItem, SwellCoupon } from './types'

type CartContextProps = {
  loading: boolean
  cart: SwellCart | undefined
  cartItems: SwellCartItem[] | undefined
  cartItemsCount: number | undefined
  updateItems: (product: SwellCartItem) => void
  getProductCartQuantity: (productId: string) => number
  goToCheckout: () => void
  applyCoupon: (coupon: string) => any
  removeCoupon: () => any
  coupon: SwellCoupon | undefined
}

const CartContext = createContext<CartContextProps | null>(null)

const CartProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [cart, setCart] = useState<SwellCart>()

  const cartItems = useMemo(() => {
    return cart?.items
  }, [cart])

  const cartItemsCount = useMemo(() => {
    const res =
      cartItems
        ?.map((item) => item.quantity)
        .reduce((prev, curr) => prev + curr, 0) || 0
    return res
  }, [cartItems])

  const checkoutUrl = useMemo(() => {
    return cart?.checkoutUrl
  }, [cart])

  const coupon = useMemo(() => {
    return cart?.coupon
  }, [cart])

  const pullCart = async () => {
    setLoading(true)
    const cart = await Cart.get()
    setCart(cart)
    setLoading(false)
  }

  //fetch current cart on mount
  useEffect(() => {
    pullCart()
  }, [])

  useEffect(() => {
    const pushCart = async () => {
      if (cartItems !== undefined) {
        setLoading(true)
        await Cart.updateAllItems(cartItems || [])
        setLoading(false)
      }
    }
    pushCart()
  }, [cartItems])

  const updateItems = (item: SwellCartItem) => {
    // cart 1st element
    if (!cartItems) {
      setCart({ ...cart, items: [item] } as SwellCart)
      return
    }

    // delete item if quantity = 0
    if (item.quantity === 0) {
      setCart({
        ...cart,
        items: [
          ...cartItems.filter(
            (cartItem) => item.productId !== cartItem.productId
          ),
        ],
      } as SwellCart)
      return
    }

    // spred current items list
    let newItems = cart?.items && [...cart?.items]

    // ts guard
    if (!newItems || newItems.length < 1) return

    const newItem = newItems.find((i) => i.productId === item.productId)

    // for an existing item, we update its quantity
    // if the item is new, we concat it
    if (newItem) {
      newItem.quantity = item.quantity
    } else {
      newItems = [...newItems, item]
    }

    setCart({
      ...cart,
      items: [...newItems],
    } as SwellCart)
  }

  const getProductCartQuantity = useCallback(
    (productId: string) => {
      return cartItems
        ? cartItems.find((item) => item.productId === productId)?.quantity || 0
        : 0
    },
    [cartItems]
  )

  const goToCheckout = useCallback(async () => {
    await Cart.updateAllItems(cartItems || [])
    if (checkoutUrl) {
      window.location.href = checkoutUrl
    } else {
      setLoading(true)
      const cart = await Cart.get()
      if (cart?.checkoutUrl) {
        window.location.href
      }
      setLoading(false)
    }
  }, [checkoutUrl, cartItems])

  const applyCoupon = useCallback(async (coupon: string) => {
    setLoading(true)
    await Cart.applyCoupon(coupon)
    const cart = await Cart.get()
    setCart(cart)
    setLoading(false)
  }, [])

  const removeCoupon = useCallback(async () => {
    setLoading(true)
    await Cart.removeCoupon()
    const cart = await Cart.get()
    setCart(cart)
    setLoading(false)
  }, [])

  const value = {
    loading,
    cartItems,
    cart,
    cartItemsCount,
    updateItems,
    getProductCartQuantity,
    goToCheckout,
    applyCoupon,
    removeCoupon,
    coupon,
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
