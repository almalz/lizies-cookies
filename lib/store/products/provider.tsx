import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { products } from './api'

type ProductsContextProps = {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  products: any
}

const ProductsContext = createContext<ProductsContextProps | null>(null)

const ProductsProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const value = { loading, setLoading, products }
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}

const useProducts = () => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useSnipcart must be used within a SnipcartProvider')
  }
  return context
}

export { ProductsProvider, useProducts }
