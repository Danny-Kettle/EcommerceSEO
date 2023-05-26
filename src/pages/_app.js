import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/components/CartContext";
import { ProductProvider } from "@/components/ProductContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

import "@/styles/globals.css";
function RedirectToTrailingSlash() {
  const router = useRouter();

  useEffect(() => {
    if (!router.asPath.endsWith("/")) {
      router.push(router.asPath + "/", undefined, { shallow: true });
    }
  }, [router]);

  return null;
}

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ProductProvider>
        <CartProvider>
          <Component {...pageProps} />
          <RedirectToTrailingSlash />
        </CartProvider>
      </ProductProvider>
    </SessionProvider>
  );
}

export default App;
