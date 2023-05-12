import { useContext, useState } from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import { useProducts } from "@/components/ProductContext";

export default function Stock() {
  const { products, setProducts, updateProducts } = useProducts();

  const categoriesNames = [...new Set(products.map((p) => p.category))];

  const incrementStock = (productId) => {
    const updatedProducts = products.map((p) => {
      if (p._id === productId) {
        return { ...p, stock: p.stock + 1 };
      }
      return p;
    });
    setProducts([...updatedProducts]);
  };

  const decrementStock = (productId) => {
    const updatedProducts = products.map((p) => {
      if (p._id === productId) {
        return { ...p, stock: Math.max(p.stock - 1, 0) };
      }
      return p;
    });
    setProducts([...updatedProducts]);
  };

  const handleStockChange = (event, productId) => {
    const value = parseInt(event.target.value);
    const updatedProducts = products.map((p) => {
      if (p._id === productId) {
        return { ...p, stock: isNaN(value) ? p.stock : value };
      }
      return p;
    });
    setProducts([...updatedProducts]);
  };

  const handlePriceChange = (event, productId) => {
    const value = parseInt(event.target.value);
    const updatedProducts = products.map((p) => {
      if (p._id === productId) {
        return { ...p, price: isNaN(value) ? p.price : value };
      }
      return p;
    });
    setProducts([...updatedProducts]);
  };

  const handleNameChange = (event, product) => {
    const newProducts = [...products];
    const index = newProducts.findIndex((p) => p._id === product._id);
    newProducts[index].name = event.target.value;
    setProducts(newProducts);
  };

  const handleDescriptionChange = (event, product) => {
    const newProducts = [...products];
    const index = newProducts.findIndex((p) => p._id === product._id);
    newProducts[index].description = event.target.value;
    setProducts(newProducts);
  };

  const handleSaveChanges = () => {
    updateProducts();
  };

  return (
    <>
      <Head>
        <title>Echo Admin Stock Control Panel | Manage Inventory</title>
        <meta
          name="description"
          content="Take control of your inventory with the Echo Admin Stock Control Panel. Easily manage your stock levels, track product availability, and update product information."
        />
        <meta
          name="keywords"
          content="Echo, admin, stock control, panel, inventory, management, stock levels, product availability, product information"
        />
        <meta name="robots" content="noindex" />
      </Head>
      <Layout>
        <div id="stock" className="flex flex-col  justify-center items-center">
          <style>
            {`
        /* Add your styles here */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}
          </style>
          <div className="fixed top-10 z-50 right-10  md:bottom-10">
            <button
              className="bg-emerald-500 hover:bg-emerald-600 text-sm lg:text-xl  text-white font-bold py-2 px-5 lg:py-4 lg:px-10 rounded"
              onClick={handleSaveChanges}
            >
              Save
            </button>
          </div>
          {categoriesNames.map((categoryName) => (
            <div key={categoryName}>
              {products.find((p) => p.category === categoryName) && (
                <div>
                  <h2 className="text-3xl font-black ml-20 py-20 uppercase">
                    {categoryName}
                  </h2>
                  <div className="flex flex-wrap snap-x scrollbar-hide">
                    {products
                      .filter((p) => p.category === categoryName)
                      .map((productInfo) => (
                        <div key={productInfo._id} className="px-16 lg:px-20 mb-20 snap-start">
                          <div className="w-40 lg:w-64 rounded-xl flex flex-col">
                            <div className="p-5">
                              <img src={productInfo.picture} alt="" />
                            </div>
                            <div className="mt-2">
                              <label
                                htmlFor="product-name"
                                className="font-bold text-md lg:text-lg"
                              >
                                Product Name:
                              </label>
                              <input
                                type="text"
                                id="product-name"
                                className="border w-full text-md lg:text-lg my-2 rounded-full pl-3 py-1"
                                value={productInfo.name}
                                onChange={(event) =>
                                  handleNameChange(event, productInfo)
                                }
                              />
                            </div>
                            <div className="mt-2">
                              <label
                                htmlFor="product-description"
                                className="font-bold text-md lg:text-lg"
                              >
                                Product Description:
                              </label>
                              <textarea
                                id="product-description"
                                className="border text-sm lg:text-md w-full my-2 rounded-lg pl-3 py-1"
                                value={productInfo.description}
                                onChange={(event) =>
                                  handleDescriptionChange(event, productInfo)
                                }
                              />
                            </div>
                            <div className="mt-2">
                              <label
                                htmlFor="product-price"
                                className="font-bold text-md lg:text-lg"
                              >
                                Product Price:
                              </label>
                              <div className="text-sm lg:text-lg mt-2 w-fit font-bold">
                                <input
                                  type="number"
                                  id="product-price"
                                  className="border rounded-full py-1 pl-3"
                                  value={Number(productInfo.price)}
                                  onChange={(event) =>
                                    handlePriceChange(event, productInfo._id)
                                  }
                                />
                              </div>
                            </div>
                            <div className="mt-3">
                              <label
                                htmlFor="product-stock"
                                className="font-bold text-lg"
                              >
                                Product Stock:
                              </label>
                              <div className="border mt-2 w-fit rounded-full px-2">
                                <button
                                  className="p-1"
                                  onClick={() =>
                                    decrementStock(productInfo._id)
                                  }
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  id="product-stock"
                                  className="w-10 lg:w-16 mx-2 text-center"
                                  value={productInfo.stock}
                                  onChange={(event) =>
                                    handleStockChange(event, productInfo._id)
                                  }
                                />
                                <button
                                  className="p-1"
                                  onClick={() =>
                                    incrementStock(productInfo._id)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
}
