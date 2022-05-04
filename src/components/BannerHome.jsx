import React from 'react'
import groupomania from '../assets/groupomania.jpg'

const BannerHome = () => {
  return (
    <header className="banner-home">
      <img
        className="banner-home_img"
        src={groupomania}
        alt="Logo de Groupomania"
      />
      <title className="banner-home_title">
        <h1>Le réseau social pour les collaborateurs de Groupomania!</h1>
      </title>
    </header>
  )
}

export default BannerHome
