import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ScrollAnimation } from '@/components/scroll-animation'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Arhaan Girdhar | Portfolio',
  description: 'Personal portfolio website showcasing projects in web development, artificial intelligence, and computer vision.',
  keywords: [
    'Arhaan Girdhar',
    'Portfolio',
    'Web Development',
    'AI',
    'Machine Learning',
    'Computer Vision',
    'Full Stack Developer',
    'React',
    'Next.js',
    'Python',
    'Deep Learning',
    'Projects',
    'Software Engineer'
  ],
  authors: [{ name: 'Arhaan Girdhar' }],
  creator: 'Arhaan Girdhar',
  publisher: 'Arhaan Girdhar',
  icons: {
    icon: [
      {
        url: '/favcionn.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favcionn.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/favcionn.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    title: 'Arhaan Girdhar | Portfolio',
    description: 'Personal portfolio website showcasing projects in web development, artificial intelligence, and computer vision.',
    url: 'https://arhaangirdhar.com',
    siteName: 'Arhaan Girdhar Portfolio',
    images: [
      {
        url: '/meta.png',
        width: 1200,
        height: 630,
        alt: 'Arhaan Girdhar Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arhaan Girdhar | Portfolio',
    description: 'Personal portfolio website showcasing projects in web development, artificial intelligence, and computer vision.',
    images: ['/meta.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Arhaan Girdhar Portfolio" />
        <meta name="apple-mobile-web-app-title" content="Arhaan Girdhar Portfolio" />
        <link rel="canonical" href="https://arhaangirdhar.com" />
        <style>{`
          link[rel="icon"] {
            border-radius: 50%;
            overflow: hidden;
          }
          link[rel="apple-touch-icon"] {
            border-radius: 50%;
            overflow: hidden;
          }
        `}</style>
      </head>
      <body className={inter.className}>
        <ScrollAnimation>
          {children}
        </ScrollAnimation>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
