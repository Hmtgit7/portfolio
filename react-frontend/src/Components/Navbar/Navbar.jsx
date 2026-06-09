import React, { useState } from "react";
import {
  BsTwitter,
  BsInstagram,
  BsGithub,
  BsYoutube,
  BsLinkedin,
} from "react-icons/bs";
import "./Navbar.scss";

const SOCIAL_LINKS = [
  { href: "https://github.com/Hmtgit7",                                                           icon: <BsGithub    aria-label="GitHub"    /> },
  { href: "https://www.instagram.com/hemant_gehlod/",                                            icon: <BsInstagram aria-label="Instagram" /> },
  { href: "https://www.linkedin.com/in/hemant-gehlod",                                           icon: <BsLinkedin  aria-label="LinkedIn"  /> },
  { href: "https://twitter.com/GehlodHemant?t=xQzzJBMs9qf1b2Pyo-OLOA&s=09",                     icon: <BsTwitter   aria-label="Twitter"   /> },
  { href: "https://youtube.com/channel/UCmAmylLKHr73VTcqJXLSMlA",                               icon: <BsYoutube   aria-label="YouTube"   /> },
];

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const navRef = React.useRef(null);

  React.useEffect(() => {
    const update = () => {
      if (navRef.current) setNavHeight(navRef.current.offsetHeight);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  React.useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {isSticky && (
        <div className="navbar__spacer" style={{ height: navHeight }} aria-hidden="true" />
      )}
      <nav ref={navRef} className={`navbar ${isSticky ? "navbar--sticky" : ""}`}>
        {/* Logo */}
        <div className="navbar__logo">
          <h1>{"</"}Hem<span>ant{" >"}</span></h1>
        </div>

        {/* Social icons only */}
        <div className="navbar__social">
          {SOCIAL_LINKS.map((item, idx) => (
            <a href={item.href} key={idx} target="_blank" rel="noopener noreferrer">
              <div>{item.icon}</div>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
