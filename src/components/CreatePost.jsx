import React, { useContext, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

function CreatePost() {
  const { authState } = useContext(AuthContext)

  let navigate = useNavigate()
  const initialValues = {
    title: '',
    postText: '',
  }

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login')
    }
  }, [])
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Tu dois mettre un titre!'),
    postText: Yup.string().required(),
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
        <Form className="formContainer">
          <ErrorMessage name="title" component="span" />
          <Field name="title" placeholder="Ton titre!" />

          <ErrorMessage name="postText" component="span" />
          <Field
            className="create-post-container_body"
            id="inputCreatePost"
            name="postText"
            placeholder="Qu'est-ce que tu raconte aujourd'hui?"
          />

          <button type="submit"> Publier</button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost
