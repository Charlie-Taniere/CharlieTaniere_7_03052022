import React, { useContext, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

function CreatePost(props) {
  const { authState } = useContext(AuthContext)

  let navigate = useNavigate()
  const initialValues = {
    title: '',
    postText: '',
  }

  useEffect(() => {
    console.log(props)
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
  })

  const onSubmit = (data) => {
    axios
      .post('http://localhost:3001/posts', data, {
        headers: { accessToken: localStorage.getItem('accessToken') },
      })
      .then((response) => {
        navigate('/main/:id')
      })
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
            className="create-post-container_form_body"
            id="inputCreatePost"
            name="postText"
            placeholder="Qu'est-ce que tu raconte aujourd'hui?"
            autoComplete="false"
          />
          <button
            type="submit"
            className="create-post-container_form_button"
            onClick={() => props.closeProps()}
          >
            {' '}
            Publier
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost
