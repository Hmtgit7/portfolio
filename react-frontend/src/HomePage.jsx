import React from 'react';
import { Navbar, Footer } from './Components';
import { About, Header, Skills, Work, Contact, Portfolio, About1, Experience, Education, CombinedTimeline, FeaturedProjects } from './containers';

const HomePage = () => {
    return (
        <div className='app'>
            <Navbar />
            <Header />
            <FeaturedProjects />
            <About />
            {/* <About1 /> */}
            <Portfolio />
            <CombinedTimeline />
            <Work />
            <Skills />
            <Contact />
            <Footer />
        </div>
    );
};

export default HomePage;