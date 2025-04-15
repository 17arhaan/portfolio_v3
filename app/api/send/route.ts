import { NextResponse } from "next/server"
import { Resend } from "resend"

// Set edge runtime
export const runtime = "edge"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields" },
        { status: 400 }
      )
    }

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "arhaangirdhar17@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${message.replace(/\n/g, '<br/>')}</p>
          <p style="font-size: 12px; color: #777; margin-top: 30px;">This email was sent from your portfolio contact form.</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    )
  }
} 