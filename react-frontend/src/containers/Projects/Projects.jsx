import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { BsFillArrowLeftSquareFill, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import projects from '../../constants/project';
import Footer from '../../Components/Footer/Footer'
import './Projects.scss';

const Projects = () => {
  const [workData, setWorkData] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6; // 2 rows × 3 columns

  useEffect(() => {
    setWorkData(projects);
    setFilterWork(projects);
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard({ y: 100, opacity: 0 });

    setTimeout(() => {
      let filteredData;
      if (item === 'All') {
        filteredData = workData;
      } else {
        filteredData = workData.filter((work) => work.tags.includes(item));
      }
      
      setFilterWork(filteredData);
      // Reset to page 1 after filtering
      setCurrentPage(1);
      setAnimateCard({ y: 0, opacity: 1 });
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

  // Pagination logic
  const totalPages = Math.ceil(filterWork.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filterWork.slice(startIndex, endIndex);

  // Ensure current page is valid when filterWork changes
  useEffect(() => {
    const maxPages = Math.ceil(filterWork.length / projectsPerPage);
    if (currentPage > maxPages && maxPages > 0) {
      setCurrentPage(1);
    }
  }, [filterWork.length, currentPage, projectsPerPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      setAnimateCard({ y: 100, opacity: 0 });
      
      setTimeout(() => {
        setAnimateCard({ y: 0, opacity: 1 });
      }, 300);
      
      // Scroll to top of projects section for better UX
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const showPages = 5; // Show 5 page numbers at most
    
    if (totalPages <= 1) return pages; // No pagination if only 1 or 0 pages
    
    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - showPages + 1));
      const endPage = Math.min(totalPages, startPage + showPages - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
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

            {/* Projects count info */}
            {filterWork.length > 0 && (
              <div className="app__projects-info">
                <p className="p-text">
                  Showing {Math.min(startIndex + 1, filterWork.length)}-{Math.min(endIndex, filterWork.length)} of {filterWork.length} projects
                  {activeFilter !== 'All' && ` in ${activeFilter}`}
                </p>
              </div>
            )}

            <motion.div
              animate={animateCard}
              transition={{ duration: 0.5 }}
              className="app__projects-portfolio"
            >
              {currentProjects.length > 0 ? (
                currentProjects.map((work, index) => (
                  <div className="app__projects-item app__flex" key={`${work.id || work.title}-${index}-page-${currentPage}`}>
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
                          <div key={`${tag}-${tagIndex}`} className="app__projects-tag app__flex">
                            <p className="p-text">{tag}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="app__projects-empty">
                  <p className="p-text">No projects found for the selected category.</p>
                </div>
              )}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                whileInView={{ y: [50, 0], opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
                className="app__projects-pagination"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-btn pagination-prev"
                >
                  <BsChevronLeft />
                  <span>Previous</span>
                </button>

                <div className="pagination-numbers">
                  {generatePageNumbers().map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="pagination-btn pagination-next"
                >
                  <span>Next</span>
                  <BsChevronRight />
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Projects;