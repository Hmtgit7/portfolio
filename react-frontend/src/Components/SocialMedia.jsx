import React from 'react';
import { BsTwitter, BsGithub, BsLinkedin } from 'react-icons/bs';

const SocialMedia = () => (
  <div className="app__social">
    <a href='https://www.linkedin.com/in/hemant-gehlod' target="_blank" rel="noreferrer">
      <div>
        <BsLinkedin />
      </div>
    </a>
    <a href='https://www.github.com/Hmtgit7' target="_blank" rel="noreferrer">
      <div>
        <BsGithub />
      </div>
    </a>
    <a href='https://twitter.com/GehlodHemant?t=xQzzJBMs9qf1b2Pyo-OLOA&s=09' target="_blank" rel="noreferrer">
      <div >
        <BsTwitter />
      </div>
    </a>
  </div>
);

export default SocialMedia;