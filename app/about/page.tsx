import Header from "@/components/header"
import Footer from "@/components/footer"
import ShoppingCart from "@/components/shopping-cart"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import React from "react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "About KRYpop | Bold Popcorn Story",
  description: "Discover KRYpop's journey—family-crafted popcorn, bold flavors, and cultural fusion.",
  alternates: {
    canonical: "https://krypop.com/about",
  },
}

export default function AboutPage() {
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
        "name": "About",
        "item": "https://krypop.com/about"
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
                <BreadcrumbPage>About</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <AboutContent />
        <Footer />
        <ShoppingCart />
      </main>
    </>
  )
}

function AboutContent() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-poppins text-krypop-dark mb-6">
            Our <span className="text-gradient">Story</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A legacy born in one small kitchen, carried forward in every bold, buttery bite. <br />
          </p>
        </div>

        {/* Founders Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-krypop-dark">It All Started with Grandma</h2>
            <p className="text-gray-700 leading-relaxed">
              We’re Roshan, Yashesh and Kishori, siblings by birth and bound by a shared love for the kind of popcorn that doesn’t just crunch, but comforts. 
            </p>
            <p className="text-gray-700 leading-relaxed">
              Ours was a childhood marked by many things, but at the center of nearly all of them was a bowl of popcorn. Not just any popcorn, but the kind only our grandma, Daxa, could make.
            </p>
            <p className="text-gray-700 leading-relaxed">
              She never followed a recipe. She didn’t need one. A flick of chili, a whisper of jaggery, a splash of ghee that always hit the pan just right. 
              Her popcorn was sweet, yes, but it carried the heat of something deeper. It was the taste of memory: of childhood, of comfort, of home.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Over time, we realized what we had wasn't ordinary. It was a tradition disguised as a treat. And Krypop was born not from a business plan, 
              but from a desire to share that feeling with others. Not just the flavor, but the warmth behind it. Still made in small batches. Still inspired by her hands.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Still making popcorn. But now, for you too.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <img
              src="/images/makingpopcorn.jpeg"
              alt="Roshan and Yashesh making Krypop popcorn in the kitchen scene"
              className="w-full h-80 object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-2xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-center text-krypop-dark mb-12">What We Believe In</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-krypop-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍿</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Heritage in Every Bite</h3>
              <p className="text-gray-600 text-sm">
                Our flavors are rooted in memory, tradition, and the joy of family recipes passed down with love.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-krypop-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌶️</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Bold, Honest Flavor</h3>
              <p className="text-gray-600 text-sm">
                We don’t tone it down. Every kernel packs the punch of real spice and unfiltered joy.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-krypop-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💸</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Deliciously Accessible</h3>
              <p className="text-gray-600 text-sm">
                Great popcorn shouldn’t break the bank. We keep it affordable without compromise.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-krypop-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧡</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Crafted With Care</h3>
              <p className="text-gray-600 text-sm">
                Every batch is made in small quantities, just like our grandma would have wanted.
              </p>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="text-center bg-gradient-to-r from-krypop-red to-krypop-yellow rounded-2xl p-12 text-white mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl leading-relaxed max-w-3xl mx-auto mb-8">
            We want to make the world crave culture. With every bag of KRYpop, we’re inviting you into a kitchen that smells like home and tastes like love. 
            And one day soon, we’ll raise money to give back in our Ba's name, because the story doesn’t end with us. It begins with her.
          </p>
          <Button
            size="lg"
            className="krypop-gradient text-white spice-shadow hover:scale-105 transition-transform min-h-[48px] min-w-[200px] text-lg font-bold shadow-lg"
            asChild
          >
            <a href="/shop">Shop Our Flavors</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
