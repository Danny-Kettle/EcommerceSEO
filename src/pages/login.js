import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AuthForm from "@/components/AuthForm";
import Layout from "@/components/Layout";
import Head from "next/head";

function AuthPage() {
  const router = useRouter();

  // check if logged in and redirect to home page if so
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      }
    });
  }, [router]);

  return (
    <>
      <Head>
        <title>Echo Login | Sign In or Create an Account</title>
        <meta
          name="description"
          content="Sign in to your Echo account or create a new one. Enjoy fast and easy checkout, view and track your orders, and more."
        />
        <meta
          name="keywords"
          content="Echo, login, sign in, create account, audio, laptops, mobiles, headphones, speakers, smartphones, tablets, computers, gaming laptops, MacBook, Dell, HP, Lenovo, Samsung, Apple, Sony, Bose, JBL, Sennheiser, Beats, Asus"
        />
        <meta name="author" content="Echo Inc." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="Echo Login | Sign In or Create an Account"
        />
        <meta
          property="og:description"
          content="Sign in to your Echo account or create a new one. Enjoy fast and easy checkout, view and track your orders, and more."
        />
        <meta property="og:image" content="/logo.png" />
        <meta
          name="twitter:title"
          content="Echo Login | Sign In or Create an Account"
        />
        <meta
          name="twitter:description"
          content="Sign in to your Echo account or create a new one. Enjoy fast and easy checkout, view and track your orders, and more."
        />
        <meta name="twitter:image" content="/logo.png" />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <Layout>
        <AuthForm />
      </Layout>
    </>
  );
}

export default AuthPage;
