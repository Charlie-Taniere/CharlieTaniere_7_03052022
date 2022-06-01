import React, { useState } from 'react'
import axios from 'axios'

const AddImage = () => {
  const [image, setImage] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('')

  const uploadFile = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('image', image.data)
    const response = await axios.post('http://localhost:3001/posts', formData)
    if (response) setStatus(response.statusText)
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  return (
    <div className="App">
      <h1>Ajouter une image</h1>
      {image.preview && <img src={image.preview} width="100" height="100" />}
      <hr></hr>
      <form onSubmit={uploadFile}>
        <input type="file" name="file" onChange={handleFileChange}></input>
        <button type="submit">Valider</button>
      </form>
      {status && <h4>{status}</h4>}
    </div>
  )
}
export default AddImage
