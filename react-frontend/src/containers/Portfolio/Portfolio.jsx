import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { AppWrap, MotionWrap } from "../../Wrapper";
import { urlFor, client } from "../../client";
import "./Portfolio.scss";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Determine items per page based on screen size
  const itemsPerPage = isMobile ? 1 : 3;

  useEffect(() => {
    // Check if on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const query = '*[_type == "portfolio"]';

    client.fetch(query).then((data) => {
      setPortfolio(data);
    });
  }, []);

  // Reset current page when switching between mobile and desktop
  useEffect(() => {
    setCurrentPage(0);
  }, [isMobile]);

  const handlePrev = () => {
    setCurrentPage((prev) => {
      if (prev === 0) return Math.ceil(portfolio.length / itemsPerPage) - 1;
      return prev - 1;
    });
  };

  const handleNext = () => {
    setCurrentPage((prev) => {
      if (prev === Math.ceil(portfolio.length / itemsPerPage) - 1) return 0;
      return prev + 1;
    });
  };

  // Get current page items
  const getCurrentItems = () => {
    if (portfolio.length <= itemsPerPage) {
      return portfolio;
    }

    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return portfolio.slice(start, end);
  };

  return (
    <>
      <h2 className="head-text">My Creative <span>Portfolio</span></h2>

      {portfolio.length > 0 && (
        <div className="app__portfolio-container">
          <div className="app__portfolio-items">
            {getCurrentItems().map((item) => (
              <motion.div
                whileInView={{ opacity: 1 }}
                whileHover={{ scale: isMobile ? 1.01 : 1.03 }}
                transition={{ duration: 0.3, type: 'tween' }}
                className="app__portfolio-item"
                key={item._id || `portfolio-${item.name}`}
              >
                <div className="app__portfolio-img">
                  <img src={urlFor(item.imgurl)} alt={item.name} />
                </div>
                <h4 className="bold-text">{item.name}</h4>
                <p className="p-text">
                  {item.description || 'A creative portfolio project showcasing my skills.'}
                </p>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <button>Visit</button>
                </a>
              </motion.div>
            ))}
          </div>

          {portfolio.length > itemsPerPage && (
            <div className="app__portfolio-pagination">
              <button
                className="app__portfolio-arrow"
                onClick={handlePrev}
                aria-label="Previous page"
              >
                <HiChevronLeft />
              </button>

              <div className="app__portfolio-dots">
                {Array.from({ length: Math.ceil(portfolio.length / itemsPerPage) }).map((_, index) => (
                  <div
                    key={`dot-${index}`}
                    className={`app__portfolio-dot ${currentPage === index ? 'active' : ''}`}
                    onClick={() => setCurrentPage(index)}
                    role="button"
                    aria-label={`Page ${index + 1}`}
                    tabIndex={0}
                  />
                ))}
              </div>

              <button
                className="app__portfolio-arrow"
                onClick={handleNext}
                aria-label="Next page"
              >
                <HiChevronRight />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Portfolio, "app__portfolio"),
  "Portfolio",
  "app__primarybg"
);