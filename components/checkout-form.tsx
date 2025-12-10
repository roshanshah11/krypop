"use client"

import type React from "react"

import { track } from "@vercel/analytics"
import { useState } from "react"
import { useCart } from "./cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export default function CheckoutForm() {
  const { state } = useCart()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  // Add state for form fields
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  })
  const [formError, setFormError] = useState("")

  const subtotal = state.total
  const shipping = subtotal >= 40 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax - discount

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "SPICY20") {
      setDiscount(subtotal * 0.2)
      toast({
        title: "Promo code applied! 🌶️",
        description: "You saved 20% on your order! That's hot!",
      })
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check your code and try again.",
        variant: "destructive",
      })
    }
  }

  const validateForm = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.address || !form.city || !form.state || !form.zip) {
      setFormError("Please fill out all required fields to get your popcorn popping!")
      return false
    }
    setFormError("")
    return true
  }

  const handleStripeCheckout = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!validateForm()) return
    setIsProcessing(true)
    try {
      console.log("Checkout payload:", {
        products: state.items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
        metadata: {
          ...form,
          promoCode,
        },
        shipping: Number(shipping.toFixed(2)),
        tax: Number(tax.toFixed(2)),
        discount: Number(discount.toFixed(2)),
      })
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: state.items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
          metadata: {
            ...form,
            promoCode,
          },
          shipping: Number(shipping.toFixed(2)),
          tax: Number(tax.toFixed(2)),
          discount: Number(discount.toFixed(2)),
        }),
      })
      const data = await response.json()
      if (data.url) {
        // Vercel Analytics: Track checkout started event
        track("checkout_started", {
          value: total,
          items: JSON.stringify(
            state.items.map((item) => ({
              productId: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            }))
          ),
        })
        window.location.href = data.url
      } else {
        toast({ title: "Checkout error", description: data.error ?? JSON.stringify(data) ?? "Unable to start checkout.", variant: "destructive" })
        setIsProcessing(false)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      toast({ title: "Checkout error", description: message, variant: "destructive" })
      setIsProcessing(false)
    }
  }

  return (
    <>
      {state.items.length === 0 ? (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="py-20"
        >
          <div className="container mx-auto px-4 text-center">
            <div className="text-6xl mb-4">🍿</div>
            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some spicy goodness to get started!</p>
            <Button className="krypop-gradient text-white shadow-lg shadow-krypop-red/20 hover:scale-105 transition-transform">Continue Shopping</Button>
          </div>
        </motion.section>
      ) : (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="py-12"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-poppins text-center mb-12 flex items-center justify-center gap-3">
              <span>🍿</span> Checkout <span>🌽</span>
            </h2>
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Checkout Form */}
              <motion.div layout className="space-y-8">
                <form className="space-y-6" onSubmit={handleStripeCheckout}>
                  {/* Contact Information */}
                  <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <span>👤</span> Contact Information
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" required value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} className="focus:ring-krypop-red focus:border-krypop-red" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" required value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} className="focus:ring-krypop-red focus:border-krypop-red" />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="focus:ring-krypop-red focus:border-krypop-red" />
                      </div>
                    </div>
                  </motion.div>
                  {/* Shipping Address */}
                  <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <span>🚚</span> Shipping Address
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" required value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className="focus:ring-krypop-red focus:border-krypop-red" />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" required value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} className="focus:ring-krypop-red focus:border-krypop-red" />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input id="state" required value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} className="focus:ring-krypop-red focus:border-krypop-red" />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" required value={form.zip} onChange={e => setForm(f => ({ ...f, zip: e.target.value }))} className="focus:ring-krypop-red focus:border-krypop-red" />
                      </div>
                    </div>
                  </motion.div>
                  {/* Promo Code */}
                  <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                    <Input
                      placeholder="Promo code (try SPICY20)"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      className="flex-1 focus:ring-krypop-red focus:border-krypop-red"
                    />
                    <Button type="button" variant="outline" onClick={applyPromoCode} className="hover:text-krypop-red hover:border-krypop-red">
                      Apply
                    </Button>
                  </motion.div>
                  {formError && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 text-sm font-medium bg-red-50 p-3 rounded-lg">⚠️ {formError}</motion.div>}
                  <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Button
                      type="submit"
                      className="krypop-gradient text-white w-full h-12 text-lg font-bold shadow-lg shadow-krypop-red/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            🍿
                          </motion.span>
                          Processing...
                        </span>
                      ) : (
                        "Pay with Card 💳"
                      )}
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
              {/* Order Summary */}
              <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4 h-fit sticky top-24">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span>🧾</span> Order Summary
                </h2>
                <ul className="divide-y divide-gray-100 mb-4">
                  {state.items.map(item => (
                    <motion.li layout key={item.id} className="py-3 flex justify-between items-center">
                      <span className="text-gray-700">{item.name} <span className="text-gray-400 text-sm">x{item.quantity}</span></span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="space-y-2 pt-4 border-t border-dashed">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free 🚚" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600 font-medium">
                      <span>Discount (SPICY20)</span>
                      <span>- ${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-xl pt-4 border-t">
                    <span>Total</span>
                    <span className="text-krypop-red">${total.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}
    </>
  )
}
