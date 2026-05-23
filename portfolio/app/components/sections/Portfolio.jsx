'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import AppWrap from '../../lib/AppWrap';
import MotionWrap from '../../lib/MotionWrap';
import { client, urlFor } from '../../lib/client';
import '../styles/Portfolio.scss';

const Portfolio = () => {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState(0);

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
      setItems(data || []);
    }).catch(() => {
      setItems([]);
    });
  }, []);

  const handlePrev = () => {
    if (items.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => prev === 0 ? items.length - 1 : prev - 1);
  };

  const handleNext = () => {
    if (items.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => prev === items.length - 1 ? 0 : prev + 1);
  };

  const getVisibleItems = () => {
    if (items.length === 0) return [];

    if (isMobile || items.length === 1) {
      return [{ ...items[currentIndex], position: 0, key: `item-${currentIndex}` }];
    }

    if (items.length === 2) {
      return [
        { ...items[currentIndex], position: 0, key: `dual-${currentIndex}-center` },
        { ...items[(currentIndex + 1) % items.length], position: 1, key: `dual-${(currentIndex + 1) % items.length}-right` },
      ];
    }

    const visibleItems = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + items.length) % items.length;
      visibleItems.push({
        ...items[index],
        position: i,
        originalIndex: index,
        key: `item-${index}-pos-${i}`
      });
    }
    return visibleItems;
  };

  const goToSlide = (index) => {
    const diff = index - currentIndex;
    setDirection(diff > 0 ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 1 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? 300 : -300, opacity: 1 }),
  };

  const getImageSrc = (item) => (item?.imgurl ? urlFor(item.imgurl) : '/assets/profile.png');
  const getTitle = (item) => item?.name || item?.title || 'Untitled Project';
  const getLink = (item) => item?.link || item?.projectLink || '#';

  return (
    <>
      <h2 className="head-text">My Creative <span>Portfolio</span></h2>

      {items.length > 0 && (
        <div className="app__portfolio-container">
          <div className="app__portfolio-carousel">
            {items.length > 1 && (
              <button
                className={`app__portfolio-arrow left${isMobile ? ' mobile' : ''}`}
                onClick={handlePrev}
                aria-label="Previous item"
                style={isMobile ? { display: 'block' } : {}}
              >
                <HiChevronLeft />
              </button>
            )}

            <div className="app__portfolio-items">
              {isMobile ? (
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="app__portfolio-item mobile-item"
                  >
                    <div className="app__portfolio-img">
                      <img src={getImageSrc(items[currentIndex])} alt={getTitle(items[currentIndex])} />
                    </div>

                    <div className="app__portfolio-content">
                      <h4 className="bold-text">{getTitle(items[currentIndex])}</h4>
                      <p className="p-text">{items[currentIndex].description || 'A creative portfolio project showcasing my skills.'}</p>
                      <a href={getLink(items[currentIndex])} target="_blank" rel="noopener noreferrer">
                        <button className="app__portfolio-btn">Visit Profile</button>
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <>
                  {getVisibleItems().map((item) => {
                    if (item.position === 0) {
                      return (
                        <AnimatePresence mode="wait" key={`center-${item.key}`} custom={direction}>
                          <motion.div
                            key={item.key}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="app__portfolio-item center-item"
                            whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
                          >
                            <div className="app__portfolio-img">
                              <img src={getImageSrc(item)} alt={getTitle(item)} />
                            </div>

                            <div className="app__portfolio-content">
                              <h4 className="bold-text">{getTitle(item)}</h4>
                              <p className="p-text">{item.description || 'A creative portfolio project showcasing my skills.'}</p>
                              <a href={getLink(item)} target="_blank" rel="noopener noreferrer">
                                <button className="app__portfolio-btn">Visit Profile</button>
                              </a>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      );
                    }

                    return (
                      <motion.div
                        key={item.key}
                        initial={{ x: item.position === -1 ? -350 : 350, opacity: 0.4, scale: 0.85 }}
                        animate={{ x: item.position === -1 ? -350 : 350, opacity: 0.4, scale: 0.85 }}
                        className={`app__portfolio-item ${item.position === -1 ? 'left-item' : 'right-item'}`}
                      >
                        <div className="app__portfolio-img">
                          <img src={getImageSrc(item)} alt={getTitle(item)} />
                        </div>

                        <div className="app__portfolio-content">
                          <h4 className="bold-text">{getTitle(item)}</h4>
                          <p className="p-text">{item.description || 'A creative portfolio project showcasing my skills.'}</p>
                          <a href={getLink(item)} target="_blank" rel="noopener noreferrer">
                            <button className="app__portfolio-btn">Visit Profile</button>
                          </a>
                        </div>
                      </motion.div>
                    );
                  })}
                </>
              )}
            </div>

            {items.length > 1 && (
              <button
                className={`app__portfolio-arrow right${isMobile ? ' mobile' : ''}`}
                onClick={handleNext}
                aria-label="Next item"
                style={isMobile ? { display: 'block' } : {}}
              >
                <HiChevronRight />
              </button>
            )}
          </div>

          {items.length > 1 && (
            <div className="app__portfolio-dots">
              {items.map((_, index) => (
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
  MotionWrap(Portfolio, 'app__portfolio'),
  'portfolio',
  'app__primarybg'
);
