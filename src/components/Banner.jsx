import React, { useContext } from 'react'
import groupomania from '../assets/groupomania.jpg'
import { AuthContext, AuthProvider } from '../helpers/AuthContext'
import NavbarUser from './NavbarUser'

const Banner = () => {
  const auth = useContext(AuthContext)
  console.log(auth)

  return (
    <header className="banner">
      <div className="banner_container">
        <img
          className="banner_container_img"
          src={groupomania}
          alt="Logo de Groupomania"
        />
        <AuthProvider value={auth}>
          <NavbarUser />
        </AuthProvider>
      </div>
      <title className="banner_title">
        <h1>Le réseau social pour les collaborateurs de Groupomania!</h1>
      </title>
    </header>
  )
}

export default Banner
