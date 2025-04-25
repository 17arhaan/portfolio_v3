import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://arhaanportfolio.in'),
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
    shortcut: '/favcionn.png',
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
    url: 'https://arhaanportfolio.in',
    siteName: 'Arhaan Girdhar Portfolio',
    images: [
      {
        url: 'https://arhaanportfolio.in/favcionn.png',
        width: 192,
        height: 192,
        alt: 'Arhaan Girdhar Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Arhaan Girdhar | Portfolio',
    description: 'Personal portfolio website showcasing projects in web development, artificial intelligence, and computer vision.',
    images: ['https://arhaanportfolio.in/favcionn.png'],
    creator: '@ArhaanGirdhar',
    site: '@ArhaanGirdhar',
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