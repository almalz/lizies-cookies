export { useProducts } from './products/provider'
export { useCart } from './cart/provider'
import { ProductsProvider } from './products/provider'
import { CartProvider } from './cart/provider'

export const StoreProvider = ({ children }: { children: JSX.Element }) => {
  return (
    <ProductsProvider>
      <CartProvider>{children}</CartProvider>
    </ProductsProvider>
  )
}
