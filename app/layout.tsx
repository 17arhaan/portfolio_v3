import { Rubik } from 'next/font/google'
import './globals.css'
import LoadingWrapper from '@/components/loading-wrapper'
import { metadata } from './metadata'

const rubik = Rubik({ subsets: ['latin'] })

export { metadata }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
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
      <body className={`${rubik.className} min-h-screen w-full bg-black`}>
        <LoadingWrapper>
          {children}
        </LoadingWrapper>
      </body>
    </html>
  )
}
