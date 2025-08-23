"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "./cart-context"
import { Star, Heart, Minus, Plus, Truck, Shield, Repeat } from "lucide-react"
import { track } from '@vercel/analytics'
import Image from "next/image"

interface Product {
  id: string
  name: string
  description: string
  longDescription: string
  price: number
  images: string[]
  rating: number
  reviews: number
  category: string
  tags: string[]
  heatLevel: number
  ingredients: string[]
  nutrition: {
    calories: number
    fat: number
    carbs: number
    protein: number
    fiber: number
  }
  size: string
  featured: boolean
}

const placeholderImages = [
  "/images/IMG_4157.avif",
  "/images/krypopspecial.avif",
  "/images/option2.avif",
  "/images/option3.avif",
];

export default function ProductDetail({ product }: Readonly<{ product: Product }>) {
  const { dispatch } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isSubscription, setIsSubscription] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const addToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id + (isSubscription ? "-subscription" : ""),
        name: product.name + (isSubscription ? " (Monthly)" : ""),
        price: isSubscription ? product.price * 0.9 : product.price,
        image: product.images[0],
        subscription: isSubscription,
      },
    })

    // Add multiple quantities
    for (let i = 1; i < quantity; i++) {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: product.id + (isSubscription ? "-subscription" : ""),
          name: product.name + (isSubscription ? " (Monthly)" : ""),
          price: isSubscription ? product.price * 0.9 : product.price,
          image: product.images[0],
          subscription: isSubscription,
        },
      })
    }

    // Vercel Analytics: Track add-to-cart event
    track('add_to_cart', {
      productId: product.id,
      name: product.name,
      price: isSubscription ? product.price * 0.9 : product.price,
      quantity,
      subscription: isSubscription,
      source: 'product-detail',
    })
  }

  // Track product detail view on mount
  useEffect(() => {
    track('product_view', { productId: product.id, name: product.name })
  }, [product.id, product.name])

  const getHeatLevelText = (level: number) => {
    switch (level) {
      case 1:
        return "Mild 🌿"
      case 2:
        return "Medium 🌶️"
      case 3:
        return "Hot 🌶️🌶️"
      case 4:
        return "Spicy 🌶️🌶️🌶️"
      case 5:
        return "Extreme 🔥🔥🔥"
      default:
        return "Bundle 🎁"
    }
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl p-8 shadow-lg">
              <Image
                src={(product.images[selectedImage] || placeholderImages[selectedImage % placeholderImages.length]).replace(/\.(jpeg|jpg|png)$/i, '.webp')}
                alt={`KRYpop ${product.name} Popcorn in kraft pouch`}
                width={600}
                height={600}
                className="w-full h-full object-cover rounded-xl"
                loading="eager"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            <div className="flex space-x-4">
              {product.images.map((image, idx) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === idx ? "border-krypop-red" : "border-gray-200"}`}
                >
                  <Image
                    src={(image || placeholderImages[idx % placeholderImages.length]).replace(/\.(jpeg|jpg|png)$/i, '.webp')}
                    alt={`KRYpop ${product.name} Popcorn in kraft pouch - view ${idx + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                {product.featured && <Badge className="bg-krypop-red text-white">Featured</Badge>}
                <Badge variant="outline">{getHeatLevelText(product.heatLevel)}</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold font-poppins text-krypop-dark mb-4">{product.name}</h1>

              <p className="text-lg text-gray-600 mb-4">{product.description}</p>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={`star-rating-${product.id}-${i}`}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-krypop-yellow text-krypop-yellow" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-krypop-red">
                  ${(isSubscription ? product.price * 0.9 : product.price).toFixed(2)}
                </span>
                {isSubscription && (
                  <span className="text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                )}
              </div>
              <p className="text-sm text-gray-600">
                {product.size} • {isSubscription ? "Monthly delivery with 10% savings" : "One-time purchase"}
              </p>
            </div>

            {/* Subscription Toggle */}
            <div className="bg-krypop-yellow/10 border border-krypop-yellow/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-krypop-dark">Subscribe & Save 10%</h3>
                  <p className="text-sm text-gray-600">Get it delivered monthly + early access to new flavors</p>
                </div>
                <Button
                  variant={isSubscription ? "default" : "outline"}
                  onClick={() => setIsSubscription(!isSubscription)}
                  className={isSubscription ? "krypop-gradient text-white" : ""}
                >
                  {isSubscription ? "Subscribed" : "Subscribe"}
                </Button>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button size="lg" className="flex-1 krypop-gradient text-white spice-shadow" onClick={addToCart}>
                  Add to Cart - ${((isSubscription ? product.price * 0.9 : product.price) * quantity).toFixed(2)}
                </Button>
                <Button variant="outline" size="lg" onClick={() => setIsFavorite(!isFavorite)}>
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-krypop-red text-krypop-red" : ""}`} />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-krypop-red" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-gray-600">On orders $40+</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-krypop-red" />
                <p className="text-sm font-medium">Quality Guarantee</p>
                <p className="text-xs text-gray-600">100% satisfaction</p>
              </div>
              <div className="text-center">
                <Repeat className="h-6 w-6 mx-auto mb-2 text-krypop-red" />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-gray-600">30-day policy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients & Nutrition</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-8">
              <div className="bg-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">About This Flavor</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{product.longDescription}</p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-3">Perfect For:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Movie nights with a twist</li>
                      <li>• Adventurous snackers</li>
                      <li>• Gifts for spice lovers</li>
                      <li>• Late-night cravings</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Flavor Profile:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Initial sweetness</li>
                      <li>• Building heat</li>
                      <li>• Smoky undertones</li>
                      <li>• Addictive crunch</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ingredients" className="mt-8">
              <div className="bg-white rounded-lg p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Ingredients</h3>
                    <ul className="space-y-2">
                      {product.ingredients.map((ingredient) => (
                        <li key={ingredient} className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-krypop-red rounded-full"></span>
                          <span>{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
                        ✓ Vegan • ✓ Gluten-Free • ✓ No Artificial Colors • ✓ Non-GMO
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Nutrition Facts</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="font-semibold mb-3">Per Serving (1 oz)</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Calories</span>
                          <span className="font-medium">{product.nutrition.calories}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Fat</span>
                          <span className="font-medium">{product.nutrition.fat}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Carbohydrates</span>
                          <span className="font-medium">{product.nutrition.carbs}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Protein</span>
                          <span className="font-medium">{product.nutrition.protein}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fiber</span>
                          <span className="font-medium">{product.nutrition.fiber}g</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="bg-white rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Customer Reviews</h3>
                  <Button variant="outline">Write a Review</Button>
                </div>

                <div className="space-y-6">
                  {/* Sample Reviews */}
                  <div className="border-b pb-6">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={`review-star-sarah-m-star${i + 1}`} className="h-4 w-4 fill-krypop-yellow text-krypop-yellow" />
                        ))}
                      </div>
                      <span className="font-medium">Sarah M.</span>
                      <span className="text-gray-500 text-sm">Verified Purchase</span>
                    </div>
                    <p className="text-gray-700">
                      "This is absolutely addictive! The perfect balance of sweet and spicy. I've already ordered 3 more
                      bags. My new favorite snack!"
                    </p>
                  </div>

                  <div className="border-b pb-6">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={`review-star-mike-r-star${i + 1}`} className="h-4 w-4 fill-krypop-yellow text-krypop-yellow" />
                        ))}
                      </div>
                      <span className="font-medium">Mike R.</span>
                      <span className="text-gray-500 text-sm">Verified Purchase</span>
                    </div>
                    <p className="text-gray-700">
                      "Finally, a popcorn that actually has flavor! The heat builds nicely and the sweetness keeps you
                      coming back. Highly recommend!"
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center">
                        {[...Array(4)].map((_, i) => (
                          <Star key={`review-star-jessica-l-star${i + 1}`} className="h-4 w-4 fill-krypop-yellow text-krypop-yellow" />
                        ))}
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                      <span className="font-medium">Jessica L.</span>
                      <span className="text-gray-500 text-sm">Verified Purchase</span>
                    </div>
                    <p className="text-gray-700">
                      "Great flavor combination! Maybe a bit too spicy for me, but my husband loves it. Will try the
                      milder flavors next time."
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
