import React, { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import {
  BsTwitter,
  BsInstagram,
  BsGithub,
  BsYoutube,
  BsLinkedin,
} from "react-icons/bs";
import "./Navbar.scss";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { href: "https://github.com/Hmtgit7", icon: <BsGithub aria-label="GitHub" /> },
  { href: "https://www.instagram.com/hemant_gehlod/", icon: <BsInstagram aria-label="Instagram" /> },
  { href: "https://www.linkedin.com/in/hemant-gehlod", icon: <BsLinkedin aria-label="LinkedIn" /> },
  { href: "https://twitter.com/GehlodHemant?t=xQzzJBMs9qf1b2Pyo-OLOA&s=09", icon: <BsTwitter aria-label="Twitter" /> },
  { href: "https://youtube.com/channel/UCmAmylLKHr73VTcqJXLSMlA", icon: <BsYoutube aria-label="YouTube" /> },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent background scroll when menu is open
  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <h1>{"</"}Hem<span>ant{" >"}</span></h1>
      </div>
      <ul className="navbar__links">
        {NAV_LINKS.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
      <div className="navbar__social">
        {SOCIAL_LINKS.map((item, idx) => (
          <a href={item.href} key={idx} target="_blank" rel="noopener noreferrer">
            <div>{item.icon}</div>
          </a>
        ))}
      </div>
      <button
        className="navbar__menu-btn"
        aria-label="Open menu"
        onClick={() => setMenuOpen(true)}
      >
        <HiMenuAlt4 />
      </button>
      {menuOpen && (
        <>
          <div
            className="navbar__overlay"
            onClick={() => setMenuOpen(false)}
            tabIndex={-1}
            aria-label="Close menu overlay"
          />
          <aside className="navbar__mobile-menu" aria-modal="true" role="dialog">
            <button
              className="navbar__close-btn"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <HiX />
            </button>
            <ul>
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="navbar__mobile-social">
              {SOCIAL_LINKS.map((item, idx) => (
                <a href={item.href} key={idx} target="_blank" rel="noopener noreferrer">
                  <div>{item.icon}</div>
                </a>
              ))}
            </div>
          </aside>
        </>
      )}
    </nav>
  );
};

export default Navbar;