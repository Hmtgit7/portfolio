import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiDocumentText, HiExternalLink, HiChip } from 'react-icons/hi';
import { FiGitBranch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { AppWrap, MotionWrap } from '../../Wrapper';
import { images } from '../../constants';
import hirelyxImage from '../../assets/featured-projects/hirelyx.jpeg';
import prajnaImage from '../../assets/featured-projects/prajna.png';
import './FeaturedProjects.scss';

const featuredProjects = [
  {
    id: 'hirelyx',
    badge: 'AI Recruiting Platform',
    name: 'HireLyx',
    type: 'Microservices + AI',
    tagline: 'Hire smarter, not harder.',
    description:
      'End-to-end AI recruitment: intelligent resume scoring, structured interview pipelines, and real-time team collaboration — built for modern hiring teams.',
    highlights: [
      { icon: '🤖', label: 'AI Screening' },
      { icon: '🎯', label: 'Smart Match' },
      { icon: '👥', label: 'Team Collab' },
      { icon: '📊', label: 'Analytics' },
    ],
    stack: ['Spring Boot', 'FastAPI', 'Next.js', 'PostgreSQL', 'OpenAI'],
    image: hirelyxImage,
    liveUrl: 'https://hirelyx-web.vercel.app/',
    detailsSlug: 'hirelyx',
    // Gold/amber accent
    accentColor: '#f59e0b',
    accentGlow: 'rgba(245, 158, 11, 0.45)',
    gradientFrom: '#1a1206',
    gradientVia: '#2d1f08',
    number: '01',
  },
  {
    id: 'prajna',
    badge: 'Education Ecosystem',
    name: 'Prajna',
    type: 'School ERP + LMS',
    tagline: 'One platform. Every school workflow.',
    description:
      'Next-gen school OS combining adaptive learning, ERP operations, bus tracking, live classrooms, and AI-assisted study in one unified platform.',
    highlights: [
      { icon: '🏫', label: 'School ERP' },
      { icon: '🧠', label: 'Adaptive AI' },
      { icon: '🎥', label: 'Live Class' },
      { icon: '📍', label: 'Bus Track' },
    ],
    stack: ['Next.js', 'React Native', 'Node.js', 'MongoDB', 'GPT-4o'],
    image: prajnaImage,
    liveUrl: 'https://prajna-web.vercel.app/',
    detailsSlug: 'prajna',
    // Cyan/teal accent
    accentColor: '#06b6d4',
    accentGlow: 'rgba(6, 182, 212, 0.45)',
    gradientFrom: '#051520',
    gradientVia: '#072030',
    number: '02',
  },
];

// Tech circles from hero
const techCircles = [
  { src: images.react, label: 'React' },
  { src: images.redux, label: 'Redux' },
  { src: images.sass,  label: 'Sass'  },
];

const FeaturedProjects = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      {/* ── Section heading ──────────────────────────────────── */}
      <div className="fp__heading">
        <motion.p
          className="fp__kicker"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          ✦ Featured Projects
        </motion.p>
        <motion.h2
          className="head-text"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          Flagship products built to feel <span>premium</span>
        </motion.h2>
        <motion.p
          className="fp__intro p-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          Real products. Real problems solved. Click <em>View Details</em> for the full deep-dive.
        </motion.p>

        {/* Tech circles */}
        <div className="fp__tech-row">
          {techCircles.map((tech, i) => (
            <motion.div
              key={tech.label}
              className="fp__tech-circle"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.38, delay: i * 0.1 }}
              whileHover={{ scale: 1.18, rotate: 10 }}
            >
              <img src={tech.src} alt={tech.label} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Cards ──────────────────────────────────────────────── */}
      <div className="fp__grid">
        {featuredProjects.map((project, index) => (
          <motion.article
            key={project.id}
            className="fp__card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: index * 0.12 }}
            onHoverStart={() => setHovered(project.id)}
            onHoverEnd={() => setHovered(null)}
            whileHover={{ y: -8 }}
          >
            {/* ── Full-bleed screenshot ── */}
            <div className="fp__card-image">
              <motion.img
                src={project.image}
                alt={project.name}
                animate={{ scale: hovered === project.id ? 1.06 : 1 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              />

              {/* Multi-layer gradient overlay */}
              <div className="fp__card-overlay" />

              {/* Glowing accent border at top */}
              <div className="fp__card-glow-bar" />

              {/* Floating badge top-right */}
              <div className="fp__card-badge">
                <HiChip />
                <span>{project.badge}</span>
              </div>

              {/* Project number watermark */}
              <span className="fp__card-number">{project.number}</span>
            </div>

            {/* ── Glass content tray ── */}
            <div className="fp__card-body">
              {/* Header row */}
              <div className="fp__card-header">
                <div>
                  <p className="fp__card-type">{project.type}</p>
                  <h3 className="fp__card-name">{project.name}</h3>
                  <p className="fp__card-tagline">{project.tagline}</p>
                </div>
              </div>

              <p className="fp__card-desc">{project.description}</p>

              {/* Highlight chips */}
              <div className="fp__card-highlights">
                {project.highlights.map((h) => (
                  <span key={h.label} className="fp__highlight-chip">
                    {h.icon} {h.label}
                  </span>
                ))}
              </div>

              {/* Stack */}
              <div className="fp__card-stack">
                <FiGitBranch className="fp__stack-icon" />
                {project.stack.map((s) => (
                  <span key={s} className="fp__stack-chip">{s}</span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="fp__card-actions">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fp__btn fp__btn--live"
                >
                  <HiExternalLink />
                  <span>Visit Live</span>
                </a>
                <Link
                  to={`/projects/${project.detailsSlug}`}
                  className="fp__btn fp__btn--details"
                >
                  <HiDocumentText />
                  <span>View Details</span>
                </Link>
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
