import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'

import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: {
    default: 'Osuolale Opeyemi - Cinematic Video Editor | Professional Film & Commercial Editing',
    template: '%s | Adesada Opeyemi - Video Editor'
  },
  description: 'Award-winning video editor with 8+ years of experience crafting cinematic stories for Netflix, Sony Pictures, and Warner Bros. Specializing in commercials, documentaries, and narrative films.',
  keywords: ['video editor', 'film editor', 'commercial editor', 'documentary editor', 'post production', 'cinematic editing', 'professional video editing'],
  authors: [{ name: 'Adesada Opeyemi' }],
  creator: 'Adesada Opeyemi',
  publisher: 'Adesada Opeyemi',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    siteName: 'Adesada Opeyemi - Video Editor',
    title: 'Adesada Opeyemi - Cinematic Video Editor | Professional Film & Commercial Editing',
    description: 'Award-winning video editor with 8+ years of experience crafting cinematic stories for Netflix, Sony Pictures, and Warner Bros.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Adesada Opeyemi - Professional Video Editor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adesada Opeyemi - Cinematic Video Editor',
    description: 'Award-winning video editor crafting cinematic stories for major studios and brands.',
    images: ['/og-image.jpg'],
    creator: '@alexrivera',
  },
  alternates: {
    canonical: 'https://your-domain.com',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="shortcut icon" href="logo.png" type="image/x-icon" />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Adesada Opeyemi",
              "jobTitle": "Video Editor",
              "description": "Professional video editor specializing in cinematic storytelling",
              "url": "https://your-domain.com",
              "sameAs": [
                "https://vimeo.com/brasemiu",
                "https://instagram.com/brasemiu",
                "https://linkedin.com/in/brasemiu"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance Video Editor"
              },
              "knowsAbout": [
                "Video Editing",
                "Film Post-Production",
                "Adobe Premiere Pro",
                "DaVinci Resolve",
                "After Effects"
              ]
            })
          }}
        />
      </head>
      <body className={`${spaceGrotesk.className} antialiased`}>
        {children}
        
        {/* Analytics - Replace with your tracking codes */}
        {/* // eslint-disable-next-line @next/next/next-script-for-ga
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Google Analytics
              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
              
              ga('create', 'UA-XXXXXXXX-X', 'auto');
              ga('send', 'pageview');
            `,
          }}
        /> */}
      </body>
    </html>
  )
}