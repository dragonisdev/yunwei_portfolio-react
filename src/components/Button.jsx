import React, { useState, useRef } from 'react'

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
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 rounded-full"
        style={{
          opacity: hoverOpacity,
          background: `radial-gradient(150px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.2), transparent 70%)`,
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

export default Button