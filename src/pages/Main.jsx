import React from 'react'
import Banner from '../components/Banner'
import CreatePost from '../components/CreatePost'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Post from '../components/Post'

const Main = () => {
  return (
    <div className="main">
      <Banner />
      <Navbar />
      <Post />
      <CreatePost />
      <Footer />
    </div>
  )
}

export default Main
