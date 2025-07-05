import React, { useEffect } from 'react'
import {useState, useRef} from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [loadedVideos, setLoadedVideos] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)

  const totalVideos = 5
  const nextVideoRef = useRef(null)
  const mainVideoRef = useRef(null)
  const previewVideoRef = useRef(null)

  const upComingVideoIndex = (currentIndex % totalVideos + 1)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle user interaction for autoplay
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true)
        // Try to play the main video after user interaction
        if (mainVideoRef.current) {
          mainVideoRef.current.play().catch(console.error)
        }
      }
    }

    const events = ['touchstart', 'touchend', 'click', 'scroll']
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true })
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction)
      })
    }
  }, [hasUserInteracted])

  const handleMiniVdClick = () => {
    setHasClicked(true)
    setCurrentIndex(upComingVideoIndex)
  }

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
        onStart: () => {
          if (nextVideoRef.current) {
            nextVideoRef.current.play().catch(console.error)
          }
        },
        onComplete: () => {
          // Hide preview after animation completes on mobile
          if (isMobile && previewVideoRef.current) {
            gsap.set('#current-video', { opacity: 0 })
          }
        }
      })
      gsap.from('#current-video', {
        transformOrigin: 'center center',
        scale: 0,
        duration: 1,
        ease: 'power1.inOut',
      })
    }
  }, {
    dependencies: [currentIndex, isMobile],
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

        <div id="video-frame" className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
          <div>
            {/* Only show preview on desktop or hide after click on mobile */}
            <div className={`mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg ${isMobile && hasClicked ? 'hidden' : ''}`}>
                <div onClick={handleMiniVdClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                  <video
                    ref={previewVideoRef}
                    src={getVideoSrc(upComingVideoIndex)}
                    loop
                    muted
                    id='current-video'
                    className='size-64 origin-center scale-150 object-cover object-center'
                    onLoadedData={() => setIsLoading(false)}
                    playsInline
                    />
                </div>
            </div>

            <video
              ref={nextVideoRef}
              src={getVideoSrc(currentIndex)}
              loop
              preload="auto"
              muted
              id='next-video'
              className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
              onLoadedData={() => setIsLoading(false)}
              playsInline
            />

            <video
              ref={mainVideoRef}
              src={getVideoSrc(currentIndex)}
              autoPlay={!isMobile}
              preload="auto"
              loop
              muted
              className='absolute left-0 top-0 size-full object-cover object-center'
              playsInline
              onCanPlay={() => {
                // Try to play if user has interacted (for mobile)
                if (isMobile && hasUserInteracted && mainVideoRef.current) {
                  mainVideoRef.current.play().catch(console.error)
                }
              }}
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