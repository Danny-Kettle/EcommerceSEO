import React, { createContext, useContext, useMemo } from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { set } from "mongoose";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

function CartProvider({ children }) {
  const [cart, setCart] = useState({
    user_id: "",
    items: [],
  });

  const { data: session } = useSession();

  const cartItemCount = React.useMemo(() => {
    if (!cart || !cart.items || !Array.isArray(cart.items)) {
      return 0;
    }
    const totalCount = cart.items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    return totalCount;
  }, [cart]);

  
  const value = useMemo(() => {
    return {
      cartItems: cart ? cart.items : [],
      cartItemCount,
      addToCart,
      clearCart,
      removeFromCart,
      incrementItem,
      decrementItem,
    };
  }, [
    cart,
    cartItemCount,
    addToCart,
    clearCart,
    removeFromCart,
    incrementItem,
    decrementItem,
  ]);

  async function addToCart(item) {
    const updatedCart = {
      ...cart,
      items: [
        ...(cart.items || []).filter((cartItem) => cartItem._id !== item._id),
        {
          ...item,
          quantity:
            (cart.items?.find((cartItem) => cartItem._id === item._id)
              ?.quantity || 0) + 1,
        },
      ],
    };
    const userId = session?.userId;

    if (session) {
      try {
        await fetch(`/api/cart?userId=${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            cartItems: updatedCart.items,
          }),
        });
      } catch (error) {
        console.error(error);
      }
    }
    setCart(updatedCart);
  }

  async function clearCart() {
    if (!session) {
      // Wait for session to load
      return true;
    }
    const userId = session?.userId;
    const updatedCart = [{ user_id: userId, items: [] }];

    try {
      await fetch(`/api/cart?userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          cartItems: updatedCart.items,
        }),
      });
    } catch (error) {
      console.error(error);
    }
    setCart(updatedCart);
    return false;
  }

  // Function to remove an item from the cart
  async function removeFromCart(itemId) {
    const userId = session?.userId;
    const updatedItems = cart.items.filter(
      (cartItem) => cartItem._id !== itemId
    );
    const updatedCart = {
      user_id: userId,
      items: updatedItems,
    };

    if (session) {
      try {
        const response = await fetch(
          `/api/cart?userId=${userId}&itemId=${itemId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
    setCart(updatedCart);
  }

  // Function to increment an item in the cart
  async function incrementItem(itemId, incrementValue = 1) {
    const userId = session?.userId;

    const updatedItems = cart.items.map((item) => {
      if (item._id === itemId) {
        return { ...item, quantity: item.quantity + incrementValue };
      }
      return item;
    });
    const updatedCart = {
      user_id: userId,
      items: updatedItems,
    };

    if (session) {
      try {
        const response = await fetch("/api/cart/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session.userId,
            itemId: itemId,
            incrementValue: incrementValue,
          }),
        });
      } catch (error) {
        console.error(error);
      }
    }
    setCart(updatedCart);
  }

  // Function to decrement an item in the cart
  async function decrementItem(itemId) {
    const userId = session?.userId;
    const updatedItems = cart.items.map((item) => {
      if (item._id === itemId) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    const updatedCart = {
      user_id: userId,
      items: updatedItems,
    };
    if (session) {
      try {
        const response = await fetch("/api/cart", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session.userId,
            itemId: itemId,
            incrementValue: -1,
          }),
        });
      } catch (error) {
        console.error(error);
      }
    }
    setCart(updatedCart);
  }

  // Function to get the user's cart from the database when they log in
  async function getCart() {
    if (session) {
      try {
        const response = await fetch(`/api/cart?userId=${session.userId}`);
        const data = await response.json();
        const updatedCart = { user_id: data.user_id, items: data.items };
        setCart(updatedCart);
        console.log(updatedCart);
      } catch (error) {
        console.error(error);
      }
    }
  }

  // Call getCart function when the component mounts and the user is logged in
  useEffect(() => {
    if (session) {
      getCart();
    }
  }, [session]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export { CartProvider };
