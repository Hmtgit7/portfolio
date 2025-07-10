import React from 'react';
import { AppWrap, MotionWrap } from '../Wrapper';
import Education from './Education/Education';
import Experience from './Experience/Experience';
import './Education/Education.scss'; // Reuse timeline styles

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