import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/components/CartContext";
import { ProductProvider } from "@/components/ProductContext";

import "@/styles/globals.css";

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
