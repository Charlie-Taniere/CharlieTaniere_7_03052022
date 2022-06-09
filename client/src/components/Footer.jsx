// Composant du footer //

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faAt, faGlobe, faPhoneFlip } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <footer className="footer">
      <a href="" alt="Logo de Twitter">
        <FontAwesomeIcon className="footer_icon" icon={faTwitter} />
      </a>
      <a href="" alt="Logo de Facebook">
        <FontAwesomeIcon className="footer_icon" icon={faFacebook} />
      </a>
      <a href="" alt="Logo d'un @">
        <FontAwesomeIcon className="footer_icon" icon={faAt} />
      </a>
      <a href="" alt="Logo d'un globe">
        <FontAwesomeIcon className="footer_icon" icon={faGlobe} />
      </a>
      <a href="" alt="Logo d'un téléphone">
        <FontAwesomeIcon className="footer_icon" icon={faPhoneFlip} />
      </a>
    </footer>
  )
}

export default Footer
