import { useRouter } from 'next/router'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react'
import { setCookiesExpiration } from '../../cookies'
import { Cart } from './api'
import { SwellCart, SwellCartItem, SwellCoupon } from './types'

type CartContextProps = {
  loading: boolean
  cartCache: CartCache | undefined
  cartItems: SwellCartItem[] | undefined
  cartItemsCount: number | undefined
  cart: SwellCart | undefined
  pullCart: () => Promise<SwellCart | undefined>
  updateItems: (product: SwellCartItem) => void
  getProductCartQuantity: (productId: string) => number
  goToCart: () => void
  goToCheckout: () => void
  applyCoupon: (coupon: string) => any
  removeCoupon: () => any
  coupon: SwellCoupon | undefined
  addCartMetadata: (metadata: any) => Promise<void>
}

type CartCache = {
  items?: SwellCartItem[]
  synced_at?: Date
}

const CartContext = createContext<CartContextProps | null>(null)

const CartProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [cart, setCart] = useState<SwellCart>()
  const [cartItemsCache, setCartItemsCache] = useState<CartCache | undefined>()
  const router = useRouter()

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

  const coupon = useMemo(() => {
    return cart?.coupon
  }, [cart])

  const pullCart = useCallback(async () => {
    setLoading(true)
    const cart = await Cart.get()
    setCart(cart)
    setCartItemsCache({ items: cart?.items })
    setLoading(false)
    return cart
  }, [])

  //fetch current cart on mount
  useEffect(() => {
    pullCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const pushCart = async () => {
      if (cartItemsCache?.items !== undefined) {
        setLoading(true)
        const newCart: SwellCart = await Cart.updateAllItems(
          cartItemsCache.items || []
        )
        setLoading(false)
        setCartExpiration()
        if (newCart) setCart(newCart)
      }
    }
    pushCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItemsCache?.items])

  const updateItems = (item: SwellCartItem) => {
    // cart 1st element

    if (!cartItemsCache?.items || cartItemsCache.items.length < 1) {
      setCartItemsCache({ items: [item], synced_at: new Date() })
      return
    }

    // delete item if quantity = 0
    if (item.quantity === 0) {
      setCartItemsCache({
        items: [
          ...cartItemsCache?.items.filter(
            (cartItem) => item.productId !== cartItem.productId
          ),
        ],
        synced_at: new Date(),
      })
      return
    }

    setCartItemsCache({
      items: [
        ...cartItemsCache?.items.filter(
          (cartItem) => item.productId !== cartItem.productId
        ),
        item,
      ],
      synced_at: new Date(),
    })
  }

  const getProductCartQuantity = useCallback(
    (productId: string) => {
      return cartItemsCache?.items
        ? cartItemsCache.items.find((item) => item.productId === productId)
            ?.quantity || 0
        : 0
    },
    [cartItemsCache]
  )

  const goToCheckout = useCallback(async () => {
    await Cart.updateAllItems(cartItems || [])
    router.push('/checkout')
  }, [cartItems, router])

  const goToCart = useCallback(async () => {
    await Cart.updateAllItems(cartItems || [])
    router.push('/cart')
  }, [cartItems, router])

  const applyCoupon = useCallback(async (coupon: string) => {
    setLoading(true)
    const res = await Cart.applyCoupon(coupon)
    const cart = await Cart.get()
    setCart(cart)
    setLoading(false)
    return res
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
    cartCache: cartItemsCache,
    cartItemsCount,
    cart,
    pullCart,
    updateItems,
    getProductCartQuantity,
    goToCart,
    goToCheckout,
    applyCoupon,
    removeCoupon,
    coupon,
    addCartMetadata: Cart.addCartMetadata,
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

export const setCartExpiration = () => {
  const d = new Date()
  d.setHours(23, 59)
  setCookiesExpiration('swell-session', d)
}

export { CartProvider, useCart }
