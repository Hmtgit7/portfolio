import React from 'react'
import { BsTwitter, BsInstagram, BsGithub, BsYoutube, BsLinkedin } from 'react-icons/bs';
import './Footer.scss'

const Footer = () => {
  return (
    <div className="footer">
      <div className="icons">
        <div>
          <BsGithub />
        </div>
        <div>
          <BsInstagram />
        </div>
        <div>
          <BsLinkedin />
        </div>
        <div>
          <BsTwitter />
        </div>
        <div>
          <BsYoutube />
        </div>
      </div>
      <div className="content">
        <h1>Made with❤️ <a href=''>Spark Developie</a> Copyright @2023</h1>
      </div>
    </div>
  )
}

export default Footer;