import React from 'react'
import { useRef, useState, useEffect} from 'react'
import { TiLocationArrow } from 'react-icons/ti'
import Button from './Button'
import { useWindowScroll } from 'react-use'
import gsap from 'gsap'


const navItems = ['Home', 'About', 'Portfolio', 'Contact']

const Navbar = () => {

    const [isAudioPlaying, setIsAudioPlaying] = useState(false)
    const [isIndicatorActive, setIsIndicatorActive] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isNavVisible, setisNavVisible] = useState(true)
    const [showAudioHint, setShowAudioHint] = useState(true)
    const [hasScrolled, setHasScrolled] = useState(false)
    
    const audioButtonRef = useRef(null)
    const navContainerRef = useRef(null)
    const audioElementRef = useRef(null)

    const { y: currentScrollY } = useWindowScroll()

    useEffect(() => {
        if (currentScrollY === 0) {
            setisNavVisible(true)
            navContainerRef.current.classList.remove('floating-nav')
        } else if (currentScrollY > lastScrollY) {
            setisNavVisible(false)
            navContainerRef.current.classList.add('floating-nav')
        } else if (currentScrollY < lastScrollY) {
            setisNavVisible(true)
            navContainerRef.current.classList.add('floating-nav')
        }

        setLastScrollY(currentScrollY)
        
    }, [currentScrollY, lastScrollY])

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100, 
            opacity: isNavVisible ? 1 : 0,
            duration: 0.3,
            ease: "power2.out"
        })

        
    }, [isNavVisible])

    useEffect(() => {
        if (isAudioPlaying) {
            audioElementRef.current.play()
        } else {
            audioElementRef.current.pause()
        }
    }, [isAudioPlaying])

    // Fixed audio scroll trigger
    useEffect(() => {
        const handleFirstScroll = () => {
            if (hasScrolled) return // Prevent multiple triggers
            
            const audio = audioElementRef.current
            if (!audio) return

            setHasScrolled(true)
            
            try {
                // Ensure audio is ready
                audio.volume = 0
                audio.muted = false
                
                const playPromise = audio.play()
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log("Audio started playing")
                        setIsAudioPlaying(true)
                        setIsIndicatorActive(true)
                        setShowAudioHint(false)

                        // Fade in volume
                        const fadeInterval = setInterval(() => {
                            if (audio.volume < 1) {
                                audio.volume = Math.min(audio.volume + 0.05, 1)
                            } else {
                                clearInterval(fadeInterval)
                            }
                        }, 50)
                    }).catch(err => {
                        console.warn("Autoplay blocked:", err)
                        // Reset states if autoplay fails
                        setIsAudioPlaying(false)
                        setIsIndicatorActive(false)
                    })
                }
            } catch (err) {
                console.warn("Audio play failed:", err)
                setIsAudioPlaying(false)
                setIsIndicatorActive(false)
            }
        }

        // Use currentScrollY instead of native scroll event
        if (currentScrollY > 0 && !hasScrolled) {
            handleFirstScroll()
        }

    }, [currentScrollY, hasScrolled])

    // Enhanced audio toggle with better error handling
    const toggleAudioIndicator = () => {
        const audio = audioElementRef.current
        if (!audio) return

        if (isAudioPlaying) {
            audio.pause()
            setIsAudioPlaying(false)
            setIsIndicatorActive(false)
        } else {
            const playPromise = audio.play()
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsAudioPlaying(true)
                    setIsIndicatorActive(true)
                }).catch(err => {
                    console.warn("Audio play failed:", err)
                })
            }
        }
        setShowAudioHint(false)
    }

    // Debug effect to check audio loading
    useEffect(() => {
        const audio = audioElementRef.current
        if (!audio) return

        const handleCanPlay = () => console.log("Audio can play")
        const handleError = (e) => console.error("Audio error:", e)
        const handleLoadStart = () => console.log("Audio loading started")

        audio.addEventListener('canplay', handleCanPlay)
        audio.addEventListener('error', handleError)
        audio.addEventListener('loadstart', handleLoadStart)

        return () => {
            audio.removeEventListener('canplay', handleCanPlay)
            audio.removeEventListener('error', handleError)
            audio.removeEventListener('loadstart', handleLoadStart)
        }
    }, [])

  return (
    <div ref={navContainerRef} className={`fixed inset-x-0 top-4 z-50 h-16  transition-all duration-500 sm:inset-x-6 rounded-xl ${isNavVisible && currentScrollY > 0 ? 'border border-solid border-white/20' : 'border-none'}`}>
        <header className='absolute top-1/2 w-full -translate-y-1/2'>
            <nav className='flex size-full items-center justify-between p-4'>
                <div className='flex items-center gap-7'>
                    <a href="/"><img src="/img/logo.png" alt="logo" className='w-10'/></a>

                    <Button
                        id="product-button"
                        title="PROJECT: DraGonis"
                        rightIcon={<TiLocationArrow />}
                        containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                        onClick={() => window.open("https://dragonismusic.com", "_blank")}
                    />
                </div>

                <div className='flex h-full items-center'>
                    <div className='hidden md:block'>
                        {navItems.map((item) => (
                            <a 
                                key={item} 
                                href={`#${item.toLowerCase()}`} 
                                className='nav-hover-btn' 
                                onClick={(e) => {
                                    e.preventDefault()
                                    const target = document.getElementById(item.toLowerCase())
                                    if (target) {
                                        target.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start',
                                        })
                                    }
                                }}>
                                    {item}
                            </a>
                        ))}
                    </div>
                    
                    <div className='relative'>
                        {showAudioHint && (
                            <div className="absolute top-10 left-5 bg-pink-400 text-white text-sm px-3 py-1 rounded-xl  animate-bounce z-50">
                                Click!
                                <div className="absolute left-5 -top-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-pink-400" />
                            </div>
                        )}
                        
                        <button
                            ref={audioButtonRef}
                            className='ml-10 flex items-center space-x-0.5'
                            onClick={toggleAudioIndicator}
                        >
                            <audio
                                ref={audioElementRef}
                                className='hidden'
                                src="/audio/loop.mp3"
                                loop
                                preload="auto"
                            />
                            {[1, 2, 3, 4].map((bar) => (
                                <div
                                    key={bar}
                                    className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
                                    style={{ animationDelay: `${bar * 0.1}s` }}
                                />
                            ))}
                        </button>
                    </div>

                </div>
            </nav>
        </header>
    </div>
  )
}

export default Navbar