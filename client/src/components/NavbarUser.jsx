// Composant de la barre utilisateur //

import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faUser,
  faArrowRightFromBracket,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'
import { AuthContext } from '../helpers/AuthContext'
import CreatePost from '../components/CreatePost'
import Popup from 'reactjs-popup'
import { useLocation } from 'react-router-dom'

const NavbarUser = () => {
  const auth = useContext(AuthContext)
  const id = auth.authState.id

  const { setAuthState } = useContext(AuthContext)
  let navigate = useNavigate()
  const location = useLocation()

  // Fonction qui permet à l'utilisateur de se déconnecter
  const logout = () => {
    localStorage.removeItem('accessToken')
    setAuthState({ username: '', id: 0, status: false }, navigate('/'))
  }

  return (
    <nav className="nav-user">
      <button
        className="nav-user_config"
        aria-label="Bouton pour se déconnecter"
        onClick={logout}
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </button>

      {location.pathname.includes('main') && (
        <Popup
          trigger={
            <button
              className="nav-user_config"
              aria-label="Bouton pour poster un article"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          }
          position="center"
        >
          {(close) => <CreatePost closeProps={close} />}
        </Popup>
      )}

      {location.pathname.includes('profile') && (
        <button
          className="nav-user_config"
          aria-label="Bouton pour revenir en arrière"
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}

      {location.pathname.includes('post') && (
        <button
          className="nav-user_config"
          aria-label="Bouton pour revenir en arrière"
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}

      <button
        className="nav-user_config"
        aria-label="Bouton pour accéder à son profil"
        onClick={() => navigate(`/profile/${id}`)}
      >
        <FontAwesomeIcon icon={faUser} />
      </button>
    </nav>
  )
}

export default NavbarUser
