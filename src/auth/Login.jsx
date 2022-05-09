import React from 'react'
import { useState } from 'react'
import Axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const logUser = (e) => {
    e.preventDefault()
    Axios.post('http://localhost:3001/auth/login', {
      email: email,
      password: password,
    }).then((response) => {
      console.log(response)
    })
  }

  return (
    <form className="login">
      <input
        className="login_input"
        type="text"
        placeholder="Email"
        onChange={(event) => {
          setEmail(event.target.value)
        }}
      ></input>
      <input
        className="login_input"
        type="text"
        placeholder="Mot de passe"
        onChange={(event) => {
          setPassword(event.target.value)
        }}
      ></input>
      <button className="sign_confirm" onClick={logUser}>
        <span>Valider</span>
      </button>
    </form>
  )
}

export default Login
