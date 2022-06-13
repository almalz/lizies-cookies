import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Products } from './api'
import { Drop } from './types'

type ProductsContextProps = {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  Products: typeof Products
  currentDrop: Drop | null | undefined
}

const ProductsContext = createContext<ProductsContextProps | null>(null)

const ProductsProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [currentDrop, setCurrentDrop] = useState<Drop | undefined | null>()

  useEffect(() => {
    const fetchCurrentDrop = async () => {
      const drop = await Products.getCurrentDrop()
      setCurrentDrop(drop)
    }
    fetchCurrentDrop()
  }, [])

  const value = { loading, setLoading, Products, currentDrop }
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
