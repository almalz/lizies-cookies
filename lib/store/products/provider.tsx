import id from 'date-fns/esm/locale/id/index.js'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Products } from './api'

type ProductsContextProps = {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  Products: typeof Products
  currentDropId: string | null | undefined
}

const REFRESH_INTERVAL =
  Number(process.env.NEXT_PUBLIC_DROP_REFRESH_INTERVAL) || 30000

const ProductsContext = createContext<ProductsContextProps | null>(null)

const ProductsProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [currentDropId, setCurrentDropId] = useState<
    string | null | undefined
  >()

  // // fetch the next drop every REFRESH_INTERVAL
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const drop = await Products.getCurrentDrop()
  //     if (!drop) {
  //       if (currentDropId) {
  //         currentDropId !== undefined &&
  //           console.info('Drop update : no current drop anymore ')
  //         setCurrentDropId(null)
  //       }
  //       return
  //     }

  //     if (drop.id === currentDropId) return

  //     setCurrentDropId(drop.id)
  //     currentDropId !== undefined &&
  //       console.info('Drop update : another drop has started')
  //   }, REFRESH_INTERVAL)
  //   return () => clearInterval(interval)
  // }, [currentDropId])

  const value = { loading, setLoading, Products, currentDropId }
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
