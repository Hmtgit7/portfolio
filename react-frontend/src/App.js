import React from 'react';

import './App.scss'

import {About,Footer,Header,Skills,Testimonials,Work } from './containers';

import {Navbar} from './Components';


const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Header/>
      <About/>
      <Work/>
      <Skills/>
      <Testimonials/>
      <Footer/>
    </div>
  )
}

export default App