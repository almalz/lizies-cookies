import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import * as SibApiV3Sdk from '@sendinblue/client'
import { SwellOrderCreatedWebhook } from '../../../types/orders'
import swell from '../../../lib/store/swellServer'

const SibApi = new SibApiV3Sdk.TransactionalEmailsApi()

SibApi.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.SENDINBLUE_API_KEY!
)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-fr', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

const fetchWholeOrder = async (id: string) => {
  try {
    const res: any = await swell.get('/orders/{id}', {
      id: id,
      expand: ['items.product', 'account'],
    })

    res.items = res.items.map((item: any) => {
      return {
        ...item,
        image_url: item.product.images[0].file.url + '?height=1500&width=1500',
        name: item.product.name,
      }
    })
    return res
  } catch (error) {
    console.error(error)
    throw new Error(`Could not fetch products for ids ${id}`)
  }
}

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const body: SwellOrderCreatedWebhook = req.body

  const order = await fetchWholeOrder(body.data.id)

  try {
    const data = await SibApi.sendTransacEmail({
      to: [
        {
          email: order.account.email,
        },
      ],
      subject: `Confirmation commande #${order.number}`,
      templateId: 3,
      params: {
        ...order,
        shipping_method: order.shipping.pickup ? 'pickup' : 'delivery',
        delivery_date: formatDate(order.metadata.delivery_date) || '',
      },
    })
    res.status(200).json({ data })
  } catch (error) {
    console.error(error)
    res.status(500).send('Failed to send order confirmaition email')
  }
}

export default handler
