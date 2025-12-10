"use client"

import { Leaf, ChefHat, Flame } from "lucide-react"

export default function HowItWorks() {
    const features = [
        {
            icon: <Flame className="h-6 w-6 text-krypop-red" />,
            title: "Real Spices",
            description: "Authentic Indian masalas, no fake dust.",
        },
        {
            icon: <ChefHat className="h-6 w-6 text-krypop-yellow" />,
            title: "Small Batch",
            description: "Hand-popped for maximum crunch.",
        },
        {
            icon: <Leaf className="h-6 w-6 text-green-600" />,
            title: "Vegan Options",
            description: "100% plant-based, 100% delicious.",
        },
    ]

    return (
        <section className="py-8 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-center space-x-3 text-center md:text-left">
                            <div className="flex-shrink-0 bg-krypop-cream p-2 rounded-full">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-krypop-dark text-sm md:text-base">{feature.title}</h3>
                                <p className="text-xs md:text-sm text-gray-600">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
