import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons'
import icon_groupomania from '../assets/icon_groupomania.png'

const Navbar = () => {
  return (
    <nav className="nav">
      <ul className="nav_nav">
        <li>
          <a>Top like</a>
        </li>
        <li>
          <a>Nouveauté</a>
        </li>
        <li>
          <a>Au hasard</a>
        </li>
        <li>
          <a>Top commentaire</a>
        </li>
      </ul>
      <div className="nav_container-img">
        <a href="/">
          <img
            className="banner_img"
            src={icon_groupomania}
            alt="Logo de Groupomania"
          />
        </a>
      </div>
      <ul className="nav_config">
        <li className="nav_config_add">
          <a>
            <FontAwesomeIcon
              icon={faPlus}
              style={{ fontSize: 35, color: 'black' }}
            />
          </a>
        </li>
        <li className="nav_config_profil">
          <a>
            <FontAwesomeIcon
              icon={faUser}
              style={{ fontSize: 25, color: 'black' }}
            />
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
