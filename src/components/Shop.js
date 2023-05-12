import { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Product from "./Product";

export default function Shop({ products, router }) {
  const [search, setSearch] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");

  //Removing duplicates by making a set and turning it into an array
  const categoriesNames = products && [
    ...new Set(products.map((p) => p.category)),
  ];

  const brandNames = products && [...new Set(products.map((p) => p.brand))];

  // Update filtered products when search value changes
  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) &&
          p.category.toLowerCase().includes(categoryFilter.toLowerCase()) &&
          p.brand.toLowerCase().includes(brandFilter.toLowerCase())
      )
    );
  }, [search, categoryFilter, brandFilter, products]);

  function handleFilterChange(e) {
    if (e.target.name === "category") {
      setCategoryFilter(e.target.value);
    } else if (e.target.name === "brand") {
      setBrandFilter(e.target.value);
    }
  }

  function handleClearFilters() {
    setBrandFilter("");
    setCategoryFilter("");
  }

  function handleFilterClick() {
    setIsFilter(!isFilter);
  }

  // function handleProductClick(){
  //   router.push({
  //     pathname: "/login",
  //     query: { status: "loginToAdd" },
  //   });
  //   // href={`/products/[category]/[productId]`}
  //   // as={`/products/${productInfo.category}/${productInfo._id}`}
  // }

  return (
    <div className="mt-8">
      <div className="w-11/12 lg:w-full flex justify-center items-center">
        <input
          type="text"
          value={search}
          id="search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          data-cy="search-input"
          className="bg-gray-100 w-full mx-5 md:w-2/3 lg:w-1/2 md:mx-5 py-2 px-4 block rounded-xl border-2 border-gray-200"
        />
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            data-cy="filter"
            className="w-6 h-6 cursor-pointer transform transition duration-300 ease-in-out hover:scale-110"
            onClick={handleFilterClick}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
        </div>
      </div>
      {isFilter && (
        <div class="w-full flex justify-center mt-8">
          <div class="flex flex-row w-1/3 gap-20 font-bold">
            <select
              value={categoryFilter}
              data-cy="filter-category"
              name="category"
              onChange={(e) => handleFilterChange(e, "")}
              className="block appearance-none w-full bg-white border border-gray-300 rounded px-4 py-3 leading-tight focus:outline-none focus:border-indigo-500"
            >
              <option value="">All Categories</option>
              {categoriesNames.map((categoryName) => (
                <option value={categoryName} key={categoryName}>
                  {categoryName}
                </option>
              ))}
            </select>

            <select
              value={brandFilter}
              data-cy="filter-brand"
              name="brand"
              onChange={(e) => handleFilterChange(e, "")}
              className="block appearance-none w-full bg-white border border-gray-300 rounded px-4 py-3 leading-tight focus:outline-none focus:border-indigo-500"
            >
              <option value="">All Brands</option>
              {brandNames.map((brandName) => (
                <option value={brandName} key={brandName}>
                  {brandName}
                </option>
              ))}
            </select>
          </div>
          <p
            onClick={handleClearFilters}
            className="ml-20 my-auto text-md border-red-300 border px-4 py-3 rounded leading-tight transform transition duration-300 ease-in-out text-red-500 font-bold hover:bg-red-600 hover:text-white"
          >
            Clear Filters
          </p>
        </div>
      )}
      <div id="shop" className="flex flex-col justify-center items-center">
        {categoriesNames.map((categoryName) => (
          <div key={categoryName}>
            {filteredProducts.find((p) => p.category === categoryName) && (
              <div className="flex flex-col md:justify-between md:items-center w-full">
                <h2 className="text-3xl mx-auto md:mr-auto md:ml-5 font-black py-20 uppercase">
                  {categoryName}
                </h2>
                <div className="flex flex-wrap justify-center">
                  {filteredProducts
                    .filter((p) => p.category === categoryName)
                    .map((productInfo) => (
                      <div
                        data-cy="product"
                        key={productInfo._id}
                        className="px-4 my-4 cursor-pointer md:mx-4"
                        onClick={() =>
                          router.push({
                            pathname: `/products/[category]/[productId]`,
                            query: {
                              category: productInfo.category,
                              productId: productInfo._id,
                            },
                            as: `/products/${productInfo.category}/${productInfo._id}`,
                          })
                        }
                      >
                        <Product {...productInfo} />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
