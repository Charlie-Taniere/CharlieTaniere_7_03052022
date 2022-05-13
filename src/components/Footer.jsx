import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faAt, faGlobe, faPhoneFlip } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <footer className="footera">
      <FontAwesomeIcon
        icon={faTwitter}
        style={{ fontSize: 30, color: 'white', marginRight: 30 }}
      />
      <FontAwesomeIcon
        icon={faFacebook}
        style={{ fontSize: 30, color: 'white', marginRight: 30 }}
      />
      <FontAwesomeIcon
        icon={faAt}
        style={{ fontSize: 30, color: 'white', marginRight: 30 }}
      />
      <FontAwesomeIcon
        icon={faGlobe}
        style={{ fontSize: 30, color: 'white', marginRight: 30 }}
      />
      <FontAwesomeIcon
        icon={faPhoneFlip}
        style={{ fontSize: 30, color: 'white', marginRight: 30 }}
      />
    </footer>
  )
}

export default Footer
