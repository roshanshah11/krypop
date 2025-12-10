"use client"

import { Star } from "lucide-react"

export default function ReviewsStrip() {
    return (
        <section className="bg-krypop-dark text-white py-3 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center">

                    <div className="flex items-center gap-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-krypop-yellow text-krypop-yellow" />
                            ))}
                        </div>
                        <span className="font-bold text-sm">Loved by 5,000+ snack lovers</span>
                    </div>

                    <div className="hidden md:block h-4 w-px bg-white/20"></div>

                    <p className="text-sm italic opacity-90">
                        "Best popcorn I've ever had. Period." — <span className="font-semibold not-italic">Sarah J.</span>
                    </p>

                    <div className="hidden md:block h-4 w-px bg-white/20"></div>

                    <p className="text-sm italic opacity-90 hidden sm:block">
                        "The spice level is perfect." — <span className="font-semibold not-italic">Mike T.</span>
                    </p>

                </div>
            </div>
        </section>
    )
}
