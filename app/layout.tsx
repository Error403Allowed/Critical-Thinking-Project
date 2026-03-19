import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
});

export const metadata: Metadata = {
  title: 'Debunking Misinformation | Critical Thinking',
  description: 'Learn essential strategies for identifying and debunking misinformation in the digital age. An interactive educational resource for critical thinking.',
  generator: 'Next.js',
  icons: {
    icon: '/tab-icon.png',
    apple: '/tab-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased min-h-screen bg-background">
        {children}
      </body>
    </html>
  )
}
