import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './HomePage';
import Projects from './containers/Projects/Projects';
import { PageTransition, ScrollToTop } from './Components';



// Animated routes wrapper
const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <ScrollToTop />
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <PageTransition>
                            <HomePage />
                        </PageTransition>
                    }
                />
                <Route
                    path="/projects"
                    element={
                        <PageTransition>
                            <Projects />
                        </PageTransition>
                    }
                />
                {/* Add a catch-all route that redirects to home */}
                <Route
                    path="*"
                    element={
                        <PageTransition>
                            <HomePage />
                        </PageTransition>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};

const Router = () => {
    return (
        <BrowserRouter>
            <AnimatedRoutes />
        </BrowserRouter>
    );
};

export default Router;