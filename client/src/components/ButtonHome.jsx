// Composant des boutons de connxions et d'enregistrement //

import React from 'react'
import Sign from '../auth/Sign'
import Login from '../auth/Login'
import { useState } from 'react'

const ButtonHome = () => {
  // Utilisation du Hook d'état pour l'affichage des deux boutons
  const [signIsOpen, setSign] = useState(false)
  const [loginIsOpen, setLogin] = useState(false)

  return (
    <div className="button-home">
      <div className="button-home_sign">
        <span
          className="button-home_sign_click"
          onClick={() => setSign(!signIsOpen)}
        >
          Inscription
        </span>
        {signIsOpen && <Sign />}
      </div>

      <div className="button-home_log">
        <span
          className="button-home_log_click"
          onClick={() => setLogin(!loginIsOpen)}
        >
          Connexion
        </span>
        {loginIsOpen && <Login />}
      </div>
    </div>
  )
}

export default ButtonHome
