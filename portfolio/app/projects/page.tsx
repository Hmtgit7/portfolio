'use client';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop';
import Projects from '../components/sections/Projects';

export default function ProjectsPage() {
  return (
    <div className="app">
      <Navbar />
      <Projects />
      <Footer />
      <ScrollToTop />
    </div>
  );
}