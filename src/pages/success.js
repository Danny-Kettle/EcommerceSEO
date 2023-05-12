import Link from "next/link";
import React, { memo } from "react";

import { useCart } from "@/components/CartContext";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useProducts } from "@/components/ProductContext";

const MemoizedSuccess = React.memo(Success);

function SuccessPage() {
  const { cartItems } = useCart();
  const { stockDecrease } = useProducts();
  const { clearCart } = useCart();
  const [products, setProducts] = useState();

  //Sets Loading true
  const [itemsLoading, setItemsLoading] = useState(true);

  //Collects session
  const { data: session, loading } = useSession();

  //If Session then loading true
  useEffect(() => {
    if (!loading && session && cartItems) {
      setItemsLoading(false);
      console.log(products);
      const result = setProducts(cartItems);
    }
  }, [session, loading, cartItems]);

  useEffect(() => {
    if (products) {
      stockDecrease(products);
      clearCart();
    }
  }, [products]);

  return (
    <>
      {itemsLoading ? (
        <p className="animate-pulse">loading</p>
      ) : (
        <MemoizedSuccess products={products} />
      )}
    </>
  );
}

function Success({ products }) {
  const route = useRouter();
  console.log(products);

  const handler = async () => {
    route.push("/");
  };

  return (
    <Layout>
      <div className="flex flex-col max-w-screen-md w-11/12 mx-auto py-12 sm:px-6 lg:py-16 lg:px-8">
        <h1 className="lg:text-4xl font-extrabold text-gray-900 tracking-tight text-2xl mb-4 lg:mb-8">
          Payment successful!
        </h1>
        <ul className="my-4 divide-y divide-gray-200">
          {products &&
            products.map((cartItem) => (
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
                    <span>£{cartItem.price}</span>
                    <span className="text-sm tracking-widest">
                      x{cartItem.quantity}
                    </span>
                  </div>
                </div>
              </li>
            ))}
        </ul>
        <button
          onClick={handler}
          className="self-end bg-emerald-500 tracking-wide uppercase rounded-lg px-6 py-3 text-white hover:scale-105 mt-5 lg:mt-10 hover:bg-emerald-400"
        >
          Home
        </button>
      </div>
    </Layout>
  );
}

export default SuccessPage;
