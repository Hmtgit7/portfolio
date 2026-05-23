'use client';
import React from 'react';
import AppWrap from '../../lib/AppWrap';
import MotionWrap from '../../lib/MotionWrap';
import Education from './Education';
import Experience from './Experience';
import '../styles/Education.scss';

const CombinedTimeline = () => {
  return (
    <section className="timeline-sections-row">
      <div className="app__education-timeline-section">
        <Education />
      </div>
      <div className="app__experience-timeline-section">
        <Experience />
      </div>
    </section>
  );
};

export default AppWrap(
  MotionWrap(CombinedTimeline, 'combined-timeline'),
  'combined-timeline',
  'app__whitebg'
);
