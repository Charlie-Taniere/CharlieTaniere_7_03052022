// import React, { useEffect, useState, useContext } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { AuthContext } from '../helpers/AuthContext'

// function Post() {
//   let { id } = useParams()

//   const [postObject, setPostObject] = useState({})
//   const [comments, setComments] = useState([])
//   const [newComment, setNewComment] = useState('')
//   const { authState } = useContext(AuthContext)

//   let history = useNavigate()

//   useEffect(() => {
//     axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
//       setPostObject(response.data)
//     })
//     axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
//       setComments(response.data)
//     })
//   }, [])

//   const addComment = () => {
//     axios
//       .post(
//         'http://localhost:3001/comments',
//         {
//           commentBody: newComment,
//           PostId: id,
//         },
//         {
//           headers: {
//             accessToken: localStorage.getItem('accessToken'),
//           },
//         }
//       )
//       .then((response) => {
//         if (response.data.error) {
//           console.log(response.data.error)
//         } else {
//           const commentToAdd = {
//             commentBody: newComment,
//             username: response.data.username,
//           }
//           setComments([...comments, commentToAdd])
//           setNewComment('')
//         }
//       })
//   }

//   const deleteComment = (id) => {
//     axios
//       .delete(`http://localhost:3001/comments/${id}`, {
//         headers: { accessToken: localStorage.getItem('accessToken') },
//       })
//       .then(() => {
//         setComments(
//           comments.filter((val) => {
//             return val.id != id
//           })
//         )
//       })
//   }

//   const deletePost = (id) => {
//     axios
//       .delete(`http://localhost:3001/posts/${id}`, {
//         headers: { accessToken: localStorage.getItem('accessToken') },
//       })
//       .then(() => {
//         history.push('/')
//       })
//   }

//   const editPost = (option) => {
//     if (option === 'title') {
//       let newTitle = prompt('Enter New Title:')
//       axios.put(
//         'http://localhost:3001/posts/title',
//         {
//           newTitle: newTitle,
//           id: id,
//         },
//         {
//           headers: { accessToken: localStorage.getItem('accessToken') },
//         }
//       )

//       setPostObject({ ...postObject, title: newTitle })
//     } else {
//       let newPostText = prompt('Enter New Text:')
//       axios.put(
//         'http://localhost:3001/posts/postText',
//         {
//           newText: newPostText,
//           id: id,
//         },
//         {
//           headers: { accessToken: localStorage.getItem('accessToken') },
//         }
//       )

//       setPostObject({ ...postObject, postText: newPostText })
//     }
//   }

//   return (
//     <div className="postPage">
//       <div className="leftSide">
//         <div className="post" id="individual">
//           <div
//             className="title"
//             onClick={() => {
//               if (authState.username === postObject.username) {
//                 editPost('title')
//               }
//             }}
//           >
//             {postObject.title}
//           </div>
//           <div
//             className="body"
//             onClick={() => {
//               if (authState.username === postObject.username) {
//                 editPost('body')
//               }
//             }}
//           >
//             {postObject.postText}
//           </div>
//           <div className="footer">
//             {postObject.username}
//             {authState.username === postObject.username && (
//               <button
//                 onClick={() => {
//                   deletePost(postObject.id)
//                 }}
//               >
//                 {' '}
//                 Delete Post
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="rightSide">
//         <div className="addCommentContainer">
//           <input
//             type="text"
//             placeholder="Comment..."
//             autoComplete="off"
//             value={newComment}
//             onChange={(event) => {
//               setNewComment(event.target.value)
//             }}
//           />
//           <button onClick={addComment}> Add Comment</button>
//         </div>
//         <div className="listOfComments">
//           {comments.map((comment, key) => {
//             return (
//               <div key={key} className="comment">
//                 {comment.commentBody}
//                 <label> Username: {comment.username}</label>
//                 {authState.username === comment.username && (
//                   <button
//                     onClick={() => {
//                       deleteComment(comment.id)
//                     }}
//                   >
//                     X
//                   </button>
//                 )}
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Post

import React, { useContext } from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
// import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import { AuthContext } from '../helpers/AuthContext'

function Post() {
  const [listOfPosts, setListOfPosts] = useState([])
  const [likedPosts, setLikedPosts] = useState([])
  const { authState } = useContext(AuthContext)
  let navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      history.push('/login')
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
          <div key={key} className="post">
            <div className="title"> {value.title} </div>
            <div
              className="body"
              onClick={() => {
                navigate(`/post/${value.id}`)
              }}
            >
              {value.postText}
            </div>
            <div className="footer">
              <div className="username">
                <Link to={`/profile/${value.UserId}`}> {value.username} </Link>
              </div>
              {/* <div className="buttons">
                <ThumbUpAltIcon
                  onClick={() => {
                    likeAPost(value.id)
                  }}
                  className={
                    likedPosts.includes(value.id) ? 'unlikeBttn' : 'likeBttn'
                  }
                />

                <label> {value.Likes.length}</label>
              </div> */}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Post
