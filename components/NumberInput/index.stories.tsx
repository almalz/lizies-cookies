import React from 'react'
import { Story, Meta } from '@storybook/react'

import NumberInput, { NumberInputProps } from '.'

export default {
  title: 'NumberInput',
  component: NumberInput,
} as Meta<NumberInputProps>

const Template: Story<NumberInputProps> = (args) => <NumberInput {...args} />

export const Primary = Template.bind({})
Primary.args = {
  value: 2,
}
