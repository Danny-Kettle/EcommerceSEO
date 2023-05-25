import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Shop from "@/components/Shop";
// import { connectToDatabase, disconnectFromDatabase } from "../../lib/mongoose";
import { findAllProducts } from "./api/products";
import { useRouter } from "next/router";
import Head from "next/head";
import getProductSchema from "@/utils/productSchema";

export async function getStaticProps({ res }) {
  const products = await findAllProducts();
  const updatedProducts = products.map((product) => ({
    ...product,
    price: `${Number(product.price).toFixed(2)}`,
    description: `${product.description.slice(0, 150)}...`,
  }));

  const schema = getProductSchema(updatedProducts);

  return {
    props: {
      products: JSON.parse(JSON.stringify(updatedProducts)),
      schema: schema,
    },
  };
}

export default function Home({ products, schema }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <title>Echo - Buy Mobiles, Audio, and Laptops Online</title>
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <meta
          name="description"
          content="Shop for the latest mobile phones, headphones, speakers, and laptops online at Echo. Enjoy fast delivery, easy returns, and secure payments."
        />
        <meta
          name="keywords"
          content="echo, mobiles, audio, headphones, speakers, laptops, online shopping"
        />
        <meta name="author" content="Echo Inc." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="Echo - Buy Mobiles, Audio, and Laptops Online"
        />
        <meta
          property="og:description"
          content="Shop for the latest mobile phones, headphones, speakers, and laptops online at Echo. Enjoy fast delivery, easy returns, and secure payments."
        />
        <meta property="og:image" content="/logo.png" />
        <meta
          name="twitter:title"
          content="Echo - Buy Mobiles, Audio, and Laptops Online"
        />
        <meta
          name="twitter:description"
          content="Shop for the latest mobile phones, headphones, speakers, and laptops online at Echo. Enjoy fast delivery, easy returns, and secure payments."
        />
        <meta name="twitter:image" content="/logo.png" />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <Layout>
        <Hero />
        <Shop products={products} router={router} />
      </Layout>
    </>
  );
}
