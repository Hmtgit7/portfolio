import React from 'react';
import { Navbar, Footer } from './Components';
import { About, Header, Skills, Work, Contact, Portfolio, Github, About1, Experience, Education, CombinedTimeline } from './containers';

const HomePage = () => {
    return (
        <div className='app'>
            <Navbar />
            <Header />
            <About />
            {/* <About1 /> */}
            <Portfolio />
            <CombinedTimeline />
            <Work />
            <Skills />
            <Github />
            <Contact />
            <Footer />
        </div>
    );
};

export default HomePage;