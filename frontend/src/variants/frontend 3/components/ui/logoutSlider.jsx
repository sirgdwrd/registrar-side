"use client"

import React, { useState, useRef, useEffect } from 'react';
import { LogOut, ArrowRight } from 'lucide-react';

export default function LogoutSlider({ onConfirm }) {
  const [isDragging, setIsDragging] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  const handleInteractionStart = () => {
    if (isConfirmed) return;
    setIsDragging(true);
  };

  const handleInteractionEnd = () => {
    setIsDragging(false);
    if (sliderPosition < containerRef.current.offsetWidth - sliderRef.current.offsetWidth - 5) {
      setSliderPosition(0);
    }
  };

  const handleInteractionMove = (clientX) => {
    if (!isDragging || isConfirmed) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const sliderWidth = sliderRef.current.offsetWidth;
    const containerWidth = containerRect.width;

    let newX = clientX - containerRect.left - sliderWidth / 2;
    
    newX = Math.max(0, Math.min(newX, containerWidth - sliderWidth));
    
    setSliderPosition(newX);

    if (newX >= containerWidth - sliderWidth - 5) { 
      setIsConfirmed(true);
      setIsDragging(false);
    }
  };
  
  useEffect(() => {
    if (isConfirmed) {
      const timer = setTimeout(() => {
        onConfirm();
      }, 700); 
      return () => clearTimeout(timer);
    }
  }, [isConfirmed, onConfirm]);

  return (
    <div className="w-full select-none touch-none">
      <div
        ref={containerRef}
        className="relative w-full h-16 bg-gray-100 dark:bg-gray-800/50 rounded-full flex items-center p-2"
        onMouseUp={handleInteractionEnd}
        onMouseLeave={handleInteractionEnd}
        onTouchEnd={handleInteractionEnd}
        onMouseMove={(e) => handleInteractionMove(e.clientX)}
        onTouchMove={(e) => handleInteractionMove(e.touches[0].clientX)}
      >
        <div
          ref={sliderRef}
          className={`absolute h-12 w-12 bg-yellow-400 rounded-full shadow-lg flex items-center justify-center cursor-grab transition-all duration-200 ease-out ${isDragging ? 'scale-110 cursor-grabbing' : ''} ${isConfirmed ? 'bg-green-500' : ''}`}
          style={{ transform: `translateX(${sliderPosition}px)` }}
          onMouseDown={handleInteractionStart}
          onTouchStart={handleInteractionStart}
        >
          {isConfirmed ? (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <ArrowRight className="w-6 h-6 text-gray-800" />
          )}
        </div>

        <span 
          className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-gray-400 dark:text-gray-500 transition-opacity duration-300"
          style={{ opacity: sliderPosition > 10 ? 0 : 1 }}
        >
          Slide to Log Out
        </span>
      </div>
    </div>
  );
}