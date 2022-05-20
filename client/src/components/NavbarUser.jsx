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

  const logout = () => {
    localStorage.removeItem('accessToken')
    setAuthState({ username: '', id: 0, status: false }, navigate('/'))
  }

  return (
    <nav className="nav-user">
      <button className="nav-user_config" onClick={logout}>
        <FontAwesomeIcon
          icon={faArrowRightFromBracket}
          style={{ fontSize: 25, color: 'black' }}
        />
      </button>

      {location.pathname.includes('main') && (
        <Popup
          trigger={
            <button className="nav-user_config">
              <FontAwesomeIcon
                icon={faPlus}
                style={{ fontSize: 25, color: 'black' }}
              />
            </button>
          }
          position="center"
        >
          {(close) => <CreatePost closeProps={close} />}
        </Popup>
      )}

      {location.pathname.includes('profile') && (
        <button className="nav-user_config" onClick={() => navigate(-1)}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ fontSize: 25, color: 'black' }}
          />
        </button>
      )}

      {location.pathname.includes('post') && (
        <button className="nav-user_config" onClick={() => navigate(-1)}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ fontSize: 25, color: 'black' }}
          />
        </button>
      )}

      <button
        className="nav-user_config"
        onClick={() => navigate(`/profile/${id}`)}
      >
        <FontAwesomeIcon
          icon={faUser}
          style={{ fontSize: 25, color: 'black' }}
        />
      </button>
    </nav>
  )
}

export default NavbarUser
