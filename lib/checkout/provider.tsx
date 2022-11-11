import dynamic from 'next/dynamic'
import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react'
import { useCart } from '../store'
import { SwellCart } from '../store/cart/types'

const CheckoutForm = dynamic(() => import('../../components/CheckoutForm'), {
  ssr: false,
})

const DeliveryDatePicker = dynamic(
  () => import('../../components/DeliveryDatePicker'),
  {
    ssr: false,
  }
)

const ShippingMethod = dynamic(
  () => import('../../components/ShippingMethod'),
  {
    ssr: false,
  }
)

const PaymentForm = dynamic(() => import('../../components/PaymentForm'), {
  ssr: false,
})

export type Section = {
  id: number
  label: string
  value: string | undefined | false
}

export const SectionComponent: Record<
  string,
  React.ComponentType<{ onComplete: (value: string) => void }>
> = {
  '0': CheckoutForm,
  '1': DeliveryDatePicker,
  '2': ShippingMethod,
  '3': PaymentForm,
}

const SECTIONS: Section[] = [
  {
    id: 0,
    label: 'Informations de livraison',
    value: undefined,
  },
  {
    id: 1,
    label: 'Date de livraison',
    value: undefined,
  },
  {
    id: 2,
    label: 'Méthode de livraison',
    value: undefined,
  },
  {
    id: 3,
    label: 'Paiement',
    value: undefined,
  },
]

const CheckoutStateContext = createContext<
  | {
      sections: Section[]
      currentSectionId: number
      setCurrentSectionId: Dispatch<SetStateAction<number>>
      nextSection: () => void
      setValue: (sectionId: number, value: Section['value']) => void
      cart?: SwellCart
    }
  | undefined
>(undefined)

const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
  const { cart } = useCart()

  const getSectionFromHash = () => {
    if (typeof window !== undefined) {
      const hash = window.location.hash.slice(1)
      const sectionsIds = SECTIONS.map((s) => s.id)

      if (sectionsIds.includes(Number(hash))) {
        return Number(hash)
      }
    }
    return 0
  }

  const [currentSectionId, setCurrentSectionId] = useState(getSectionFromHash())
  const [sections, setSections] = useState(SECTIONS)
  const sectionsIds = useMemo(() => sections.map((s) => s.id), [sections])

  useEffect(() => {
    const existingCheckout = sessionStorage.getItem('checkout')

    if (existingCheckout) {
      const s = JSON.parse(existingCheckout) as Section[]
      setSections(s)
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem('checkout', JSON.stringify(sections))
  }, [sections])

  useEffect(() => {
    location.hash = currentSectionId.toString()
  }, [currentSectionId])

  const hashChangeHandler = useCallback(() => {
    const hash = location.hash.slice(1)

    if (!hash || hash === '0' || hash === '') {
      setCurrentSectionId(0)
    }
    if (sectionsIds.includes(Number(hash))) {
      setCurrentSectionId(Number(hash))
    }
  }, [sectionsIds])

  useEffect(() => {
    window.addEventListener('hashchange', hashChangeHandler)
    return () => {
      window.removeEventListener('hashchange', hashChangeHandler)
    }
  }, [hashChangeHandler])

  const nextSection = useCallback(() => {
    setCurrentSectionId(currentSectionId + 1)
  }, [currentSectionId])

  const setValue = useCallback(
    (sectionId: number, value: Section['value']) => {
      const section = sections.find((s) => s.id === sectionId)
      if (!section) return
      section.value = value

      const newSections = [
        ...sections.filter((section) => section.id !== sectionId),
        section,
      ]

      setSections(newSections.sort((a, b) => a.id - b.id))
    },
    [sections]
  )

  const value = useMemo(
    () => ({
      sections,
      setCurrentSectionId,
      currentSectionId,
      nextSection,
      setValue,
      cart,
    }),
    [
      sections,
      setCurrentSectionId,
      currentSectionId,
      nextSection,
      setValue,
      cart,
    ]
  )
  return (
    <CheckoutStateContext.Provider value={value}>
      {children}
    </CheckoutStateContext.Provider>
  )
}

const useCheckout = () => {
  const context = useContext(CheckoutStateContext)
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider')
  }
  return context
}

export { CheckoutProvider, useCheckout }
export default CheckoutProvider
