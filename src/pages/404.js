import Layout from "@/components/Layout";
import React from "react";
import Link from "next/link";

const Custom404 = () => {
  return (
    <Layout>
      <div className="flex flex-col mt-10 gap-6 w-fit text-center justify-center mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          404 - Page Not Found
        </h1>
        <p>The page you're looking for could not be found.</p>
        <Link className="self-center" href="/">
          <p className="text-blue-600 text-lg">Return to homepage</p>
        </Link>
      </div>
    </Layout>
  );
};

export default Custom404;
