'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AppWrap from '../../lib/AppWrap';
import MotionWrap from '../../lib/MotionWrap';
import { client, urlFor } from '../../lib/client';
import '../styles/About.scss';
import About1 from './About1';

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';

    client.fetch(query).then((data) => {
      setAbouts(data || []);
    }).catch(() => {
      setAbouts([]);
    });
  }, []);

  return (
    <div className="app__about-container">
      <h2 className="head-text">
        I Know that <span>Good Design</span> <br />means <span>Good Business</span>
      </h2>

      <div className="app__about-main">
        <About1 />
      </div>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="app__profile-item"
            key={about.title + index}
          >
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            <h2 className="bold-text">{about.title}</h2>
            <p className="p-text">{about.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg',
);
