import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Button } from '.'

export default {
  title: 'Button',
  component: Button,
} as Meta

const Template: Story = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'drop du moment',
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'drop du moment',
  color: 'purple',
}
