import Axios from 'axios'
import React from 'react'
import { useState } from 'react'

const Articles = () => {
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [date, setDate] = useState('')

  const addArticle = () => {
    Axios.post('http://localhost:3001/article', {
      author: author,
      content: content,
      date: date,
    }).then(() => {
      console.log('succes')
    })
  }
  return (
    <div className="article">
      <input
        className="article_input"
        type="text"
        placeholder="Auteur"
        onChange={(event) => {
          setAuthor(event.target.value)
        }}
      ></input>
      <input
        className="article_input"
        type="text"
        placeholder="date"
        onChange={(event) => {
          setDate(event.target.value)
        }}
      ></input>
      <textarea
        className="article_textarea"
        type="text"
        placeholder="Ton texte"
        onChange={(event) => {
          setContent(event.target.value)
        }}
      ></textarea>
      <button className="sign_confirm" type="submit" onClick={addArticle}>
        Valider
      </button>
    </div>
  )
}

export default Articles
