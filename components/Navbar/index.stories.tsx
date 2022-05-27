import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Navbar } from '.'

export default {
  title: 'Navbar',
  component: Navbar,
} as Meta

const Template: Story = (args) => <Navbar {...args} />

export const Primary = Template.bind({})
Primary.args = {}
