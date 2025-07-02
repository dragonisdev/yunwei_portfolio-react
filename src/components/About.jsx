import { useGSAP } from '@gsap/react'
import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all';
import AnimatedTitle from './AnimatedTitle';
import TypingText from './TypingText';

const About = () => {
    useGSAP(() => {
        const clipAnimation = gsap.timeline({scrollTrigger: {
            trigger: '#clip',
          
            end: '+800 center',
            scrub: 0.5,
            pin: true,
            pinSpacing: true,

        }
    })
    
    clipAnimation.to('.mask-clip-path', {
        width: '100vw',
        height: '100.1vh',
        borderRadius: 0
    })
})


  return (
    <section id="about" className='min-h-screen w-screen'>
        <div className='relative mb-8 mt-36 flex flex-col items-center gap-5'>
            <TypingText text="I am an..." className='font-general text-sm uppercase md:text-[10px]'></TypingText>

            <AnimatedTitle title="Experienced <b>p</b>r<b>o</b>ducer, <br/> 3D <b>a</b>rtist, <b>d</b>evel<b>o</b>per" containerClass="mt-5 !text-black text-center"/>
           

            <div className='about-subtext'>
                <p>The game of games begins-your life, now an epic MMORPG</p>

                <p>Zentry unites every player from countless games and platforms</p>
            </div>
        </div>

        <div className='h-dvh w-screen' id='clip'>
            <div className='mask-clip-path about-image'>
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