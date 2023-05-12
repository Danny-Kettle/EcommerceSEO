import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut, signIn, signUp } from "next-auth/react";
import { useCart } from "./CartContext";
import { useContext, useState, useEffect } from "react";

export default function Footer() {
  const router = useRouter();
  const path = router.pathname;
  const { cartItem, cartItemCount } = useCart();
  const { data: session } = useSession();

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  return (
    <footer className="sticky mt-10 z-10 bottom-0 bg-white p-5 w-full flex flex-wrap align-middle border-t text-gray-400 border-gray-200 justify-center items-center gap-3 sm:gap-10 md:gap-12">
      <Link href={"/"}>
        <div
          className={
            (path === "/" ? "text-emerald-500 " : "") +
            "flex justify-center text-center flex-col"
          }
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="mx-auto h-[28px] w-[28px] sm:h-[42px] sm:w-[42px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            ></path>
          </svg>
          <span className="text-sm md:text-lg">Home</span>
        </div>
      </Link>
      <Link href={"/shop"}>
        <div
          className={
            (path === "/shop" ? "text-emerald-500 " : "") +
            "flex justify-center text-center flex-col"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="mx-auto h-[28px] w-[28px] sm:h-[42px] sm:w-[42px]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
            />
          </svg>

          <span className="text-sm md:text-lg">Products</span>
        </div>
      </Link>
      <Link href={"/cart"}>
        <div
          className={
            (path === "/cart" ? "text-emerald-500 " : "") +
            "flex justify-center text-center flex-col"
          }
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="mx-auto h-[28px] w-[28px] sm:h-[42px] sm:w-[42px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            ></path>
          </svg>
          <span className="text-sm md:text-lg">Cart {cartItemCount}</span>
        </div>
      </Link>
      {session?.role === "admin" && (
        <Link href={"/stock"}>
          <div
            className={
              (path === "/stock" ? "text-emerald-500 " : "") +
              "flex justify-center items-center text-center flex-col"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mx-auto h-[28px] w-[28px] sm:h-[42px] sm:w-[42px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
              />
            </svg>
            <span className="text-sm md:text-lg">Stock</span>
          </div>
        </Link>
      )}

      <Link
        onClick={() => (!session ? signIn() : signOut())}
        href={!session ? "/login" : ""}
      >
        <div className="flex justify-center items-center text-center flex-col">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="mx-auto h-[28px] w-[28px] sm:h-[42px] sm:w-[42px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <span className="text-sm md:text-lg ">
            {session ? (
              <button onClick={handleSignOut}>Sign Out</button>
            ) : (
              <button onClick={() => signIn()}>Sign In</button>
            )}
          </span>
        </div>
      </Link>
    </footer>
  );
}
