import React from 'react'
import Sign from '../auth/Sign'
import Login from '../auth/Login'
import { useState } from 'react'

const ButtonHome = () => {
  const [signIsOpen, setSign] = useState(false)
  const [loginIsOpen, setLogin] = useState(false)

  return (
    <div className="button-home">
      <div className="button-home_sign" onClick={() => setSign(!signIsOpen)}>
        <span className="button-home_sign_click">Inscription</span>
        {signIsOpen ? <Sign /> : ''}
      </div>

      <div className="button-home_log" onClick={() => setLogin(!loginIsOpen)}>
        <span className="button-home_log_click">Connexion</span>
        {loginIsOpen ? <Login /> : ''}
      </div>
    </div>
  )
}

export default ButtonHome
