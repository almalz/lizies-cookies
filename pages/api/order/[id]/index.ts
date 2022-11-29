import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
// @ts-ignore
import swell from 'swell-node'

swell.init(process.env.NEXT_PUBLIC_SWELL_STORE_ID, process.env.SWELL_SECRET_KEY)

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== 'PATCH') {
    res.status(404)
  }

  const body = JSON.parse(req.body)
  const content = body.content
  const accountId = body.accountId
  const orderId = req.query.id

  try {
    const order = await swell.put('/orders/{id}', {
      id: orderId,
      account_id: accountId,
      content,
    })

    return res.status(201).json(order)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: `Failed to update order ${orderId}`,
      error,
    })
  }
}
export default handler
