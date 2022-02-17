import React from 'react'
import { Story, Meta } from '@storybook/react'

import DropSummary, { DropSummaryProps } from '.'
import { Drop, File } from '../../types'

export default {
  title: 'DropSummary',
  component: DropSummary,
} as Meta<DropSummaryProps>

const Template: Story<DropSummaryProps> = (args) => <DropSummary {...args} />

const pictures: Array<File> = [
  {
    url: 'https://www.datocms-assets.com/62800/1644160176-screenshot-2022-02-06-at-16-09-05.png',
    alt: 'Cookies aux pépites de chocolat noir',
  },
  {
    url: 'https://www.datocms-assets.com/62800/1644160176-screenshot-2022-02-06-at-16-09-05.png',
    alt: 'Cookies aux pépites de chocolat noir',
  },
  {
    url: 'https://www.datocms-assets.com/62800/1644160176-screenshot-2022-02-06-at-16-09-05.png',
    alt: 'Cookies aux pépites de chocolat noir',
  },
]

const drop: Drop = {
  id: 123,
  deliveryDate: '02 02 2022',
  endDate: '31 01 2022',
  pictures: pictures,
  products: [
    {
      id: 12412,
      name: 'Cookies aux pépites de chocolat noir',
      description:
        'Pâte à cookie nature, pépites de chocolat noir, insert fondant au beurre de cacahuète',
      unitPrice: 3,
      pictures: pictures,
      ingredients:
        'farine de blé tendre, chocolat noir (cacao, sucre), oeufs, sucre brun, bicarbonate de soude',
      allergens:
        'gluten, arachides, lactose. Peut contenir des traces de soja, fruits a coques',
    },
  ],
}

export const Primary = Template.bind({})
Primary.args = {
  drop,
}
