import React from 'react'
import { useState } from 'react'
import Axios from 'axios'

const Sign = () => {
  const [name, setName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const addUser = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      lastname: lastname,
      email: email,
    }).then(() => {
      console.log('succes')
    })
  }

  return (
    <form className="sign">
      <label className="sign_label">Prénom : </label>
      <input
        className="sign_input"
        type="text"
        defaultValue="Jean"
        onChange={(event) => {
          setName(event.target.value)
        }}
      ></input>
      <label className="sign_label">Nom : </label>
      <input
        className="sign_input"
        type="text"
        onChange={(event) => {
          setLastName(event.target.value)
        }}
      ></input>
      <label className="sign_label">Email : </label>
      <input
        className="sign_input"
        type="text"
        onChange={(event) => {
          setEmail(event.target.value)
        }}
      ></input>
      <label className="sign_label">Mot de passe : </label>
      <input
        className="sign_input"
        type="text"
        onChange={(event) => {
          setPassword(event.target.value)
        }}
      ></input>
      <label className="sign_label">Confirmez le mot de passe : </label>
      <input
        className="sign_input"
        type="text"
        onChange={(event) => {
          setPassword(event.target.value)
        }}
      ></input>
      <button className="sign_confirm" onClick={addUser}>
        <span>Valider</span>
      </button>
    </form>
  )
}

export default Sign
