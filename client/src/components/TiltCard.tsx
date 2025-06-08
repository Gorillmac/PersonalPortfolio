import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glareOpacity?: number;
  tiltAmount?: number;
  perspective?: number;
  glareColor?: string;
  borderRadius?: string;
  scale?: number;
}

export default function TiltCard({
  children,
  className = "",
  glareOpacity = 0.2,
  tiltAmount = 10,
  perspective = 1000,
  glareColor = "255, 255, 255",
  borderRadius = "1rem",
  scale = 1.05
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smoothed values for animation
  const smoothX = useSpring(x, { stiffness: 200, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 200, damping: 20 });
  
  // Transform rotations
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [tiltAmount, -tiltAmount]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-tiltAmount, tiltAmount]);
  
  // Glare effect position
  const glareX = useTransform(smoothX, [-0.5, 0.5], ["-20%", "120%"]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ["-20%", "120%"]);
  
  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate normalized position from -0.5 to 0.5
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    
    x.set(xPos);
    y.set(yPos);
  };
  
  // Reset on mouse leave
  const resetPosition = () => {
    setIsHovering(false);
    x.set(0);
    y.set(0);
  };
  
  // Auto animation when not hovering
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!isHovering) {
      interval = setInterval(() => {
        const t = Date.now() / 2000;
        const newX = Math.sin(t) * 0.15;
        const newY = Math.cos(t) * 0.1;
        x.set(newX);
        y.set(newY);
      }, 16);
    }
    
    return () => clearInterval(interval);
  }, [isHovering, x, y]);
  
  return (
    <motion.div 
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective: `${perspective}px`,
        borderRadius,
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={resetPosition}
    >
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: 'preserve-3d'
        }}
        whileHover={{ scale }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
      
      {/* Glare effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            105deg,
            rgba(${glareColor}, ${glareOpacity}) 0%,
            rgba(${glareColor}, 0) 80%
          )`,
          top: glareY,
          left: glareX,
          transform: 'translate(-50%, -50%)',
          width: '200%',
          height: '200%',
          zIndex: 10,
          opacity: isHovering ? 1 : 0.5,
          mixBlendMode: 'overlay',
          borderRadius
        }}
      />
    </motion.div>
  );
}