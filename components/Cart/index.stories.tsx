import React from 'react'
import { Story, Meta } from '@storybook/react'

import Cart, { CartProps } from '.'

export default {
  title: 'Cart',
  component: Cart,
} as Meta<CartProps>

const Template: Story<CartProps> = (args) => <Cart {...args} />

export const Primary = Template.bind({})
Primary.args = {
  itemCount: 23,
}
