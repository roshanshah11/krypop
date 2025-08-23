"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Flame } from "lucide-react"
import Image from "next/image"

// Use a fixed image for hydration safety
const heroImage = "/images/IMG_4157.avif";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-krypop-cream via-white to-krypop-yellow/20 py-20 md:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-krypop-red/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-krypop-yellow/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${isVisible ? "slide-up" : "opacity-0"}`}>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-krypop-red">
                <Flame className="h-5 w-5" />
                <span className="font-medium text-base md:text-lg">Bold. Spicy. Authentic.</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold font-poppins leading-tight">
                <span className="text-gradient">Popcorn</span>
                <br />
                <span className="text-krypop-dark">That Bites</span>
                <br />
                <span className="text-krypop-red">Back.</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-lg">
                An Indian family's bold remix of a global snack staple — blending spice, sweetness, and centuries of
                flavor into each kernel.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <Button
                  size="lg"
                  className="krypop-gradient text-white spice-shadow hover:scale-105 transition-transform min-h-[48px] min-w-[140px] text-base sm:text-lg"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-krypop-red text-krypop-red hover:bg-krypop-red hover:text-white bg-transparent min-h-[48px] min-w-[140px] text-base sm:text-lg"
                >
                  Our Story
                </Button>
              </Link>
            </div>

            {/* Promo Banner */}
            <div className="bg-krypop-red/10 border border-krypop-red/20 rounded-lg p-4">
              <p className="text-krypop-red font-semibold">
                🌶️ Launch Special: 20% off your first order with code <span className="font-bold">SPICY20</span>
              </p>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className={`relative ${isVisible ? 'bounce-in' : 'opacity-0'} mt-8 lg:mt-0`}>
            <div className="relative">
              {/* Main Product Image */}
              <div className="bg-white rounded-2xl p-8 spice-shadow transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <picture>
                  <source srcSet="/images/IMG_4157.avif" type="image/avif" />
                  <source srcSet="/images/IMG_4157.webp" type="image/webp" />
                  <Image
                    src={heroImage}
                    alt="KRYpop Spicy Sweet Fusion Popcorn in kraft pouch"
                    width={1077}
                    height={1436}
                    className="w-full h-48 sm:h-80 object-cover rounded-lg"
                    priority
                    placeholder="blur"
                    blurDataURL="/images/IMG_4157.webp"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </picture>
                <div className="mt-4 text-center">
                  <h3 className="font-bold text-xl text-krypop-dark">Spicy Sweet Fusion</h3>
                  <p className="text-krypop-red font-semibold">$5.99</p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 bg-krypop-yellow text-krypop-dark px-3 py-1 rounded-full text-sm font-bold animate-bounce-slow">
                NEW!
              </div>

              <div className="absolute -bottom-4 -right-4 bg-krypop-red text-white px-3 py-1 rounded-full text-sm font-bold">
                🔥 Bestseller
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
