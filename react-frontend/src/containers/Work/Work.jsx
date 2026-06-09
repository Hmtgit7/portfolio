import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AiFillGithub } from 'react-icons/ai';
import { HiExternalLink } from 'react-icons/hi';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { AppWrap, MotionWrap } from '../../Wrapper';
import works from '../../constants/work';
import './Work.scss';

const FILTER_TABS = ['All', 'React JS', 'MERN', 'Next JS', 'Java', 'Shopify App', 'Python'];

const Work = () => {
  const [workData]      = useState(works);
  const [filterWork, setFilterWork]   = useState(works);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  const handleWorkFilter = (item) => {
    if (item === activeFilter) return;
    setActiveFilter(item);
    setAnimateCard({ y: 40, opacity: 0 });

    setTimeout(() => {
      const filtered = item === 'All'
        ? workData
        : workData.filter((w) => w.tags.includes(item));
      setFilterWork(filtered);
      setAnimateCard({ y: 0, opacity: 1 });
    }, 400);
  };

  // Show at most 6 in the homepage preview
  const visibleWork = filterWork.slice(0, 6);

  return (
    <>
      {/* Section heading */}
      <div className="app__work-header">
        <h2 className="head-text">
          My Creative <span>Portfolio</span>
        </h2>
        <p className="app__work-subtitle p-text">
          A curated set of projects across full-stack, mobile, and tooling — pick a category to explore.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="app__work-filter">
        {FILTER_TABS.map((item, index) => (
          <button
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.4 }}
        className="app__work-portfolio"
      >
        {visibleWork.length > 0 ? (
          visibleWork.map((work, index) => (
            <motion.div
              className="app__work-item"
              key={`${work.title}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              whileHover={{ y: -5 }}
            >
              {/* Image with hover overlay */}
              <div className="app__work-img app__flex">
                <img src={work.imgUrl} alt={work.title} />

                <motion.div
                  whileHover={{ opacity: [0, 1] }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                  className="app__work-hover app__flex"
                >
                  <a href={work.projectLink} target="_blank" rel="noreferrer" title="Visit Live">
                    <motion.div
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.2 }}
                      className="app__flex"
                    >
                      <HiExternalLink />
                    </motion.div>
                  </a>
                  <a href={work.codeLink} target="_blank" rel="noreferrer" title="View Code">
                    <motion.div
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.2 }}
                      className="app__flex"
                    >
                      <AiFillGithub />
                    </motion.div>
                  </a>
                </motion.div>
              </div>

              {/* Card body */}
              <div className="app__work-content">
                <div className="app__work-tag app__flex">
                  <p className="p-text">{work.tags[0]}</p>
                </div>

                <h4 className="bold-text">{work.title}</h4>
                <p className="p-text app__work-desc">{work.description}</p>

                {/* Two action buttons */}
                <div className="app__work-card-actions">
                  <a
                    href={work.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="app__work-card-btn app__work-card-btn--live"
                  >
                    <HiExternalLink />
                    <span>Visit Live</span>
                  </a>
                  <a
                    href={work.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="app__work-card-btn app__work-card-btn--code"
                  >
                    <AiFillGithub />
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="p-text app__work-empty">No projects found for this category.</p>
        )}
      </motion.div>

      {/* View all CTA */}
      <motion.div
        whileInView={{ scale: [0, 1] }}
        whileHover={{ scale: [1, 0.97] }}
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
