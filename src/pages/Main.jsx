import React from 'react'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import AllPost from '../components/AllPost'

const Main = () => {
  return (
    <div className="main">
      <Banner />
      <Navbar />
      <AllPost />
      <Footer />
    </div>
  )
}

export default Main
