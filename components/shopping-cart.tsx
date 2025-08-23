"use client"

import { X, Plus, Minus } from "lucide-react"
import { useCart } from "./cart-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const placeholderImages = [
	"/images/IMG_4157.avif",
	"/images/krypopspecial.avif",
	"/images/option2.avif",
	"/images/option3.avif",
];

export default function ShoppingCart() {
	const { state, dispatch } = useCart()

	// Calculate summary
	const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
	const shipping = subtotal >= 40 ? 0 : 5.99
	const tax = subtotal * 0.08
	const total = subtotal + shipping + tax

	return (
		<Dialog open={state.isOpen} onOpenChange={open => { if (!open) dispatch({ type: "TOGGLE_CART" }) }}>
			<AnimatePresence>
				{state.isOpen && (
					<DialogContent className="max-w-md p-0 overflow-hidden bg-white">
						<motion.div
							initial={{ x: 400, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: 400, opacity: 0 }}
							transition={{ type: "spring", stiffness: 300, damping: 30 }}
							className="flex h-full flex-col"
						>
							{/* Header */}
							<div className="flex items-center justify-between p-4 border-b">
								<DialogTitle>Your Cart</DialogTitle>
								<DialogDescription>
									Review your items and proceed to checkout.
								</DialogDescription>
								<DialogClose asChild>
									<Button variant="ghost" size="sm">
										<X className="h-5 w-5" />
									</Button>
								</DialogClose>
							</div>
							{/* Cart Items */}
							<div className="flex-1 overflow-y-auto p-4">
								{state.items.length === 0 ? (
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 20 }}
										className="text-center py-8"
									>
										<p className="text-gray-500 mb-4">Your cart is empty</p>
										<Link href="/shop">
											<Button className="krypop-gradient text-white">Start Shopping</Button>
										</Link>
									</motion.div>
								) : (
									<div className="space-y-4">
										<AnimatePresence initial={false}>
											{state.items.map((item) => (
												<motion.div
													key={item.id}
													layout
													initial={{ opacity: 0, scale: 0.95, y: 20 }}
													animate={{ opacity: 1, scale: 1, y: 0 }}
													exit={{ opacity: 0, scale: 0.95, y: 20 }}
													transition={{ type: "spring", stiffness: 250, damping: 20 }}
													className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 p-3 border rounded-lg bg-white"
												>
													<Image
														src={(item.image || placeholderImages[item.id.length % placeholderImages.length]).replace(/\.(jpeg|jpg|png)$/i, '.webp')}
														alt={`Krypop ${item.name} Popcorn in kraft pouch`}
														width={64}
														height={64}
														className="w-16 h-16 object-cover rounded"
														loading="lazy"
													/>
													<div className="flex-1">
														<h3 className="font-medium text-xs sm:text-sm">{item.name}</h3>
														<p className="text-krypop-red font-semibold text-xs sm:text-sm">${item.price.toFixed(2)}</p>
														{item.subscription && <p className="text-xs text-green-600">Monthly Subscription</p>}
													</div>
													<div className="flex items-center space-x-2">
														<Button variant="outline" size="sm" className="min-h-[36px] min-w-[36px]"
															onClick={() =>
																dispatch({
																	type: "UPDATE_QUANTITY",
																	payload: { id: item.id, quantity: item.quantity - 1 },
																})
															}
															disabled={item.quantity <= 1}
														>
															<Minus className="h-3 w-3" />
														</Button>
														<motion.span layout className="w-8 text-center text-xs sm:text-sm">
															{item.quantity}
														</motion.span>
														<Button variant="outline" size="sm" className="min-h-[36px] min-w-[36px]"
															onClick={() =>
																dispatch({
																	type: "UPDATE_QUANTITY",
																	payload: { id: item.id, quantity: item.quantity + 1 },
																})
															}
														>
															<Plus className="h-3 w-3" />
														</Button>
														<Button variant="ghost" size="sm" className="min-h-[36px] min-w-[36px]"
															onClick={() =>
																dispatch({
																	type: "REMOVE_ITEM",
																	payload: item.id,
																})
															}
															aria-label="Remove item"
														>
															<X className="h-4 w-4 text-red-500" />
														</Button>
													</div>
												</motion.div>
											))}
										</AnimatePresence>
									</div>
								)}
							</div>
							{/* Footer */}
							{state.items.length > 0 && (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 20 }}
									transition={{ type: "spring", stiffness: 250, damping: 20, delay: 0.1 }}
									className="p-4 border-t space-y-4 bg-white"
								>
									<div className="flex justify-between text-sm">
										<span>Subtotal</span>
										<span>${subtotal.toFixed(2)}</span>
									</div>
									<div className="flex justify-between text-sm">
										<span>Shipping</span>
										<span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
									</div>
									<div className="flex justify-between text-sm">
										<span>Tax</span>
										<span>${tax.toFixed(2)}</span>
									</div>
									<div className="flex justify-between font-bold text-lg">
										<span>Total</span>
										<span>${total.toFixed(2)}</span>
									</div>
									<Link href="/checkout">
										<DialogClose asChild>
											<Button className="krypop-gradient text-white w-full min-h-[48px] text-base sm:text-lg">
												Checkout
											</Button>
										</DialogClose>
									</Link>
								</motion.div>
							)}
						</motion.div>
					</DialogContent>
				)}
			</AnimatePresence>
		</Dialog>
	)
}
