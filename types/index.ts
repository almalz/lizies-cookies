import { DropRecord } from './generated/graphql'
import { GraphQLError } from 'graphql'

export type Drops = Array<DropRecord>

export interface DropDates {
  allDrops: Array<Pick<DropRecord, 'deliveryDate'>>
}
