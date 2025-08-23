"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Welcome to the KRYpop family! 🌶️",
      description: "You'll be the first to know about new flavors and exclusive deals.",
    })

    setEmail("")
    setIsLoading(false)
  }

  return (
    <section className="py-20 bg-gradient-to-r from-krypop-red to-krypop-yellow">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Join the Spice Squad</h2>
          <p className="text-lg mb-8 opacity-90">
            Get early access to new flavors, exclusive deals, and behind-the-scenes content. Plus, 10% off your first
            order!
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-white text-krypop-red hover:bg-gray-100 font-semibold"
            >
              {isLoading ? "Joining..." : "Join Now"}
            </Button>
          </form>

          <p className="text-sm mt-4 opacity-75">No spam, just spice. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  )
}
