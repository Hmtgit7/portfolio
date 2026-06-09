import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiArrowLeft,
  HiExternalLink,
  HiCode,
  HiLightBulb,
  HiChartBar,
  HiCog,
  HiSparkles,
} from 'react-icons/hi';
import { AiFillGithub } from 'react-icons/ai';
import { FiLayers, FiZap, FiAlertTriangle } from 'react-icons/fi';
import { Navbar, Footer, ScrollToTop } from '../../Components';
import './ProjectDetail.scss';

const TABS = [
  { key: 'overview',      label: 'Overview',      icon: <HiLightBulb /> },
  { key: 'tech',          label: 'Tech Stack',     icon: <HiCode /> },
  { key: 'architecture',  label: 'Architecture',   icon: <FiLayers /> },
  { key: 'features',      label: 'Features',       icon: <HiSparkles /> },
  { key: 'challenges',    label: 'Challenges',     icon: <FiAlertTriangle /> },
];

const fadeUp = { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.42 } };

const ProjectDetail = ({ project }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTab = () => {
    switch (activeTab) {

      /* ── OVERVIEW ────────────────────────────────────────────── */
      case 'overview':
        return (
          <motion.div key="overview" {...fadeUp} className="pd__tab-content">
            <section className="pd__section">
              <div className="pd__section-header">
                <FiAlertTriangle className="pd__section-icon problem" />
                <h3>The Problem</h3>
              </div>
              <div className="pd__text-block">
                {project.problemStatement.split('\n').map((line, i) =>
                  line.trim() === '' ? null : (
                    <p key={i} className={line.startsWith('•') ? 'pd__bullet' : 'pd__paragraph'}>{line}</p>
                  )
                )}
              </div>
            </section>

            <section className="pd__section">
              <div className="pd__section-header">
                <HiLightBulb className="pd__section-icon solution" />
                <h3>The Solution</h3>
              </div>
              <div className="pd__text-block">
                {project.solution.split('\n').map((line, i) =>
                  line.trim() === '' ? null : (
                    <p key={i} className={line.startsWith('•') ? 'pd__bullet' : 'pd__paragraph'}>{line}</p>
                  )
                )}
              </div>
            </section>

            {project.metrics && (
              <section className="pd__section">
                <div className="pd__section-header">
                  <HiChartBar className="pd__section-icon metrics" />
                  <h3>Impact & Metrics</h3>
                </div>
                <div className="pd__metrics-grid">
                  {project.metrics.map((m, i) => (
                    <motion.div key={i} className="pd__metric-card"
                      initial={{ scale: 0.85, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.09 }}
                    >
                      <span className="pd__metric-value">{m.value}</span>
                      <span className="pd__metric-label">{m.label}</span>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        );

      /* ── TECH STACK ──────────────────────────────────────────── */
      case 'tech':
        return (
          <motion.div key="tech" {...fadeUp} className="pd__tab-content">
            <section className="pd__section">
              <div className="pd__section-header">
                <HiCode className="pd__section-icon tech" />
                <h3>Technology Stack</h3>
              </div>
              <div className="pd__tech-grid">
                {project.techStack.map((group, i) => (
                  <motion.div key={i} className="pd__tech-group"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <h4 className="pd__tech-category">{group.category}</h4>
                    <div className="pd__tech-items">
                      {group.items.map((tech, j) => (
                        <span key={j} className="pd__tech-badge">{tech}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        );

      /* ── ARCHITECTURE ────────────────────────────────────────── */
      case 'architecture':
        return (
          <motion.div key="arch" {...fadeUp} className="pd__tab-content">
            <section className="pd__section">
              <div className="pd__section-header">
                <FiLayers className="pd__section-icon arch" />
                <h3>High-Level Design (HLD)</h3>
              </div>
              <div className="pd__arch-block">
                {project.architecture.hld.split('\n').map((line, i) => {
                  if (line.startsWith('**') && line.endsWith('**'))
                    return <h4 key={i} className="pd__arch-heading">{line.replace(/\*\*/g, '')}</h4>;
                  if (line.startsWith('→'))
                    return <p key={i} className="pd__arch-arrow">{line}</p>;
                  if (line.trim() === '') return null;
                  return <p key={i} className="pd__arch-text">{line}</p>;
                })}
              </div>
            </section>

            <section className="pd__section">
              <div className="pd__section-header">
                <HiCog className="pd__section-icon lld" />
                <h3>Low-Level Design (LLD)</h3>
              </div>
              <div className="pd__arch-block">
                {project.architecture.lld.split('\n').map((line, i) => {
                  if (line.startsWith('**') && line.endsWith('**'))
                    return <h4 key={i} className="pd__arch-heading">{line.replace(/\*\*/g, '')}</h4>;
                  if (line.startsWith('→'))
                    return <p key={i} className="pd__arch-arrow">{line}</p>;
                  if (line.trim() === '') return null;
                  if (line.includes('{') || line.includes('}'))
                    return <code key={i} className="pd__arch-code">{line}</code>;
                  return <p key={i} className="pd__arch-text">{line}</p>;
                })}
              </div>
            </section>
          </motion.div>
        );

      /* ── FEATURES ────────────────────────────────────────────── */
      case 'features':
        return (
          <motion.div key="features" {...fadeUp} className="pd__tab-content">
            <section className="pd__section">
              <div className="pd__section-header">
                <HiSparkles className="pd__section-icon features" />
                <h3>Key Features</h3>
              </div>
              <div className="pd__features-grid">
                {project.features.map((f, i) => (
                  <motion.div key={i} className="pd__feature-card"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ y: -4 }}
                  >
                    <span className="pd__feature-icon">{f.icon}</span>
                    <div>
                      <h4 className="pd__feature-title">{f.title}</h4>
                      <p className="pd__feature-desc">{f.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        );

      /* ── CHALLENGES ──────────────────────────────────────────── */
      case 'challenges':
        return (
          <motion.div key="challenges" {...fadeUp} className="pd__tab-content">
            <section className="pd__section">
              <div className="pd__section-header">
                <FiZap className="pd__section-icon challenge" />
                <h3>Technical Challenges & Solutions</h3>
              </div>
              <div className="pd__challenges-list">
                {project.challenges.map((c, i) => (
                  <motion.div key={i} className="pd__challenge-item"
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.09 }}
                  >
                    <div className="pd__challenge-number">{String(i + 1).padStart(2, '0')}</div>
                    <div className="pd__challenge-body">
                      <h4 className="pd__challenge-title">{c.title}</h4>
                      <p className="pd__challenge-desc">{c.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        );

      default: return null;
    }
  };

  return (
    <div className="app">
      <Navbar />
      <div className="pd__page">

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <div className="pd__hero">
          <div className="pd__hero-inner">
            <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.38 }}>
              <Link to="/#featured-projects" className="pd__back-btn">
                <HiArrowLeft />
                <span>Back to Portfolio</span>
              </Link>
            </motion.div>

            <div className="pd__hero-content">
              <motion.div className="pd__hero-info"
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.48, delay: 0.1 }}
              >
                <div className="pd__hero-meta">
                  <span className="pd__category-badge">{project.category}</span>
                  <span className="pd__status-badge">{project.status}</span>
                  <span className="pd__year-badge">{project.year}</span>
                </div>

                <h1 className="pd__hero-title">{project.title}</h1>
                <p className="pd__hero-tagline">{project.tagline}</p>
                <p className="pd__hero-description">{project.description}</p>

                <div className="pd__hero-actions">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="pd__action-btn pd__action-btn--primary">
                    <HiExternalLink /><span>Visit Live</span>
                  </a>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="pd__action-btn pd__action-btn--secondary">
                    <AiFillGithub /><span>View on GitHub</span>
                  </a>
                </div>
              </motion.div>

              <motion.div className="pd__hero-image"
                initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.52, delay: 0.18 }}
              >
                <img src={project.coverImage} alt={project.title}
                  onError={(e) => { e.currentTarget.src = '/default-cover.png'; }}
                />
                <div className="pd__hero-image-glow" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── TABS + CONTENT ───────────────────────────────────────── */}
        <div className="pd__body">
          <div className="pd__body-inner">
            <div className="pd__tabs">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  className={`pd__tab ${activeTab === tab.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.icon}<span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="pd__content">{renderTab()}</div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ProjectDetail;
