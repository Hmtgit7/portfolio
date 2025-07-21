import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import projects from '../../constants/project';
import Footer from '../../Components/Footer/Footer'
import './Projects.scss';

const Projects = () => {
  const [workData, setWorkData] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    setWorkData(projects);
    setFilterWork(projects);
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard({ y: 100, opacity: 0 });

    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });
      if (item === 'All') {
        setFilterWork(workData);
      } else {
        setFilterWork(workData.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  // Get unique tags for filters
  const getUniqueTags = () => {
    if (!workData || workData.length === 0) return ['All'];
    const tags = new Set(['All']);
    workData.forEach(work => {
      if (work.tags && Array.isArray(work.tags)) {
        work.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags);
  };

  return (
    <>
      <div id="projects" className="app__container app__primarybg">
        <div className="app__wrapper app__flex">
          <motion.div
            whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}
            className="app__projects app__flex"
            style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}
          >
            <motion.div
              whileInView={{ scale: [0, 1] }}
              whileHover={{ scale: [1, 0.95] }}
              transition={{ duration: 0.25 }}
              className="app__projects-back-button"
            >
              <Link to="/" className="back-to-home-btn">
                <BsFillArrowLeftSquareFill />
                <span>Back to Home</span>
              </Link>
            </motion.div>

            <h2 className="head-text">My Creative <span>Portfolio</span> Collection</h2>

            <h3 className="all-projects-heading">All Projects</h3>

            <div className="app__projects-filter">
              {getUniqueTags().map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleWorkFilter(item)}
                  className={`app__projects-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
                >
                  {item}
                </div>
              ))}
            </div>

            <motion.div
              animate={animateCard}
              transition={{ duration: 0.5 }}
              className="app__projects-portfolio"
            >
              {filterWork.length > 0 ? (
                filterWork.map((work) => (
                  <div className="app__projects-item app__flex" key={work.id || work.title}>
                    <div className="app__projects-img app__flex">
                      <img src={work.imgUrl} alt={work.title} />

                      <motion.div
                        whileHover={{ opacity: [0, 1] }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="app__projects-hover app__flex"
                      >
                        {work.projectLink && (
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
                        )}
                        {work.codeLink && (
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
                        )}
                      </motion.div>
                    </div>

                    <div className="app__projects-content app__flex">
                      <h4 className="bold-text">{work.title}</h4>
                      <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>

                      <div className="app__projects-tags app__flex">
                        {work.tags && work.tags.map((tag, tagIndex) => (
                          <div key={tagIndex} className="app__projects-tag app__flex">
                            <p className="p-text">{tag}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-text">No projects found.</p>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Projects;