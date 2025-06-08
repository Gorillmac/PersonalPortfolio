import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TypedTextProps {
  texts: string[];
  cursorClassName?: string;
  textClassName?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
}

export default function TypedText({
  texts,
  cursorClassName = "w-0.5 h-8 bg-primary ml-1 inline-block",
  textClassName = "font-semibold",
  typingSpeed = 80,
  deletingSpeed = 50,
  delayBetweenTexts = 1500
}: TypedTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // We'll animate the cursor directly with motion.span properties

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[currentTextIndex];
      
      if (!isDeleting) {
        // Typing text
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        } else {
          // Complete and pause before deleting
          setIsPaused(true);
          typingTimer.current = setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, delayBetweenTexts);
          return;
        }
      } else {
        // Deleting text
        if (displayText.length > 0) {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        } else {
          // Complete deletion, move to next text
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
        }
      }
      
      // Schedule next update
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      typingTimer.current = setTimeout(handleTyping, speed);
    };
    
    if (!isPaused) {
      typingTimer.current = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    }
    
    return () => {
      if (typingTimer.current) {
        clearTimeout(typingTimer.current);
      }
    };
  }, [
    displayText, 
    isDeleting, 
    currentTextIndex, 
    isPaused, 
    texts, 
    typingSpeed, 
    deletingSpeed, 
    delayBetweenTexts
  ]);
  
  return (
    <span className="inline-flex items-center">
      <span className={textClassName}>{displayText}</span>
      <motion.span
        className={cursorClassName}
        animate={{ 
          opacity: [0, 1, 0] 
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
    </span>
  );
}