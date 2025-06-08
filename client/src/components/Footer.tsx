import { PORTFOLIO_DATA } from "@/lib/constants";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <footer ref={ref} className="bg-secondary text-secondary-foreground py-8 relative">
      {/* Animated wave background */}
      <motion.div 
        className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full"
          style={{ 
            fill: '#f8fafc',
            width: 'calc(100% + 1.3px)', 
            height: '50px'
          }}
        >
          <motion.path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            animate={{
              d: [
                "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
                "M321.39,40.44c58-5.79,114.16-20.13,172-31.86,82.39-10.72,168.19-11.73,250.45.61C823.78,25,906.67,52,985.66,62.83c70.05,12.48,146.53,18.09,214.34,3V0H0V20.35A600.21,600.21,0,0,0,321.39,40.44Z",
                "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              ]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
      
      {/* Back to top button */}
      <motion.div 
        className="absolute -top-5 right-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <a 
          href="#hero" 
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 p-3 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:shadow-xl"
          aria-label="Back to top"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronUp className="h-5 w-5" />
          </motion.div>
        </a>
      </motion.div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center"
          variants={staggerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="mb-4 md:mb-0"
            variants={itemVariants}
          >
            <a 
              href="#hero" 
              className="text-2xl font-bold transition-all duration-300"
            >
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Ofentse</span>
              <motion.span 
                className="text-white"
                animate={{ 
                  textShadow: [
                    "0 0 5px rgba(255, 255, 255, 0.3)",
                    "0 0 15px rgba(255, 255, 255, 0.6)",
                    "0 0 5px rgba(255, 255, 255, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >Moshwaneng</motion.span>
            </a>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center mb-4 md:mb-0"
            variants={itemVariants}
          >
            {["about", "skills", "projects", "contact"].map((item, index) => (
              <motion.div
                key={item}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
                className="mx-2 my-1"
              >
                <motion.a 
                  href={`#${item}`} 
                  className="px-3 py-1.5 inline-block text-white hover:text-primary transition-all duration-300 hover:font-semibold relative overflow-hidden group font-medium bg-secondary-foreground/10 rounded-md hover:bg-secondary-foreground/20"
                >
                  <span className="relative z-10">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 -z-10 scale-x-0 origin-left"
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-6 md:mt-0"
          >
            <p className="text-white/90 font-medium bg-secondary-foreground/10 px-4 py-2 rounded-full">
              &copy; {currentYear} <span className="text-primary font-semibold">{PORTFOLIO_DATA.name}</span>. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
