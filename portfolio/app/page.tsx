'use client';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Header from './components/sections/Header';
import About from './components/sections/About';
import Portfolio from './components/sections/Portfolio';
import Work from './components/sections/Work';
import Skills from './components/sections/Skills';
import CombinedTimeline from './components/sections/CombinedTimeline';
import GitHub from './components/sections/GitHub';
import Contact from './components/sections/Contact';
import ScrollToTop from './components/ScrollToTop';

export default function Home() {
  return (
    <div className='app'>
      <Navbar />
      <Header />
      <About />
      <Portfolio />
      <CombinedTimeline />
      <Work />
      <Skills />
      <GitHub />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

