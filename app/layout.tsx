import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart-context"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from '@vercel/analytics/react'
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Krypop - Popcorn That Bites Back | Bold Flavors, Cultural Fusion",
  description:
    "Discover Krypop's explosive popcorn flavors. From Spicy Sweet Fusion to Mango Chili Tango - bold, authentic, and family-crafted. Free shipping on orders $40+",
  keywords: "spicy popcorn, gourmet snacks, Indian flavors, bold snacks, artisan popcorn",
  openGraph: {
    title: "Krypop - Popcorn That Bites Back",
    description: "Bold flavors that fuse cultures. Try our signature Spicy Sweet Fusion and more.",
    type: "website",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable}`} suppressHydrationWarning>
      <body className={`${inter.className} font-sans`}>
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W3PT1Z1YT5" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W3PT1Z1YT5');
          `}
        </Script>
        <CartProvider>
          {children}
          <Toaster />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  )
}
