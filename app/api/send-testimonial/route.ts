import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const testimonial = await request.json();
    
    // Generate a unique ID for the testimonial
    const testimonialId = Date.now().toString();
    
    // Format the email content
    const emailContent = `
      New Testimonial Submission:
      
      ID: ${testimonialId}
      Name: ${testimonial.name}
      Role: ${testimonial.role}
      Company: ${testimonial.company}
      Rating: ${testimonial.rating}/5
      Content: ${testimonial.content}
      
      To add this testimonial to the website, add the following JSON to testimonials.json:
      
      {
        "id": "${testimonialId}",
        "name": "${testimonial.name}",
        "role": "${testimonial.role}",
        "company": "${testimonial.company}",
        "content": "${testimonial.content}",
        "rating": ${testimonial.rating},
        "image": "/user.png"
      }
    `;

    // Send the email
    const { data, error } = await resend.emails.send({
      from: 'Portfolio <portfolio@resend.dev>',
      to: process.env.ADMIN_EMAIL || '',
      subject: 'New Testimonial Submission',
      text: emailContent,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Testimonial submitted successfully. It will be reviewed and added to the website soon.' 
    });
  } catch (error) {
    console.error('Error sending testimonial:', error);
    return NextResponse.json({ error: 'Failed to send testimonial' }, { status: 500 });
  }
} 