const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_URI;

module.exports = {
  siteUrl: "localhost:3000",
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: ["/stock"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  async routes() {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
    });
    const db = client.db("products");
    const products = await db.collection("products").find().toArray();
    client.close();
    return products.map((product) => ({
      url: `/products/${product.category}/${product._id}`,
      changefreq: "weekly",
      priority: 0.8,
    }));
  },
};
