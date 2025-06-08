import { PORTFOLIO_DATA } from "@/lib/constants";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Navigation } from "lucide-react";

export default function LocationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  return (
    <section id="location" ref={ref} className="py-16 md:py-24 bg-neutral-light/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-extrabold text-secondary mb-4 text-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            My Location
          </motion.h2>
          <motion.div 
            className="w-16 h-1 bg-primary mx-auto mb-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.p 
            className="text-lg text-neutral-dark max-w-2xl mx-auto mb-12 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Based in <span className="font-bold text-primary">{PORTFOLIO_DATA.location}</span>, ready to connect and collaborate on exciting projects.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
          >
            <div className="rounded-lg overflow-hidden border-2 border-primary/20 shadow-xl">
              <iframe 
                src={PORTFOLIO_DATA.addressMapUrl}
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="My Location"
                className="w-full"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-transparent hover:border-primary/20 transition-all duration-300">
              <motion.div 
                className="flex items-center mb-6"
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <div className="bg-primary/10 p-4 rounded-full mr-4">
                  <MapPin className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-1 text-shadow-sm">Address</h3>
                  <p className="text-neutral-dark font-medium">{PORTFOLIO_DATA.address}</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mb-8"
              >
                <p className="text-neutral-dark">
                  Located in the vibrant city of Pretoria, I'm situated in an area with easy access to major business centers and tech hubs.
                </p>
              </motion.div>
              
              <motion.a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(PORTFOLIO_DATA.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-medium"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
              >
                <Navigation className="mr-2 h-5 w-5" />
                Get Directions
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}