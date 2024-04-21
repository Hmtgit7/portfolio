import React, { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../Wrapper";
import { urlFor, client } from "../../client";
import "./Portfolio.scss";

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const [brands, setBrands] = useState([]);

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const query = '*[_type == "portfolio"]';
    const brandsQuery = '*[_type == "brands"]';

    client.fetch(query).then((data) => {
      setPortfolio(data);
    });

    client.fetch(brandsQuery).then((data) => {
      setBrands(data);
    });
  }, []);

  return (
    <>
      {portfolio.length && (
        <>
          <div className="app__portfolio-item app__flex">
            <img
              src={urlFor(portfolio[currentIndex].imgurl)}
              alt={portfolio[currentIndex].name}
            />
            <div className="app__portfolio-content">
                <h4 className="bold-text">{portfolio[currentIndex].name}</h4>
                <a href={portfolio[currentIndex].link}><button >Visit</button></a>
            </div>
          </div>

          <div className="app__portfolio-btns app__flex">
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0 ? portfolio.length - 1 : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>

            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === portfolio.length - 1 ? 0 : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Portfolio, "app__portfolio"),
  "Portfolio",
  "app__primarybg"
);

/*import React, { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../Wrapper";
import { urlFor, client } from "../../client";
import "./Portfolio.scss";

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [portfolio, setPortfolio] = useState([]);

  const handleClick = (index) => {
    // Wrap around to the beginning or end
    const newIndex = (index + portfolio.length) % portfolio.length;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const query = '*[_type == "portfolio"]';

    client.fetch(query).then((data) => {
      setPortfolio(data);
    });
  }, []);

  return (
    <>
      {portfolio.length && (
        <>
          
       {[...portfolio.slice(currentIndex, currentIndex + 3)].map(
            (item, index) => (
              <div className="app__portfolio-item app__flex" key={index}>
                <div className="app__porfolio-img">
                  <img src={urlFor(item.imgurl)} alt={item.name} />
                </div>
                <div className="app__portfolio-content">
                  <p className="p-text">{item.feedback}</p>
                  <div>
                    <h4 className="bold-text">{item.name}</h4>
                    <h5 className="p-text">{item.company}</h5>
                  </div>
                </div>
              </div>
            )
          )}

          <div className="app__portfolio-btns app__flex">
            <div
              className="app__flex"
              onClick={() => handleClick(currentIndex - 1)}
            >
              <HiChevronLeft />
            </div>

            <div
              className="app__flex"
              onClick={() => handleClick(currentIndex + 1)}
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Portfolio, "app__portfolio"),
  "Portfolio",
  "app__primarybg"
);*/
