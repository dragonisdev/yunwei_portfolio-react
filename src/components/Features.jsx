import React, { useState, useRef, useEffect } from 'react'
import { TiLocationArrow } from 'react-icons/ti'

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 6;
    const tiltY = (relativeX - 0.5) * -6;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle, transition: 'transform 0.1s ease-out' }}
    >
      {children}
    </div>
  );
};


export const BentoCard = ({ src, title, description, isComingSoon, CTA, URL}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <a  
              href={URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative z-20 text-white">{CTA}</a>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="portfolio" className='bg-black pb-52'>
      <div className='container mx-auto px-3 md:px-10'>
        <div className='px-5 py-32'>
          <p className='font-circular-web text-lg text-blue-50'>Explore my vision</p>
        
        
          <p className='max-w-md font-circular-web text-lg text-blue-50 opacity-50'>
          I believe in design that tells a story — interfaces that feel alive, brands that resonate, and experiences that connect.  
          Every project I create pushes past boundaries.
          </p>
        </div>
        
        <BentoTilt className='border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]'>
          <BentoCard 
            src="videos/feature-1.mp4"
            title={<>3D Anim<b>a</b>tor</>}
            description="Blender 3D, After Effects, Photoshop and a lot of love."
            isComingSoon
            CTA="Browse"
            URL="https://www.instagram.com/dragonis_art/"
          />
        </BentoTilt>

        <div className='grid h-[135vh] grid-cols-2 grid-rows-3 gap-7'>
          <BentoTilt className='bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2'>
            <BentoCard 
              src="videos/feature-2.mp4"
              title={<>Web <b> D</b>eveloper</>}
              description="React.js fanboy, TailwindCSS, UI/UX connoisseur. My projects are held together by dreams & hopes."
            />
          </BentoTilt>
          

          <BentoTilt className='bento-tilt_1 row-span-1 md:col-span-1 '>
            <BentoCard 
              src="videos/feature-3.mp4"
              title={<>Music  Pr<b>o</b>ducer</>}
              description="Over 10 years of experience in FL Studio and Ableton with over 3+ million streams on major platforms."
              isComingSoon
              CTA="Listen"
              URL="https://open.spotify.com/artist/13z6RhXyaasGa9eeWxduuR?si=9GUY_2aNTqqALLoe4j5b0g"
            />
          </BentoTilt>

          {/*<BentoTilt className='bento-tilt_1 row-span-1 md:col-span-1 md:row-span-1'>
            <BentoCard 
              src="videos/feature-2.mp4"
              title={<>Over<b>a</b>chiever</>}
              description="An anime and gaming-inspired NFT collection - the IP primed for expansion"
            />
          </BentoTilt> */}

          <BentoTilt className='bento-tilt_1  md:col-span-1 md:me-0'>
            <BentoCard 
              src="videos/feature-4.mp4"
              title={<>C<b>y</b>ber<b>s</b>ecurity</>}
              description="Check out my write ups regarding security flaws, exploits as well as some fun side projects."
              isComingSoon
              CTA="Read"
              URL="https://github.com/dragonisdev/vulnwriteups"
            />
          </BentoTilt>

          <BentoTilt className='bento-tilt_2'>
            <div className='flex size-full flex-col justify-between bg-violet-100 p-5'>
              <h1 className='bento-title special-font max-w-64 text-black'>More C<b>o</b>ming Soon!</h1>
              <TiLocationArrow className='m-5 scale[5] self-end'/>
            </div>
          </BentoTilt>

          <BentoTilt className='bento-tilt_2'>
          <BentoCard 
              src="videos/feature-5.mp4"
              title={<>MEMES</>}
              description="You've come far, have a drink! 
              (not my memes)"
              isComingSoon
              CTA="Enjoy"
              URL="https://www.instagram.com/nesquik.v2?igsh=bnFnaGZqeTR1ZGF2"
            />
            <video
              src="videos/feature-5.mp4"
              
              loop
              muted
              autoPlay
              className='size-full object-cover object-center'
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  )
}

export default Features