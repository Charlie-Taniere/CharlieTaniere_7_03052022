import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../helpers/AuthContext'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setAuthState } = useContext(AuthContext)

  let navigate = useNavigate()

  const login = () => {
    const data = { username: username, password: password }
    axios.post('http://localhost:3001/auth/login', data).then((response) => {
      if (response.data.error) {
        alert(response.data.error)
      } else {
        localStorage.setItem('accessToken', response.data.token)
        setAuthState({
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
