import background from '../assets/background.png'
import BannerHome from '../components/BannerHome'
import ButtonHome from '../components/ButtonHome'
import Sign from '../auth/Sign'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '800px',
        backgroundAttachment: 'fixed',
      }}
    >
      <BannerHome />
      <ButtonHome />
      <Footer />
    </div>
  )
}
export default Home
