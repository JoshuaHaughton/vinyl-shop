import Discounted from '../../components/HomeSections/Discounted/Discounted'
import Explore from '../../components/HomeSections/Explore/Explore'
import Featured from '../../components/HomeSections/Featured/Featured'
import Highlights from '../../components/HomeSections/Highlights/Highlights'
import Landing from '../../components/HomeSections/Landing/Landing'

const Home = () => {
  return (
    <>
      <Landing />
      <Highlights />
      <Featured />
      <Discounted />
      <Explore />
    </>
  )
}

export default Home
