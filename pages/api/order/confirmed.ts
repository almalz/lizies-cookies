import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import * as SibApiV3Sdk from '@sendinblue/client'
import { SwellOrderCreatedWebhook } from '../../../types/orders'
// @ts-ignore
import swell from 'swell-node'

swell.init(process.env.NEXT_PUBLIC_SWELL_STORE_ID, process.env.SWELL_SECRET_KEY)

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
    console.info(`trying to fetch whole order for id ${id}`)

    const res: any = await swell.get('/orders/{id}', {
      id: id,
      expand: ['items.product', 'account', 'content'],
    })

    res.items = res.items.map((item: any) => {
      return {
        ...item,
        image_url: item.product.images[0].file.url + '?height=1500&width=1500',
        name: item.product.name,
      }
    })
    console.info(`sucessfully fetched whole order for id ${id}`)
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
  try {
    const body = JSON.parse(req.body)
    const { orderId, deliveryDate } = body

    const order = await fetchWholeOrder(orderId)

    console.info(
      `sending confirmation email for order ${orderId} - ${order?.number}`
    )

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
        delivery_date: formatDate(deliveryDate || ''),
      },
    })

    console.info(`sucessfully sent confirmation email`)
    res.status(200).json({ data })
  } catch (error) {
    console.error(error)
    res.status(202).json({
      errorMessage: 'Failed to send order confirmaition email',
      error,
    })
  }
}

export default handler
