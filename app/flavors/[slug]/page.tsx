import { notFound } from "next/navigation"
import Header from "@/components/header"
import ShoppingCart from "@/components/shopping-cart"
import ProductDetail from "@/components/product-detail"
import Footer from "@/components/footer"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import React from "react"

const products = [
  {
    id: "spicy-sweet-fusion",
    name: "Spicy Sweet Fusion",
    description:
      "Our signature blend — chili powder + sugar. A fiery crunch with a caramelized kiss. Welcome to your new addiction.",
    longDescription:
      "Born in our family kitchen, this signature blend represents everything Krypop stands for. We start with premium kernels, then coat them in our secret blend of chili powder and caramelized sugar. The result? A perfect balance of heat and sweet that will have you reaching for more.",
    price: 5.99,
    images: [
      "/images/spicy-sweet-fusion-1.avif",
      "/images/spicy-sweet-fusion-2.avif",
      "/images/spicy-sweet-fusion-3.avif",
    ],
    rating: 4.9,
    reviews: 127,
    category: "popcorn",
    tags: ["Signature", "Vegan", "Gluten-Free"],
    heatLevel: 3,
    ingredients: ["Popcorn", "Chili Powder", "Cane Sugar", "Sea Salt", "Sunflower Oil"],
    nutrition: {
      calories: 140,
      fat: 8,
      carbs: 16,
      protein: 3,
      fiber: 3,
    },
    size: "3.5 oz bag",
    featured: true,
  },
  // Add other products here...
]

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.id === params.slug)

  if (!product) {
    return {
      title: "Product Not Found | KRYpop",
      description: "This popcorn product could not be found.",
      alternates: {
        canonical: `https://krypop.com/flavors/${params.slug}`,
      },
    }
  }

  // Ensure title and description are within limits
  const baseTitle = `${product.name} | KRYpop Popcorn`
  const title = baseTitle.length > 60 ? baseTitle.slice(0, 57) + "..." : baseTitle
  const desc =
    product.description.length > 155
      ? product.description.slice(0, 152) + "..."
      : product.description

  return {
    title,
    description: desc,
    alternates: {
      canonical: `https://krypop.com/flavors/${params.slug}`,
    },
  }
}

export default function FlavorPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.id === params.slug)

  if (!product) {
    notFound()
  }

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
        "name": "Flavors",
        "item": "https://krypop.com/flavors"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `https://krypop.com/flavors/${product.id}`
      }
    ]
  }

  // Product JSON-LD structured data
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "KRYpop"
    },
    image: product.images && product.images.length > 0 ? `https://krypop.com${product.images[0]}` : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/InStock"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replace(/</g, '\u003c') }}
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
                <BreadcrumbLink href="/flavors">Flavors</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <ProductDetail product={product} />
        <Footer />
        <ShoppingCart />
      </main>
    </>
  )
}
