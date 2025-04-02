import React from 'react';
import { motion } from 'framer-motion';
import './PageTransition.scss';

const PageTransition = ({ children }) => {
    // Page variants for transitions
    const pageVariants = {
        initial: {
            opacity: 0,
            y: 50
        },
        in: {
            opacity: 1,
            y: 0
        },
        out: {
            opacity: 0,
            y: -50
        }
    };

    // Transition timing
    const pageTransition = {
        type: 'tween',
        ease: 'anticipate',
        duration: 0.5
    };

    return (
        <motion.div
            className="page-transition"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;