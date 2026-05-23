'use client';
import React, { useState, useEffect } from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { images } from '../../lib/constants';
import '../styles/About1.scss';

const About1 = () => {
  const [text] = useTypewriter({
    words: ['Hemant Gehlod'],
    loop: {}
  });

  const [text1] = useTypewriter({
    words: ['Web Developer', 'Freelancer', 'Full Stack Developer'],
    loop: {}
  });

  return (
    <div className="about">
      <div className="image">
        <img src={images.Profile} alt="Hemant Gehlod profile" />
      </div>
      <div className="content">
        <h1>Hello, I am {" "}
          <span> {text}</span>
          <span><Cursor /></span>
        </h1>
        <p>I am {" "} <span>{text1}.</span><br />I am final year Student. Pursuing B.tech in Computer Science and Engineering from Acropolis institute of Technology and Research, Indore, Madhya Pradesh, India.<br/>
        Mean/Mern Stack Developer , Java Full Stack Developer
        </p>
        
        <a href="https://drive.google.com/file/d/1KLe_GJBWfkGLDlp6JkmAAR8cwnNMAXHB/view?usp=sharing" target='_blank' rel="noopener noreferrer"><button className='p-text'>Download CV</button></a>
      </div>

    </div>
  )
};

export default About1;
