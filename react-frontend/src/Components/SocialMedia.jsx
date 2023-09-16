import React from 'react';
import { BsTwitter, BsInstagram, BsGithub, BsYoutube, BsLinkedin } from 'react-icons/bs';
import {Link} from 'react-router-dom'

const SocialMedia = () => (
  <div className="app__social">
    <div >
      <BsTwitter />
    </div>
    <div>
      <BsGithub />
    </div>
    <div>
      <BsInstagram />
    </div>
    <div>
      <BsLinkedin />
    </div>
  </div>
);

export default SocialMedia;