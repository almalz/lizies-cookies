// import { GetStaticProps, GetStaticPaths } from 'next'
// import { useQuery } from '@apollo/client'
// import { getDropDates, getDrops } from '../../lib/queries'

// export const getStaticPaths: GetStaticPaths = async () => {
//   // Call an external API endpoint to get posts
//   const dates = await getDropDates()

//   // Get the paths we want to pre-render based on posts
//   const paths = dates.map((date) => ({
//     params: { id: dates },
//   }))

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false }
// }

// // This also gets called at build time
// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   // params contains the post `id`.
//   // If the route is like /posts/1, then params.id is 1
//   const drops = await getDrops()

//   // Pass post data to the page via props
//   return { props: { drops } }
// }
export {}
