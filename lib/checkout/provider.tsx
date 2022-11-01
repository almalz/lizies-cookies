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

const CheckoutForm = dynamic(() => import('../../components/CheckoutForm'), {
  ssr: false,
})

const DeliveryDatePicker = dynamic(
  () => import('../../components/DeliveryDatePicker'),
  {
    ssr: false,
  }
)

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
]

const CheckoutStateContext = createContext<
  | {
      sections: Section[]
      currentSectionId: number
      setCurrentSectionId: Dispatch<SetStateAction<number>>
      nextSection: () => void
      setValue: (sectionId: number, value: Section['value']) => void
    }
  | undefined
>(undefined)

const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSectionId, setCurrentSectionId] = useState(0)
  const [sections, setSections] = useState(SECTIONS)

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
    }),
    [sections, setCurrentSectionId, currentSectionId, nextSection, setValue]
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
