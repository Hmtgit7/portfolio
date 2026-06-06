import React from 'react';
import { motion } from 'framer-motion';
import { AiOutlineArrowRight } from 'react-icons/ai';

import { AppWrap, MotionWrap } from '../../Wrapper';
import hirelyxImage from '../../assets/featured-projects/hirelyx.jpeg';
import prajnaImage from '../../assets/featured-projects/prajna.png';
import './FeaturedProjects.scss';

const featuredProjects = [
  {
    badge: 'AI Recruiting Platform',
    name: 'Hirelyx',
    type: 'Microservices + AI',
    description:
      'A polished AI recruitment ecosystem with company profiles, intelligent candidate evaluation, and structured hiring workflows built for modern teams.',
    highlights: ['AI interviews', 'Resume parsing', 'Company profiles', 'Smart matching'],
    stack: ['Spring Boot', 'FastAPI', 'Next.js', 'PostgreSQL'],
    image: hirelyxImage,
    link: 'https://hirelyx-web.vercel.app/',
    accent: 'gold',
  },
  {
    badge: 'Modern Education Ecosystem',
    name: 'Prajna',
    type: 'School ERP + LMS',
    description:
      'A next-generation school platform for attendance, results, bus tracking, announcements, learning journeys, and AI-assisted education.',
    highlights: ['Attendance + ERP', 'LMS modules', 'Bus tracking', 'AI learning'],
    stack: ['Next.js', 'React Native', 'Node.js', 'MongoDB'],
    image: prajnaImage,
    link: 'https://prajna-web.vercel.app/',
    accent: 'cyan',
  },
];

const FeaturedProjects = () => {
  return (
    <>
      <div className="app__featured-heading">
        <p className="app__featured-kicker">Featured Projects</p>
        <h2 className="head-text">
          Flagship products built to look and feel <span>premium</span>
        </h2>
        <p className="app__featured-intro p-text">
          These are the projects that best represent your product thinking: Hirelyx for AI-powered hiring and Prajna for a modern education operating system.
        </p>
      </div>

      <div className="app__featured-grid">
        {featuredProjects.map((project, index) => (
          <motion.article
            key={project.name}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`app__featured-card app__featured-card--${project.accent}`}
          >
            <div className="app__featured-image-wrap">
              <img src={project.image} alt={project.name} />
              <div className="app__featured-overlay" />
              <span className="app__featured-badge">{project.badge}</span>
            </div>

            <div className="app__featured-body">
              <div className="app__featured-meta">
                <span className="app__featured-index">0{index + 1}</span>
                <span className="app__featured-type">{project.type}</span>
              </div>

              <h3>{project.name}</h3>
              <p className="p-text">{project.description}</p>

              <div className="app__featured-highlights">
                {project.highlights.map((highlight) => (
                  <span key={highlight}>{highlight}</span>
                ))}
              </div>

              <div className="app__featured-footer">
                <div className="app__featured-stack">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <a href={project.link} target="_blank" rel="noopener noreferrer" className="app__featured-link">
                  View Live
                  <AiOutlineArrowRight />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(FeaturedProjects, 'app__featured-projects'),
  'featured-projects',
  'app__whitebg'
);