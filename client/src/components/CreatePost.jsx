// Composant pour créer un article //

import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreatePost(props) {
  const [image, setImage] = useState({ preview: '', data: '' })

  let navigate = useNavigate()

  // Redirection sur la page d'accueil si l'uilisateur n'est pas connecté
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login')
    }
  }, [])

  // Fonction pour récupéré l'image et afficher sa mignature
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  // Mise à zéro des inputs
  const initialValues = {
    title: '',
    postText: '',
    image: '',
  }

  // Regex des inputs
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, '3 caractères minmum')
      .max(50, '50 caractères maximum')
      .required('Tu dois mettre un titre!'),
    postText: Yup.string()
      .min(20, '20 caractères minmum')
      .max(500, '500 caractères maximum')
      .required('Tu dois écrire quelque chose!'),
    image: Yup.string(),
  })

  // Fonction qui récupère et poste le titre, texte et image de l'article
  const onSubmit = async (data) => {
    let formData = new FormData()
    formData.append('image', image.data)
    formData.append('title', data.title)
    formData.append('postText', data.postText)
    try {
      await axios.post('http://localhost:3001/posts', formData, {
        headers: { accessToken: localStorage.getItem('accessToken') },
      })
      props.closeProps() // Utilisation de la props pour la fermeture de la fenêtre popup après la validation
      navigate(`/`)
    } catch (err) {
      alert(err)
    }
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
            placeholder="Qu'est-ce que tu racontes aujourd'hui?"
            autoComplete="off"
          />

          {image.preview && (
            <img
              className="create-post-container_form_img"
              src={image.preview}
              width="100"
              height="100"
            />
          )}
          <input
            className="create-post-container_form_input"
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

export default CreatePost
