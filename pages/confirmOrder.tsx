import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

const ConfirmOrderPage = ({}) => {
  return <div></div>
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  console.log({ query })

  return {
    props: {},
  }
}

export default ConfirmOrderPage
