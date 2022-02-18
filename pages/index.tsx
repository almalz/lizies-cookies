import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useQuery } from '@apollo/client'
import { DROPS } from '../lib/queries'

const Home: NextPage = () => {
  const { data, loading, error } = useQuery(DROPS)

  return (
    <div>
      {loading && 'Loading'}
      {error && `${error}`}
      {data && `${data}`}
    </div>
  )
}

export default Home
