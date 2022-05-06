import React from 'react'
import Article from '../components/Article'
import AddArticle from '../components/AddArticle'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Main = () => {
  return (
    <div className="main">
      <Banner />
      <Navbar />
      {/* <Article /> */}
      <AddArticle />
      {/* <Footer /> */}
    </div>
  )
}

export default Main
