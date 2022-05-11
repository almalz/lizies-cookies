// Figured out too late to make a context to deal with all the Snipcart stuff
// Too lazy right now to move everything inside
// The main purpose is to aggreate the loading state

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import Snipcart, { SnipcartLayout } from '.'

type SnipcartContextProps = {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  Snipcart: any
}

const SnipcartContext = createContext<SnipcartContextProps | null>(null)

const SnipcartProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const value = { loading, setLoading, Snipcart }
  return (
    <SnipcartContext.Provider value={value}>
      <SnipcartLayout>{children}</SnipcartLayout>
    </SnipcartContext.Provider>
  )
}

const useSnipcart = () => {
  const context = useContext(SnipcartContext)
  if (!context) {
    throw new Error('useSnipcart must be used within a SnipcartProvider')
  }
  return context
}

export { SnipcartProvider, useSnipcart }
