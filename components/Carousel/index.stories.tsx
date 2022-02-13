import React from 'react'
import { Story, Meta } from '@storybook/react'
import { File } from '../../types'
import Carousel, { CarouselProps } from '.'

export default {
  title: 'Carousel',
  component: Carousel,
} as Meta<CarouselProps>

const Template: Story<CarouselProps> = (args) => <Carousel {...args} />

const images: File[] = [
  {
    url: 'https://www.datocms-assets.com/62800/1644160176-screenshot-2022-02-06-at-16-09-05.png',
    alt: 'Cookies aux pépites de chocolat noir',
    id: 1,
  },
  {
    url: 'https://www.datocms-assets.com/62800/1644160176-screenshot-2022-02-06-at-16-09-05.png',
    alt: 'Cookies aux pépites de chocolat noir',
    id: 2,
  },
  {
    url: 'https://www.datocms-assets.com/62800/1644160176-screenshot-2022-02-06-at-16-09-05.png',
    alt: 'Cookies aux pépites de chocolat noir',
    id: 3,
  },
]

export const Primary = Template.bind({})
Primary.args = {
  images,
  width: ['250px', '250px', '450px', '450px'],
  height: ['30px', '300px', '500px', '500px'],
}
