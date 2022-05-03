import '../styles/index.css'
import groupomania from '../assets/groupomania.jpg'
import background from '../assets/background.png'
import { useState } from 'react'
import Axios from 'axios'

const Home = () => {
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
    <div
      className="App"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '800px',
        backgroundAttachment: 'fixed',
      }}
    >
      <header className="index-logo">
        <img src={groupomania} alt="Logo de Groupomania" />
      </header>
      <title className="index-title">
        <h1>Le réseau social pour les collaborateurs de Groupomania!</h1>
      </title>
      <div className="index-login-container">
        <div className="index-sign">
          <span>Inscription</span>
          <form className="index-sign-form">
            <label>Prénom : </label>
            <input
              type="text"
              onChange={(event) => {
                setName(event.target.value)
              }}
            ></input>
            <label>Nom : </label>
            <input
              type="text"
              onChange={(event) => {
                setLastName(event.target.value)
              }}
            ></input>
            <label>Email : </label>
            <input
              type="text"
              onChange={(event) => {
                setEmail(event.target.value)
              }}
            ></input>
            <label>Mot de passe : </label>
            <input
              type="text"
              onChange={(event) => {
                setPassword(event.target.value)
              }}
            ></input>
            <label>Confirmez le mot de passe : </label>
            <input
              type="text"
              onChange={(event) => {
                setPassword(event.target.value)
              }}
            ></input>
            <button onClick={addUser}>
              <span>Valider</span>
            </button>
          </form>
        </div>
        <button className="index-login">
          <span>Connexion</span>
        </button>
      </div>
      <footer className="index-footer">
        <div>
          <h2>Contact</h2>
        </div>
        <div>
          <h2>Mentions légales</h2>
        </div>
      </footer>
    </div>
  )
}
export default Home
