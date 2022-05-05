import React from 'react'

const Login = () => {
  event.StopPropagation()
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
      <button className="sign_confirm">
        <span>Valider</span>
      </button>
    </form>
  )
}

export default Login
