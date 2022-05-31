import React, { useContext } from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../helpers/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

function AllPost() {
  const [listOfPosts, setListOfPosts] = useState([])
  const [likedPosts, setLikedPosts] = useState([])
  const { authState } = useContext(AuthContext)
  let navigate = useNavigate()

  const dateFormater = (createdAt) => {
    let newDate = new Date(createdAt).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })
    return newDate
  }

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/')
    } else {
      axios
        .get('http://localhost:3001/posts', {
          headers: { accessToken: localStorage.getItem('accessToken') },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts)
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId
            })
          )
        })
    }
  }, [])

  const likeAPost = (postId) => {
    axios
      .post(
        'http://localhost:3001/likes',
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem('accessToken') } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] }
              } else {
                const likesArray = post.Likes
                likesArray.pop()
                return { ...post, Likes: likesArray }
              }
            } else {
              return post
            }
          })
        )

        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id != postId
            })
          )
        } else {
          setLikedPosts([...likedPosts, postId])
        }
      })
  }

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post-container">
            <div className="post-container_title"> {value.title} </div>
            <div
              className="post-container_body"
              onClick={() => {
                navigate(`/post/${value.id}`)
              }}
            >
              {value.postText}
            </div>
            <div className="post-container_footer">
              <div className="post-container_footer_username">
                <p className="post-container_footer_username_p">
                  {' '}
                  Posté le {dateFormater(value.createdAt)} par{' '}
                </p>
                <Link
                  className="post-container_footer_username_a"
                  to={`/profile/${value.UserId}`}
                >
                  {' '}
                  {value.username}{' '}
                </Link>
              </div>
              <div className="post-container_footer_buttons">
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  style={{ fontSize: 25, color: 'white' }}
                  onClick={() => {
                    likeAPost(value.id)
                  }}
                  className={
                    likedPosts.includes(value.id) ? 'unlikeBttn' : 'likeBttn'
                  }
                />

                <label className="post-container_footer_buttons_label">
                  {' '}
                  {value.Likes.length}
                </label>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AllPost
