import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import * as SibApiV3Sdk from '@sendinblue/client'

const SibApi = new SibApiV3Sdk.TransactionalEmailsApi()

SibApi.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.SENDINBLUE_API_KEY!
)

export type ContactFormValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  object: string
  message: string
}

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { contact } = req.body

  try {
    const data = await SibApi.sendTransacEmail({
      to: [
        {
          email: process.env.CONTACT_EMAIL!,
        },
      ],
      subject: 'Demande de contact {{params.firstName}} {{params.lastName}}',
      templateId: 2,
      params: {
        ...contact,
        sentAt: new Date().toLocaleString('fr-FR', { timeZone: 'CET' }),
      },
    })

    res.status(201).json({ data })
  } catch (error) {
    res.status(500).send('Failed to send incomming contact email')
  }
}

export default handler
