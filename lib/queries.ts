import { gql } from '@apollo/client'
import client from './apolloClient'

export const DROPS = gql`
  query Drops {
    allDrops {
      releaseDate
      deliveryDate
      cookies {
        id
        description
        name
        picture {
          alt
          url
        }
      }
    }
  }
`

// export const DROP_DATES = gql`

// `

export const getDrops = async () => client.query({ query: DROPS })
export const getDropDates = async () => client.query({ query: DROP_DATES })
