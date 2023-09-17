import React from 'react';
import { BsTwitter, BsInstagram, BsGithub, BsYoutube, BsLinkedin } from 'react-icons/bs';
import { Link } from 'react-router-dom'

const SocialMedia = () => (
  <div className="app__social">
    <a href='https://www.linkedin.com/in/hemant-gehlod'>
      <div>
        <BsLinkedin />
      </div>
    </a>
    <a href='https://www.github.com/Hmtgit7'>
      <div>
        <BsGithub />
      </div>
    </a>
    <a href='https://twitter.com/GehlodHemant?t=xQzzJBMs9qf1b2Pyo-OLOA&s=09'>
      <div >
        <BsTwitter />
      </div>
    </a>
  </div>
);

export default SocialMedia;