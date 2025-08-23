import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import React from "react"
import ShopPage from "../page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Popcorn Bundles | Krypop Shop",
  description: "Save with Krypop popcorn bundles—mix and match your favorite bold flavors!",
  alternates: {
    canonical: "https://krypop.com/shop/bundles",
  },
}

export default function BundlesShopPage() {
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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Bundles",
        "item": "https://krypop.com/shop/bundles"
      }
    ]
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container mx-auto px-4 pt-6 pb-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Bundles</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ShopPage filterCategory="bundle" />
    </>
  )
}
