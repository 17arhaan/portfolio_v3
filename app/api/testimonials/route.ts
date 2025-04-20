import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  image: string
}

interface TestimonialsData {
  testimonials: Testimonial[]
}

export async function POST(request: Request) {
  try {
    const testimonial: Testimonial = await request.json()
    
    // Read the current testimonials
    const filePath = path.join(process.cwd(), 'data', 'testimonials.json')
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const data: TestimonialsData = JSON.parse(fileContent)
    
    // Add the new testimonial
    data.testimonials.push(testimonial)
    
    // Write back to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    
    return NextResponse.json({ success: true, testimonial })
  } catch (error) {
    console.error('Error saving testimonial:', error)
    return NextResponse.json({ error: 'Failed to save testimonial' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'testimonials.json')
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const data: TestimonialsData = JSON.parse(fileContent)
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading testimonials:', error)
    return NextResponse.json({ error: 'Failed to read testimonials' }, { status: 500 })
  }
} 