// Composant pour la connexion de l'utilisateur //

import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { AuthContext } from '../helpers/AuthContext'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setAuthState } = useContext(AuthContext)
  const [error, setError] = useState('')

  let navigate = useNavigate()

  const login = () => {
    const data = { username: username, password: password }
    axios.post('http://localhost:3001/auth/login', data).then((response) => {
      if (response.data.error) {
        setError("L'utilisateur n'existe pas!")
      } else {
        localStorage.setItem('accessToken', response.data.token) // stockage du token dans le localstorage
        setAuthState({
          // stockage des informations de l'utilisateur dans une variable global
          username: response.data.username,
          id: response.data.id,
          status: true,
          role: response.data.role,
        })
        navigate(`/main/${response.data.id}`)
      }
    })
  }

  return (
    <div className="loginContainer">
      <input
        type="text"
        placeholder="Pseudo"
        onChange={(event) => {
          setUsername(event.target.value)
        }}
      />
      {error ? <p>{error}</p> : null}
      <input
        type="password"
        placeholder="Mot de passe"
        onChange={(event) => {
          setPassword(event.target.value)
        }}
      />

      <button className="loginContainer_submit" onClick={login}>
        Valider
      </button>
    </div>
  )
}

export default Login
