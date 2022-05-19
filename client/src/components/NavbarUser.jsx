import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faUser,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'
import { AuthContext } from '../helpers/AuthContext'
import CreatePost from '../components/CreatePost'
import Popup from 'reactjs-popup'

const NavbarUser = () => {
  const { setAuthState } = useContext(AuthContext)
  let navigate = useNavigate()

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
        <CreatePost />
      </Popup>

      <button className="nav-user_config">
        <FontAwesomeIcon
          icon={faUser}
          style={{ fontSize: 25, color: 'black' }}
        />
      </button>
    </nav>
  )
}

export default NavbarUser
