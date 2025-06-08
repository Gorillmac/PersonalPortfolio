import { Button } from "@/components/ui/button";
import { PORTFOLIO_DATA } from "@/lib/constants";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, GraduationCap, Languages, Award, Calendar, Car } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  const imageVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9,
      rotate: -2
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        type: "spring",
        damping: 15
      }
    }
  };
  
  const badgeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <section id="about" className="pt-16 md:pt-20 bg-white pb-0 md:pb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-extrabold text-secondary mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>
          <motion.div 
            className="w-16 h-1 bg-primary mx-auto mb-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
        
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            variants={imageVariants} 
            className="relative"
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            {/* Add a decorative element behind the image */}
            <motion.div 
              className="absolute -inset-4 md:-inset-6 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-lg blur-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.5, duration: 1 }}
            />
            
            {/* Animated border */}
            <motion.div 
              className="absolute -inset-1 rounded-lg border-2 border-primary/30"
              animate={{ 
                boxShadow: ["0 0 0 rgba(0,0,0,0)", "0 0 15px rgba(0,0,0,0.1)", "0 0 0 rgba(0,0,0,0)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <img 
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=600" 
              alt="Computer science and coding" 
              className="rounded-lg shadow-lg w-full h-auto relative z-10 max-h-[300px] object-cover" 
            />
            
            {/* Floating elements to add more visual interest */}
            <motion.div 
              className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-16 h-16 md:w-24 md:h-24 rounded-full bg-primary/10 z-20 flex items-center justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <motion.div 
                className="text-primary text-3xl md:text-4xl font-bold"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <GraduationCap className="w-8 h-8 md:w-10 md:h-10" />
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div variants={containerVariants}>
            <motion.h3 
              className="text-2xl font-bold text-secondary mb-4 text-shadow-sm"
              variants={itemVariants}
            >
              Computer Science Graduate & Developer
            </motion.h3>
            <motion.p 
              className="text-lg text-neutral-dark mb-6 font-medium"
              variants={itemVariants}
            >
              {PORTFOLIO_DATA.careerObjective}
            </motion.p>
            <motion.p 
              className="text-md text-neutral-dark mb-4 font-medium"
              variants={itemVariants}
            >
              I'm currently pursuing my Diploma in Computer Science at Tshwane University of Technology with expected completion in June 2025. Throughout my education, I have developed versatile technical skills across multiple platforms and technologies, preparing me for diverse roles in the tech industry.
            </motion.p>

            
            <motion.div
              className="flex items-center mb-4 gap-4 flex-wrap"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <Calendar className="text-primary h-5 w-5" />
                <span className="text-neutral-dark font-medium">Born: {PORTFOLIO_DATA.birthdate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="text-primary h-5 w-5" />
                <span className="text-neutral-dark font-medium">License: {PORTFOLIO_DATA.driverLicense}</span>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants} 
              className="mt-4"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 0 rgba(0,0,0,0)", 
                    "0 0 20px rgba(59, 130, 246, 0.4)", 
                    "0 0 0 rgba(0,0,0,0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="rounded-full"
              >
                <Button 
                  size="lg"
                  className="gap-3 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 px-6 py-6 shadow-lg"
                  asChild
                >
                  <a 
                    href={PORTFOLIO_DATA.resumeLink}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, 10, 0, -10, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      className="mr-2"
                    >
                      <Download className="h-6 w-6" />
                    </motion.div>
                    <span className="font-bold text-lg">View My CV</span>
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
