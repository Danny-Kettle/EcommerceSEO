import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

export const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const updateProducts = useCallback(async () => {
    const response = await fetch(`/api/products/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products),
    });
    if (!response.ok) {
      throw new Error("Failed to update product.");
    }
    return alert(await response.json());
  }, [products]);

  const fetchProducts = async () => {
    const response = await fetch(`/api/products/`);
    const fetchedProducts = await response.json();
    setProducts(fetchedProducts);
    console.log("fetched products");
  };

  const stockDecrease = async (productsToUpdate) => {
    const response = await fetch(`/api/products/?stockDecrement=true`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productsToUpdate),
    });
    if (!response.ok) {
      throw new Error("Failed to update product.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const memoizedValue = useMemo(
    () => ({
      products: products.map((product) => ({
        ...product,
        price: `${Number(product.price).toFixed(2)}`,
        picture: `.${product.picture}`,
      })),
      setProducts,
      stockDecrease,
      updateProducts,
    }),
    [products, setProducts, updateProducts, stockDecrease]
  );

  return (
    <ProductContext.Provider value={memoizedValue}>
      {children}
    </ProductContext.Provider>
  );
};
