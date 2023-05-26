import Shop from "@/components/Shop";
import Layout from "@/components/Layout";
import { connectToDatabase, disconnectFromDatabase } from "../../lib/mongoose";
import { findAllProducts } from "./api/products";
import { useRouter } from "next/router";
import getProductSchema from "@/utils/productSchema";
import Head from "next/head";

export async function getStaticProps({ res }) {
  await connectToDatabase();
  const products = await findAllProducts();
  const updatedProducts = products.map((product) => ({
    ...product,
    price: `${Number(product.price).toFixed(2)}`,
    picture: `.${product.picture}`,
    description: `${product.description.slice(0, 150)}...`,
  }));

  const schema = getProductSchema(updatedProducts);
  console.log(schema);

  await disconnectFromDatabase();

  return {
    props: {
      products: JSON.parse(JSON.stringify(updatedProducts)),
      schema: schema,
    },
  };
}

export default function shop({ products, schema }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <title>Shop Audio, Laptops, and Mobiles at Echo | Buy Online</title>
        <meta
          name="description"
          content="Discover the latest in audio, laptops, and mobiles at Echo. Shop now for a wide selection of products at great prices. Fast and free shipping available on eligible orders."
        />
        <meta
          name="keywords"
          content="audio, laptops, mobiles, headphones, speakers, smartphones, tablets, computers, gaming laptops, MacBook, Dell, HP, Lenovo, Samsung, Apple, Sony, Bose, JBL, Sennheiser, Beats, Asus"
        />
        <meta name="author" content="Echo Inc." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="Shop Audio, Laptops, and Mobiles at Echo | Buy Online"
        />
        <meta
          property="og:description"
          content="Discover the latest in audio, laptops, and mobiles at Echo. Shop now for a wide selection of products at great prices. Fast and free shipping available on eligible orders."
        />
        <meta property="og:image" content="/logo.png" />
        <meta
          name="twitter:title"
          content="Shop Audio, Laptops, and Mobiles at Echo | Buy Online"
        />
        <meta
          name="twitter:description"
          content="Discover the latest in audio, laptops, and mobiles at Echo. Shop now for a wide selection of products at great prices. Fast and free shipping available on eligible orders."
        />
        <meta name="twitter:image" content="/logo.png" />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <Layout>
        <Shop products={products} router={router} />
      </Layout>
    </>
  );
}
