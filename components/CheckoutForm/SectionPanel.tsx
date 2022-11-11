import { AccordionButton, Box, AccordionIcon } from '@chakra-ui/react'
import clsx from 'clsx'
import { Section } from '../../lib/checkout/provider'

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
      <Box
        flex="1"
        textAlign="left"
        className="font-body text-xl font-bold capitalize"
      >
        {label}
      </Box>
      {!isOpen && (
        <pre className="my-4 ml-8 text-left font-sans text-xs font-bold">
          {value}
        </pre>
      )}
    </AccordionButton>
  )
}
