import React from 'react'
import { Story, Meta } from '@storybook/react'

import Links from '.'

export default {
  title: 'Links',
  component: Links,
} as Meta

const Template: Story = (args) => <Links {...args} />

export const Primary = Template.bind({})
Primary.args = {}
