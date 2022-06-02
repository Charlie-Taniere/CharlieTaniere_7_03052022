import React, { useContext, useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

function ModifyPost() {
  let { id } = useParams()
  const { authState } = useContext(AuthContext)
  const [image, setImage] = useState({ preview: '', data: '' })

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      console.log(response.data)
    })
  }, [id])

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
      .max(450, '450 caractères maximum')
      .required('Tu dois écrire quelque chose!'),
    image: Yup.string(),
  })

  const onSubmit = (data) => {
    let formData = new FormData()
    formData.append('image', image.data)
    formData.append('title', data.title)
    formData.append('postText', data.postText)
    axios
      .put(`http://localhost:3001/posts/byId/${id}`, formData, {
        headers: { accessToken: localStorage.getItem('accessToken') },
      })
      .then((response) => {
        console.log(response)
        navigate('/')
      })
      .catch((error) => console.log('error put', error))
  }

  return (
    <div className="create-post-container">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize={true}
        method="PUT"
        encType="multipart/form-data"
      >
        <Form
          className="create-post-container_form"
          method="PUT"
          action="/postimg"
          encType="multipart/form-data"
        >
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

          {image.preview && (
            <img src={image.preview} width="100" height="100" />
          )}
          <input
            id="file"
            type="file"
            name="image"
            onChange={handleFileChange}
          ></input>

          <button type="submit" className="create-post-container_form_button">
            {' '}
            Publier
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default ModifyPost
