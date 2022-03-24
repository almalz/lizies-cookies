import React from 'react'
import { Story, Meta } from '@storybook/react'

import CartButton from '.'

export default {
  title: 'CartButton',
  component: CartButton,
} as Meta

const Template: Story = (args) => <CartButton {...args} />

export const Primary = Template.bind({})
Primary.args = {}
