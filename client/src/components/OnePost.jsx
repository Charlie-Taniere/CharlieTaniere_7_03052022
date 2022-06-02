import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext'
import ModifyPost from './ModifyPost'

function OnePost() {
  let { id } = useParams()

  const [postObject, setPostObject] = useState({})
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const { authState } = useContext(AuthContext)
  const [displayModifyPost, setModifyArticle] = useState(false)

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
          setNewComment({ commentText: '', id: null })
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

  return (
    <div className="one-post">
      <div className="one-post_username">
        <span className="one-post_username_color">Par : </span>
        {postObject.username}
      </div>
      <div className="one-post_container" id="individual">
        <div className="one-post_container_title">{postObject.title}</div>
        {postObject.image !== null && (
          <div className="one-post_container_img">
            {' '}
            <img
              className="one-post_container_img_img"
              src={`http://localhost:3001/${postObject.image}`}
              alt="img from a post"
            />
          </div>
        )}
        <div className="one-post_container_body">{postObject.postText}</div>
        <div className="one-post_container_footer">
          {authState.username === postObject.username ||
          authState.role === 1 ? (
            <button
              className="one-post_container_footer_btn"
              onClick={() => {
                deletePost(postObject.id)
              }}
            >
              {' '}
              Supprimer la publication
            </button>
          ) : (
            ''
          )}
        </div>
        {authState.username === postObject.username && (
          <div className="one-post_comment_list_comment_btn">
            <button
              className="one-post_comment_list_comment_btn_btn"
              onClick={() => setModifyArticle(!displayModifyPost)}
            >
              Modifier l'article
            </button>
          </div>
        )}
      </div>
      {displayModifyPost && <ModifyPost />}

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
                {authState.username === comment.username ||
                authState.role === 1 ? (
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
                ) : (
                  ''
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
