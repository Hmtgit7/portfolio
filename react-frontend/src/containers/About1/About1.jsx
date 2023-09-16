import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../Wrapper';
import './About1.scss'
import { images } from '../../constants';
import { useTypewriter, Cursor } from 'react-simple-typewriter'

const About1 = () => {

  const [text] = useTypewriter({
    words: ['Hemant Gehlod'],
    // words: ['Developer', 'Designer'],
    loop: {}
  });

  const [text1] = useTypewriter({
    words: ['Full Stack Developer', 'Mean Stack Developer', 'Mern Stack Developer'],
    // words: ['Developer', 'Designer'],
    loop: {}
  });

  return (
    <div className="about">
      <div className="image">
        <img src={images.Profile} alt="" />
      </div>
      <div className="content">
        <h1>Hello, I am {" "}
          <span> {text}</span>
          <span><Cursor /></span>
        </h1>
        <p>I am {" "} <span>{text1}.</span><br />I am final year Student. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur amet sequi, vel quod iure explicabo perferendis non voluptate consectetur voluptates!</p>
        <button>Download CV</button>
      </div>

    </div>
  )
};

export default About1;