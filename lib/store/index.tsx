export { useProducts } from './products/provider'
import { ProductsProvider } from './products/provider'

export const StoreProvider = ({ children }: { children: JSX.Element }) => {
  return <ProductsProvider>{children}</ProductsProvider>
}
