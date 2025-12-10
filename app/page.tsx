import Header from "@/components/header"
import ShoppingCart from "@/components/shopping-cart"
import Hero from "@/components/hero"
import FeaturedProducts from "@/components/featured-products"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "KRYpop Popcorn | Spicy, Sweet & Bold Flavors",
  description: "Explore KRYpop's gourmet popcorn—spicy, sweet, and bold flavors inspired by Indian cuisine. Free shipping $40+.",
  alternates: {
    canonical: "https://krypop.com/",
  },
}

import HowItWorks from "@/components/how-it-works"
import ReviewsStrip from "@/components/reviews-strip"

export default function Home() {
  // Breadcrumb JSON-LD structured data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": []
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="min-h-screen bg-krypop-cream">
        <Header />
        {/* No breadcrumb UI on home page */}
        <Hero />
        <HowItWorks />
        <ReviewsStrip />
        <FeaturedProducts />
        <Newsletter />
        <Footer />
        <ShoppingCart />
      </main>
    </>
  )
}
