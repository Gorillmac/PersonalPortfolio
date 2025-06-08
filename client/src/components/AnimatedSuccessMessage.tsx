import { motion } from "framer-motion";
import { CheckCircle, Sparkles } from "lucide-react";

interface AnimatedSuccessMessageProps {
  visible: boolean;
  onComplete: () => void;
}

export function AnimatedSuccessMessage({ visible, onComplete }: AnimatedSuccessMessageProps) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <motion.div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onComplete}
      />
      
      <motion.div
        className="relative bg-background shadow-xl rounded-lg p-8 max-w-md w-full mx-4 border border-primary/20 overflow-hidden"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={visible ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.8, opacity: 0, y: 20 }}
        transition={{ 
          type: "spring",
          stiffness: 300, 
          damping: 20,
          delay: 0.1
        }}
      >
        {/* Animated background gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 z-0"
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"]
          }}
          transition={{ 
            duration: 5, 
            ease: "linear", 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
          style={{ backgroundSize: "200% 200%" }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={visible ? { 
                scale: [0, 1.2, 1],
                rotate: [0, 10, 0]
              } : { scale: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.2,
                type: "spring"
              }}
              className="relative"
            >
              <motion.div 
                className="absolute inset-0 rounded-full bg-green-500/20" 
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <CheckCircle className="h-16 w-16 text-green-500" />
            </motion.div>
          </div>
          
          <motion.h3 
            className="text-2xl font-bold text-center text-foreground mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            Message Sent Successfully!
          </motion.h3>
          
          <motion.p 
            className="text-center text-foreground/80 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            Thank you for reaching out! I'll get back to you as soon as possible.
          </motion.p>
          
          {/* Sparkles animations */}
          {visible && Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: 0, 
                y: 0, 
                scale: 0,
                opacity: 0
              }}
              animate={{ 
                x: Math.random() * 300 - 150, 
                y: Math.random() * 300 - 150, 
                scale: Math.random() * 0.5 + 0.5,
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 1.5, 
                delay: 0.6 + i * 0.1,
                ease: "easeOut"
              }}
              style={{
                top: "50%",
                left: "50%"
              }}
            >
              <Sparkles className="text-primary h-5 w-5" />
            </motion.div>
          ))}
          
          <motion.button
            className="block w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 mt-4"
            onClick={onComplete}
            initial={{ opacity: 0, y: 10 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Continue
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}