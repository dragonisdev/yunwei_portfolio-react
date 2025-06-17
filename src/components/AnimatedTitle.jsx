import React, {useRef, useEffect } from 'react'
import gsap from 'gsap'

const AnimatedTitle = ({title, containerClass}) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '80 bottom',
          end: 'center bottom',
          toggleActions: 'play none none reverse'
        }
      })

      titleAnimation.to('.animated-word', {
        opacity: 1,
        transform: 'translate3d(0,0,0) rotateY(0deg) rotateX(0deg)',
        ease: 'power2.inOut',
        stagger: 0.02,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
     <div 
      ref={containerRef}
      className={`animated-title ${containerClass}`}>
      {title.split('<br/>')
      .map((line, lineIndex) => (
        <div key={lineIndex} className='flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3'>
          {line.split(' ').map((word, wordIndex) => (
            <span key={`${lineIndex}-${wordIndex}`} className='animated-word' dangerouslySetInnerHTML={{ __html: word}}/>

           
          ))}
        </div>
      ))}
     
     </div>
  )
}

export default AnimatedTitle