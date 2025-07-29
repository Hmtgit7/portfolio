import React from 'react';
import { motion } from 'framer-motion';
import { AppWrap } from '../../Wrapper';
import './Experience.scss';

const experiences = [
  {
    company: 'Ablespace',
    location: 'Delhi, India',
    role: 'Full Stack Developer',
    dates: 'Jul 2025 – Present',
    skills: ['Next.js', 'Nest.js', 'Node', 'React', 'PostgreSQL', 'AWS'],
    contributions: [
      'Developing HIPAA and FERPA-compliant web applications and management platform serving 10,000+ professionals across school districts',
      'Building scalable web modules for IEP goal tracking, service time logging, progress reporting, and Medicaid billing functionality using modern web technologies',
      'Implementing AI-powered web features for automated goal creation, note generation, and educational assessments',
      'Contributing to responsive web development with Next.js and NestJS backend architecture',
      'Collaborating with product engineering team using GitHub Actions for CI/CD pipelines and automated deployments'
    ]
  },
  {
    company: 'Newzenalpha Tech Pvt. Ltd',
    location: 'Bangalore, India',
    role: 'Software Developer',
    dates: 'Dec 2024 – Jul 2025',
    skills: ['Shopify', 'Node', 'React', 'PostgreSQL', 'AWS'],
    contributions: [
      'Contributed to the development and optimization of scalable software solutions.',
      'Architected and developed a Shopify app utilizing Node.js for backend services, PostgreSQL for database management, and React with TypeScript for a dynamic and user-friendly frontend.',
      'Integrated Shopify APIs for seamless data synchronization and management.',
      'Deployed the application on AWS, leveraging EC2 for hosting, S3 for storage, and RDS for database management.'
    ]
  },
  {
    company: 'Kinzy Club',
    location: 'Bangalore, India',
    role: 'Backend Developer',
    dates: 'Nov 2024 – Dec 2024',
    skills: ['Java', 'Spring', 'Spring-Boot', 'Redis', 'PostgreSQL', 'React', 'Typescript', 'AWS', 'Tailwind CSS', 'MUI'],
    contributions: [
      'Designed and implemented scalable backend services using Spring Boot, PostgreSQL, and Redis, ensuring seamless data management for a parent-kids mobile application.',
      'Contributed to frontend testing and UI prototyping with React and TypeScript, supporting efficient development workflows and improving user experience.'
    ]
  }
];

const Experience = () => {
  return (
    <section className="app__experience-timeline">
      <h2 className="head-text">Experience</h2>
      <div className="timeline-container">
        <div className="timeline-line" />
        <div className="timeline-cards">
          {experiences.map((exp, idx) => (
            <motion.div
              className="timeline-card-wrapper"
              key={exp.company + exp.role}
              whileInView={{ opacity: [0, 1], y: [30, 0] }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="timeline-dot" />
              <div className="timeline-card">
                <div className="timeline-date">{exp.dates}</div>
                <div className="timeline-role">{exp.role}</div>
                <div className="timeline-company">{exp.company} <span className="timeline-location">({exp.location})</span></div>
                <ul className="timeline-contributions">
                  {exp.contributions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className="timeline-skills">
                  {exp.skills.map(skill => (
                    <span className="timeline-skill-badge" key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 