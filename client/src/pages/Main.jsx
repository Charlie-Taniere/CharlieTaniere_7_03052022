// Page principal où se trouve tous les articles //

import React from 'react'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import AllPost from '../components/AllPost'

const Main = () => {
  return (
    <div className="main">
      <Banner />
      <AllPost />
      <Footer />
    </div>
  )
}

export default Main
