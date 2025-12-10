"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useCart } from "./cart-context"
import { Star, Heart, Filter } from "lucide-react"
import { track } from '@vercel/analytics'
import { motion } from "framer-motion"

const placeholderImages = [
	"/images/IMG_4157.avif",
	"/images/krypopspecial.avif",
	"/images/option2.avif",
	"/images/option3.avif",
] // Prefer AVIF for best optimization

const allProducts = [
	{
		id: "spicy-sweet-fusion",
		name: "Spicy Sweet Fusion",
		description:
			"Our signature blend — chili powder + sugar. A fiery crunch with a caramelized kiss.",
		price: 5.99,
		rating: 4.9,
		reviews: 127,
		category: "popcorn",
		tags: ["Signature", "Vegan", "Gluten-Free"],
		heatLevel: 3,
		featured: true,
	},
	{
		id: "mango-chili-tango",
		name: "Mango Chili Tango",
		description:
			"Dried mango flakes + Kashmiri chili + sea salt = juicy heat explosion.",
		price: 5.99,
		rating: 4.8,
		reviews: 89,
		category: "popcorn",
		tags: ["Fruity", "Spicy"],
		heatLevel: 4,
		featured: false,
	},
	{
		id: "sichuan-pepper-buzz",
		name: "Sichuan Pepper Buzz",
		description: "Tingly. Citrusy. Electric. Inspired by the Sichuan mala kick.",
		price: 5.99,
		rating: 4.7,
		reviews: 156,
		category: "popcorn",
		tags: ["Electric", "Citrusy"],
		heatLevel: 4,
		featured: false,
	},
	{
		id: "coconut-curry-crunch",
		name: "Coconut Curry Crunch",
		description:
			"Savory coconut milk powder, yellow curry, and cumin — Thai-Indian crossover heat.",
		price: 5.99,
		rating: 4.6,
		reviews: 73,
		category: "popcorn",
		tags: ["Savory", "Curry"],
		heatLevel: 3,
		featured: false,
	},
	{
		id: "matcha-rose-whisper",
		name: "Matcha Rose Whisper",
		description:
			"Delicate and floral, with ceremonial matcha and rose petals. A calm amidst the spice storm.",
		price: 6.49,
		rating: 4.5,
		reviews: 45,
		category: "popcorn",
		tags: ["Floral", "Mild"],
		heatLevel: 1,
		featured: false,
	},
	{
		id: "krypop-flight",
		name: "Krypop Flight",
		description: "One of each flavor — for the indecisive or the enthusiast.",
		price: 24.0,
		rating: 4.9,
		reviews: 234,
		category: "bundle",
		tags: ["Bundle", "Best Value"],
		heatLevel: 0,
		featured: true,
	},
].map((product, i) => ({
	...product,
	image: placeholderImages[i % placeholderImages.length],
}))

interface ProductGridProps {
	initialCategory?: string;
}

