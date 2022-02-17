import ProductItem from '../components/ProductList/ProductItem'
import { DropRecord, ProductRecord, FileField } from './generated/graphql'

export type File = Partial<FileField>

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type _Product = PartialBy<
  ProductRecord,
  | '_createdAt'
  | '_isValid'
  | '_modelApiKey'
  | '_publicationScheduledAt'
  | '_seoMetaTags'
  | '_status'
  | '_updatedAt'
  | 'createdAt'
  | 'updatedAt'
>

export type Product = Omit<_Product, 'pictures'> & { pictures: Array<File> }

export type Products = Array<Product>

type _Drop = PartialBy<
  DropRecord,
  | '_createdAt'
  | '_isValid'
  | '_modelApiKey'
  | '_publicationScheduledAt'
  | '_seoMetaTags'
  | '_status'
  | '_updatedAt'
  | 'createdAt'
  | 'updatedAt'
>

export type Drop = Omit<_Drop, 'pictures' | 'products'> & {
  pictures: Array<File>
} & {
  products: Products
}

export type Drops = Array<Drop>
