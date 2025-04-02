import React from 'react';
import { Navbar, Footer } from './Components';
import { About, Header, Skills, Work, Contact, Portfolio, Github, About1 } from './containers';

const HomePage = () => {
    return (
        <div className='app'>
            <Navbar />
            <Header />
            <About />
            {/* <About1 /> */}
            <Portfolio />
            <Skills />
            <Work />
            <Github />
            <Contact />
            <Footer />
        </div>
    );
};

export default HomePage;