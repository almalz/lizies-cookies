import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Footer } from '.'

export default {
  title: 'Footer',
  component: Footer,
} as Meta

const Template: Story = (args) => <Footer {...args} />

export const Primary = Template.bind({})
Primary.args = {}
