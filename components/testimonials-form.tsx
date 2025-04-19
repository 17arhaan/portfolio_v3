const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)
  setError('')

  try {
    const response = await fetch('/api/testimonials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
        image,
        rating,
        role,
        company,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to submit testimonial')
    }

    // Reset form
    setName('')
    setEmail('')
    setMessage('')
    setImage('')
    setRating(5)
    setRole('')
    setCompany('')
    setSuccess(true)
  } catch (err) {
    setError('Failed to submit testimonial. Please try again.')
  } finally {
    setIsSubmitting(false)
  }
} 