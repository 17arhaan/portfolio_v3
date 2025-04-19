import { NextResponse } from 'next/server'

// Static testimonials data
const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Senior Developer",
    company: "Tech Corp",
    message: "Arhaan is an exceptional developer with great attention to detail.",
    rating: 5,
    image: "/testimonials/john.jpg",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Product Manager",
    company: "Innovate Inc",
    message: "Working with Arhaan was a pleasure. Highly recommended!",
    rating: 5,
    image: "/testimonials/jane.jpg",
    createdAt: new Date().toISOString()
  }
]

export async function GET() {
  try {
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // In a real application, you would save this to a database
    // For now, we'll just return a success message
    return NextResponse.json({ 
      message: 'Testimonial received successfully',
      status: 'success'
    })
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 })
  }
} 