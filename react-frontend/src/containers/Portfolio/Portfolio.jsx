import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../Wrapper';
import { urlFor, client } from '../../client';
import './Portfolio.scss';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';


const Portfolio = () => {

  return (
    <>
     
    </>
  );
};
// export default AppWrap(
//   MotionWrap(Work, 'app__work'),
//   'work',
//   'app__whitebg',
// );
export default AppWrap(Portfolio, 'portfolio')