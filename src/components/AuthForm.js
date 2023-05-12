import { useState, useEffect, useRef } from "react";
import React, { memo } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (response.status === 409) {
    throw new Error("Email already exists");
  } else if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

function AuthForm() {
  const [registered, setRegistered] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  useEffect(() => {
    const { error, status } = router.query;
    if (error) {
      setError("Invalid email or password, please try again.");
    }
    if (status === "loginToAdd") {
      setStatus("Please sign in to add items to your cart");
    }
  }, [router.query]);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
    setError("");
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      await signIn("credentials", {
        redirect: "/",
        email: enteredEmail,
        password: enteredPassword,
      });
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        setRegistered(true);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }
  }

  return (
    <section className="max-w-xl mx-auto my-7">
      {!registered ? (
        <div className="py-2 px-4 sm:px-4 md:py-4 md:px-6 lg:py-6 lg:px-8">
          <h1 className="text-2xl font-bold mb-4">
            {isLogin ? "Login" : "Sign Up"}
          </h1>
          {isLogin && status && <p className="my-5 text-red-500">{status}</p>}
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                required
                ref={emailInputRef}
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium"
              >
                Your Password
              </label>
              <input
                type="password"
                id="password"
                required
                ref={passwordInputRef}
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              />
              {error && <p className="mt-5 text-red-500">{error}</p>}
            </div>
            <div className="my-5 flex flex-col sm:flex-row justify-between items-center">
              <button
                id="loginButton"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0"
              >
                {isLogin ? "Login" : "Create Account"}
              </button>
              <button
                type="button"
                onClick={switchAuthModeHandler}
                className="text-blue-500 font-bold"
                id="createAcc"
              >
                {isLogin ? "No Account? Create One" : "Already a user? Login"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">
            You have successfully registered!
          </p>

          <button
            onClick={() => router.reload()}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </section>
  );
}

export default memo(AuthForm);
