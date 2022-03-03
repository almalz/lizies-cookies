import {
  ApolloClient,
  InMemoryCache,
  from,
  ApolloLink,
  HttpLink,
} from '@apollo/client'

const API_URL = process.env.NEXT_PUBLIC_DATOCMS_API_URL
const API_TOKEN = process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN

const httpLink = new HttpLink({
  uri: API_URL,
})

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: any) => ({
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
  }))
  return forward(operation)
})

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
})

export default client
