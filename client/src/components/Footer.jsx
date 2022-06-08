// Composant du footer //

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faAt, faGlobe, faPhoneFlip } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <footer className="footer">
      <FontAwesomeIcon className="footer_icon" icon={faTwitter} />
      <FontAwesomeIcon className="footer_icon" icon={faFacebook} />
      <FontAwesomeIcon className="footer_icon" icon={faAt} />
      <FontAwesomeIcon className="footer_icon" icon={faGlobe} />
      <FontAwesomeIcon className="footer_icon" icon={faPhoneFlip} />
    </footer>
  )
}

export default Footer
