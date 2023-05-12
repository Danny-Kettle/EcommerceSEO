import Layout from "@/components/Layout";
import { useCart } from "@/components/CartContext";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useProducts } from "@/components/ProductContext";
import Head from "next/head";

// Does not work in env
const stripePromise = loadStripe(
  "pk_test_51Mx4rPH5AhzLlnQZ4YPJVwhq3cQzMcZi6gP4Ghk4ROFBGQ0Uj3drZZO3zB8g3NkD9UPs5GBbPoanhYuWF22zrgHW00yhuQLc6A"
);

export default function Cart() {
  const { cartItems, incrementItem, decrementItem, removeFromCart } = useCart();
  const { products } = useProducts();

  console.log(products);
  console.log(cartItems);

  const [loading, setLoading] = useState(false);
  const [productWithInsufficientStock, setProductWithInsufficientStock] =
    useState(null);

  const stockCheck = async () => {
    for (const item of cartItems) {
      const product = await products.find((p) => p._id === item._id); // Find cart Product
      if (product.stock < item.quantity) {
        await setProductWithInsufficientStock(product);
        return product; // Exit the loop early if an item doesn't have enough stock
      }
    }
    setProductWithInsufficientStock(null); // Reset the value if all products have enough stock
    return null; // Return null if all products have enough stock
  };

  const handleCheckout = async () => {
    setLoading(true);
    const result = await stockCheck();
    console.log(result);

    if (result !== null) {
      console.log("Not Enough Stock");
      window.scrollTo(0, 0);
    } else {
      const stripe = await stripePromise;

      const lineItems = Object.values(cartItems).map((cartItem) => ({
        price_data: {
          currency: "GBP",
          product_data: {
            name: cartItem.name,
          },
          unit_amount: parseInt(cartItem.price.replace(/\D/g, "")),
        },
        quantity: cartItem.quantity,
      }));

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          line_items: lineItems,
          success_url: window.location.origin + "/success",
          cancel_url: window.location.origin + "/cart",
        }),
      });

      const session = await response.json();

      await stripe.redirectToCheckout({ sessionId: session.id });
    }

    setLoading(false);
  };

  // Calculate total price of all items in cart
  const totalPrice = cartItems
    ? Object.values(cartItems).reduce(
        (acc, item) => acc + parseFloat(item.price) * parseInt(item.quantity),
        0
      )
    : 0;

  // Format total price as currency string
  const formattedTotalPrice = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  }).format(totalPrice);

  const handleDecrement = (itemId, itemQuantity) => {
    if (itemQuantity === 1) {
      removeFromCart(itemId);
    } else {
      decrementItem(itemId);
    }
  };

  return (
    <>
      <Head>
        <title>Echo Cart | Review and Edit Your Order</title>
        <meta
          name="description"
          content="Review and edit your order at Echo. Add or remove items from your cart and proceed to checkout. Fast and free shipping available on eligible orders."
        />
        <meta
          name="keywords"
          content="Echo, cart, review, edit, order, audio, laptops, mobiles, headphones, speakers, smartphones, tablets, computers, gaming laptops, MacBook, Dell, HP, Lenovo, Samsung, Apple, Sony, Bose, JBL, Sennheiser, Beats, Asus"
        />
      </Head>
      <Layout>
        <div className="max-w-screen-md w-11/12 mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h1 className="text-3xl font-extrabold mb-4 lg:mb-8 tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>

          {cartItems.length <= 0 ? (
            <p className="mt-6 text-lg text-gray-500">
              Your cart is currently empty.
            </p>
          ) : (
            <>
              <div className="mt-6">
                <div className="flow-root">
                  <ul className="-my-4 divide-y divide-gray-200">
                    {Object.values(cartItems).map((cartItem) => (
                      <li key={cartItem._id} className="flex py-4">
                        <div className="flex-shrink-0">
                          <img
                            className="h-20 w-20 rounded-md object-cover"
                            src={cartItem.picture}
                            alt={cartItem.name}
                          />
                        </div>

                        <div className="ml-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-gray-900 font-semibold">
                              {cartItem.name}
                            </h3>
                            <p className="mt-1 text-gray-500 text-sm">
                              {cartItem.description}
                            </p>
                          </div>

                          <div className="mt-4 flex-1 flex items-end justify-between">
                            <p className="text-gray-500">£{cartItem.price}</p>
                            <div className="flex items-center justify-end space-x-4">
                              <button
                                type="button"
                                className="font-medium text-gray-500 hover:text-gray-800"
                                onClick={() =>
                                  handleDecrement(
                                    cartItem._id,
                                    cartItem.quantity
                                  )
                                }
                              >
                                -
                              </button>
                              <span className="text-gray-700">
                                {cartItem.quantity}
                              </span>
                              <button
                                type="button"
                                className="font-medium text-gray-500 hover:text-gray-800"
                                onClick={() => incrementItem(cartItem._id)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          {productWithInsufficientStock &&
                            productWithInsufficientStock._id ===
                              cartItem._id && (
                              <p className="mt-6 text-red-600 text-sm">
                                Not enough stock, try again after cart.
                              </p>
                            )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        Total
                      </h3>
                      <p className="text-lg font-medium text-gray-900">
                        {formattedTotalPrice}
                      </p>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </div>
                    <div className="mt-6">
                      <button
                        onClick={handleCheckout}
                        type="button"
                        id="checkoutBtn"
                        className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  );
}
