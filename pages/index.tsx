import Layout from '../components/Layout'

const Home = () => {
  return (
    <Layout seo={undefined} slug="" className="flex h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-y-12">
        <h1 className="font-body text-3xl font-bold text-purple-700 sm:text-6xl">
          ouverture de la boutique
        </h1>
        <span className="font-body text-3xl font-bold text-pink-500 sm:text-5xl">
          le jeudi 16 juin 2022
        </span>
      </div>
    </Layout>
  )
}

export default Home
