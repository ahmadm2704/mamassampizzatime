import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from '@/hooks/use-cart'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Mama Sam Pizza - Authentic Italian Wood-Fired Pizza',
  description: 'Authentic Italian pizza made with fresh ingredients and traditional techniques. Order online for delivery, pickup, or dine-in.',
  generator: 'v0.app',
  icons: {
    icon: '/logoo-transparent.png',
    apple: '/logoo-transparent.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
