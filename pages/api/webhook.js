import Stripe from 'stripe';
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';
import { track } from '@vercel/analytics/server';

// Disable Next.js body parser for raw body access
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

/**
 * Secure Stripe webhook handler for checkout.session.completed events.
 * Logs order data: email, product IDs, total price.
 * Protects against replay attacks and validates Stripe signature.
 *
 * Extendable for email/Supabase integration.
 *
 * Docs: https://stripe.com/docs/webhooks
 */
export default async function handler(req, res) {
  // TEST: Simulate sending a KRYpop order confirmation email to roshah2007@gmail.com
  if (req.method === 'GET' && req.query.testOrderEmail === '1') {
    const mockOrder = {
      email: 'roshah2007@gmail.com',
      name: 'Roshan Shah',
      orderId: 'test-12345',
      productIds: ['spicy-sweet-fusion'],
      subtotal: 650, // in cents
      total: 650, // in cents
      quantity: 1,
      timestamp: new Date().toISOString(),
    };
    await sendOrderConfirmationEmail(mockOrder);
    return res.status(200).json({ message: 'Test order confirmation email sent.' });
  }

  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }
  let event;
  try {
    event = await validateStripeEvent(req, endpointSecret, stripe);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const order = extractOrderInfo(session);
    await sendOrderConfirmationEmail(order);
    await recordOrderInMemory(order);
    // Vercel Analytics: Track server-side purchase conversion
    await track('purchase', {
      orderId: order.orderId,
      email: order.email,
      value: order.total / 100,
      productIds: order.productIds,
      timestamp: order.timestamp,
      source: 'webhook',
    });
  }
  res.status(200).send('Received');
}

function validateStripeEvent(req, endpointSecret, stripe) {
  return new Promise((resolve, reject) => {
    (async () => {
      let event;
      let rawBody;
      try {
        const { buffer } = await import('micro');
        rawBody = await buffer(req);
        const sig = req.headers['stripe-signature'];
        if (!sig || !endpointSecret) {
          return reject(new Error('Missing Stripe signature or webhook secret'));
        }
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
        resolve(event);
      } catch (err) {
        reject(err);
      }
    })();
  });
}

function extractOrderInfo(session) {
  const email = session.customer_details?.email || session.customer_email || session.metadata?.email;
  const productIds = session.metadata?.productIds || [];
  const total = session.amount_total || session.amount_subtotal || 0;
  const name = session.customer_details?.name || session.metadata?.firstName || '';
  const orderId = session.id || uuidv4();
  const timestamp = new Date().toISOString();
  return { email, productIds, total, name, orderId, timestamp };
}

function buildOrderItemsHtml(productIds, origin) {
  if (!Array.isArray(productIds) || productIds.length === 0) {
    return '<tr><td colspan="3" style="padding:16px;text-align:center;color:#b85c1e;">No product details available.</td></tr>';
  }
  const { getPublicImageUrl, getFlavorById } = require('../../lib/popcorn');
  return productIds.map((id) => {
    const flavor = getFlavorById(id);
    if (!flavor) {
      return `<tr><td colspan="3" style="padding:12px 0;color:#b85c1e;">Unknown Product (${id})</td></tr>`;
    }
    const imageUrl = getPublicImageUrl(flavor.image);
    return `
      <tr>
        <td style="padding:10px 8px 10px 0;vertical-align:middle;width:70px;">
          <img src="${imageUrl}" alt="${flavor.name} Popcorn" style="width:60px;height:60px;border-radius:12px;object-fit:cover;display:block;" />
        </td>
        <td style="padding:10px 8px;vertical-align:middle;font-size:1.05em;color:#3d2c1e;">${flavor.name}</td>
        <td style="padding:10px 0 10px 8px;vertical-align:middle;text-align:right;font-weight:bold;color:#b85c1e;">$${(flavor.price / 100).toFixed(2)}</td>
      </tr>
    `;
  }).join('');
}

async function sendOrderConfirmationEmail({ email, name, orderId, productIds, total, timestamp }) {
  if (!email) return;
  const itemsHtml = buildOrderItemsHtml(productIds);
  const emailHtml = `
    <div style="max-width:600px;margin:0 auto;padding:20px;background:#fffbe9;border-radius:18px;font-family:'Segoe UI',Arial,sans-serif;color:#3d2c1e;">
      <div style="text-align:center;margin-bottom:24px;">
        <span aria-label='KRYpop' style="font-size:2.2em;font-weight:700;letter-spacing:2px;"><span style='color:#ff5733;'>KR</span><span style='color:#ffd966;'>Y</span><span style='color:#ff5733;'>POP</span></span>
      </div>
      <h1 style="font-size:1.5em;color:#b85c1e;margin:0 0 12px 0;">Thank you${name ? ', ' + name : ''}!</h1>
      <p style="font-size:1.1em;margin:0 0 18px 0;">Your order is confirmed. We’re so grateful you chose KRYpop for your snacking adventure!</p>
      <div style="background:#f3d9b1;padding:14px 18px;border-radius:10px;margin-bottom:18px;">
        <span style="font-size:1.05em;color:#7a5c3e;">Order ID: <b>${orderId}</b></span>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:18px;">
        <thead>
          <tr>
            <th style="text-align:left;padding:8px 0 8px 0;font-size:1em;color:#b85c1e;border-bottom:2px solid #f3d9b1;">Item</th>
            <th style="text-align:left;padding:8px 0;font-size:1em;color:#b85c1e;border-bottom:2px solid #f3d9b1;"></th>
            <th style="text-align:right;padding:8px 0 8px 0;font-size:1em;color:#b85c1e;border-bottom:2px solid #f3d9b1;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      <div style="text-align:right;font-size:1.15em;margin-bottom:18px;">
        <span style="color:#3d2c1e;font-weight:600;">Total:</span>
        <span style="color:#b85c1e;font-weight:700;margin-left:12px;">$${(total / 100).toFixed(2)}</span>
      </div>
      <div style="background:#ffe3d1;padding:14px 18px;border-radius:10px;margin-bottom:18px;">
        <p style="margin:0;font-size:1.05em;color:#b85c1e;">We’re popping your order fresh! You’ll get a shipping update soon. If you have questions, just reply to this email.</p>
      </div>
      <div style="margin-top:18px;text-align:center;font-size:0.98em;color:#7a5c3e;">
        <p style="margin:0;">From our kitchen to your heart — thank you for supporting a small, culturally rich popcorn brand. Enjoy every bite!</p>
        <p style="margin:0;">With warmth,<br/>The KRYpop Family</p>
      </div>
      <p style="font-size:0.85em;color:#a08c6b;margin-top:24px;text-align:center;">${timestamp}</p>
    </div>
  `;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: `KRYpop Orders <admin@marketing.krypop.com>`,
      to: email,
      subject: 'Your KRYpop Order Confirmation',
      html: emailHtml,
    });
  } catch (err) {
    console.error('Order confirmation email failed:', err);
  }
}
