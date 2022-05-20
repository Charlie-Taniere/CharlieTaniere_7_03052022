import React, { useContext } from 'react'
import groupomania from '../assets/groupomania.jpg'
import { AuthContext } from '../helpers/AuthContext'
import NavbarUser from './NavbarUser'

const Banner = () => {
  const auth = useContext(AuthContext)

  return (
    <header className="banner">
      <div className="banner_container">
        <img
          className="banner_container_img"
          src={groupomania}
          alt="Logo de Groupomania"
        />
        {auth.authState.status && <NavbarUser />}
      </div>
      {!auth.authState.status && (
        <title className="banner_title">
          <h1>Le réseau social pour les collaborateurs de Groupomania!</h1>
        </title>
      )}
    </header>
  )
}

export default Banner
