"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingBag, Menu, X } from "lucide-react"
import { useCart } from "./cart-context"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { state, dispatch } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" aria-label="KRYpop">
            <div className="text-2xl md:text-3xl font-bold font-poppins" aria-label="KRYpop">
              <span className='text-krypop-red'>KR</span><span className='text-krypop-yellow'>Y</span><span className='text-krypop-red'>POP</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-krypop-dark hover:text-krypop-red transition-colors font-medium">
              Home
            </Link>
            <Link href="/shop" className="text-krypop-dark hover:text-krypop-red transition-colors font-medium">
              Shop
            </Link>
            <Link href="/about" className="text-krypop-dark hover:text-krypop-red transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-krypop-dark hover:text-krypop-red transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => dispatch({ type: "TOGGLE_CART" })} className="relative">
              <ShoppingBag className="h-5 w-5" />
              {state.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-krypop-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden flex flex-col gap-4 mt-4 bg-white rounded-lg shadow-lg p-6 animate-slide-down">
            <Link href="/" className="text-krypop-dark text-lg py-2 rounded hover:bg-krypop-yellow/10 transition-colors font-medium">
              Home
            </Link>
            <Link href="/shop" className="text-krypop-dark text-lg py-2 rounded hover:bg-krypop-yellow/10 transition-colors font-medium">
              Shop
            </Link>
            <Link href="/about" className="text-krypop-dark text-lg py-2 rounded hover:bg-krypop-yellow/10 transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-krypop-dark text-lg py-2 rounded hover:bg-krypop-yellow/10 transition-colors font-medium">
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
