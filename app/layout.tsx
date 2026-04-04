import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from '@/hooks/use-cart'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://mamassampizzatime.vercel.app'),
  title: {
    default: 'Mama Sam Pizza | Best Pizza in Hamilton, Canada',
    template: '%s | Mama Sam Pizza Hamilton',
  },
  description: 'Order the best authentic premium wood-fired pizza in Hamilton, Canada. Mama Sam Pizza Time offers fresh ingredients, artisan techniques, delivery, and pickup in Hamilton, Ontario.',
  keywords: ['Mama Sam Pizza', 'Mama Sam', 'mamasampizza', 'Pizza', 'Hamilton Pizza', 'Canada Pizza', 'Hamilton Canada Pizza', 'Pizza Delivery Hamilton', 'Best Pizza in Hamilton'],
  authors: [{ name: 'Mama Sam Pizza' }],
  creator: 'Mama Sam Pizza Time',
  publisher: 'Mama Sam Pizza Time',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://mamassampizzatime.vercel.app',
    siteName: 'Mama Sam Pizza Time',
    title: 'Mama Sam Pizza | Best Pizza in Hamilton, Canada',
    description: 'Order the best authentic premium wood-fired pizza in Hamilton, Canada. Fast delivery and fresh ingredients guaranteed.',
    images: [{
      url: '/logoo.png',
      width: 800,
      height: 800,
      alt: 'Mama Sam Pizza Time Logo',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mama Sam Pizza | Best Pizza in Hamilton, Canada',
    description: 'Order the best authentic premium pizza in Hamilton, Canada. Fast delivery and fresh ingredients guaranteed.',
    images: ['/logoo.png'],
  },
  generator: 'v0.app',
  icons: {
    icon: '/logoo.png',
    apple: '/logoo.png',
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'VmO2HfnRGAUuTwnheu6iwPG995gZ8lifq-DY2cM8ttw',
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



