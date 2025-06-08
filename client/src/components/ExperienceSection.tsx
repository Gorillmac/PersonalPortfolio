import { PORTFOLIO_DATA } from "@/lib/constants";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, Briefcase, CheckSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section id="experience" ref={ref} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-extrabold text-secondary mb-4 text-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Work Experience
          </motion.h2>
          <motion.div 
            className="w-16 h-1 bg-primary mx-auto mb-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.p 
            className="text-lg text-neutral-dark max-w-3xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            My professional experience has equipped me with valuable skills transferable to technology roles.
          </motion.p>
        </div>
        
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary/20">
            <CardContent className="p-8 bg-gradient-to-br from-white to-neutral-light/40">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-bold text-secondary mb-2 text-shadow-sm">{PORTFOLIO_DATA.experience.title}</h3>
                  <h4 className="text-xl font-semibold text-primary mb-4">{PORTFOLIO_DATA.experience.company}</h4>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <motion.div 
                      className="flex items-center gap-2 text-neutral-dark"
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    >
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="font-medium">{PORTFOLIO_DATA.experience.period}</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-2 text-neutral-dark"
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    >
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="font-medium">{PORTFOLIO_DATA.experience.location}</span>
                    </motion.div>
                  </div>
                </div>
                
                <div className="md:w-1/4 flex justify-center md:justify-end">
                  <motion.div 
                    className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.1, 
                      boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                      transition: { duration: 0.3 } 
                    }}
                  >
                    <Briefcase className="w-10 h-10 text-primary" />
                  </motion.div>
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="text-lg font-bold text-secondary mb-3">Overview</h4>
                <p className="text-neutral-dark font-medium leading-relaxed">
                  {PORTFOLIO_DATA.experience.description}
                </p>
              </div>
              
              <div className="mb-8">
                <h4 className="text-lg font-bold text-secondary mb-3">Key Responsibilities</h4>
                <ul className="space-y-3">
                  {PORTFOLIO_DATA.experience.responsibilities.map((responsibility, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-3 text-neutral-dark font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                      <CheckSquare className="h-5 w-5 text-primary shrink-0 mt-1" />
                      <span>{responsibility}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-secondary mb-3">Skills Acquired</h4>
                <div className="flex flex-wrap gap-2">
                  {PORTFOLIO_DATA.experience.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -3,
                        transition: { duration: 0.2 } 
                      }}
                    >
                      <Badge 
                        variant="outline" 
                        className="bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 text-primary border-none py-2 px-3 transition-all duration-300"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}