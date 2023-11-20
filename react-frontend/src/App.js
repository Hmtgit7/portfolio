import React from 'react';

import './App.scss'

import { About, Header, Skills, Testimonials, Work, Contact, Portfolio } from './containers';

import { Navbar, Footer } from './Components';
import { Route, Router, Routes } from 'react-router-dom';


const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Header />
      <About />
      <Portfolio/>
      <Skills />
      <Work />
      {/* <Testimonials/> */}
      <Contact />
      <Footer />
    </div>
  )
}

export default App