import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
// @ts-ignore
import swell from 'swell-node'
import { SwellAccount } from '../../lib/store/account/types'

swell.init(process.env.NEXT_PUBLIC_SWELL_STORE_ID, process.env.SWELL_SECRET_KEY)

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== 'POST') {
    res.status(404)
  }

  const account: SwellAccount = JSON.parse(req.body).account

  try {
    const { results } = await swell.get('/accounts', {
      email: account.email,
    })

    if (results.length > 1) {
      return res.status(404).json({
        error: `Multiple account found with the email ${account.email}. Not able to proceed`,
      })
    }

    if (results.length === 1) {
      const accountId = results[0].id
      const data = await swell.put(`/accounts/${accountId}`, account)
      console.info(`Sucessfuly updated account for email ${account.email}`)
      return res.status(201).json(data)
    }
    const data = await swell.post('accounts', account)
    console.info(`Sucessfuly created account for email ${account.email}`)
    return res.status(201).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: `Failed to upsert account for email ${account.email}`,
      error,
    })
  }
}
export default handler
