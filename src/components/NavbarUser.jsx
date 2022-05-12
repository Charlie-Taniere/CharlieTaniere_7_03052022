import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'
import { AuthContext } from '../helpers/AuthContext'

const NavbarUser = () => {
  const { setAuthState } = useContext(AuthContext)
  let navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('accessToken')
    setAuthState({ username: '', id: 0, status: false }, navigate('/'))
  }

  return (
    <nav className="nav-user">
      <button className="nav-user_logout-btn" onClick={logout}>
        Déconnexion
      </button>

      <button className="nav-user_config">
        <FontAwesomeIcon
          icon={faPlus}
          style={{ fontSize: 25, color: 'black' }}
        />
      </button>

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
