import React from 'react'

import Hero from '../components/Hero'
import About from '../components/About'
import Navbar from '../components/Navbar'
import Features from '../components/Features'
import Story from '../components/Story'
import Contact from '../components/Contact'

const Home = () => {
  return (
    <>
        <Hero />
        <About />
        <Features />
        <Story />
        <Contact />
    </>
  )
}

export default Home