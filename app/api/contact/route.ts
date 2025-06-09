import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Use environment variable for your email, fallback to a default
    const yourEmail = process.env.CONTACT_EMAIL || 'your-email@gmail.com'
    
    // Use Resend's default domain for now (no custom domain needed)
    const fromEmail = 'Acme <onboarding@resend.dev>'

    console.log('Sending email to:', yourEmail)
    console.log('From:', fromEmail)

    // Send email to you (the site owner)
    const emailData = await resend.emails.send({
      from: fromEmail,
      to: [yourEmail],
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Message:</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; margin-top: 20px;">
            <p style="margin: 0; font-size: 14px; color: #64748b;">
              <strong>Reply to:</strong> ${email}
            </p>
          </div>
        </div>
      `,
      replyTo: email, // This allows you to reply directly to the sender
    })

    console.log('Email sent successfully:', emailData)

    // Send confirmation email to the user
    await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: 'Thanks for reaching out!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thanks for your message, ${name}!</h2>
          
          <p style="line-height: 1.6; color: #555;">
            I've received your message about "<strong>${subject}</strong>" and I'll get back to you as soon as possible, 
            usually within 24 hours.
          </p>
          
          <div style="background: #f0f9ff; border: 1px solid #0ea5e9; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; color: #0369a1;">
              💡 <strong>Quick tip:</strong> Check your spam folder if you don't see my reply in your inbox.
            </p>
          </div>
          
          <p style="color: #555;">
            Best regards,<br>
            <strong>Phuong Tan Thanh</strong><br>
            Backend Developer
          </p>
          
          <div style="border-top: 1px solid #e2e8f0; padding-top: 15px; margin-top: 20px;">
            <p style="font-size: 12px; color: #94a3b8; margin: 0;">
              This is an automated confirmation. Please don't reply to this email.
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json(
      { 
        message: 'Email sent successfully',
        id: emailData.data?.id 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 