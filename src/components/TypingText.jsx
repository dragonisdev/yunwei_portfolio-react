import { useEffect, useRef, useState } from 'react'

const TypingText = ({ text = '', className = '', speed = 50 }) => {
  const [visibleText, setVisibleText] = useState('')
  const [hasAnimated, setHasAnimated] = useState(false)
  const textRef = useRef(null)
  const indexRef = useRef(0) // useRef to avoid stale closures

  useEffect(() => {
    if (typeof text !== 'string') return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true)
      }
    }, { threshold: 0.6 })

    const el = textRef.current
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [hasAnimated, text])

  useEffect(() => {
    if (!hasAnimated || typeof text !== 'string' || text.length === 0) return

    setVisibleText('')
    indexRef.current = 0 // ✅ ensure reset

    const interval = setInterval(() => {
      const i = indexRef.current
      if (i < text.length) {
        setVisibleText(prev => prev + text[i])
        indexRef.current += 1
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [hasAnimated, text, speed])

  return (
    <p ref={textRef} className={className}>
      {visibleText}
    </p>
  )
}

export default TypingText
