import React from 'react'

import Navbar from './components/Navbar'
import Home from './pages/Home'

import { Route, Routes, BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <main className='relative min-h-screen w-screen overflow-x-hidden'>
        <Navbar/>
        
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        
      </main>
    </BrowserRouter>
  )
}

export default App