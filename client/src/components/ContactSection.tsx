import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PORTFOLIO_DATA } from "@/lib/constants";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Send, Github, Instagram, MessageCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AnimatedSuccessMessage } from "./AnimatedSuccessMessage";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { toast } = useToast();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("subject", data.subject);
      formData.append("message", data.message);
      
      // Send the form data to FormSubmit service
      await fetch("https://formsubmit.co/djmsima@outlook.com", {
        method: "POST",
        headers: {
          "Accept": "application/json",
        },
        body: formData,
      });
      
      // Show success animation
      setShowSuccessMessage(true);
      form.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <section id="contact" ref={ref} className="py-16 md:py-24 bg-neutral-light bg-pattern">
      <AnimatedSuccessMessage 
        visible={showSuccessMessage} 
        onComplete={() => setShowSuccessMessage(false)} 
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-extrabold text-secondary mb-4 text-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
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
            Interested in connecting about opportunities in any tech field? Whether it's for a project, internship, or just to discuss technology, I'm open to all conversations and will respond promptly.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Contact Information */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              type: "spring",
              stiffness: 50,
              damping: 8
            }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <Card className="border-2 border-transparent hover:border-primary/20 transition-all duration-300 shadow-md hover:shadow-lg">
              <CardContent className="p-8 bg-gradient-to-b from-white to-neutral-light/50">
                <h3 className="text-2xl font-bold text-secondary mb-6 text-shadow-sm">Contact Information</h3>
                
                <motion.div 
                  className="flex items-start mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className="bg-gradient-to-br from-primary/20 to-primary/10 p-3 rounded-full mr-4 shadow-sm"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      transition: { duration: 0.2 } 
                    }}
                    animate={{ 
                      y: [0, -3, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Mail className="text-primary h-5 w-5" />
                    </motion.div>
                  </motion.div>
                  <div>
                    <h4 className="font-medium text-secondary font-semibold">Email</h4>
                    <a 
                      href={`mailto:${PORTFOLIO_DATA.email}`} 
                      className="text-neutral-dark font-medium hover:text-primary transition-all duration-300 hover:font-semibold"
                    >
                      {PORTFOLIO_DATA.email}
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className="bg-gradient-to-br from-primary/20 to-primary/10 p-3 rounded-full mr-4 shadow-sm"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      transition: { duration: 0.2 } 
                    }}
                    animate={{ 
                      y: [0, -3, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                    >
                      <Phone className="text-primary h-5 w-5" />
                    </motion.div>
                  </motion.div>
                  <div>
                    <h4 className="font-medium text-secondary font-semibold">Phone</h4>
                    <a 
                      href={`tel:${PORTFOLIO_DATA.phone}`} 
                      className="text-neutral-dark font-medium hover:text-primary transition-all duration-300 hover:font-semibold block"
                    >
                      {PORTFOLIO_DATA.phone}
                    </a>
                    <a 
                      href={PORTFOLIO_DATA.social.whatsapp} 
                      className="text-primary font-medium hover:text-primary transition-all duration-300 hover:font-semibold flex items-center gap-1 text-sm mt-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-3 w-3" /> Also available on WhatsApp
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className="bg-gradient-to-br from-primary/20 to-primary/10 p-3 rounded-full mr-4 shadow-sm"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      transition: { duration: 0.2 } 
                    }}
                    animate={{ 
                      y: [0, -3, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    >
                      <MapPin className="text-primary h-5 w-5" />
                    </motion.div>
                  </motion.div>
                  <div>
                    <h4 className="font-medium text-secondary font-semibold">Location</h4>
                    <p className="text-neutral-dark font-medium">{PORTFOLIO_DATA.location}</p>
                  </div>
                </motion.div>
                
                <div className="mt-8">
                  <motion.h4 
                    className="font-semibold text-secondary mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    Follow Me
                  </motion.h4>
                  <div className="flex space-x-4">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20, 
                        delay: 0.7
                      }}
                      whileHover={{ 
                        scale: 1.15,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <a 
                        href={PORTFOLIO_DATA.social.github}
                        className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300 p-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1"
                        aria-label="GitHub"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <motion.div
                          animate={{ 
                            rotate: [0, 5, 0, -5, 0]
                          }}
                          transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                        >
                          <Github className="h-5 w-5" />
                        </motion.div>
                      </a>
                    </motion.div>
                    
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20, 
                        delay: 0.8
                      }}
                      whileHover={{ 
                        scale: 1.15,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <a 
                        href={PORTFOLIO_DATA.social.instagram}
                        className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300 p-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1"
                        aria-label="Instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <motion.div
                          animate={{ 
                            rotate: [0, -5, 0, 5, 0]
                          }}
                          transition={{ duration: 4, repeat: Infinity, repeatDelay: 1.5 }}
                        >
                          <Instagram className="h-5 w-5" />
                        </motion.div>
                      </a>
                    </motion.div>
                    
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20, 
                        delay: 0.9
                      }}
                      whileHover={{ 
                        scale: 1.15,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <a 
                        href={PORTFOLIO_DATA.social.whatsapp}
                        className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300 p-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1"
                        aria-label="WhatsApp"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <motion.div
                          animate={{ 
                            rotate: [0, 5, 0, -5, 0]
                          }}
                          transition={{ duration: 4, repeat: Infinity, repeatDelay: 1.8 }}
                        >
                          <MessageCircle className="h-5 w-5" />
                        </motion.div>
                      </a>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="md:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.4,
              type: "spring",
              stiffness: 50,
              damping: 8
            }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <Card className="border-2 border-transparent hover:border-primary/20 transition-all duration-300 shadow-md hover:shadow-lg">
              <CardContent className="p-8 bg-gradient-to-b from-white to-neutral-light/50">
                <h3 className="text-2xl font-bold text-secondary mb-6 text-shadow-sm">Send Me a Message</h3>
                
                <Form {...form}>
                  <form 
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="space-y-6"
                    action="https://formsubmit.co/djmsima@outlook.com"
                    method="POST"
                  >
                    {/* FormSubmit configuration fields */}
                    <input type="hidden" name="_subject" value="New Portfolio Contact Message" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="box" />
                    <input type="hidden" name="_next" value={window.location.href} />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Subject" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your Message" 
                              className="resize-none"
                              rows={5}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-500 shadow-md hover:shadow-lg font-semibold relative overflow-hidden group"
                        disabled={form.formState.isSubmitting}
                      >
                        <motion.span
                          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "linear",
                            repeatDelay: 3
                          }}
                        />
                        Send Message
                        <motion.div
                          animate={{ 
                            x: [0, 5, 0],
                            transition: { duration: 1.5, repeat: Infinity, repeatDelay: 2 }
                          }}
                        >
                          <Send className="h-4 w-4" />
                        </motion.div>
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
