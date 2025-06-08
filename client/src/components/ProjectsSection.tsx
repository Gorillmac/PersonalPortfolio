import { Button } from "@/components/ui/button";
import { PORTFOLIO_DATA } from "@/lib/constants";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  return (
    <section id="projects" ref={ref} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-extrabold text-secondary mb-4 text-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            My Projects
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
            Here are some of the projects I've worked on. Each project presented unique challenges that helped me develop versatile skills applicable across the technology landscape.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.15 * index,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ 
                y: -15, 
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <Card className="overflow-hidden h-full bg-gradient-to-b from-white to-neutral-light/60 hover:shadow-xl transition-all border-2 border-transparent hover:border-primary/20 rounded-lg" style={{ minHeight: "700px" }}>
                <div className="project-card relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={`${project.title} project`} 
                    className="w-full h-56 object-cover transform transition-transform group-hover:scale-105" 
                  />
                  <motion.div 
                    className="project-overlay absolute inset-0 bg-gradient-to-tr from-primary to-primary/80 flex flex-col items-center justify-center opacity-0 transition-all duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.div 
                      className="text-white text-center p-4 space-y-4"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1, transition: { delay: 0.1, duration: 0.3 } }}
                    >
                      <motion.a 
                        href={project.demoLink} 
                        className="inline-block px-4 py-2 rounded-full bg-white text-primary font-medium hover:bg-neutral-light transition-all duration-300 transform hover:scale-105 mx-2 shadow-lg"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="inline-block mr-2 h-4 w-4" />
                        Live Demo
                      </motion.a>
                      <motion.a 
                        href={project.codeLink} 
                        className="inline-block px-4 py-2 rounded-full bg-white text-primary font-medium hover:bg-neutral-light transition-all duration-300 transform hover:scale-105 mx-2 shadow-lg"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="inline-block mr-2 h-4 w-4" />
                        Code
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-secondary mb-3 text-shadow-sm">{project.title}</h3>
                  <p className="text-neutral-dark mb-4 font-medium">{project.description}</p>
                  
                  <div className="mt-4 mb-3">
                    <h4 className="text-md font-bold text-secondary mb-2">My Role</h4>
                    <p className="text-neutral-dark mb-3 font-medium text-sm">{project.detailedRole}</p>
                  </div>
                  
                  <div className="mt-4 mb-3">
                    <h4 className="text-md font-bold text-secondary mb-2">Key Features</h4>
                    <ul className="list-disc pl-5 mb-4 text-neutral-dark text-sm">
                      {project.keyFeatures.map((feature, index) => (
                        <li key={index} className="mb-1">{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="bg-primary/10 text-primary border-none">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button size="lg" className="gap-2 font-semibold shadow-md hover:shadow-lg transition-all" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
