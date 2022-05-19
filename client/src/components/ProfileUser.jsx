import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext'

function Profile() {
  let { id } = useParams()
  let navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [listOfPosts, setListOfPosts] = useState([])
  const { authState } = useContext(AuthContext)

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username)
    })

    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data)
    })
  }, [])

  return (
    <div className="profil-container">
      <div className="profil-container_info">
        {' '}
        <h1> {username} </h1>
        {authState.username === username && (
          <button
            onClick={() => {
              navigate('/changepassword')
            }}
          >
            {' '}
            Change My Password
          </button>
        )}
      </div>
      <div className="profil-container_post-container">
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className="profil-container_post-container_post">
              <div className="profil-container_post-container_post_title">
                {' '}
                {value.title}{' '}
              </div>
              <div
                className="profil-container_post-container_post_body"
                onClick={() => {
                  navigate(`/post/${value.id}`)
                }}
              >
                {value.postText}
              </div>
              <div className="profil-container_post-container_post_footer">
                <div className="profil-container_post-container_post_footer_username">
                  {value.username}
                </div>
                <div className="profil-container_post-container_post_footer_buttons">
                  <label> {value.Likes.length}</label>
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