export default function ProductGrid({ initialCategory = "all" }: Readonly<ProductGridProps> = {}) {
	const { dispatch } = useCart()
	const [favorites, setFavorites] = useState<string[]>([])
	const [sortBy, setSortBy] = useState("featured")
	const [filterCategory, setFilterCategory] = useState(initialCategory)
	const [filterHeat, setFilterHeat] = useState("all")

	const filteredAndSortedProducts = useMemo(() => {
		let filtered = allProducts

		// Apply category filter
		if (filterCategory !== "all") {
			filtered = filtered.filter((product) => product.category === filterCategory)
		}

		// Apply heat level filter
		if (filterHeat !== "all") {
			const heatLevel = Number.parseInt(filterHeat)
			filtered = filtered.filter((product) => product.heatLevel === heatLevel)
		}

		// Apply sorting
		switch (sortBy) {
			case "price-low":
				filtered.sort((a, b) => a.price - b.price)
				break
			case "price-high":
				filtered.sort((a, b) => b.price - a.price)
				break
			case "rating":
				filtered.sort((a, b) => b.rating - a.rating)
				break
			case "name":
				filtered.sort((a, b) => a.name.localeCompare(b.name))
				break
			default: // featured
				filtered.sort(
					(a, b) =>
						(b.featured ? 1 : 0) - (a.featured ? 1 : 0)
				)
		}

		return filtered
	}, [sortBy, filterCategory, filterHeat])

	const addToCart = (product: (typeof allProducts)[0]) => {
		dispatch({
			type: "ADD_ITEM",
			payload: {
				id: product.id,
				name: product.name,
				price: product.price,
				image: product.image,
			},
		})
		// Vercel Analytics: Track add-to-cart event
		track('add_to_cart', {
			productId: product.id,
			name: product.name,
			price: product.price,
			source: 'product-grid',
			// Set DEBUG=1 in env for dev-time logging
		})
	}

	const toggleFavorite = (productId: string) => {
		setFavorites((prev) =>
			prev.includes(productId)
				? prev.filter((id) => id !== productId)
				: [...prev, productId]
		)
	}

	const getHeatLevelEmoji = (level: number) => {
		switch (level) {
			case 1:
				return "🌿"
			case 2:
				return "🌶️"
			case 3:
				return "🌶️🌶️"
			case 4:
				return "🌶️🌶️🌶️"
			case 5:
				return "🔥🔥🔥"
			default:
				return "🎁"
		}
	}

	// Track product view on mount (for demo, could be on click/view)
	useEffect(() => {
		track('product_grid_view', { timestamp: Date.now() })
	}, [])

	return (
		<section className="py-12">
			<div className="container mx-auto px-4">
				{/* Header */}
				<div className="text-center mb-12">
					<h2 className="text-4xl md:text-5xl font-bold font-poppins text-krypop-dark mb-4">
						All <span className="text-gradient">Flavors</span>
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						From mild to wild, sweet to heat. Find your perfect flavor
						adventure.
					</p>
				</div>

				{/* Filters & Sort */}
				<div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
					<div className="flex flex-col md:flex-row gap-4 items-center justify-between">
						<div className="flex items-center space-x-2">
							<Filter className="h-5 w-5 text-gray-500" />
							<span className="font-medium">Filters:</span>
						</div>

						<div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
							<Select
								value={filterCategory}
								onValueChange={setFilterCategory}
							>
								<SelectTrigger className="w-full sm:w-40">
									<SelectValue placeholder="Category" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Products</SelectItem>
									<SelectItem value="popcorn">Popcorn</SelectItem>
									<SelectItem value="bundle">Bundles</SelectItem>
								</SelectContent>
							</Select>

							<Select value={filterHeat} onValueChange={setFilterHeat}>
								<SelectTrigger className="w-full sm:w-40">
									<SelectValue placeholder="Heat Level" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Heat Levels</SelectItem>
									<SelectItem value="1">🌿 Mild</SelectItem>
									<SelectItem value="2">🌶️ Medium</SelectItem>
									<SelectItem value="3">🌶️🌶️ Hot</SelectItem>
									<SelectItem value="4">🌶️🌶️🌶️ Spicy</SelectItem>
									<SelectItem value="5">🔥🔥🔥 Extreme</SelectItem>
								</SelectContent>
							</Select>

							<Select value={sortBy} onValueChange={setSortBy}>
								<SelectTrigger className="w-full sm:w-40">
									<SelectValue placeholder="Sort by" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="featured">Featured</SelectItem>
									<SelectItem value="name">Name A-Z</SelectItem>
									<SelectItem value="price-low">
										Price: Low to High
									</SelectItem>
									<SelectItem value="price-high">
										Price: High to Low
									</SelectItem>
									<SelectItem value="rating">Highest Rated</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>

				{/* Products Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-8">
					{filteredAndSortedProducts.map((product) => (
						<motion.div
							key={product.id}
							className="group bg-krypop-cream rounded-2xl p-3 md:p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
						>
							{/* Product Image */}
							<div className="relative mb-4">
								<motion.img
									src={product.image?.replace(/\.(jpeg|jpg|png)$/i, '.webp')}
									alt={`KRYpop ${product.name} Popcorn in kraft pouch`}
									width={400}
									height={300}
									className="w-full h-32 md:h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
									loading="lazy"
									sizes="(max-width: 768px) 100vw, 25vw"
								/>

								<Button
									variant="ghost"
									size="sm"
									className="absolute top-2 right-2 bg-white/80 hover:bg-white"
									onClick={() => toggleFavorite(product.id)}
								>
									<Heart
										className={`h-4 w-4 ${favorites.includes(product.id)
											? "fill-krypop-red text-krypop-red"
											: "text-gray-600"
											}`}
									/>
								</Button>

								{/* Heat Level */}
								{product.category === "popcorn" && (
									<div className="absolute top-2 left-2 bg-white/90 rounded-full px-2 py-1 text-sm">
										{getHeatLevelEmoji(product.heatLevel)}
									</div>
								)}

								{/* Featured Badge */}
								{product.featured && (
									<Badge className="absolute bottom-2 left-2 bg-krypop-red text-white">
										Featured
									</Badge>
								)}
							</div>

							{/* Product Info */}
							<div className="space-y-3">
								<div>
									<div className="flex justify-between items-start">
										<h3 className="font-bold text-lg text-krypop-dark group-hover:text-krypop-red transition-colors">
											{product.name}
										</h3>
										<span className="px-2 py-0.5 rounded-full bg-krypop-yellow text-xs font-semibold text-krypop-dark border border-krypop-yellow/40 whitespace-nowrap ml-2">
											{product.id === "krypop-flight" ? "15oz" : "3oz"}
										</span>
									</div>

									{/* Badges next to name/description area */}
									<div className="flex flex-wrap gap-1 mt-1 mb-2">
										{product.tags.slice(0, 2).map((tag) => (
											<Badge key={tag} variant="secondary" className="text-[10px] px-1.5 h-5 bg-gray-100 text-gray-600 hover:bg-gray-200">
												{tag}
											</Badge>
										))}
										{product.featured && (
											<Badge className="text-[10px] px-1.5 h-5 bg-krypop-red/10 text-krypop-red hover:bg-krypop-red/20 border-0">
												Bestseller
											</Badge>
										)}
									</div>

									<p className="text-sm text-gray-600 line-clamp-2">
										{product.description}
									</p>
								</div>

								{/* Rating */}
								<div className="flex items-center space-x-2">
									<div className="flex items-center">
										{[...Array(5)].map((_, i) => (
											<Star
												key={`star-rating-${product.id}-${i}`}
												className={`h-3.5 w-3.5 ${i < Math.floor(product.rating)
													? "fill-krypop-yellow text-krypop-yellow"
													: "text-gray-300"
													}`}
											/>
										))}
									</div>
									<span className="text-xs text-gray-500">
										({product.reviews})
									</span>
								</div>

								{/* Price & Actions */}
								<div className="flex items-center justify-between pt-2 gap-3">
									<span className="text-xl font-bold text-krypop-red">
										${product.price.toFixed(2)}
									</span>
									<Button
										size="sm"
										className="krypop-gradient text-white flex-1 shadow-md hover:shadow-lg transition-all"
										onClick={() => addToCart(product)}
									>
										Add to Cart
									</Button>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* No Results */}
				{filteredAndSortedProducts.length === 0 && (
					<div className="text-center py-12">
						<p className="text-gray-500 text-lg mb-4">
							No products match your filters
						</p>
						<Button
							onClick={() => {
								setFilterCategory("all")
								setFilterHeat("all")
								setSortBy("featured")
							}}
							variant="outline"
						>
							Clear Filters
						</Button>
					</div>
				)}
			</div>
		</section>
	)
}
