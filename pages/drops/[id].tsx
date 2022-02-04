import { from } from 'apollo-link'
import { GetStaticProps, GetStaticPaths } from 'next'
import client from '../../lib/apolloClient'
import {
  DropDatesDocument,
  DropDatesQuery,
  DropsDocument,
  DropsQuery,
} from '../../generated/graphql'

export const getStaticPaths: GetStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const res = await client.query<DropDatesQuery>({
    query: DropDatesDocument,
  })

  // Get the paths we want to pre-render based on posts
  const paths = res.data.allDrops.map((drop) => ({
    params: { id: drop.deliveryDate },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await client.query<DropsQuery>({
    query: DropsDocument,
  })

  const drops = res.data.allDrops

  // Pass post data to the page via props
  return {
    props: {
      drops,
    },
  }
}
