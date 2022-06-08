// Composant pour l'enregistrement de l'utilisateur //

import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext'
import { useNavigate } from 'react-router'

function Registration() {
  const { setAuthState } = useContext(AuthContext)

  let navigate = useNavigate()

  // Mise à zéro des inputs
  const initialValues = {
    username: '',
    password: '',
    email: '',
  }

  // Vérification des inputs
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, '3 caractères minimum')
      .max(15, ' 15 caractères maximum')
      .required('Ce champ est obligatoire'),
    password: Yup.string()
      .min(6, '6 caractères minmum')
      .max(20, '20 caractères maximum')
      .required('Ce champ est obligatoire'),
    email: Yup.string()
      .min(4, '4 caractères minmum')
      .max(25, '25 caractères minmum')
      .required('Ce champ est obligatoire'),
  })

  // Récupération de la data des inputs et redirection sur la page main
  const onSubmit = (data) => {
    axios.post('http://localhost:3001/auth/signup', data).then(() => {
      axios.post('http://localhost:3001/auth/login', data).then((response) => {
        if (response.data.error) {
          alert(response.data.error)
        } else {
          localStorage.setItem('accessToken', response.data.token)
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
            role: response.data.role,
          })
          navigate(`/main/${response.data.id}`)
        }
      })
    })
  }

  return (
    <div>
      <Formik
        className="sign"
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <ErrorMessage name="username" component="span" />
          <Field name="username" placeholder="Pseudo" />

          <ErrorMessage name="email" component="span" />
          <Field type="email" name="email" placeholder="Email" />

          <ErrorMessage name="password" component="span" />
          <Field
            type="password"
            name="password"
            placeholder="Tapez votre mot de passe"
          />

          <button className="formContainer_submit" type="submit">
            Valider
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default Registration
