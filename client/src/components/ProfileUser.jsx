// Composant pour l'affichage du profil de l'utilisateur //
// Avec la liste de toutes ses publication //
// Et la possibilité de modifier son mot de passe //
// Et de supprimer son compte //

import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext'
import ChangePassword from '../components/ChangePassword'

function Profile() {
  let { id } = useParams()
  let navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [listOfPosts, setListOfPosts] = useState([])
  const { authState } = useContext(AuthContext)
  const [displayPasswordIsOpen, setDisplayPassword] = useState(false)

  // Redirection sur la page d'accueil si l'uilisateur n'est pas connecté
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login')
    }
  }, [])

  // Récupération des informations de l'utilisateut et des ses articles
  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth/basicinfo/${id}`, {
        headers: { accessToken: localStorage.getItem('accessToken') },
      })
      .then((response) => {
        setUsername(response.data.username)
      })
      .catch((error) => {
        console.log(error)
      })

    axios
      .get(`http://localhost:3001/posts/byuserId/${id}`)
      .then((response) => {
        setListOfPosts(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  // Fonction pour supprimer le compte de l'utilisateur
  const deleteUser = () => {
    let res = confirm('Voulez-vous vraiment supprimer votre compte?')
    if (res) {
      axios
        .delete(`http://localhost:3001/auth/deleteuser/${id}`, {
          headers: { accessToken: localStorage.getItem('accessToken') },
        })
        .then(() => {
          localStorage.removeItem('accessToken')
          authState(
            { username: '', id: 0, status: false },
            window.location.reload()
          )
        })
    }
  }

  return (
    <div className="profil-container">
      <h1 className="profil-container_h1"> Profil de {username} </h1>
      <div className="profil-container_info">
        {' '}
        {authState.username === username && (
          <button
            className="profil-container_info_change-password"
            onClick={() => setDisplayPassword(!displayPasswordIsOpen)}
          >
            Modifier mot de passe
          </button>
        )}
        {authState.username === username || authState.role === 1 ? (
          <button
            className="profil-container_info_delete-account"
            onClick={deleteUser}
          >
            Supprimer mon compte
          </button>
        ) : (
          ''
        )}
      </div>
      {displayPasswordIsOpen && <ChangePassword />}
      <h2 className="profil-container_h2">Toutes ses publications</h2>
      <div>
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className="profil-container_post">
              <div className="profil-container_post_title"> {value.title} </div>

              <div
                className="profil-container_post_body"
                onClick={() => {
                  navigate(`/post/${value.id}`)
                }}
              >
                {value.image && (
                  <div className="post-container_body_img">
                    <img
                      className="post-container_body_img_img"
                      src={`http://localhost:3001/${value.image}`}
                      alt="img from a post"
                    />
                  </div>
                )}
                {value.postText}
              </div>
              <div className="profil-container_post_footer">
                <div className="profil-container_post_footer_buttons">
                  <label className="profil-container_post_footer_buttons_label">
                    {value.Likes.length} likes
                  </label>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Profile
