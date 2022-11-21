import { AccordionButton, Box } from '@chakra-ui/react'
import { Section } from '../../lib/store/checkout/provider'

type SectionPanelProps = {
  label: string
  value: Section['value']
  isOpen: boolean
}

export const SectionPanel: React.FC<SectionPanelProps> = ({
  label,
  value,
  isOpen,
}) => {
  return (
    <AccordionButton
      disabled={isOpen}
      as={isOpen ? 'div' : 'button'}
      bg={!isOpen ? '#fdecec' : 'transparent'}
      color="#2E1550"
      _hover={{ background: !isOpen && '#fad9da' }}
      rounded="md"
    >
      <Box flex="1" textAlign="left" className="font-body font-bold sm:text-xl">
        {label}
      </Box>
      {!isOpen && (
        <pre className="my-6 ml-4 text-left font-sans text-xs font-bold leading-5 tracking-wide sm:ml-8">
          {value}
        </pre>
      )}
    </AccordionButton>
  )
}
