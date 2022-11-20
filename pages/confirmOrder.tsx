import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

const ConfirmOrderPage = ({}) => {
  const billing = {
    method: 'ideal',
    ideal: {
      token: '<payment_method_id>',
    },
    intent: {
      stripe: {
        id: '<payment_intent_id>',
      },
    },
  }
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
