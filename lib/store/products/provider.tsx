import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { Products } from './api'

type ProductsContextProps = {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  Products: typeof Products
}

const ProductsContext = createContext<ProductsContextProps | null>(null)

const ProductsProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const value = { loading, setLoading, Products }
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}

const useProducts = () => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider')
  }
  return context
}

export { ProductsProvider, useProducts }
