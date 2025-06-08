import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
}

interface ParticlesBackgroundProps {
  className?: string;
  particleCount?: number;
  particleColors?: string[];
  particleSizeRange?: [number, number];
  speedRange?: [number, number];
  connectParticles?: boolean;
  maxConnections?: number;
  connectionDistance?: number;
  connectionLineColor?: string;
}

export default function ParticlesBackground({
  className = "",
  particleCount = 40,
  particleColors = ['#3B82F6', '#1E40AF', '#60A5FA'],
  particleSizeRange = [1, 3],
  speedRange = [0.1, 0.5],
  connectParticles = true,
  maxConnections = 3,
  connectionDistance = 120,
  connectionLineColor = 'rgba(59, 130, 246, 0.15)'
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>();
  const animating = useRef(true);
  
  // Create particles on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const handleResize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Create particles
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * (particleSizeRange[1] - particleSizeRange[0]) + particleSizeRange[0];
      const speedX = (Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0]) * (Math.random() > 0.5 ? 1 : -1);
      const speedY = (Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0]) * (Math.random() > 0.5 ? 1 : -1);
      
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        speedX,
        speedY,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: Math.random() * 0.5 + 0.2
      });
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      animating.current = false;
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [particleCount, particleColors, particleSizeRange, speedRange]);
  
  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const animate = () => {
      if (!animating.current) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach((p, index) => {
        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) {
          p.speedX *= -1;
        }
        
        if (p.y < 0 || p.y > canvas.height) {
          p.speedY *= -1;
        }
        
        // Draw particle
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Connect particles
        if (connectParticles) {
          let connections = 0;
          for (let j = index + 1; j < particlesRef.current.length && connections < maxConnections; j++) {
            const p2 = particlesRef.current[j];
            const distance = Math.sqrt(
              Math.pow(p.x - p2.x, 2) + 
              Math.pow(p.y - p2.y, 2)
            );
            
            if (distance < connectionDistance) {
              connections++;
              const opacity = 1 - (distance / connectionDistance);
              ctx.globalAlpha = opacity * 0.5;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = connectionLineColor;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      });
      
      ctx.globalAlpha = 1;
      requestRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [connectParticles, maxConnections, connectionDistance, connectionLineColor]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}