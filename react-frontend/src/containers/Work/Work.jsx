import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { AppWrap, MotionWrap } from '../../Wrapper';
import works from '../../constants/work';
import './Work.scss';

const Work = () => {
  const [workData, setWorkData] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState('MERN');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    setWorkData(works);
    setFilterWork(works.filter((work) => work.tags.includes('MERN')));
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard({ y: 100, opacity: 0 });

    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });
      setFilterWork(workData.filter((work) => work.tags.includes(item)));
    }, 500);
  };

  return (
    <>
      <h2 className="head-text">My Creative <span>Portfolio</span> Section</h2>

      <h3 className="featured-projects-heading">Featured Projects</h3>

      <div className="app__work-filter">
        {[ 'React JS', 'MERN', 'Java', 'Next JS', 'Shopify App','Python'].map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.length > 0 ? (
          filterWork.slice(0, 3).map((work) => (
            <div className="app__work-item app__flex" key={work.id || work.title}>
              <div className="app__work-img app__flex">
                <img src={work.imgUrl} alt={work.name} />

                <motion.div
                  whileHover={{ opacity: [0, 1] }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="app__work-hover app__flex"
                >
                  <a href={work.projectLink} target="_blank" rel="noreferrer">
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className="app__flex"
                    >
                      <AiFillEye />
                    </motion.div>
                  </a>
                  <a href={work.codeLink} target="_blank" rel="noreferrer">
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className="app__flex"
                    >
                      <AiFillGithub />
                    </motion.div>
                  </a>
                </motion.div>
              </div>

              <div className="app__work-content app__flex">
                <h4 className="bold-text">{work.title}</h4>
                <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>

                <div className="app__work-tag app__flex">
                  <p className="p-text">{work.tags[0]}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="p-text">No projects found.</p>
        )}
      </motion.div>

      <motion.div
        whileInView={{ scale: [0, 1] }}
        whileHover={{ scale: [1, 0.95] }}
        transition={{ duration: 0.25 }}
        className="app__work-button"
      >
        <Link to="/projects" className="view-all-projects-btn">
          <span>View All Projects</span>
          <BsFillArrowRightSquareFill />
        </Link>
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg'
);