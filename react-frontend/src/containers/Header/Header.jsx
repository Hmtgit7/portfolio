import React from "react";
import { easeInOut, motion } from "framer-motion";
import { images } from "../../constants";


const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

const Header = () => {

  return (
    <div className="app__header app__flex">
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 8.5 }}
        className="app__header-info"
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex">
            <span>👋🏼</span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">Hello, I am</p>
              <h1 className="head-text">Hemant</h1>
            </div>
            <div className="tag-cmp app__flex">
              <p className="p-text">Web Developer</p>
              <p className="p-text">Freelancer</p>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5 ,delayChildren:0.5}}
        className="app__header-img"
      >
        <img src={images.profile} alt="Profile_image"/>
        <motion.img
         whileInView={{ scale: [0, 1] }}
         transition={{ duration: 1 ,ease:'easeOut'}}
         src={images.circle}
         alt="profile_circle"
         className="overlay_circle"
         >
         </motion.img>

      </motion.div>
      <motion.div
      variant={scaleVariants}
      whileInView={scaleVariants.whileInView}
      className="app__header-circles"
      >
        {
          [images.fluter,images.redux,images.sass].map((circle)=>(
            <div className="circle-cmp app_flex" key={circle}>
              <img src={circle} alt="circle" />
            </div>
          ))
        }
      </motion.div>
    </div>
  );
};

export default Header;
