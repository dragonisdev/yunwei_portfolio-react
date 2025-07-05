import React, { useEffect, useState, useRef } from 'react'
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger)

// Button Component
const Button = ({title, id, rightIcon, leftIcon, containerClass, onClick}) => {
  const [hoverOpacity, setHoverOpacity] = useState(0)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef(null)

  const handleMouseMove = (e) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setCursorPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const handleMouseEnter = () => {
    setHoverOpacity(1)
  }

  const handleMouseLeave = () => {
    setHoverOpacity(0)
  }

  return (
    <button 
      ref={buttonRef}
      id={id} 
      onClick={onClick} 
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black transform transition-all duration-300 hover:scale-105 hover:shadow-lg ${containerClass}`}
    >
      {/* Hover effect overlay */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-all duration-300 rounded-full"
        style={{
          opacity: hoverOpacity,
          background: `radial-gradient(120px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(168, 85, 247, 0.6), rgba(59, 130, 246, 0.4), rgba(236, 72, 153, 0.2), transparent 70%)`,
        }}
      />
      
      {leftIcon && <span className="relative z-20">{leftIcon}</span>}

      <span className='relative z-20 inline-flex overflow-hidden font-general text-xs uppercase'>
          <div>
              {title}
          </div>
      </span>
      
      {rightIcon && <span className="relative z-20">{rightIcon}</span>}
    </button>
  )
}

// Hero Component
const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [loadedVideos, setLoadedVideos] = useState(0)
  const [userInteracted, setUserInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const totalVideos = 5
  const nextVideoRef = useRef(null)
  const backgroundVideoRef = useRef(null)

  const upComingVideoIndex = (currentIndex % totalVideos + 1)

  // Mobile detection
  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const handleMiniVdClick = () => {
    setHasClicked(true)
    setCurrentIndex(upComingVideoIndex)
  }

  const handleUserInteraction = async () => {
    setUserInteracted(true);
    
    // Try to play all videos after user interaction
    try {
      const videos = document.querySelectorAll('video');
      for (const video of videos) {
        await video.play().catch(console.log);
      }
    } catch (error) {
      console.log('Video play failed:', error);
    }
  };

  const playVideo = async (videoElement) => {
    try {
      if (videoElement) {
        await videoElement.play();
      }
    } catch (error) {
      console.log('Video play failed:', error);
    }
  };

  useGSAP(() => {
    if(hasClicked) {
      gsap.set('#next-video', {visibility: 'visible'})

      gsap.to('#next-video', {
        transformOrigin: 'center center',
        scale: 1,
        width:  '100%',
        height: '100%',
        duration: 1,
        ease: 'power1.inOut',
        onStart: () => playVideo(nextVideoRef.current),
      })
      gsap.from('#current-video', {
        transformOrigin: 'center center',
        scale: 0,
        duration: 1,
        ease: 'power1.inOut',
      })
    }
  }, {
    dependencies: [currentIndex],
    revertOnUpdate: true
  });

  useGSAP(() => {
    gsap.set('#video-frame', {
      clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
      borderRadius: '0 0 40% 10%'
    })

    gsap.from('#video-frame', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0 0 0 0',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      }
    })
  })

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`

  return (
    <div id="home" className='relative h-dvh w-screen overflow-x-hidden'>

        {isLoading && (
          <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
            <div className='three-body'>
              <div className='three-body__dot'></div>
              <div className='three-body__dot'></div>
              <div className='three-body__dot'></div>
            </div>
          </div>
        )}

        {/* Mobile User Interaction Overlay */}
        {isMobile && !userInteracted && (
          <div 
            onClick={handleUserInteraction}
            onTouchStart={handleUserInteraction}
            className="absolute inset-0 z-[90] bg-black bg-opacity-50 flex-center cursor-pointer"
          >
            <div className="text-center text-white">
              <div className="text-6xl mb-4">▶</div>
              <p className="text-xl">Tap to start experience</p>
            </div>
          </div>
        )}

        <div id="video-frame" className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
          <div>
            <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                <div onClick={handleMiniVdClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                  <video
                    ref={nextVideoRef}
                    src={getVideoSrc(upComingVideoIndex)}
                    loop
                    muted
                    playsInline
                    id='current-video'
                    className='size-64 origin-center scale-150 object-cover object-center'
                    onLoadedData={() => setIsLoading(false)}
                  />
                </div>
            </div>

            <video
              ref={nextVideoRef}
              src={getVideoSrc(currentIndex)}
              loop
              preload="auto"
              muted
              playsInline
              id='next-video'
              className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
              onLoadedData={() => setIsLoading(false)}
            />

            <video
              ref={backgroundVideoRef}
              src={getVideoSrc(currentIndex)}
              autoPlay
              preload="auto"
              loop
              muted
              playsInline
              className='absolute left-0 top-0 size-full object-cover object-center'
              onLoadedData={() => setIsLoading(false)}
            />

            <h1 className='special-font hero-heading absolute z-40 bottom-5 right-5 text-blue-75'>
              P<b>o</b>rtfolio
            </h1>

            <div className='absolute left-0 top-0 z-40 size-full'>
              <div className='mt-24 px-5 sm:px-10'>
                <h1 className='special-font hero-heading text-blue-100'>Y<b>u</b>nwei C<b>u</b>i</h1>

                <p className='md:ml-1 ml-0 mb-5 max-w-128 font-robert-regular text-xl text-blue-100'>My creative portfolio of 3D art, electronic music and web development</p>
                 <Button id="Learn more" title="Learn More" leftIcon={<TiLocationArrow/>} containerClass="!bg-purple-400 flex-center gap-1"/>
              </div>
            </div>

          </div>
        </div>
        <h1 className='special-font hero-heading absolute  bottom-5 right-5 text-black'>
              P<b>o</b>rtfolio
          </h1>
    </div>
  )
}

export default Hero