import { useState, useEffect } from "react";

export const useCart = () => {
  const [cartCount, setCartCount] = useState(0);
const [cartDetails, setCartDetails] = useState({});
  const [formattedTotalPrice, setFormattedTotalPrice] = useState("");

  const {
    cartCount: itemCount,
    cartDetails: itemDetails,
    totalPrice,
    formattedTotalPrice: formattedPrice,
  } = useShoppingCart();

  useEffect(() => {
    setCartCount(itemCount);
    setCartDetails(itemDetails);
    setFormattedTotalPrice(formattedPrice);
  }, [itemCount, itemDetails, formattedPrice]);

  const incrementItem = (sku, price) => {
    // Add 1 to the quantity of the item with the specified SKU
  };

  const decrementItem = (sku, price) => {
    // Subtract 1 from the quantity of the item with the specified SKU
  };

  const removeItem = (sku) => {
    // Remove the item with the specified SKU from the cart
  };

  return {
    cartCount,
    cartDetails,
    formattedTotalPrice,
    incrementItem,
    decrementItem,
    removeItem,
  };
};
