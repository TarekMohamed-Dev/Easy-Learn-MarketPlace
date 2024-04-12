// Importing necessary modules
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Creating a new instance of Stripe with the provided secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-08-16",
});

// Handling POST request
export async function POST(request: any) {
  // Parsing request body to JSON
  const data: any = await request.json();
  // Extracting amount from request data
  const amount = data.amount;

  try {
    // Creating a payment intent with the specified amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100, // Converting amount to cents
      currency: "USD",
    });
    // Returning the client secret for the created payment intent
    return NextResponse.json(paymentIntent.client_secret, { status: 200 });
  } catch (error: any) {
    // Returning error response in case of failure
    return new NextResponse(error, {
      status: 400,
    });
  }
}
