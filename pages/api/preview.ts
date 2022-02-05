import { NextApiRequest, NextApiResponse } from 'next'
import client from '../../lib/apolloClient'
import {
  DropDatesDocument,
  DropDatesQuery,
} from '../../types/generated/graphql'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  console.log(req.query)

  if (req.query.secret !== 'DATOCMS_PREVIEW_SECRET' || !req.query.slug) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const { data } = await client.query<DropDatesQuery>({
    query: DropDatesDocument,
  })

  // Get the paths we want to pre-render based on posts
  const paths = data.allDrops.map((drop) => ({
    params: { id: drop.deliveryDate },
  }))

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!data) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(post.slug)
}

export default handler
