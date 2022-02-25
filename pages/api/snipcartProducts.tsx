import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../lib/apolloClient'
import { ProductsDocument, ProductsQuery } from '../../types/generated/graphql'

const DOMAIN_NAME = process.env.NEXT_PUBLIC_DOMAIN_NAME

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await client.query<ProductsQuery>({
    query: ProductsDocument,
  })

  const products = data.allProducts.map((product) => {
    return {
      id: product.id,
      price: product.unitPrice,
      url: `${DOMAIN_NAME}/api/snipcartProducts`,
    }
  })

  res.status(200).json(products)
}

export default handler
