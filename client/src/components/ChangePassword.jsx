import React, { useState } from 'react'
import axios from 'axios'

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const changePassword = () => {
    axios
      .put(
        `http://localhost:3001/auth/changepassword/`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            accessToken: localStorage.getItem('accessToken'),
          },
        }
      )
      .then((response) => {
        console.log(response)
        if (response.data.error) {
          alert(response.data.error)
        } else {
          alert("it's done !")
        }
      })
  }

  return (
    <div className="password-container">
      <input
        className="password-container_input"
        type="text"
        placeholder="Mot de passe actuel"
        onChange={(event) => {
          setOldPassword(event.target.value)
        }}
      />
      <input
        className="password-container_input"
        type="text"
        placeholder="Nouveau mot de passe"
        onChange={(event) => {
          setNewPassword(event.target.value)
        }}
      />
      <button className="password-container_button" onClick={changePassword}>
        Valider
      </button>
    </div>
  )
}

export default ChangePassword
