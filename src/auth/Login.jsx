import React from 'react'

const Login = () => {
  return (
    <form className="login">
      <label className="login_label">Email : </label>
      <input
        className="login_input"
        type="text"
        defaultValue=" "
        onChange={(event) => {
          setEmail(event.target.value)
        }}
      ></input>
      <label className="login_label">Mot de passe : </label>
      <input
        className="login_input"
        type="text"
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
