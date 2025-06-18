import React from 'react'
import AnimatedTitle from './AnimatedTitle'
import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import TypingText from './TypingText'

const Story = () => {

  const frameRef = useRef(null)

  const handleMouseLeave = () => {
    const element = frameRef.current

    gsap.to(element, {
      duration: 0.3,
      rotateX: 0, rotateY: 0,
      
      ease: 'power1.inOut',
      
    })
  }

  const handleMouseMove = (e) => {
    const {clientX, clientY} = e
    const element = frameRef.current

    if (!element) return
    
    const rect = element.getBoundingClientRect()

    const x = clientX - rect.left 
    const y = clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y- centerY ) / centerY) * -10
    const rotateY = ((x- centerX ) / centerX) * -10

    gsap.to(element, {
      duration: 0.3,
      rotateX, rotateY,
      transformPerspective: 500,
      ease: 'power1.inOut',
      
    })
  }
  

  return (
    <div id="story" className='min-h-dvh w-screen bg-black text-blue-50'>
        <div className='flex size-full flex-col items-center py-10 pb-24'>
            <TypingText
              text="the multiversal ip world"
              className="font-general text-sm uppercase md:text-[10px]"
              speed={60}
            />

            <div className='relative size-full'>
                <AnimatedTitle 
                    title="Re<b>a</b>dy to turn your ideas <br/> into commercially viable products?"
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
