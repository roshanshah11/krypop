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

const itemVariants = {
	hidden: { opacity: 0, scale: 0.8, y: 20 },
	visible: { opacity: 1, scale: 1, y: 0 },
	exit: { opacity: 0, scale: 0.8, x: -50 }
}

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
					<DialogContent className="max-w-md p-0 overflow-hidden bg-white border-2 border-krypop-red/10 [&>button]:hidden">
						<motion.div
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{ type: "spring", stiffness: 300, damping: 30 }}
							className="flex h-full flex-col"
						>
							{/* Header */}
							<div className="flex items-center justify-between p-4 border-b bg-krypop-red/5">
								<DialogTitle className="flex items-center gap-2 text-xl">
									<span className="text-2xl">🍿</span> Your Stash
								</DialogTitle>
								<DialogDescription className="sr-only">
									Review your items and proceed to checkout.
								</DialogDescription>
								<DialogClose asChild>
									<Button variant="ghost" size="sm" className="hover:bg-krypop-red/10 hover:text-krypop-red">
										<X className="h-5 w-5" />
									</Button>
								</DialogClose>
							</div>
							{/* Cart Items */}
							<div className="flex-1 overflow-y-auto p-4 bg-gray-50/50">
								{state.items.length === 0 ? (
									<motion.div
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.8 }}
										className="text-center py-12 flex flex-col items-center"
									>
										<div className="text-6xl mb-4">🌽</div>
										<h3 className="text-lg font-bold text-gray-900 mb-2">Your bowl is empty!</h3>
										<p className="text-gray-500 mb-6">Time to pop some flavor into your life.</p>
										<Link href="/shop">
											<Button className="krypop-gradient text-white shadow-lg shadow-krypop-red/20 hover:scale-105 transition-transform">
												Start Popping
											</Button>
										</Link>
									</motion.div>
								) : (
									<div className="space-y-4">
										<AnimatePresence mode="popLayout">
											{state.items.map((item) => (
												<motion.div
													key={item.id}
													layout
													variants={itemVariants}
													initial="hidden"
													animate="visible"
													exit="exit"
													className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 p-3 border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
												>
													<div className="relative group">
														<Image
															src={(item.image || placeholderImages[item.id.length % placeholderImages.length]).replace(/\.(jpeg|jpg|png)$/i, '.webp')}
															alt={`Krypop ${item.name} Popcorn in kraft pouch`}
															width={64}
															height={64}
															className="w-16 h-16 object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
															loading="lazy"
														/>
														<div className="absolute -top-2 -right-2 bg-krypop-yellow text-xs font-bold px-1.5 py-0.5 rounded-full shadow-sm">
															Pop!
														</div>
													</div>
													<div className="flex-1 text-center sm:text-left">
														<h3 className="font-bold text-gray-900">{item.name}</h3>
														<p className="text-krypop-red font-bold text-sm">${item.price.toFixed(2)}</p>
														{item.subscription && <p className="text-xs text-green-600 font-medium flex items-center justify-center sm:justify-start gap-1">🔄 Monthly Supply</p>}
													</div>
													<div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
														<Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white hover:text-krypop-red rounded-md"
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
														<motion.span
															key={item.quantity}
															initial={{ scale: 1.5, color: "#E11D48" }}
															animate={{ scale: 1, color: "#000000" }}
															className="w-6 text-center font-bold text-sm"
														>
															{item.quantity}
														</motion.span>
														<Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white hover:text-green-600 rounded-md"
															onClick={() =>
																dispatch({
																	type: "UPDATE_QUANTITY",
																	payload: { id: item.id, quantity: item.quantity + 1 },
																})
															}
														>
															<Plus className="h-3 w-3" />
														</Button>
													</div>
													<Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
														onClick={() =>
															dispatch({
																type: "REMOVE_ITEM",
																payload: item.id,
															})
														}
														aria-label="Remove item"
													>
														<X className="h-4 w-4" />
													</Button>
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
									className="p-6 border-t bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
								>
									<div className="space-y-2 mb-6">
										<div className="flex justify-between text-sm text-gray-600">
											<span>Subtotal</span>
											<span className="font-medium">${subtotal.toFixed(2)}</span>
										</div>
										<div className="flex justify-between text-sm text-gray-600">
											<span>Shipping</span>
											<span className="font-medium">{shipping === 0 ? "Free 🚚" : `$${shipping.toFixed(2)}`}</span>
										</div>
										<div className="flex justify-between text-sm text-gray-600">
											<span>Tax</span>
											<span className="font-medium">${tax.toFixed(2)}</span>
										</div>
										<div className="flex justify-between font-bold text-xl pt-2 border-t border-dashed">
											<span>Total</span>
											<span className="text-krypop-red">${total.toFixed(2)}</span>
										</div>
									</div>
									<Link href="/checkout">
										<DialogClose asChild>
											<Button className="krypop-gradient text-white w-full h-12 text-lg font-bold shadow-lg shadow-krypop-red/25 hover:scale-[1.02] active:scale-[0.98] transition-all">
												Checkout Now 🍿
											</Button>
										</DialogClose>
									</Link>

									{/* Trust Badges */}
									<div className="grid grid-cols-3 gap-2 text-center text-[10px] text-gray-500 pt-4 mt-2">
										<div className="flex flex-col items-center gap-1">
											<div className="bg-green-50 p-1.5 rounded-full text-green-600">
												<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
											</div>
											<span className="font-medium">Secure</span>
										</div>
										<div className="flex flex-col items-center gap-1">
											<div className="bg-red-50 p-1.5 rounded-full text-krypop-red">
												<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2" ry="2" /><polyline points="16 8 20 8 23 11 23 16 16 16 16 14" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
											</div>
											<span className="font-medium">Fast Ship</span>
										</div>
										<div className="flex flex-col items-center gap-1">
											<div className="bg-yellow-50 p-1.5 rounded-full text-krypop-yellow">
												<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
											</div>
											<span className="font-medium">Fresh</span>
										</div>
									</div>
								</motion.div>
							)}
						</motion.div>
					</DialogContent>
				)}
			</AnimatePresence>
		</Dialog>
	)
}
