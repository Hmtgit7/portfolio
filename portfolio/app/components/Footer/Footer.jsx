"use client";
import React from 'react'
import { BsTwitter, BsInstagram, BsGithub, BsYoutube, BsLinkedin } from 'react-icons/bs';
import './Footer.scss'

const Footer = () => {
  return (
    <div className="footer">
      <div className="icons">
      <a href='https://github.com/Hmtgit7'>
        <div>
          <BsGithub />
        </div></a>
        <a href="https://www.instagram.com/hemant_gehlod/" target="_blank" rel="noreferrer">
        <div>
          <BsInstagram />
        </div></a>
        <a href='https://www.linkedin.com/in/hemant-gehlod' target="_blank" rel="noreferrer">
        <div>
          <BsLinkedin />
        </div></a>
        <a href='https://twitter.com/GehlodHemant?t=xQzzJBMs9qf1b2Pyo-OLOA&s=09' target="_blank" rel="noreferrer">
        <div>
          <BsTwitter />
        </div></a>
        <a href='https://youtube.com/channel/UCmAmylLKHr73VTcqJXLSMlA' target="_blank" rel="noreferrer">
        <div>
          <BsYoutube />
        </div></a>
      </div>
      <div className="content">
        <h1>Made with❤️ <a href=''>Spark Developie</a> Copyright @2023</h1>
      </div>
    </div>
  )
}

export default Footer;
