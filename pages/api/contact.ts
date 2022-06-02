import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export type ContactFormValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  object: string
  message: string
}

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body)

  res.send('okokok')
}

export default handler
