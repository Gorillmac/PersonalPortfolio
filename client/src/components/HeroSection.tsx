import { Button } from "@/components/ui/button";
import { PORTFOLIO_DATA } from "@/lib/constants";
import { motion } from "framer-motion";
import { 
  GithubIcon, 
  Instagram,
  ArrowRight,
  MessageCircle,
  Download
} from "lucide-react";
import TypedText from "./TypedText";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.7, 
        ease: [0.6, 0.01, -0.05, 0.95],
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  const imageVariants = {
    hidden: { 
      scale: 0.8, 
      opacity: 0,
      rotate: -5
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      rotate: 0,
      transition: { 
        delay: 0.6, 
        duration: 0.8, 
        ease: "easeOut",
        type: "spring",
        damping: 15
      }
    }
  };

  return (
    <section id="hero" className="pt-28 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/10 -z-10"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-secondary/10 -z-10"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-primary/5 -z-10"
        animate={{ 
          scale: [1, 1.4, 1],
          x: [0, 40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary mb-6 text-shadow-sm"
              variants={itemVariants}
            >
              Hi, I'm <span className="text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text">{PORTFOLIO_DATA.name}</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-neutral-dark mb-8 font-medium"
              variants={itemVariants}
            >
              <span className="font-bold text-secondary">
                <TypedText 
                  texts={[
                    "Computer Science Student", 
                    "Frontend Developer", 
                    "Java Enthusiast", 
                    "Problem Solver",
                    "Tech Innovator",
                    "Creative Coder"
                  ]}
                  textClassName="font-bold text-secondary"
                  cursorClassName="w-0.5 h-7 bg-primary inline-block ml-1"
                  typingSpeed={70}
                  deletingSpeed={40}
                  delayBetweenTexts={1800}
                />
              </span> {PORTFOLIO_DATA.description}
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <Button 
                size="lg" 
                className="gap-2 font-semibold shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                asChild
              >
                <motion.a 
                  href="#projects"
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.97 }}
                >
                  View My Work
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </motion.a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="font-semibold shadow-md hover:shadow-lg transition-all border-primary hover:bg-primary/10 hover:text-primary text-secondary"
                asChild
              >
                <motion.a 
                  href="#contact"
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.97 }}
                >
                  Contact Me
                </motion.a>
              </Button>
            </motion.div>
            <motion.div 
              className="mt-8 mb-4"
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {/* CV link: {PORTFOLIO_DATA.resumeLink} */}
              <motion.a 
                href={PORTFOLIO_DATA.resumeLink}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-all duration-300"
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <motion.span
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Download className="h-5 w-5" />
                </motion.span>
                View My CV
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="flex mt-2 space-x-4"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ y: -5, scale: 1.1, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.9 }}
              >
                <a 
                  href={PORTFOLIO_DATA.social.github}
                  className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300 p-3 rounded-full shadow-md hover:shadow-lg"
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <GithubIcon className="h-5 w-5" />
                  </motion.div>
                </a>
              </motion.div>
              <motion.div
                whileHover={{ y: -5, scale: 1.1, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.9 }}
              >
                <a 
                  href={PORTFOLIO_DATA.social.instagram}
                  className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300 p-3 rounded-full shadow-md hover:shadow-lg"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, repeatDelay: 1.5 }}
                  >
                    <Instagram className="h-5 w-5" />
                  </motion.div>
                </a>
              </motion.div>
              <motion.div
                whileHover={{ y: -5, scale: 1.1, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.9 }}
              >
                <a 
                  href={PORTFOLIO_DATA.social.whatsapp}
                  className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300 p-3 rounded-full shadow-md hover:shadow-lg"
                  aria-label="WhatsApp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <MessageCircle className="h-5 w-5" />
                  </motion.div>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div
            variants={imageVariants}
            className="flex justify-center relative"
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <motion.div 
              className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/40 to-secondary/40 blur-lg"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div 
              className="absolute -inset-8 rounded-full bg-gradient-to-tr from-primary/10 to-secondary/10 blur-xl"
              animate={{ 
                scale: [1.05, 1, 1.05],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <img 
              src="/assets/profile.jpg" 
              alt="Ofentse Moshwaneng - Computer Science Student" 
              className="rounded-full w-full max-w-md mx-auto shadow-xl border-4 border-white relative z-10"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
