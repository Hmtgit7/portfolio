import React from 'react';
import { motion } from 'framer-motion';
import { AppWrap } from '../../Wrapper';
import './Education.scss';

const educationData = [
  {
    dates: '2020 – 2024',
    degree: "Bachelor's of Technology in Computer Science and Engineering",
    school: 'Acropolis Institute of Technology and Research, Indore',
    description: 'CGPA: 7.57. Relevant coursework: Data Structures, Algorithms, Web Development, Cloud Computing.'
  },
  // Add more education entries as needed
];

const Education = () => {
  return (
    <section className="app__education-timeline">
      <h2 className="head-text">Education</h2>
      <div className="timeline-container">
        <div className="timeline-line" />
        <div className="timeline-cards">
          {educationData.map((edu, idx) => (
            <motion.div
              className="timeline-card-wrapper"
              key={edu.degree + edu.school}
              whileInView={{ opacity: [0, 1], y: [30, 0] }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="timeline-dot" />
              <div className="timeline-card">
                <div className="timeline-date">{edu.dates}</div>
                <div className="timeline-role">{edu.degree}</div>
                <div className="timeline-company">{edu.school}</div>
                <div className="timeline-contributions">
                  {edu.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education; 