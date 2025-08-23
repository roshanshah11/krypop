"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import ShoppingCart from "@/components/shopping-cart";
import ContactForm from "../../components/contact-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import React from "react"

export default function ContactPage() {
  const router = useRouter();

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
        "name": "Contact",
        "item": "https://krypop.com/contact"
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
                <BreadcrumbPage>Contact</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <section className="container mx-auto px-4 py-20 max-w-xl">
          <div className="mb-8 flex items-center gap-4">
            <Button variant="ghost" size="icon" aria-label="Go back" onClick={() => router.back()}>
              <ArrowLeft className="h-6 w-6 text-krypop-dark" />
            </Button>
            <h1 className="text-4xl md:text-6xl font-bold font-poppins text-krypop-dark mb-0">Contact Us</h1>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <ContactForm />
            <div className="mt-6 text-center">
              <Link href="/shop" className="text-krypop-red underline hover:text-krypop-yellow">
                Browse our flavors
              </Link>
            </div>
          </div>
        </section>
        <Footer />
        <ShoppingCart />
      </main>
    </>
  );
}
