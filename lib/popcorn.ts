// Product schema for popcorn flavors and pricing

export type PopcornFlavor = {
  id: string;
  name: string;
  price: number; // in cents
  image?: string;
  description?: string;
};


export const POPCORN_FLAVORS: PopcornFlavor[] = [
  {
    id: "classic-butter",
    name: "Classic Butter",
    price: 599, // $5.99
    image: "/images/option2.avif",
    description: "Rich, buttery popcorn for traditionalists.",
  },
  {
    id: "caramel-crunch",
    name: "Caramel Crunch",
    price: 799, // $7.99
    image: "/images/krypopspecial.avif",
    description: "Sweet caramel-coated popcorn with a crunch.",
  },
  {
    id: "spicy-jalapeno",
    name: "Spicy Jalapeño",
    price: 699, // $6.99
    image: "/images/option3.avif",
    description: "A spicy kick for adventurous snackers.",
  },
  {
    id: "krypop-flight",
    name: "Krypop Flight",
    price: 2400, // $24.00 in cents
    image: "/images/option2.avif",
    description: "One of each flavor — for the indecisive or the enthusiast.",
  },
  {
    id: "spicy-sweet-fusion",
    name: "Spicy Sweet Fusion",
    price: 599, // $5.99
    image: "/images/option2.avif",
    description: "Our signature blend — chili powder + sugar. A fiery crunch with a caramelized kiss.",
  },
  {
    id: "mango-chili-tango",
    name: "Mango Chili Tango",
    price: 599, // $5.99
    image: "/images/IMG_4157.avif",
    description: "Dried mango flakes + Kashmiri chili + sea salt = juicy heat explosion.",
  },
  {
    id: "sichuan-pepper-buzz",
    name: "Sichuan Pepper Buzz",
    price: 599, // $5.99
    image: "/images/krypopspecial.avif",
    description: "Tingly. Citrusy. Electric. Inspired by the Sichuan mala kick.",
  },
  {
    id: "coconut-curry-crunch",
    name: "Coconut Curry Crunch",
    price: 599, // $5.99
    image: "/images/option2.avif",
    description: "Savory coconut milk powder, yellow curry, and cumin — Thai-Indian crossover heat.",
  },
  {
    id: "matcha-rose-whisper",
    name: "Matcha Rose Whisper",
    price: 649, // $6.49
    image: "/images/option3.avif",
    description: "Delicate and floral, with ceremonial matcha and rose petals. A calm amidst the spice storm.",
  },
];

export function getFlavorById(id: string): PopcornFlavor | undefined {
  return POPCORN_FLAVORS.find((f) => f.id === id);
}

// Utility to build a public image URL for Stripe/external use
export function getPublicImageUrl(imagePath: string, origin?: string): string {
  if (!imagePath) return '';
  // Use provided origin or fallback to production domain
  const base = origin ?? 'https://krypop.com';
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/')) return base + imagePath;
  return base + '/' + imagePath;
}
