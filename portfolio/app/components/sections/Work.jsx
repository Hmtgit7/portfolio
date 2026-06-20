'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AiFillGithub } from 'react-icons/ai';
import { HiExternalLink, HiDocumentText } from 'react-icons/hi';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';
import { FiCode, FiLayers } from 'react-icons/fi';
import Link from 'next/link';
import AppWrap from '../../lib/AppWrap';
import MotionWrap from '../../lib/MotionWrap';
import works from '../../lib/work';
import { images } from '../../lib/constants';
import '../styles/Work.scss';

// Tech icon circles – moved from hero section
const techCircles = [images.react, images.redux, images.sass];

const filterTabs = ['All', 'React JS', 'MERN', 'Java', 'Next JS', 'Shopify App', 'Python', 'AI/ML'];

const Work = () => {
  const [workData, setWorkData] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    setWorkData(works);
    setFilterWork(works);
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard({ y: 40, opacity: 0 });

    setTimeout(() => {
      const filtered = item === 'All'
        ? workData
        : workData.filter((work) => work.tags.includes(item));
      setFilterWork(filtered);
      setAnimateCard({ y: 0, opacity: 1 });
    }, 400);
  };

  // Featured projects shown with big cards, rest with standard cards
  const featuredProjects = filterWork.filter((w) => w.featured);
  const regularProjects = filterWork.filter((w) => !w.featured).slice(0, 6);

  return (
    <>
      {/* Section header */}
      <div className="app__work-header">
        <h2 className="head-text">
          My Creative <span>Portfolio</span>
        </h2>
        <p className="app__work-subtitle p-text">
          A showcase of projects I've built — from scalable SaaS platforms to open-source tools.
        </p>

        {/* Tech circles moved here from hero */}
        <div className="app__work-tech-circles">
          {techCircles.map((src, i) => (
            <motion.div
              key={i}
              className="app__work-tech-circle"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              whileHover={{ scale: 1.15, rotate: 10 }}
            >
              <img src={src} alt="tech" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="app__work-filter">
        {filterTabs.map((item, index) => (
          <button
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </button>
        ))}
      </div>

      <motion.div animate={animateCard} transition={{ duration: 0.4 }}>
        {/* Featured / Flagship Projects */}
        {featuredProjects.length > 0 && (
          <div className="app__work-featured-section">
            <div className="app__work-section-label">
              <FiLayers />
              <span>Flagship Projects</span>
            </div>
            <div className="app__work-featured-grid">
              {featuredProjects.map((work, index) => (
                <motion.div
                  className="app__work-featured-card"
                  key={work.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  {/* Image area */}
                  <div className="app__work-featured-img">
                    <img src={work.imgUrl} alt={work.title} />
                    <div className="app__work-featured-overlay">
                      <span className="app__work-featured-category">{work.category}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="app__work-featured-content">
                    <div className="app__work-featured-tags">
                      {work.tags.map((tag, i) => (
                        <span key={i} className="app__work-tag-pill">{tag}</span>
                      ))}
                    </div>

                    <h3 className="app__work-featured-title">{work.title}</h3>
                    <p className="app__work-featured-desc p-text">{work.description}</p>

                    {/* Tech stack chips */}
                    {work.techStack && (
                      <div className="app__work-techstack">
                        {work.techStack.slice(0, 5).map((tech, i) => (
                          <span key={i} className="app__work-tech-chip">{tech}</span>
                        ))}
                        {work.techStack.length > 5 && (
                          <span className="app__work-tech-chip more">+{work.techStack.length - 5}</span>
                        )}
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="app__work-featured-actions">
                      <a
                        href={work.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="app__work-btn app__work-btn--primary"
                      >
                        <HiExternalLink />
                        <span>Visit Live</span>
                      </a>
                      {work.slug ? (
                        <Link
                          href={`/projects/${work.slug}`}
                          className="app__work-btn app__work-btn--secondary"
                        >
                          <HiDocumentText />
                          <span>View Details</span>
                        </Link>
                      ) : (
                        <a
                          href={work.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="app__work-btn app__work-btn--secondary"
                        >
                          <AiFillGithub />
                          <span>View Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Projects Grid */}
        {regularProjects.length > 0 && (
          <div className="app__work-regular-section">
            <div className="app__work-section-label">
              <FiCode />
              <span>Other Projects</span>
            </div>
            <div className="app__work-portfolio">
              {regularProjects.map((work, index) => (
                <motion.div
                  className="app__work-item app__flex"
                  key={work.title + index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="app__work-img app__flex">
                    <img src={work.imgUrl} alt={work.title} />
                    <motion.div
                      whileHover={{ opacity: [0, 1] }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="app__work-hover app__flex"
                    >
                      <a href={work.projectLink} target="_blank" rel="noreferrer">
                        <motion.div
                          whileHover={{ scale: [1, 0.9] }}
                          transition={{ duration: 0.25 }}
                          className="app__flex"
                          title="Visit Live"
                        >
                          <HiExternalLink />
                        </motion.div>
                      </a>
                      <a href={work.codeLink} target="_blank" rel="noreferrer">
                        <motion.div
                          whileHover={{ scale: [1, 0.9] }}
                          transition={{ duration: 0.25 }}
                          className="app__flex"
                          title="View Code"
                        >
                          <AiFillGithub />
                        </motion.div>
                      </a>
                    </motion.div>
                  </div>

                  <div className="app__work-content app__flex">
                    <h4 className="bold-text">{work.title}</h4>
                    <p className="p-text" style={{ marginTop: 8 }}>{work.description}</p>

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

                    <div className="app__work-tag app__flex">
                      <p className="p-text">{work.tags[0]}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* View all button */}
      <motion.div
        whileInView={{ scale: [0, 1] }}
        whileHover={{ scale: [1, 0.97] }}
        transition={{ duration: 0.25 }}
        className="app__work-button"
      >
        <Link href="/projects" className="view-all-projects-btn">
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
