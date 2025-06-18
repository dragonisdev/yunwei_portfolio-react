import React from 'react'
import AnimatedTitle from './AnimatedTitle'
import { useRef, useState, useEffect } from 'react'

const Story = () => {

  const frameRef = useRef('null')

  const handleMouseLeave = () => {

  }

  const handleMouseMove = (e) => {
    const {clientX, clientY} = e
  }
  

  return (
    <div id="story" className='min-h-dvh w-screen bg-black text-blue-50'>
        <div className='flex size-full flex-col items-center py-10 pb-24'>
            <p className='font-general text-sm uppercase md:text-[10px]'>the multiversal ip world</p>

            <div className='relative size-full'>
                <AnimatedTitle 
                    title="The st<b>o</b>ry of <br/> a hidden realm"
                    sectionId="#story"
                    containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
                />
            </div>

            <div className='story-img-container'>
              <div className='story-img-mask'>
                <div className='story-img-content'>
                  <img
                    ref={frameRef}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseLeave}
                    onMouseEnter={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    src='/img/entrance.webp'
                    alt='about-image'
                    className='object-contain'
                  />
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Story
