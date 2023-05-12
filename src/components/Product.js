import { useContext, useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Product({
  _id,
  name,
  price,
  description,
  picture,
  stock,
}) {
  const { cartItems, addToCart, incrementItem } = useCart();
  const { data: session } = useSession();
  const [message, setMessage] = useState(null);
  const [prevMessage, setPrevMessage] = useState(null);

  const router = useRouter();
  function pushLogin() {
    router.push({
      pathname: "/login",
      query: { status: "loginToAdd" },
    });
  }

  const handleAddToCart = (event) => {
    event.stopPropagation();
    if (!cartItems) {
      addToCart({
        _id,
        name,
        price,
        description,
        stock,
        picture,
      });
    } else {
      const itemInCart = cartItems.find((item) => item._id === _id);
      if (itemInCart) {
        incrementItem(itemInCart._id);
      } else {
        addToCart({
          _id,
          name,
          price,
          description,
          stock,
          picture,
        });
      }
    }
    setMessage({ name, price, picture });
  };

  let timeoutRef;

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000); // 5 seconds
      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  return (
    <div className="h-full flex flex-col w-64 rounded-xl">
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
            <p className="text-xs text-green-600">Has been added to the cart</p>
          </div>
        </div>
      )}
      <div className="p-5">
        <img src={picture} alt="" />
      </div>
      <div className="mt-2">
        <h3 className="font-bold text-lg">{name}</h3>
      </div>
      <p className="text-sm mt-1 leading-4">{description}</p>
      <div className="flex pt-4 mt-auto items-end">
        <div className="text-2xl font-bold grow">£{price}</div>
        {stock >= 1 ? (
          <button
            onClick={(event) =>
              session ? handleAddToCart(event) : pushLogin()
            }

            className="add-cart-btn bg-emerald-400 text-white py-1 px-3 rounded-xl"
          >
            +
          </button>
        ) : (
          <p className="text-red-500 font-bold ">Out of stock</p>
        )}
      </div>
    </div>
  );
}
