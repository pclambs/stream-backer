import React, { useRef, useEffect } from 'react'
import './ScrollBar.css'

const Scrollbar = ({ children }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      const element = containerRef.current;
      if (element.scrollHeight > element.clientHeight) {
        element.classList.add('custom-scrollbar-active')
      }
    }
  }, [containerRef])

  return (
    <div className="custom-scrollbar" ref={containerRef}>
      {children}
    </div>
  )
}

export default Scrollbar