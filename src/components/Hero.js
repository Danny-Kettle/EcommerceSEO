import React from "react";
import Image from "next/image";

const Hero = ({ sectionRef }) => {

  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-indigo-600">
      <div
        id="heroSection"
        className="relative max-w-screen-xl px-8 mx-auto sm:px-16"
      >
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-16 md:mb-0 md:pr-32 md:w-1/2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-4xl font-extrabold tracking-tight text-white">
              Elevate Your Tech Game
            </h1>
            <p className="mt-5 text-lg md:text-xl lg:text-2xl xl:textxl text-gray-300">
              From laptops and gaming accessories to home automation, we've got
              everything you need to upgrade your tech setup.
            </p>
            <div className="mt-10">
              <a
                href="/shop"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
              >
                Shop Now
              </a>
            </div>
          </div>
          <div className="hidden md:block md:w-1/2">
            <div className="relative flex justify-center w-full">
              <img src="/products/msi.png" alt="Tech accessories" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
