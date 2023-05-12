import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export default async function handler(req, res) {
  const { line_items, success_url, cancel_url } = req.body;

  console.log(line_items);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: line_items,
    mode: "payment",
    success_url: success_url,
    cancel_url: cancel_url,
  });

  res.status(200).json({ id: session.id });
}
