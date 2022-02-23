import React from 'react'
import { Story, Meta } from '@storybook/react'

import Cart from '.'

export default {
  title: 'Cart',
  component: Cart,
} as Meta

const Template: Story = (args) => <Cart {...args} />

export const Primary = Template.bind({})
Primary.args = {}
