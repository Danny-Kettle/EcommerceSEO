import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useCart } from "@/components/CartContext";
import { useProducts } from "@/components/ProductContext";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function ProductPage() {
  const router = useRouter();
  const { cartItems, addToCart, incrementItem } = useCart();
  const { products } = useProducts();
  const { productId } = router.query;
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const { data: session } = useSession();

  const [isTabletOrSmaller, setIsTabletOrSmaller] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTabletOrSmaller(window.innerWidth <= 768); // 768 is the breakpoint for tablet size
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const productInfo = products.find((product) => product._id === productId);

  function pushLogin() {
    router.push({
      pathname: "/login",
      query: { status: "loginToAdd" },
    });
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 10000); // 10 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (productInfo) {
      const filteredProducts = products.filter(
        (product) =>
          (product.category === productInfo.category ||
            product.brand === productInfo.brand) &&
          product._id !== productInfo._id
      );
      setRelatedItems(filteredProducts);
      setLoading(false);
    }
  }, [productInfo, products]);

  const handleAddToCart = () => {
    if (!cartItems) {
      addToCart({
        _id: productInfo._id,
        name: productInfo.name,
        price: productInfo.price,
        description: `${productInfo.description.slice(0, 150)}...`,
        picture: productInfo.picture,
        stock: productInfo.stock,
      });
    } else {
      const itemInCart = cartItems.find((item) => item._id === productId);
      if (itemInCart) {
        incrementItem(itemInCart._id);
      } else {
        addToCart({
          _id: productInfo._id,
          name: productInfo.name,
          price: productInfo.price,
          description: `${productInfo.description.slice(0, 150)}...`,
          picture: productInfo.picture,
          stock: productInfo.stock,
        });
      }
    }
    // Set the message state variable
    setMessage({
      name: productInfo.name,
      price: productInfo.price,
      picture: productInfo.picture,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>
          Echo | {productInfo ? productInfo.category : "Product"} |&nbsp;
          {productInfo ? productInfo.brand : "Product"} |&nbsp;
          {productInfo ? productInfo.name : "Product"}
        </title>

        <meta
          name="description"
          content={
            productInfo
              ? `Shop the ${productInfo.brand} ${productInfo.category} ${productInfo.name} on Echo! ${productInfo.description}`
              : "Shop the latest products on Echo!"
          }
        />
        <meta
          property="og:title"
          content={
            productInfo
              ? `${productInfo.brand} ${productInfo.category} ${productInfo.name}`
              : "Echo"
          }
        />
        <meta
          property="og:description"
          content={
            productInfo
              ? productInfo.description
              : "Shop the latest products on Echo!"
          }
        />
        <meta
          property="og:image"
          content={
            productInfo
              ? productInfo.imageUrl
              : "https://www.example.com/image.jpg"
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={
            productInfo
              ? `${productInfo.brand} ${productInfo.category} ${productInfo.name}`
              : "Echo"
          }
        />
        <meta
          name="twitter:description"
          content={
            productInfo
              ? productInfo.description
              : "Shop the latest products on Echo!"
          }
        />
        <meta
          name="twitter:image"
          content={
            productInfo
              ? productInfo.imageUrl
              : "https://www.example.com/image.jpg"
          }
        />
      </Head>
      <Layout>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="flex flex-col w-11/12 lg:w-full mx-auto mt-20 items-center">
              {message && (
                <div className="fixed top-10 left-10 z-50 h-24 bg-gray-100 rounded shadow-xl  px-6 gap-4 flex justify-center items-center p-2">
                  <img
                    src={message.picture}
                    alt={message.name}
                    className="h-full mr-2"
                  />
                  <div className="text-gray-900">
                    <p className="font-bold">{message.name}</p>
                    <p>£{message.price}</p>
                    <p className="text-xs text-green-600">
                      Has been added to the cart
                    </p>
                  </div>
                </div>
              )}
              <div className="flex flex-col lg:flex-row gap-10 justify-between lg:gap-0 lg:justify-evenly max-w-screen-xl">
                <div className="flex flex-col items-center mx-auto w-2/3 lg:w-1/3">
                  <img
                    src={productInfo.picture}
                    alt={productInfo.name}
                    className="w-full rounded-lg mb-4 max-w-sm"
                  />
                </div>
                <div className="flex flex-col bg-gray-100 items-start w-full lg:w-1/2 pt-8 lg:py-8">
                  <h1 className="text-xl lg:text-2xl pl-8 font-bold mb-4">
                    {productInfo.name}
                  </h1>
                  <h2 className="text-md lg:text-lg pl-8 font-bold">
                    Product Specification
                  </h2>
                  <ul className="my-2 pl-8 ml-10 lg:ml-10 list-disc">
                    {productInfo.specs.map((spec, index) => {
                      return (
                        <li key={index}>
                          <p className="ml-3 lg:ml-5 text-sm lg:text-md leading-4 lg:leading-8">
                            <span>{spec}</span>
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="flex lg:my-5 mt-5  bg-white p-5 flex-row w-full items-center">
                    <p className="text-xl font-bold">
                      £{Number(productInfo.price).toFixed(2)}
                    </p>
                    {productInfo.stock >= 1 ? (
                      <button
                        onClick={session ? handleAddToCart : pushLogin}
                        className="add-cart-btn bg-emerald-400 text-white px-4 ml-auto py-2 rounded-lg"
                      >
                        +
                      </button>
                    ) : (
                      <p className="text-red-500 ml-auto font-bold ">
                        Out of stock
                      </p>
                    )}
                  </div>
                  {!isTabletOrSmaller && (
                    <>
                      <h2 className="pl-8 text-lg font-bold">Description</h2>
                      <p className="text-md px-8 my-2 text-justify leading-6">
                        {productInfo.description}
                      </p>
                    </>
                  )}
                </div>
              </div>
              {isTabletOrSmaller && (
                <div className="bg-gray-100 py-8">
                  <h2 className=" pl-8 text-md font-bold">Description</h2>
                  <p className="text-sm px-8 my-2 text-justify leading-4">
                    {productInfo.description}
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col w-11/12 mx-auto max-w-screen-xl py-5 mt-20">
              <h2 className="text-xl font-bold mb-4">Related Products</h2>
              <div className="flex flex-wrap justify-evenly">
                {relatedItems.length > 0 &&
                  relatedItems.slice(0, 4).map((item) => (
                    <div
                      key={item._id}
                      onClick={() =>
                        router.push({
                          pathname: `/products/[category]/[productId]`,
                          query: {
                            category: item.category,
                            productId: item._id,
                          },
                          as: `/products/${item.category}/${item._id}`,
                        })
                      }
                      className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 cursor-pointer"
                    >
                      <div className="rounded-lg flex flex-col bg-gray-100 p-4">
                        <img
                          src={item.picture}
                          alt={item.name}
                          className="w-full h-40 object-contain rounded-lg"
                        />
                        <div className="flex flex-col pt-4">
                          <p className="font-bold">{item.name}</p>
                          <p className="self-end">
                            £{Number(item.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
}
