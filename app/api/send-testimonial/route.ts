import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Check if environment variables are set
if (!process.env.RESEND_API_KEY) {
  console.error('RESEND_API_KEY is not set in environment variables');
}

if (!process.env.ADMIN_EMAIL) {
  console.error('ADMIN_EMAIL is not set in environment variables');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Check if required environment variables are set
    if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) {
      return NextResponse.json({ 
        error: 'Email service is not properly configured. Please contact the site administrator.' 
      }, { status: 500 });
    }

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
      Website: ${testimonial.website || 'Not provided'}
      
      Social Media Links:
      - LeetCode: ${testimonial.socialMedia?.leetcode || 'Not provided'}
      - GitHub: ${testimonial.socialMedia?.github || 'Not provided'}
      - Instagram: ${testimonial.socialMedia?.instagram || 'Not provided'}
      
      Profile Image: ${testimonial.image ? 'Attached below' : 'Not provided'}
      
      To add this testimonial to the website, add the following JSON to testimonials.json:
      
      {
        "id": "${testimonialId}",
        "name": "${testimonial.name}",
        "role": "${testimonial.role}",
        "company": "${testimonial.company}",
        "content": "${testimonial.content}",
        "rating": ${testimonial.rating},
        "image": "${testimonial.image || '/user.png'}",
        "website": "${testimonial.website || ''}",
        "socialMedia": {
          "leetcode": "${testimonial.socialMedia?.leetcode || ''}",
          "github": "${testimonial.socialMedia?.github || ''}",
          "instagram": "${testimonial.socialMedia?.instagram || ''}"
        },
        "date": "${new Date().toISOString().split('T')[0]}"
      }
    `;

    // Create HTML content with embedded image
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Testimonial Submission</h2>
        
        <div style="margin-bottom: 20px;">
          <p><strong>ID:</strong> ${testimonialId}</p>
          <p><strong>Name:</strong> ${testimonial.name}</p>
          <p><strong>Role:</strong> ${testimonial.role}</p>
          <p><strong>Company:</strong> ${testimonial.company}</p>
          <p><strong>Rating:</strong> ${testimonial.rating}/5</p>
          <p><strong>Content:</strong> ${testimonial.content}</p>
          <p><strong>Website:</strong> ${testimonial.website || 'Not provided'}</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="color: #333;">Social Media Links:</h3>
          <ul style="list-style: none; padding: 0;">
            <li>LeetCode: ${testimonial.socialMedia?.leetcode || 'Not provided'}</li>
            <li>GitHub: ${testimonial.socialMedia?.github || 'Not provided'}</li>
            <li>Instagram: ${testimonial.socialMedia?.instagram || 'Not provided'}</li>
          </ul>
        </div>

        ${testimonial.image ? `
          <div style="margin-bottom: 20px;">
            <h3 style="color: #333;">Profile Image:</h3>
            <img src="${testimonial.image}" alt="Profile Image" style="max-width: 200px; border-radius: 50%;" />
          </div>
        ` : ''}

        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <h3 style="color: #333;">JSON for testimonials.json:</h3>
          <pre style="background-color: #fff; padding: 10px; border-radius: 3px; overflow-x: auto;">
{
  "id": "${testimonialId}",
  "name": "${testimonial.name}",
  "role": "${testimonial.role}",
  "company": "${testimonial.company}",
  "content": "${testimonial.content}",
  "rating": ${testimonial.rating},
  "image": "${testimonial.image || '/user.png'}",
  "website": "${testimonial.website || ''}",
  "socialMedia": {
    "leetcode": "${testimonial.socialMedia?.leetcode || ''}",
    "github": "${testimonial.socialMedia?.github || ''}",
    "instagram": "${testimonial.socialMedia?.instagram || ''}"
  },
  "date": "${new Date().toISOString().split('T')[0]}"
}
          </pre>
        </div>
      </div>
    `;

    // Send the email
    const { data, error } = await resend.emails.send({
      from: 'Portfolio <portfolio@resend.dev>',
      to: process.env.ADMIN_EMAIL,
      subject: 'New Testimonial Submission',
      text: emailContent,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ 
        error: 'Failed to send email. Please try again later.' 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Testimonial submitted successfully. It will be reviewed and added to the website soon.' 
    });
  } catch (error) {
    console.error('Error sending testimonial:', error);
    return NextResponse.json({ 
      error: 'An unexpected error occurred. Please try again later.' 
    }, { status: 500 });
  }
} 