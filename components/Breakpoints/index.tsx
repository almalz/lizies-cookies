import React from 'react'
import { Box, Flex, BoxProps, FlexProps } from '@chakra-ui/react'

export type RBoxProps = {
  mobileOnly?: boolean
  desktopOnly?: boolean
} & BoxProps

export const RBox: React.FC<RBoxProps> = ({
  children,
  mobileOnly,
  desktopOnly,
  ...props
}) => {
  console.log(props)
  return (
    <>
      {mobileOnly ? (
        <Box display={['block', 'block', 'none', 'none']} {...props}>
          {children}
        </Box>
      ) : desktopOnly ? (
        <Box display={['none', 'none', 'block', 'block']} {...props}>
          {children}
        </Box>
      ) : (
        <Box {...props}>{children}</Box>
      )}
    </>
  )
}

export type RFlexProps = {
  mobileOnly?: boolean
  desktopOnly?: boolean
} & FlexProps

export const RFlex: React.FC<RBoxProps> = ({
  children,
  mobileOnly,
  desktopOnly,
  ...props
}) => {
  return (
    <>
      {mobileOnly ? (
        <Flex display={['flex', 'flex', 'none', 'none']} {...props}>
          {children}
        </Flex>
      ) : desktopOnly ? (
        <Flex display={['none', 'none', 'flex', 'flex']} {...props}>
          {children}
        </Flex>
      ) : (
        <Flex {...props}>{children}</Flex>
      )}
    </>
  )
}
