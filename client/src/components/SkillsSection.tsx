import { Card, CardContent } from "@/components/ui/card";
import { PORTFOLIO_DATA } from "@/lib/constants";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import TiltCard from "./TiltCard";
import FloatingElement from "./FloatingElement";
import ParticlesBackground from "./ParticlesBackground";

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      setAnimate(true);
    }
  }, [isInView]);

  return (
    <section id="skills" ref={ref} className="pt-6 md:pt-8 pb-16 md:pb-16 bg-gradient-to-b from-neutral-light to-white dark:from-gray-900 dark:to-gray-800 mt-0 relative overflow-hidden">
      {/* 3D interactive particles background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <ParticlesBackground 
          particleCount={30} 
          connectParticles={true} 
          connectionDistance={150}
          particleColors={['#3B82F6', '#1E40AF', '#60A5FA']}
        />
      </div>
      {/* Background animated elements */}
      <motion.div 
        className="absolute top-20 left-10 w-40 h-40 bg-primary/10 rounded-full blur-xl"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-60 h-60 bg-secondary/10 rounded-full blur-xl"
        animate={{ 
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute top-40 right-1/4 w-20 h-20 bg-primary/10 rounded-full blur-lg"
        animate={{ 
          x: [0, 20, 0],
          y: [0, 20, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 relative">
          <div className="relative inline-block">
            <motion.h2 
              className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              My Technical Skills
            </motion.h2>
            <motion.div
              className="absolute -inset-4 bg-white/20 rounded-lg blur-md -z-10"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            />
            <motion.div 
              className="absolute -top-2 -right-8 w-16 h-16 text-primary" 
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: [0, 10, 0, -10, 0] } : { opacity: 0, scale: 0 }}
              transition={{ 
                opacity: { duration: 0.6, delay: 0.7 },
                scale: { duration: 0.6, delay: 0.7 },
                rotate: { duration: 2, repeat: Infinity, delay: 1 }
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M9.25 9a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 9.25 9Zm3 0a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 12.25 9Zm3 0a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 15.25 9Z" fill="currentColor" />
                <path d="M12 1c-5 0-8 2.5-9 7 1-1.5 2.5-2 4-1.5 2.6.9 3.8 3.5 5.5 5.1 1 .9 2.3 1.4 3.8 1.4 3.6 0 4.7-3 5.7-5.5-1 4.5-4 7.5-9 7.5-5.5 0-10-4.5-10-10S6.5 0 12 0s9 3 10 9c0 6-4 12-10 12C5.5 21 0 16.5 0 11c0 3 4 10 12 10 6 0 10-5 10-10 0-6-4-10-10-10Z" fill="currentColor" />
              </svg>
            </motion.div>
          </div>
          
          <motion.p 
            className="text-lg text-neutral-dark max-w-3xl mx-auto font-medium mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            I've built a strong foundation across multiple programming languages and technologies, enabling me to tackle diverse development challenges with confidence.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 gap-12">
          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(99, 102, 241, 0.1)"
              }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-2 border-primary/30 hover:border-primary transition-all duration-500 shadow-lg overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-xl"></div>
                
                <CardContent className="p-8 bg-gradient-to-b from-white to-neutral-light/20 relative z-10">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center mb-6"
                  >
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </motion.div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Technical Skills</h3>
                  </motion.div>
                  
                  <div className="space-y-7">
                    {PORTFOLIO_DATA.skills.technical.map((skill, index) => (
                      <motion.div 
                        key={index} 
                        className="mb-6 last:mb-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
                      >
                        <TiltCard 
                          className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-primary/10 glow-effect"
                          tiltAmount={10}
                          perspective={1500}
                          glareOpacity={0.2}
                          scale={1.02}
                        >
                          <div className="flex justify-between mb-3">
                            <motion.span 
                              className="font-bold text-secondary dark:text-blue-300 text-lg"
                              whileHover={{ color: "#3B82F6" }}
                            >
                              {skill.name}
                            </motion.span>
                            <FloatingElement amplitude={3} duration={2} delay={index * 0.2}>
                              <motion.span 
                                className="text-primary font-bold px-2 py-1 bg-primary/10 rounded-md"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.8 + (index * 0.1), type: "spring" }}
                              >
                                {skill.percentage}%
                              </motion.span>
                            </FloatingElement>
                          </div>
                          <div className="h-6 bg-neutral-100 dark:bg-gray-700 rounded-full overflow-hidden relative shadow-inner">
                            <motion.div 
                              className="skill-bar h-full bg-gradient-to-r from-primary to-secondary rounded-full relative" 
                              initial={{ width: 0 }}
                              animate={{ width: animate ? `${skill.percentage}%` : "0%" }}
                              transition={{ 
                                duration: 1.5, 
                                delay: index * 0.1,
                                ease: [0.4, 0, 0.2, 1] 
                              }}
                            >
                            <motion.div
                              className="absolute inset-0 bg-white opacity-30"
                              initial={{ x: "-100%" }}
                              animate={{ x: "100%" }}
                              transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "linear",
                                delay: index * 0.2
                              }}
                            />
                            
                            {/* Pulsing effect at the end of the bar */}
                            <motion.div
                              className="absolute right-0 top-0 bottom-0 w-4 bg-white opacity-50 rounded-full"
                              animate={{
                                opacity: [0.5, 0.8, 0.5],
                                scale: [0.8, 1.2, 0.8]
                              }}
                              transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut"
                              }}
                            />
                          </motion.div>
                          
                          {/* Small dots floating above the bar */}
                          <motion.div 
                            className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 + (index * 0.2) }}
                          >
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute top-1/2 w-1 h-1 bg-white rounded-full transform -translate-y-1/2"
                                style={{ left: `${20 + i * 25}%` }}
                                animate={{
                                  y: ["-50%", "-100%", "-50%"],
                                  opacity: [0.7, 1, 0.7]
                                }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 2,
                                  delay: i * 0.5,
                                  ease: "easeInOut"
                                }}
                              />
                            ))}
                          </motion.div>
                        </div>
                        </TiltCard>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Professional Skills */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-2 border-transparent hover:border-primary/20 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01]">
                <CardContent className="p-8 bg-gradient-to-b from-white to-neutral-light/50">
                  <h3 className="text-2xl font-bold text-secondary mb-6">Professional Skills</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {PORTFOLIO_DATA.skills.professional.map((skill, index) => (
                      <motion.div 
                        key={index} 
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ 
                          duration: 0.7, 
                          delay: 0.5 + (index * 0.2),
                          type: "spring",
                          stiffness: 50 
                        }}
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                      >
                        <div className="relative w-28 h-28 mx-auto mb-4">
                          {/* Background circle */}
                          <motion.div 
                            className="absolute inset-0 rounded-full border-4 border-neutral-mid"
                          />
                          
                          {/* Progress circle */}
                          <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                            <motion.circle
                              cx="50"
                              cy="50"
                              r="48" 
                              fill="none"
                              stroke="url(#gradient-professional)"
                              strokeWidth="4"
                              strokeDasharray="301.6"
                              strokeLinecap="round"
                              initial={{ strokeDashoffset: 301.6 }}
                              animate={{ 
                                strokeDashoffset: animate ? 301.6 - ((skill.percentage / 100) * 301.6) : 301.6 
                              }}
                              transition={{ duration: 1.5, delay: 0.5 + (index * 0.2), ease: "easeOut" }}
                            />
                            <defs>
                              <linearGradient id="gradient-professional" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="var(--color-primary)" />
                                <stop offset="100%" stopColor="var(--color-secondary)" />
                              </linearGradient>
                            </defs>
                          </svg>
                          
                          {/* Percentage text */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.span 
                              className="text-xl font-bold text-primary text-shadow-sm"
                              initial={{ scale: 0.7, opacity: 0 }}
                              animate={animate ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
                              transition={{ delay: 1 + (index * 0.2), duration: 0.5 }}
                            >
                              {skill.percentage}%
                            </motion.span>
                          </div>
                        </div>
                        <motion.h4 
                          className="text-lg font-bold text-secondary"
                          initial={{ opacity: 0 }}
                          animate={animate ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ delay: 1.2 + (index * 0.2), duration: 0.5 }}
                        >
                          {skill.name}
                        </motion.h4>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Language Skills */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="border-2 border-transparent hover:border-primary/20 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01]">
                <CardContent className="p-8 bg-gradient-to-b from-white to-neutral-light/50">
                  <h3 className="text-2xl font-bold text-secondary mb-6">Language Skills</h3>
                  
                  {PORTFOLIO_DATA.languages.map((language, index) => (
                    <div key={index} className="mb-6 last:mb-0">
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold text-secondary text-base">{language.name}</span>
                        <span className="text-primary font-semibold">{language.level}</span>
                      </div>
                      <div className="h-3 bg-neutral-mid rounded-full overflow-hidden">
                        <motion.div 
                          className="skill-bar h-full bg-gradient-to-r from-secondary to-primary rounded-full relative" 
                          initial={{ width: 0 }}
                          animate={{ width: animate ? `${language.proficiency}%` : "0%" }}
                          transition={{ 
                            duration: 1.2, 
                            delay: index * 0.2,
                            ease: [0.4, 0, 0.2, 1] 
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white opacity-20"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{
                              repeat: Infinity,
                              duration: 1.8,
                              ease: "linear",
                              delay: index * 0.2
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
