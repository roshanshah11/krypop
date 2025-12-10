"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Flame } from "lucide-react"
import Image from "next/image"
import { useCart } from "./cart-context"

// Use a fixed image for hydration safety
const heroImage = "/images/IMG_4157.avif";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const { dispatch } = useCart()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: "krypop-flight",
        name: "Krypop Flight",
        price: 24.0,
        image: heroImage, // Using the hero image as the bundle image for now
      },
    })
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-krypop-cream via-white to-krypop-yellow/20 py-16 md:py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-krypop-red/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-krypop-yellow/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-6 ${isVisible ? "slide-up" : "opacity-0"}`}>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-krypop-red">
                <Flame className="h-5 w-5" />
                <span className="font-medium text-base md:text-lg">Bold. Spicy. Authentic.</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-poppins leading-tight">
                <span className="text-gradient">Popcorn</span> <span className="text-krypop-dark">That Bites</span> <span className="text-krypop-red">Back.</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
                An Indian family's bold remix of a global snack staple — blending spice, sweetness, and centuries of
                flavor into each kernel.
              </p>
            </div>

            {/* Consolidated Promo Banner */}
            <div className="bg-krypop-red/5 border-l-4 border-krypop-red p-4 rounded-r-lg max-w-2xl">
              <p className="text-krypop-dark font-medium">
                🎁 <span className="font-bold text-krypop-red">20% OFF</span> your first order + <span className="font-bold text-krypop-red">Free Shipping</span> over $40
              </p>
              <p className="text-sm text-gray-600 mt-1">Use code <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-gray-200">SPICY20</span> at checkout</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/shop">
                <Button
                  size="lg"
                  className="krypop-gradient text-white spice-shadow hover:scale-105 transition-transform min-h-[56px] min-w-[160px] text-lg px-8"
                >
                  Shop All Flavors
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Product Showcase (Bundle Focus) */}
          <div className={`relative ${isVisible ? 'bounce-in' : 'opacity-0'} mt-8 lg:mt-0`}>
            <div className="relative max-w-md mx-auto lg:ml-auto">
              {/* Main Product Image */}
              <div className="bg-white rounded-3xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 border border-gray-100">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-krypop-yellow text-krypop-dark px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                    Best Value
                  </span>
                </div>

                <picture>
                  <source srcSet="/images/IMG_4157.avif" type="image/avif" />
                  <source srcSet="/images/IMG_4157.webp" type="image/webp" />
                  <Image
                    src={heroImage}
                    alt="KRYpop Flight Bundle"
                    width={1077}
                    height={1436}
                    className="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6"
                    priority
                    placeholder="blur"
                    blurDataURL="/images/IMG_4157.webp"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </picture>

                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-2xl text-krypop-dark font-poppins">Spice Starter Pack</h3>
                      <p className="text-gray-500 text-sm">Try all 4 signature flavors</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-krypop-red">$24.00</p>
                      <p className="text-xs text-gray-400 line-through">$28.00</p>
                    </div>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-krypop-dark text-white hover:bg-black h-12 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Add to Cart
                  </Button>

                  <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>In Stock</span>
                    <span className="flex items-center"><span className="w-1.5 h-1.5 bg-krypop-yellow rounded-full mr-1"></span>Ships Tomorrow</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -bottom-6 -left-6 bg-white p-3 rounded-xl shadow-lg border border-gray-100 hidden sm:block animate-bounce-slow">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] overflow-hidden">
                        <span className="bg-krypop-red/20 w-full h-full"></span>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-krypop-dark">500+ sold</p>
                    <p className="text-gray-500">this week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
