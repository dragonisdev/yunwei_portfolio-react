import React from 'react'
import { useRef, useState, useEffect} from 'react'
import { TiLocationArrow } from 'react-icons/ti'
import Button from './Button'
import { useWindowScroll } from 'react-use'
import gsap from 'gsap'


const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact']

const Navbar = () => {

    const [isAudioPlaying, setIsAudioPlaying] = useState(false)
    const [isIndicatorActive, setIsIndicatorActive] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isNavVisible, setisNavVisible] = useState(true)
    const [showAudioHint, setShowAudioHint] = useState(true)
    
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

    useEffect(() => {
        const audio = audioElementRef.current

        if (!audio) return

        let fadeInterval

        if (isAudioPlaying) {
            audio.volume = 0
            audio.play()

            fadeInterval = setInterval(() => {
                if (audio.volume < 1) {
                    audio.volume = Math.min(audio.volume + 0.05, 1)
                } else {
                    clearInterval(fadeInterval)
                }
            }, 20) 
        } else {
            clearInterval(fadeInterval)
            audio.pause()
        }

        return () => clearInterval(fadeInterval)
    }, [isAudioPlaying])


    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev)
        setIsIndicatorActive((prev) => !prev)
        setShowAudioHint(false) // hide popup
    }

    

    

  return (
    <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
        <header className='absolute top-1/2 w-full -translate-y-1/2'>
            <nav className='flex size-full items-center justify-between p-4'>
                <div className='flex items-center gap-7'>
                    <img src="/img/logo.png" alt="logo" className='w-10'/>

                    <Button 
                        id="product-button" 
                        title="Products" 
                        rightIcon={<TiLocationArrow />}
                        containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
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
                                Click me!
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