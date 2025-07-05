import { useGSAP } from '@gsap/react'
import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all';
import AnimatedTitle from './AnimatedTitle';
import TypingText from './TypingText';

const About = () => {
    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: '#clip',
                start: 'top center',
                end: '+800 center',
                scrub: 0.5,
                pin: true,
                pinSpacing: true,
                onUpdate: (self) => {
                    // Dynamically adjust z-index based on scroll progress
                    const progress = self.progress;
                    const textContainer = document.querySelector('.about-text-container');
                    const imageContainer = document.querySelector('.mask-clip-path');
                    
                    if (textContainer && imageContainer) {
                        if (progress < 0.3) {
                            // Text should be visible at the beginning
                            textContainer.style.zIndex = '50';
                            imageContainer.style.zIndex = '10';
                        } else if (progress > 0.7) {
                            // Image should be on top when fully expanded
                            textContainer.style.zIndex = '10';
                            imageContainer.style.zIndex = '50';
                        } else {
                            // Transition zone - keep image on top
                            textContainer.style.zIndex = '10';
                            imageContainer.style.zIndex = '50';
                        }
                    }
                },
                onLeave: () => {
                    // Ensure proper z-index when leaving trigger area
                    const textContainer = document.querySelector('.about-text-container');
                    const imageContainer = document.querySelector('.mask-clip-path');
                    
                    if (textContainer && imageContainer) {
                        textContainer.style.zIndex = '50';
                        imageContainer.style.zIndex = '10';
                    }
                },
                onEnterBack: () => {
                    // Reset z-index when entering back from below
                    const textContainer = document.querySelector('.about-text-container');
                    const imageContainer = document.querySelector('.mask-clip-path');
                    
                    if (textContainer && imageContainer) {
                        textContainer.style.zIndex = '10';
                        imageContainer.style.zIndex = '50';
                    }
                }
            }
        });

        clipAnimation.to('.mask-clip-path', {
            width: '100vw',
            height: '100.1vh',
            borderRadius: 0,
            ease: 'none'
        });

        // Additional animation for text fade out/in
        const textAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: '#clip',
                start: 'top center',
                end: '+400 center',
                scrub: 0.5,
            }
        });

        textAnimation.to('.about-text-container', {
            opacity: 0,
            y: -50,
            ease: 'power2.out'
        });

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === document.querySelector('#clip')) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return (
        <section id="about" className='min-h-screen w-screen'>
            <div className='about-text-container relative mb-8 mt-36 flex flex-col items-center gap-5 z-50'>
                <TypingText text="I am an..." className='font-general text-sm uppercase md:text-[12px]'></TypingText>

                <AnimatedTitle title="Experienced <b>p</b>r<b>o</b>ducer, <br/> 3D <b>a</b>rtist & <b>d</b>evel<b>o</b>per" containerClass="mt-5 !text-black text-center"/>

                <div className='about-subtext'>
                    <p>Blending visual design with code to craft immersive experiences.</p>
                    
                    <p>A savant in artistic and emotional expression.</p>
                </div>
            </div>

            <div className='h-dvh w-screen relative' id='clip'>
                <div className='mask-clip-path about-image relative z-10'>
                    <img 
                        src="img/about.webp"
                        alt='Background'
                        className='absolute left-0 top-0 size-full object-cover'
                    />
                </div>
            </div>
        </section>
    )
}

export default About