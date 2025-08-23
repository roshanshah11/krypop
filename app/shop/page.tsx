import Header from "@/components/header"
import ShoppingCart from "@/components/shopping-cart"
import ProductGrid from "@/components/product-grid"
import Footer from "@/components/footer"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import React from "react"

export const metadata = {
  title: "Shop Popcorn Flavors | KRYpop",
  description: "Shop all KRYpop popcorn—spicy, sweet, and bold flavors. Find your new favorite snack!",
  alternates: {
    canonical: "https://krypop.com/shop",
  },
}

export default function ShopPage({ filterCategory = "all" }: Readonly<{ filterCategory?: string }>) {
  // Breadcrumb JSON-LD structured data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://krypop.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Shop",
        "item": "https://krypop.com/shop"
      }
    ]
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="min-h-screen bg-krypop-cream">
        <Header />
        <div className="container mx-auto px-4 pt-6 pb-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Shop</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <ProductGrid initialCategory={filterCategory} />
        <Footer />
        <ShoppingCart />
      </main>
    </>
  )
}
