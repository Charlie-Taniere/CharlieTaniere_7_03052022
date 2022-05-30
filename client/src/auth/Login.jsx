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
    console.log('test 14', username, password)
    const data = { username: username, password: password }
    console.log('test 16' + data.username)
    axios.post('http://localhost:3001/auth/login', data).then((response) => {
      console.log('test 18', response.data)
      if (response.data.error) {
        alert('error' + response.data.error)
      } else {
        localStorage.setItem('accessToken', response.data.token)
        console.log('ligne 22' + response.data.id)
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        })
        console.log('ligne 28' + response.data.id)
        navigate(`/main/${response.data.id}`)
      }
    })
  }

  return (
    <form className="loginContainer">
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
    </form>
  )
}

export default Login
