import nodemailer from 'nodemailer';

// Create a transporter with TurboSMTP configuration
const transporter = nodemailer.createTransport({
  pool: true, // Use pooled connection
  host: 'pro.turbo-smtp.com',
  port: 2525, // Try another port
  secure: false, // TLS requires secureConnection to be false
  auth: {
    user: 'djmsima@outlook.com',
    pass: 'VkMcgTeU',
  },
  tls: {
    rejectUnauthorized: false // Accept self-signed certificates
  },
  debug: true // Extra logging
});

interface EmailParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(params: EmailParams): Promise<boolean> {
  try {
    const { name, email, subject, message } = params;
    
    // Define email content
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER || 'djmsima@outlook.com'}>`,
      to: 'djmsima@outlook.com', // Where you want to receive messages
      replyTo: email, // So you can reply directly to the sender
      subject: `Portfolio Contact: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
  <h2 style="color: #4338ca;">New Contact Form Submission</h2>
  <p><strong>From:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Subject:</strong> ${subject}</p>
  <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 15px 0;">
  <div style="background-color: #f9fafb; padding: 15px; border-radius: 4px;">
    <h3 style="margin-top: 0; color: #4338ca;">Message:</h3>
    <p>${message.replace(/\n/g, '<br>')}</p>
  </div>
</div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}