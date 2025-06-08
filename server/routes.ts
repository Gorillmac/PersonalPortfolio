import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { sendContactEmail } from "./email";

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Handle contact form submissions
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      
      // Send email using TurboSMTP
      const emailResult = await sendContactEmail(validatedData);
      
      if (emailResult) {
        res.status(200).json({ 
          success: true, 
          message: 'Your message has been sent successfully!' 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: 'Failed to send email. Please try again later.' 
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: 'Validation error', 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: 'Server error processing your request' 
      });
    }
  });

  // Serve resume file if needed
  app.get('/resume.pdf', (req, res) => {
    res.status(200).json({ message: 'Resume would be served here in production' });
  });

  const httpServer = createServer(app);

  return httpServer;
}
