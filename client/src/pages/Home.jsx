import Banner from '../components/Banner'
import ButtonHome from '../components/ButtonHome'
import Footer from '../components/Footer'
import background from '../assets/background.png'

const Home = () => {
  return (
    <div
      className="home"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '800px',
        backgroundAttachment: 'fixed',
      }}
    >
      <Banner />
      <ButtonHome />
      <Footer />
    </div>
  )
}
export default Home
