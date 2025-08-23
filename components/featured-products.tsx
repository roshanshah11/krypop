"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"
import { Star, Heart } from "lucide-react"
import { motion } from "framer-motion"

const placeholderImages = [
	"/images/IMG_4157.avif",
	"/images/krypopspecial.avif",
	"/images/option2.avif",
	"/images/option3.avif",
]

const products = [
	{
		id: "spicy-sweet-fusion",
		name: "Spicy Sweet Fusion",
		description:
			"Our signature blend — chili powder + sugar. A fiery crunch with a caramelized kiss.",
		price: 5.99,
		rating: 4.9,
		reviews: 127,
		tags: ["Signature", "Vegan", "Gluten-Free"],
	},
	{
		id: "mango-chili-tango",
		name: "Mango Chili Tango",
		description:
			"Dried mango flakes + Kashmiri chili + sea salt = juicy heat explosion.",
		price: 5.99,
		rating: 4.8,
		reviews: 89,
		tags: ["Fruity", "Spicy"],
	},
	{
		id: "sichuan-pepper-buzz",
		name: "Sichuan Pepper Buzz",
		description: "Tingly. Citrusy. Electric. Inspired by the Sichuan mala kick.",
		price: 5.99,
		rating: 4.7,
		reviews: 156,
		tags: ["Electric", "Citrusy"],
	},
	{
		id: "coconut-curry-crunch",
		name: "Coconut Curry Crunch",
		description:
			"Savory coconut milk powder, yellow curry, and cumin — Thai-Indian crossover heat.",
		price: 5.99,
		rating: 4.6,
		reviews: 73,
		tags: ["Savory", "Curry"],
	},
].map((product, i) => ({
	...product,
	image: placeholderImages[i % placeholderImages.length],
}))

export default function FeaturedProducts() {
	const { dispatch } = useCart()
	const [favorites, setFavorites] = useState<string[]>([])

	const addToCart = (product: (typeof products)[0]) => {
		dispatch({
			type: "ADD_ITEM",
			payload: {
				id: product.id,
				name: product.name,
				price: product.price,
				image: product.image,
			},
		})
	}

	const toggleFavorite = (productId: string) => {
		setFavorites((prev) =>
			prev.includes(productId)
				? prev.filter((id) => id !== productId)
				: [...prev, productId]
		)
	}

	return (
		<section className="py-16">
			<div className="container mx-auto px-4">
				<div className="mb-8 text-right">
					<Link
						href="/about"
						className="text-krypop-yellow underline hover:text-krypop-red"
					>
						Our Story
					</Link>
				</div>

				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-5xl font-bold font-poppins text-krypop-dark mb-4">
						Flavor{" "}
						<span className="text-gradient">Explosion</span>
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Each flavor tells a story. Each bite is an adventure. Welcome to your
						new addiction.
					</p>
				</div>

				{/* Products Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-12">
					{products.map((product, index) => (
						<motion.div
							key={product.id}
							className="group bg-krypop-cream rounded-2xl p-3 md:p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
							style={{ animationDelay: `${index * 0.1}s` }}
							whileHover={{
								scale: 1.04,
								boxShadow: "0 10px 25px rgba(255,87,51,0.15)",
							}}
							whileTap={{ scale: 0.97 }}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay: index * 0.08,
								type: "spring",
								stiffness: 120,
								damping: 18,
							}}
						>
							{/* Product Image */}
							<div className="relative mb-4">
								<picture>
									<source
										srcSet={product.image.replace(".jpeg", ".avif").replace(".jpg", ".avif")}
										type="image/avif"
									/>
									<source
										srcSet={product.image.replace(".jpeg", ".webp").replace(".jpg", ".webp")}
										type="image/webp"
									/>
									<img
										src={product.image.replace(".jpeg", ".webp").replace(".jpg", ".webp")}
										alt={`KRYpop ${product.name} Popcorn in kraft pouch`}
										width={400}
										height={300}
										className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
										loading="lazy"
										sizes="(max-width: 768px) 100vw, 25vw"
									/>
								</picture>
								<Button
									variant="ghost"
									size="sm"
									className="absolute top-2 right-2 bg-white/80 hover:bg-white"
									onClick={() => toggleFavorite(product.id)}
								>
									<Heart
										className={`h-4 w-4 ${
											favorites.includes(product.id)
												? "fill-krypop-red text-krypop-red"
												: "text-gray-600"
										}`}
									/>
								</Button>

								{/* Tags */}
								<div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
									{product.tags.slice(0, 2).map((tag) => (
										<span
											key={tag}
											className="bg-krypop-red text-white text-xs sm:text-sm px-2 py-1 rounded-full"
										>
											{tag}
										</span>
									))}
								</div>
							</div>

							{/* Product Info */}
							<div className="space-y-3">
								<div>
									<h3 className="font-bold text-base sm:text-lg text-krypop-dark group-hover:text-krypop-red transition-colors flex items-center gap-2">
										{product.name}
										<span className="ml-2 px-2 py-0.5 rounded-full bg-krypop-yellow text-xs font-semibold text-krypop-dark border border-krypop-yellow/40">
											3oz
										</span>
									</h3>
									<p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
										{product.description}
									</p>
								</div>

								{/* Rating */}
								<div className="flex items-center space-x-2">
									<div className="flex items-center">
										{[...Array(5)].map((_, i) => (
											<Star
												key={`${product.id}-star-${i}`}
												className={`h-4 w-4 ${
													i < Math.floor(product.rating)
														? "fill-krypop-yellow text-krypop-yellow"
														: "text-gray-300"
												}`}
											/>
										))}
									</div>
									<span className="text-sm text-gray-600">
										{product.rating} ({product.reviews})
									</span>
								</div>

								{/* Price & Actions */}
								<div className="flex items-center justify-between">
									<span className="text-xl sm:text-2xl font-bold text-krypop-red">
										${product.price.toFixed(2)}
									</span>
									<div className="flex space-x-2">
										{/* <Link href={`/flavors/${product.id}`}>
											<Button variant="outline" size="sm" className="min-h-[40px] min-w-[80px] text-xs sm:text-sm">
												View
											</Button>
										</Link> */}
										<motion.div whileTap={{ scale: 0.93 }}>
											<Button size="sm" className="krypop-gradient text-white min-h-[40px] min-w-[80px] text-xs sm:text-sm" onClick={() => addToCart(product)}>
												Add to Cart
											</Button>
										</motion.div>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* CTA */}
				<div className="text-center">
					<Link href="/shop">
						<motion.div whileTap={{ scale: 0.96 }} style={{ display: "inline-block" }}>
							<Button size="lg" className="krypop-gradient text-white spice-shadow min-h-[48px] min-w-[140px] text-base sm:text-lg">
								View All Flavors
							</Button>
						</motion.div>
					</Link>
				</div>
			</div>
		</section>
	)
}
