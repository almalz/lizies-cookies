import Layout from '../components/Layout'
import Countdown from 'react-countdown'

const COUNTDOWN_DATE = new Date('16 june 2022')

const renderer = ({ days, hours, minutes, seconds }: any) => {
  return (
    <div className="font-body text-3xl font-bold text-pink-500 sm:text-5xl">
      <span>
        {days}j {hours}h {minutes}min {seconds}s
      </span>
    </div>
  )
}

const Home = () => {
  return (
    <Layout seo={undefined} slug="" className="flex h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-y-16">
        <h1 className="font-body text-3xl font-bold text-purple-700 sm:text-6xl">
          Ouverture de la boutique
        </h1>
        <Countdown date={COUNTDOWN_DATE} renderer={renderer} />
      </div>
    </Layout>
  )
}

export default Home
