import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { AppWrap, MotionWrap } from "../../Wrapper";
import { urlFor, client } from "../../client";
import "./Portfolio.scss";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const query = '*[_type == "portfolio"]';
    client.fetch(query).then((data) => {
      setPortfolio(data);
    });
  }, []);

  const handlePrev = () => {
    if (portfolio.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => 
      prev === 0 ? portfolio.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (portfolio.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => 
      prev === portfolio.length - 1 ? 0 : prev + 1
    );
  };

  const getVisibleItems = () => {
    if (portfolio.length === 0) return [];
    
    if (isMobile) {
      return [{ ...portfolio[currentIndex], position: 0, key: `mobile-${currentIndex}` }];
    }
    
    if (portfolio.length === 1) {
      return [{ ...portfolio[0], position: 0, key: 'single-0' }];
    }
    
    if (portfolio.length === 2) {
      return [
        { ...portfolio[currentIndex], position: 0, key: `dual-${currentIndex}-center` },
        { ...portfolio[(currentIndex + 1) % portfolio.length], position: 1, key: `dual-${(currentIndex + 1) % portfolio.length}-right` }
      ];
    }

    // For 3 or more items
    const items = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + portfolio.length) % portfolio.length;
      items.push({
        ...portfolio[index],
        position: i,
        originalIndex: index,
        key: `item-${index}-pos-${i}`
      });
    }
    return items;
  };

  const goToSlide = (index) => {
    const diff = index - currentIndex;
    setDirection(diff > 0 ? 1 : -1);
    setCurrentIndex(index);
  };

  // Simple slide variants for natural swiping
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 1
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 1
    })
  };

  return (
    <>
      <h2 className="head-text">My Creative <span>Portfolio</span></h2>

      {portfolio.length > 0 && (
        <div className="app__portfolio-container">
          <div className="app__portfolio-carousel">
            {/* Navigation Arrow - Left */}
            {portfolio.length > 1 && (
              <button
                className={`app__portfolio-arrow left${isMobile ? ' mobile' : ''}`}
                onClick={handlePrev}
                aria-label="Previous item"
                style={isMobile ? { display: 'block' } : {}}
              >
                <HiChevronLeft />
              </button>
            )}

            {/* Portfolio Items */}
            <div className="app__portfolio-items">
              {isMobile ? (
                // Mobile: Simple horizontal slide
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut"
                    }}
                    className="app__portfolio-item mobile-item"
                  >
                    <div className="app__portfolio-img">
                      <img src={urlFor(portfolio[currentIndex].imgurl)} alt={portfolio[currentIndex].name} />
                    </div>
                    
                    <div className="app__portfolio-content">
                      <h4 className="bold-text">{portfolio[currentIndex].name}</h4>
                      <p className="p-text">
                        {portfolio[currentIndex].description || 'A creative portfolio project showcasing my skills.'}
                      </p>
                      <a href={portfolio[currentIndex].link} target="_blank" rel="noopener noreferrer">
                        <button className="app__portfolio-btn">Visit Project</button>
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                // Desktop: Center item slides, side items are static
                <>
                  {getVisibleItems().map((item) => {
                    if (item.position === 0) {
                      // Center item with simple slide
                      return (
                        <AnimatePresence mode="wait" key="center-item" custom={direction}>
                          <motion.div
                            key={item.key}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                              duration: 0.3,
                              ease: "easeInOut"
                            }}
                            className="app__portfolio-item center-item"
                            whileHover={{ 
                              scale: 1.05,
                              y: -5,
                              transition: { duration: 0.2 }
                            }}
                          >
                            <div className="app__portfolio-img">
                              <img src={urlFor(item.imgurl)} alt={item.name} />
                            </div>
                            
                            <div className="app__portfolio-content">
                              <h4 className="bold-text">{item.name}</h4>
                              <p className="p-text">
                                {item.description || 'A creative portfolio project showcasing my skills.'}
                              </p>
                              <a href={item.link} target="_blank" rel="noopener noreferrer">
                                <button className="app__portfolio-btn">Visit Project</button>
                              </a>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      );
                    } else {
                      // Side items remain static
                      return (
                        <motion.div
                          key={item.key}
                          initial={{
                            x: item.position === -1 ? -350 : 350,
                            opacity: 0.4,
                            scale: 0.85
                          }}
                          animate={{
                            x: item.position === -1 ? -350 : 350,
                            opacity: 0.4,
                            scale: 0.85
                          }}
                          className={`app__portfolio-item ${item.position === -1 ? 'left-item' : 'right-item'}`}
                        >
                          <div className="app__portfolio-img">
                            <img src={urlFor(item.imgurl)} alt={item.name} />
                          </div>
                          
                          <div className="app__portfolio-content">
                            <h4 className="bold-text">{item.name}</h4>
                            <p className="p-text">
                              {item.description || 'A creative portfolio project showcasing my skills.'}
                            </p>
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                              <button className="app__portfolio-btn">Visit Profile</button>
                            </a>
                          </div>
                        </motion.div>
                      );
                    }
                  })}
                </>
              )}
            </div>

            {/* Navigation Arrow - Right */}
            {portfolio.length > 1 && (
              <button
                className={`app__portfolio-arrow right${isMobile ? ' mobile' : ''}`}
                onClick={handleNext}
                aria-label="Next item"
                style={isMobile ? { display: 'block' } : {}}
              >
                <HiChevronRight />
              </button>
            )}

            {/* Mobile Navigation */}
            {/* Removed .app__portfolio-mobile-nav for mobile arrows, now handled above */}
          </div>

          {/* Dots Indicator */}
          {portfolio.length > 1 && (
            <div className="app__portfolio-dots">
              {portfolio.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  className={`app__portfolio-dot ${currentIndex === index ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to item ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Portfolio, "app__portfolio"),
  "portfolio",
  "app__primarybg"
);