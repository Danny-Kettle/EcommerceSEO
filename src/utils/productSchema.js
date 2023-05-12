const getProductSchema = (products) => {
  console.log(products);
  const productSchemaArray = products.map((product) => {
    const specsArray = product.specs.map((spec) => {
      return {
        "@type": "PropertyValue",
        name: "Specification",
        value: spec,
      };
    });

    return {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: product.name,
      picture: product.picture,
      description: product.description,
      sku: product._id.toString(),
      price: product.price,
      brand: {
        "@type": "Brand",
        name: product.brand,
      },
      additionalProperty: specsArray,
    };
  });

  return productSchemaArray;
};

export default getProductSchema;
