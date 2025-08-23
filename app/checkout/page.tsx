'use client'

import Header from "@/components/header"
import CheckoutForm from "@/components/checkout-form"
import Footer from "@/components/footer"
import { useEffect, useState } from "react"
import { useCart } from "@/components/cart-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export default function CheckoutPage() {
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
        "name": "Checkout",
        "item": "https://krypop.com/checkout"
      }
    ]
  }

  const { dispatch } = useCart()
  const [status, setStatus] = useState<"success"|"canceled"|null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.get("success") === "1") {
      setStatus("success")
      dispatch({ type: "CLEAR_CART" })
    } else if (searchParams.get("canceled") === "1") {
      setStatus("canceled")
    }
  }, [dispatch])

  let content
  if (status === "success") {
    content = (
      <section className="py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Thank you for your order! 🎉</h1>
        <p className="text-gray-600 mb-8">Your payment was successful. We&apos;ll send you an email confirmation soon.</p>
        <Link href="/shop"><Button className="krypop-gradient text-white">Continue Shopping</Button></Link>
        <div className="mt-4">
          <Link href="/contact" className="text-krypop-yellow underline hover:text-krypop-red">Need help? Contact us</Link>
        </div>
      </section>
    )
  } else if (status === "canceled") {
    content = (
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Checkout canceled</h2>
        <p className="text-gray-600 mb-8">You can try again or continue shopping.</p>
        <Link href="/shop"><Button className="krypop-gradient text-white">Back to Shop</Button></Link>
        <div className="mt-4">
          <Link href="/contact" className="text-krypop-yellow underline hover:text-krypop-red">Need help? Contact us</Link>
        </div>
      </section>
    )
  } else {
    content = <CheckoutForm />
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
                <BreadcrumbPage>Checkout</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {content}
        <Footer />
      </main>
    </>
  )
}
