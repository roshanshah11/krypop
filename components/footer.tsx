import Link from "next/link"
import { MessageCircle, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-krypop-dark text-white py-10 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl sm:text-3xl font-bold font-poppins" aria-label="KRYpop">
              <span className='text-krypop-red'>KR</span><span className='text-krypop-yellow'>Y</span><span className='text-krypop-red'>POP</span>
            </div>
            <p className="text-gray-300 text-sm sm:text-base">Popcorn that bites back. Bold flavors, cultural fusion, family-crafted.</p>
            <div className="flex space-x-4 mt-2">
              <a href="https://instagram.com/krypop" className="text-gray-300 hover:text-krypop-yellow transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                {/* Use SVG for Instagram icon to avoid deprecation */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="mailto:hello@krypop.com" className="text-gray-300 hover:text-krypop-yellow transition-colors" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://t.me/krypop" className="text-gray-300 hover:text-krypop-yellow transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-2 sm:mb-4 text-base sm:text-lg">Shop</h3>
            <ul className="space-y-1 sm:space-y-2 text-gray-300 text-sm sm:text-base">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop/popcorn" className="hover:text-white transition-colors">
                  Popcorn
                </Link>
              </li>
              <li>
                <Link href="/shop/bundles" className="hover:text-white transition-colors">
                  Bundles
                </Link>
              </li>
              <li>
                <Link href="/shop/subscription" className="hover:text-white transition-colors">
                  Subscriptions
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-2 sm:mb-4 text-base sm:text-lg">Company</h3>
            <ul className="space-y-1 sm:space-y-2 text-gray-300 text-sm sm:text-base">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-2 sm:mb-4 text-base sm:text-lg">Support</h3>
            <ul className="space-y-1 sm:space-y-2 text-gray-300 text-sm sm:text-base">
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
          <p className="text-gray-300 text-xs sm:text-sm">© 2024 KRYpop. All rights reserved. Made with 🌶️ and love.</p>
          <p className="text-gray-300 text-xs sm:text-sm mt-2 md:mt-0">
            Free shipping on orders $40+ | Use code SPICY20 for 20% off
          </p>
        </div>
      </div>
    </footer>
  )
}
