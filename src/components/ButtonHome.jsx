import React from 'react'
import Sign from '../auth/Sign'
import Login from '../auth/Login'
import { useState } from 'react'

const ButtonHome = () => {
  // const [signIsOpen, setSign] = useState(false)
  // onClick={() => setSign(!signIsOpen)}
  // {signIsOpen ? <Sign /> : ''}

  const [loginIsOpen, setLogin] = useState(false)
  // onClick={() => setLogin(!loginIsOpen)}
  // {loginIsOpen ? <Login /> : ''}

  return (
    <div className="button-home">
      <div className="button-home_sign">
        <span className="button-home_sign_click">Inscription</span>
        {<Sign />}
      </div>

      <div className="button-home_log">
        <span
          className="button-home_log_click"
          onClick={() => setLogin(!loginIsOpen)}
        >
          Connexion
        </span>
        {loginIsOpen ? <Login /> : ''}
      </div>
    </div>
  )
}

export default ButtonHome
