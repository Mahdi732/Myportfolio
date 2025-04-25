"use server"

import { Resend } from "resend"

interface EmailData {
  to: string
  from: string
  name: string
  subject: string
  message: string
}

export async function sendEmail(data: EmailData) {
  try {
    // In preview/development, log the email data instead of sending
    if (process.env.NODE_ENV !== "production") {
      console.log("Email would be sent in production:")
      console.log({
        to: data.to,
        from: data.from,
        name: data.name,
        subject: data.subject,
        message: data.message,
      })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return { success: true, message: "Email would be sent in production" }
    }

    // Initialize Resend with API key
    const resend = new Resend(process.env.EMAIL_API_KEY)

    // Send email using Resend
    const result = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>", // Use Resend's verified domain
      to: [data.to], // Recipient email
      subject: `Portfolio Contact: ${data.subject}`,
      reply_to: data.from, // Set reply-to as the sender's email
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #9333ea; margin-bottom: 20px;">New message from your portfolio</h2>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>From:</strong> ${data.name} (${data.from})</p>
            <p style="margin: 5px 0;"><strong>Subject:</strong> ${data.subject}</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="white-space: pre-line; margin: 0;">${data.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
            <p>This email was sent from the contact form on your portfolio website.</p>
          </div>
        </div>
      `,
      text: `
        New message from your portfolio
        
        From: ${data.name} (${data.from})
        Subject: ${data.subject}
        
        Message:
        ${data.message}
        
        This email was sent from the contact form on your portfolio website.
      `,
    })

    console.log("Email sent successfully:", result)
    return { success: true, message: "Email sent successfully" }
  } catch (error) {
    console.error("Error sending email:", error)

    // Return success in preview/development even if there's an error
    if (process.env.NODE_ENV !== "production") {
      return { success: true, message: "Email would be sent in production" }
    }

    return { success: false, message: "Failed to send email" }
  }
}
