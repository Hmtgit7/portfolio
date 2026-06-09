import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './HomePage';
import Projects from './containers/Projects/Projects';
import HirelyxPage from './containers/ProjectDetail/pages/HirelyxPage';
import PrajnaPage from './containers/ProjectDetail/pages/PrajnaPage';
import { PageTransition, ScrollToTop } from './Components';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <ScrollToTop />
      <Routes location={location} key={location.pathname}>

        <Route path="/" element={
          <PageTransition><HomePage /></PageTransition>
        } />

        <Route path="/projects" element={
          <PageTransition><Projects /></PageTransition>
        } />

        {/* Flagship project detail pages */}
        <Route path="/projects/hirelyx" element={
          <PageTransition><HirelyxPage /></PageTransition>
        } />

        <Route path="/projects/prajna" element={
          <PageTransition><PrajnaPage /></PageTransition>
        } />

        {/* Catch-all → home */}
        <Route path="*" element={
          <PageTransition><HomePage /></PageTransition>
        } />

      </Routes>
    </AnimatePresence>
  );
};

const Router = () => (
  <BrowserRouter>
    <AnimatedRoutes />
  </BrowserRouter>
);

export default Router;
