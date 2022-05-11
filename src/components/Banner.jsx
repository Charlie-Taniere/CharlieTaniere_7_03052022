import React, { useContext } from 'react'
import groupomania from '../assets/groupomania.jpg'
import { useNavigate } from 'react-router'
import { AuthContext } from '../helpers/AuthContext'

const Banner = () => {
  const authState = useContext(AuthContext)
  console.log(authState)
  const logout = () => {
    localStorage.removeItem('accessToken')
    setAuthState({ username: '', id: 0, status: false }, navigate('/'))
  }

  return (
    <header className="banner">
      <div className="banner_container">
        <img
          className="banner_container_img"
          src={groupomania}
          alt="Logo de Groupomania"
        />

        <button className="banner_container_btn" onClick={logout}>
          Déconnexion
        </button>
      </div>
      <title className="banner_title">
        <h1>Le réseau social pour les collaborateurs de Groupomania!</h1>
      </title>
    </header>
  )
}

export default Banner
