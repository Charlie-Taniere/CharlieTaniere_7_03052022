import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

function Registration() {
  const initialValues = {
    username: '',
    password: '',
    email: '',
  }

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

  const onSubmit = (data) => {
    axios.post('http://localhost:3001/auth', data).then(() => {})
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
