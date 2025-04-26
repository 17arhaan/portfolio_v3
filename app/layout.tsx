import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import LoadingWrapper from "@/components/loading-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Arhaan Girdhar | Portfolio",
  description: "Full-stack developer and AI/ML enthusiast",
  icons: {
    icon: [
      { url: '/faviconn.png', sizes: 'any' },
      { url: '/faviconn.png', type: 'image/png', sizes: '32x32' },
      { url: '/faviconn.png', type: 'image/png', sizes: '180x180' }
    ],
    apple: [
      { url: '/faviconn.png', sizes: '180x180' }
    ]
  },
  manifest: '/manifest.json'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical resources */}
        <link 
          rel="preload" 
          href="/sign.png" 
          as="image"
          type="image/png"
        />
        <link 
          rel="preconnect" 
          href="https://fonts.googleapis.com" 
        />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html, body {
            overflow-x: hidden;
            width: 100%;
            min-height: 100vh;
            position: relative;
            background-color: black;
          }
          #__next {
            min-height: 100vh;
            background-color: black;
          }
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
        <LoadingWrapper>
          {children}
        </LoadingWrapper>
      </body>
    </html>
  )
}
