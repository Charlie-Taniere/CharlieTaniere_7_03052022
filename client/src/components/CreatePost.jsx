import React, { useContext, useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

function CreatePost(props) {
  const { authState } = useContext(AuthContext)
  // const [image, setImage] = useState({ preview: '', data: '' })          *A RAJOUTER PLUS TARD
  // const [status, setStatus] = useState('')
  const [image, setImage] = useState('')

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  let navigate = useNavigate()
  const initialValues = {
    title: '',
    postText: '',
    image: '',
  }

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login')
    }
  }, [])
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(1, '1 caractères minmum')
      .max(50, '50 caractères maximum')
      .required('Tu dois mettre un titre!'),
    postText: Yup.string()
      .min(20, '20 caractères minmum')
      .max(350, '350 caractères maximum')
      .required('Tu dois écrire quelque chose!'),
    image: Yup.string(),
  })

  const onSubmit = (data) => {
    let formData = new FormData()
    formData.append('image', image)
    formData.append('title', data.title)
    formData.append('postText', data.postText)
    axios.post('http://localhost:3001/posts', formData, {
      headers: { accessToken: localStorage.getItem('accessToken') },
    })

    // .then(() => {
    //   navigate('/main/:id')
    // })
  }

  return (
    <div className="create-post-container">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="create-post-container_form">
          <ErrorMessage name="title" component="span" />
          <Field
            className="create-post-container_form_title"
            name="title"
            placeholder="Ton titre!"
          />

          <ErrorMessage name="postText" component="span" />

          <Field
            as="textarea"
            className="create-post-container_form_body"
            type="textarea"
            id="inputCreatePost"
            name="postText"
            placeholder="Qu'est-ce que tu raconte aujourd'hui?"
            autoComplete="off"
          />

          <input
            id="file"
            className="btn"
            type="file"
            name="image"
            size="lg"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {/* {image.preview && (
            <img src={image.preview} width="100" height="100" />                A RAJOUTER PLUS TARD 
          )}
          <input
            id="file"
            type="file"
            name="image"
            onChange={handleFileChange}
          ></input> */}

          {/* <button
            type="submit"
            className="create-post-container_form_button"
            onClick={() => props.closeProps()}
          >
            {' '}
            Publier
          </button> */}

          <button type="submit" className="create-post-container_form_button">
            {' '}
            Publier
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost
