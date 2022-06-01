import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext'

function OnePost() {
  let { id } = useParams()

  const [postObject, setPostObject] = useState({})
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const { authState } = useContext(AuthContext)

  let navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data)
    })
    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data)
    })
  }, [])

  const addComment = () => {
    axios
      .post(
        'http://localhost:3001/comments',
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem('accessToken'),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error)
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          }
          setComments([...comments, commentToAdd])
          setNewComment('')
        }
      })
  }

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem('accessToken') },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id != id
          })
        )
      })
  }

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: { accessToken: localStorage.getItem('accessToken') },
      })
      .then(() => {
        navigate('/')
      })
  }

  const editPost = (option) => {
    if (option === 'title') {
      let newTitle = prompt('Enter New Title:')
      axios.put(
        'http://localhost:3001/posts/title',
        {
          newTitle: newTitle,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem('accessToken') },
        }
      )

      setPostObject({ ...postObject, title: newTitle })
    } else {
      let newPostText = prompt('Enter New Text:')
      axios.put(
        'http://localhost:3001/posts/postText',
        {
          newText: newPostText,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem('accessToken') },
        }
      )

      setPostObject({ ...postObject, postText: newPostText })
    }
  }

  return (
    <div className="one-post">
      <div className="one-post_username">
        <span className="one-post_username_color">Par : </span>
        {postObject.username}
      </div>
      <div className="one-post_container" id="individual">
        <div
          className="one-post_container_title"
          onClick={() => {
            if (authState.username === postObject.username) {
              editPost('title')
            }
          }}
        >
          {postObject.title}
        </div>
        <div
          className="one-post_container_body"
          onClick={() => {
            if (authState.username === postObject.username) {
              editPost('body')
            }
          }}
        >
          {postObject.image !== null && (
            <img
              className="post-container_body_img"
              src={`http://localhost:3001/${postObject.image}`}
              alt="img from a post"
            />
          )}
          {postObject.postText}
        </div>
        <div className="one-post_container_footer">
          {authState.username === postObject.username && (
            <button
              className="one-post_container_footer_btn"
              onClick={() => {
                deletePost(postObject.id)
              }}
            >
              {' '}
              Supprimer la publication
            </button>
          )}
        </div>
      </div>

      <div className="one-post_comment">
        <div className="one-post_comment_add">
          <textarea
            className="one-post_comment_add_input"
            type="text"
            minLength="5"
            placeholder="Écrivez votre commentaire ici.."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value)
            }}
          />
          <div className="one-post_comment_add_btn">
            <button
              className="one-post_comment_add_btn_btn"
              onClick={addComment}
            >
              {' '}
              Publier
            </button>
          </div>
        </div>
        <div className="one-post_comment_list">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="one-post_comment_list_comment">
                <div>
                  <label className="one-post_comment_list_comment_label">
                    Par {comment.username}
                  </label>
                </div>
                <div className="one-post_comment_list_comment_body">
                  {comment.commentBody}
                </div>
                {authState.username === comment.username && (
                  <div className="one-post_comment_list_comment_btn">
                    <button
                      className="one-post_comment_list_comment_btn_btn"
                      onClick={() => {
                        deleteComment(comment.id)
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default OnePost
