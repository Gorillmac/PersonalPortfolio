import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
  rotate?: boolean;
}

export default function FloatingElement({
  children,
  className = "",
  amplitude = 10,
  duration = 4,
  delay = 0,
  rotate = false
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [`-${amplitude}px`, `${amplitude}px`, `-${amplitude}px`],
        rotate: rotate ? [-1, 1, -1] : [0, 0, 0]
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay
      }}
    >
      {children}
    </motion.div>
  );
}