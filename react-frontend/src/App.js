import React from 'react';

import './App.scss'

import {About,Header,Skills,Testimonials,Work,Contact } from './containers';

import {Navbar,Footer} from './Components';


const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Header/>
      <About/>
      <Work/>
      <Skills/>
      <Testimonials/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App