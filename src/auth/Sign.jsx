import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'

const Sign = () => {
  const [name, setName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const addUser = (e) => {
    e.preventDefault()
    Axios.post('http://localhost:3001/auth', {
      name: name,
      lastname: lastname,
      email: email,
      password: password,
    }).then(() => {
      console.log('succes')
    })
  }

  return (
    <form className="sign" onSubmit={(e) => handleSubmit(e)}>
      <input
        className="sign_input"
        type="text"
        placeholder="Prénom"
        onChange={(event) => {
          setName(event.target.value)
        }}
      ></input>
      {error && <p>Veuillez renseigner votre prénom</p>}
      <input
        className="sign_input"
        type="text"
        placeholder="Nom"
        onChange={(event) => {
          setLastName(event.target.value)
        }}
      ></input>
      {error && <p>Veuillez renseigner votre nom</p>}
      <input
        className="sign_input"
        type="text"
        placeholder="Email"
        onChange={(event) => {
          setEmail(event.target.value)
        }}
      ></input>
      {error && <p>Veuillez renseigner votre email</p>}
      <input
        className="sign_input"
        type="text"
        placeholder="Mot de passe"
        onChange={(event) => {
          setPassword(event.target.value)
        }}
      ></input>
      <input
        className="sign_input"
        type="text"
        placeholder="Confirmez le mot de passe"
        onChange={(event) => {
          setPassword(event.target.value)
        }}
      ></input>
      <button className="sign_confirm" type="submit" onClick={addUser}>
        Valider
      </button>
    </form>
  )
}

export default Sign
