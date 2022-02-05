import { from } from 'apollo-link'
import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import client from '../../lib/apolloClient'
import { Drop } from '../../types'
import {
  DropByIdDocument,
  DropByIdQuery,
  DropsDocument,
  DropsQuery,
} from '../../types/generated/graphql'

export type DropPageProps = {
  drop: Drop
}

const Drop: NextPage<DropPageProps> = ({ drop }) => {
  return <div>{JSON.stringify(drop)}</div>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<DropsQuery>({
    query: DropsDocument,
  })

  const paths = data.allDrops.map((drop) => ({
    params: { slug: drop.slug! },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query<DropByIdQuery>({
    query: DropByIdDocument,
  })

  const drop = data.drop

  return {
    props: {
      drop,
    },
  }
}

export default Drop
