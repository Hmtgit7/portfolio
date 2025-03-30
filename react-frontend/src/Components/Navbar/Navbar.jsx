import React, { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import {
  BsTwitter,
  BsInstagram,
  BsGithub,
  BsYoutube,
  BsLinkedin,
} from "react-icons/bs";

// import { images } from '../../constants';
import "./Navbar.scss";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        {/* <img src={images.logo} alt="logo" /> */}
        <h1>
          {"</"}Hem<span>ant{">"}</span>
        </h1>
      </div>
      <ul className="app__navbar-links">
        {["home", "about", "skills", "work", "contact"].map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>
      <div className="app__navbar-icons">
        <a href="https://github.com/Hmtgit7">
          <div>
            <BsGithub />
          </div>
        </a>
        <a href="https://www.instagram.com/hemant_gehlod/" target="blank">
          <div>
            <BsInstagram />
          </div>
        </a>
        <a href="https://www.linkedin.com/in/hemant-gehlod">
          <div>
            <BsLinkedin />
          </div>
        </a>
        <a href="https://twitter.com/GehlodHemant?t=xQzzJBMs9qf1b2Pyo-OLOA&s=09">
          <div>
            <BsTwitter />
          </div>
        </a>
        <a href="https://youtube.com/channel/UCmAmylLKHr73VTcqJXLSMlA">
          <div>
            <BsYoutube />
          </div>
        </a>
      </div>
      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {["home", "about", "skills", "work", "contact"].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <div className="app__navbar-menu-icons">
              <a href="https://github.com/Hmtgit7">
                <div>
                  <BsGithub />
                </div>
              </a>
              <a href="https://www.instagram.com/hemant_gehlod/" target="blank">
                <div>
                  <BsInstagram />
                </div>
              </a>
              <a href="https://www.linkedin.com/in/hemant-gehlod">
                <div>
                  <BsLinkedin />
                </div>
              </a>
              <a href="https://twitter.com/GehlodHemant?t=xQzzJBMs9qf1b2Pyo-OLOA&s=09">
                <div>
                  <BsTwitter />
                </div>
              </a>
              <a href="https://youtube.com/channel/UCmAmylLKHr73VTcqJXLSMlA">
                <div>
                  <BsYoutube />
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;