import { NextResponse } from "next/server"
import { Resend } from "resend"

// Set edge runtime
export const runtime = "edge"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, subject, phone, company, inquiryType, availability, website, message } = await req.json()

    // Validate required fields
    if (!name || !email || !subject || !inquiryType || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, inquiry type, and message are required fields" },
        { status: 400 }
      )
    }

    // Format inquiry type for display
    const formattedInquiryType = inquiryType
      .split("-")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "17arhaan.connect@gmail.com",
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">New Message from Portfolio Contact Form</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; width: 140px;"><strong>From:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Phone:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${phone}</td>
            </tr>
            ` : ''}
            ${company ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Company:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${company}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Inquiry Type:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${formattedInquiryType}</td>
            </tr>
            ${website ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Website:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><a href="${website}" style="color: #0066cc; text-decoration: none;" target="_blank">${website}</a></td>
            </tr>
            ` : ''}
            ${availability ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Availability:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${availability}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Subject:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${subject}</td>
            </tr>
          </table>
          
          <h3 style="color: #555; margin-top: 20px;">Message:</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px; line-height: 1.5;">
            ${message.replace(/\n/g, '<br/>')}
          </div>
          
          <p style="font-size: 12px; color: #777; margin-top: 30px; text-align: center; border-top: 1px solid #e0e0e0; padding-top: 15px;">
            This email was sent from your portfolio contact form at ${new Date().toLocaleString()}.
          </p>
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