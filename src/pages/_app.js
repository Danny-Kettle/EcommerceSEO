import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/components/CartContext";
import { ProductProvider } from "@/components/ProductContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

import "@/styles/globals.css";
useEffect(() => {
  const { pathname, asPath } = router;

  if (!asPath.endsWith("/") && pathname !== "") {
    router.replace(`${pathname}/`, undefined, { shallow: true });
  }
}, [router]);

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ProductProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </ProductProvider>
    </SessionProvider>
  );
}

export default App;
