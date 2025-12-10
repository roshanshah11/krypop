import Stripe from 'stripe';
import { getFlavorById } from '../../lib/popcorn';

// Securely load Stripe secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

/**
 * Product schema: { id: string, name: string, price: number (in cents), quantity: number }
 *
 * Expects POST body: { products: [{ id, name, price, quantity }], metadata?: object }
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { products, metadata, shipping, tax, discount } = req.body;

  console.log("Received products:", products)

  // Validate products against schema and available flavors
  if (!Array.isArray(products) || products.length < 1) {
    return res.status(400).json({ error: 'Products array required' });
  }

  const validatedItems = [];
  for (const item of products) {
    const flavor = getFlavorById(item.id);
    console.log("Validating item:", item, "Found flavor:", flavor)
    if (!flavor || typeof item.quantity !== 'number' || item.quantity < 1) {
      return res.status(400).json({ error: 'Invalid product or quantity' });
    }
    // Always use production domain for Stripe images
    const { getPublicImageUrl } = await import('../../lib/popcorn');
    const imageUrl = getPublicImageUrl(flavor.image, 'https://krypop.com');
    validatedItems.push({
      ...flavor,
      quantity: item.quantity,
      image: imageUrl,
    });
  }

  // Map validated items to Stripe line items
  const line_items = validatedItems.map((product) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: product.name,
        images: product.image ? [product.image] : [],
        description: product.description || undefined,
      },
      unit_amount: product.price, // price in cents
    },
    quantity: product.quantity,
  }));

  // Add shipping as a line item if present and > 0
  if (shipping && Number(shipping) > 0) {
    line_items.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Shipping',
        },
        unit_amount: Math.round(Number(shipping) * 100), // convert dollars to cents
      },
      quantity: 1,
    });
  }

  // Add tax as a line item if present and > 0
  if (tax && Number(tax) > 0) {
    line_items.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Tax',
        },
        unit_amount: Math.round(Number(tax) * 100), // convert dollars to cents
      },
      quantity: 1,
    });
  }

  let discounts = [];
  // Handle discount using Stripe Coupons
  if (discount && Number(discount) > 0) {
    try {
      // Create a coupon for the discount amount
      const coupon = await stripe.coupons.create({
        amount_off: Math.round(Number(discount) * 100),
        currency: 'usd',
        duration: 'once',
        name: 'Promo Discount',
      });
      discounts.push({ coupon: coupon.id });
    } catch (error) {
      console.error("Error creating discount coupon:", error);
      // Fallback or ignore if coupon creation fails, but log it.
      // In a real app, you might want to return an error or handle this more gracefully.
    }
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      discounts: discounts.length > 0 ? discounts : undefined,
      success_url: `${req.headers.origin}/checkout?success=1`,
      cancel_url: `${req.headers.origin}/checkout?canceled=1`,
      metadata: metadata || {},
    });
    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err)
    return res.status(500).json({ error: err.message });
  }
}
