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
  number,
  React.ComponentType<{ onComplete: (value: string) => void }>
> = {
  0: CheckoutForm,
  1: DeliveryDatePicker,
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
      getSection: (id: number) => Section | undefined
      setValue: (sectionId: number, value: Section['value']) => void
    }
  | undefined
>(undefined)

const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSectionId, setCurrentSectionId] = useState(0)
  const [sections, setSections] = useState(SECTIONS)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const existingCheckout = sessionStorage.getItem('checkout')

      if (existingCheckout) {
        const s = JSON.parse(existingCheckout) as Section[]
        console.log({ s })
        setSections(s)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('checkout', JSON.stringify(sections))
    }
  }, [sections])

  const nextSection = useCallback(() => {
    setCurrentSectionId(currentSectionId + 1)
  }, [currentSectionId])

  const setValue = useCallback(
    (sectionId: number, value: Section['value']) => {
      const section = sections.find((section) => section.id === sectionId)
      if (!section) return
      section.value = value

      setSections([
        ...sections.filter((section) => section.id !== sectionId),
        section,
      ])
    },
    [sections]
  )

  const getSection = useCallback(
    (id: number) => {
      return sections.find((section) => (section.id = id))
    },
    [sections]
  )

  const value = useMemo(
    () => ({
      sections,
      setCurrentSectionId,
      currentSectionId,
      nextSection,
      getSection,
      setValue,
    }),
    [
      sections,
      setCurrentSectionId,
      currentSectionId,
      getSection,
      nextSection,
      setValue,
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
