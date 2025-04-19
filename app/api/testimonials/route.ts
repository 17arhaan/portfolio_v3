import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const testimonial = await db.testimonial.create({
      data: {
        name: body.name,
        email: body.email,
        website: body.website,
        message: body.message,
        image: body.image,
        rating: body.rating,
        role: body.role,
        company: body.company,
        showInTestimonials: body.showInTestimonials
      }
    })
    return NextResponse.json(testimonial)
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 })
  }
} 