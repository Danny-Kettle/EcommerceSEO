import { useRouter } from "next/router";
import Link from "next/link";

import { useSession, signOut, signIn, signUp } from "next-auth/react";
import { useCart } from "./CartContext";
import { useContext, useState, useEffect } from "react";

const Header = (props) => {
  const router = useRouter();
  const path = router.pathname;
  const { cartItemCount } = useCart();
  const { data: session } = useSession();

  let logoFill = path === "/" ? "#fff" : "red";

  const addTrailingSlash = (path) => {
    if (path === "/") {
      return path;
    }
  };

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  return (
    <header className="relative flex flex-row w-full">
      <div
        id="headerContent"
        className={
          (path === "/"
            ? "absolute top-0 left-0 "
            : "relative bg-gradient-to-r from-gray-900 to-indigo-600") +
          " text-white items-center justify-center w-full md:justify-between z-10 bg-transparent flex"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 relative sm:h-32 md:h-42 lg:h-62"
          viewBox="0 0 452 205"
          fill="currentColor"
        >
          <path
            stroke="none"
            strokeWidth="1"
            d="M 112.00,39.42
           C 134.75,36.65 169.62,50.77 170.90,77.00
             171.15,82.20 169.15,88.55 166.53,93.00
             165.07,95.46 161.84,99.19 161.86,102.00
             161.88,104.87 165.78,109.28 167.32,112.00
             170.25,117.18 171.11,121.10 170.98,127.00
             170.59,145.91 150.66,158.98 134.00,163.10
             127.07,164.82 122.06,165.08 115.00,165.00
             69.82,164.47 42.27,114.63 60.89,75.00
             68.91,57.93 84.69,45.18 103.00,40.75
             103.00,40.75 112.00,39.42 112.00,39.42 Z
           M 114.00,51.29
           C 94.32,54.54 79.48,62.88 71.17,82.00
             57.22,114.12 80.61,152.17 116.00,152.99
             130.75,153.33 158.96,144.24 158.54,126.00
             158.27,114.12 149.03,113.38 149.03,102.00
             149.03,89.62 158.74,91.00 157.96,76.00
             157.59,68.96 153.50,64.94 148.00,61.04
             138.57,54.37 125.58,50.20 114.00,51.29 Z
           M 117.00,67.71
           C 124.99,67.90 133.85,69.72 139.89,75.33
             143.35,78.53 145.98,85.02 139.89,87.22
             134.11,89.31 129.45,81.25 120.00,80.19
             102.97,78.27 89.86,98.33 98.99,113.00
             104.19,121.34 114.39,126.21 124.00,123.09
             131.11,120.78 137.44,112.38 142.40,118.31
             148.48,125.59 134.40,133.04 129.00,134.78
             109.68,141.03 90.06,130.83 84.64,111.00
             83.73,107.67 82.92,104.47 83.18,101.00
             83.68,94.37 86.27,86.25 90.39,81.00
             92.89,77.81 96.51,74.42 100.00,72.35
             105.41,69.14 110.82,68.15 117.00,67.71 Z
           M 195.00,75.00
           C 195.00,75.00 239.00,75.00 239.00,75.00
             239.00,75.00 239.00,90.00 239.00,90.00
             239.00,90.00 213.00,90.00 213.00,90.00
             213.00,90.00 213.00,95.00 213.00,95.00
             213.00,95.00 237.00,95.00 237.00,95.00
             237.00,95.00 237.00,108.00 237.00,108.00
             237.00,108.00 213.00,108.00 213.00,108.00
             213.00,108.00 213.00,113.00 213.00,113.00
             213.00,113.00 240.00,113.00 240.00,113.00
             240.00,113.00 240.00,129.00 240.00,129.00
             240.00,129.00 195.00,129.00 195.00,129.00
             195.00,129.00 195.00,75.00 195.00,75.00 Z
           M 291.00,75.00
           C 291.00,75.00 309.00,75.00 309.00,75.00
             309.00,75.00 309.00,94.00 309.00,94.00
             310.93,92.29 312.52,90.68 315.00,89.74
             322.63,86.83 331.21,90.34 333.89,98.00
             335.76,103.35 335.00,121.31 335.00,128.00
             335.00,128.00 316.00,128.00 316.00,128.00
             316.00,128.00 316.00,113.00 316.00,113.00
             315.96,111.03 315.96,106.04 313.00,106.04
             310.80,106.04 309.85,109.32 309.24,111.00
             308.75,114.29 309.00,124.08 309.24,128.00
             309.24,128.00 291.00,128.00 291.00,128.00
             291.00,128.00 291.00,75.00 291.00,75.00 Z
           M 360.00,88.59
           C 366.79,88.65 373.70,89.34 378.90,94.21
             386.12,100.98 386.12,117.02 378.90,123.79
             374.29,128.11 368.10,129.18 362.00,129.41
             355.47,129.66 348.01,128.39 343.10,123.79
             335.88,117.02 335.88,100.98 343.10,94.21
             348.24,89.39 353.44,89.15 360.00,88.59 Z
           M 288.00,111.07
           C 287.17,116.88 285.89,121.41 280.91,125.20
             272.21,131.82 241.08,133.29 241.08,109.00
             241.08,84.68 272.26,86.20 280.91,92.80
             285.62,96.40 287.13,101.40 288.00,107.00
             288.00,107.00 268.00,107.00 268.00,107.00
             264.02,100.65 259.66,107.25 261.28,110.93
             261.94,112.41 263.27,113.63 264.95,113.68
             267.07,113.75 268.26,111.70 272.04,111.07
             272.04,111.07 288.00,111.07 288.00,111.07 Z
           M 115.00,92.69
           C 128.80,90.99 129.88,108.98 119.00,111.55
             113.04,112.96 106.77,106.99 107.63,101.00
             108.29,96.43 111.04,94.33 115.00,92.69 Z
           M 360.13,103.74
           C 354.49,107.27 357.42,115.44 361.87,114.26
             365.44,113.31 367.24,104.04 360.13,103.74 Z"
          />
        </svg>
        {props.showNav && (
          <nav className="flex-row flex mr-20 justify-end gap-12">
            <Link href={addTrailingSlash("/")}>
              <div
                className={
                  (path === "/" ? "opacity-40 " : "") +
                  "flex justify-center text-center transform hover:scale-110 transition duration-300 ease-in-out flex-col"
                }
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="mx-auto h-[32px] w-[32px] sm:h-[42px] sm:w-[42px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  ></path>
                </svg>
                <span>Home</span>
              </div>
            </Link>
            <Link href={"/shop"}>
              <div
                className={
                  (path === "/shop" ? "opacity-40 " : "") +
                  "flex justify-center  transform hover:scale-110 transition duration-300 ease-in-out text-center flex-col"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="mx-auto h-[32px] w-[32px] sm:h-[42px] sm:w-[42px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>

                <span>Products</span>
              </div>
            </Link>
            <Link href={"/cart"}>
              <div
                className={
                  (path === "/cart" ? "opacity-40 " : "") +
                  "flex justify-center text-center transform hover:scale-110 transition duration-300 ease-in-out flex-col"
                }
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="mx-auto  h-[32px] w-[32px] sm:h-[42px] sm:w-[42px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  ></path>
                </svg>
                <span>Cart {cartItemCount}</span>
              </div>
            </Link>
            {session?.role === "admin" && (
              <Link href={"/stock"}>
                <div
                  className={
                    (path === "/stock" ? "opacity-40 " : "") +
                    "flex justify-center items-center transform hover:scale-110 transition duration-300 ease-in-out text-center flex-col"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="mx-auto h-[32px] w-[32px] sm:h-[42px] sm:w-[42px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                    />
                  </svg>
                  <span>Stock</span>
                </div>
              </Link>
            )}

            <Link
              onClick={() => (!session ? signIn() : signOut())}
              href={!session ? "/login" : ""}
            >
              <div
                className={
                  (path === "/login" ? "opacity-40 " : "") +
                  "flex justify-center text-center transform hover:scale-110 transition duration-300 ease-in-out flex-col"
                }
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="mx-auto h-[32px] w-[32px] sm:h-[42px] sm:w-[42px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span>
                  {session ? (
                    <button id="signOut" onClick={handleSignOut}>
                      Sign Out
                    </button>
                  ) : (
                    <button id="signIn" onClick={() => signIn()}>
                      Sign In
                    </button>
                  )}
                </span>
              </div>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

<style></style>;
export default Header;
