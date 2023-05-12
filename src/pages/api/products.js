import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../../../lib/mongoose";
import { ObjectId } from "mongodb";

export async function findAllProducts() {
  try {
    const db = await connectToDatabase();
    const products = await db.collection("products").find().toArray();
    return products;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products.");
  } finally {
    await disconnectFromDatabase();
  }
}

export async function updateProducts(newProducts) {
  console.log("Entered Update");
  try {
    const db = await connectToDatabase();
    const bulkOperations = newProducts.map((product) => ({
      updateOne: {
        filter: { _id: new ObjectId(product._id) },
        update: {
          $set: {
            name: product.name,
            price: product.price,
            description: product.description,
            stock: product.stock,
          },
        },
      },
    }));

    const result = await db.collection("products").bulkWrite(bulkOperations);
    return result.modifiedCount;
  } catch (err) {
    console.error(err);
    throw new Error("Error updating products.");
  } finally {
    await disconnectFromDatabase();
  }
}

export async function stockDecrease(productsToUpdate) {
  console.log("Entered");
  // Assuming an array of objects in the format [{ productId: ..., quantity: ... }, ...]
  const db = await connectToDatabase();

  // Loop through the products to update
  for (const { _id, quantity } of productsToUpdate) {
    // Find the product in the database
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(_id) });

    // If the product is found and the requested stock is less than or equal to the current stock, update the stock
    if (product && quantity <= product.stock) {
      await db
        .collection("products")
        .updateOne(
          { _id: new ObjectId(_id) },
          { $set: { stock: product.stock - quantity } }
        );
    } else {
      await disconnectFromDatabase();
      console.log("Invalid product or stock value");
      return "Invalid Product or stock value";
    }
  }
  await disconnectFromDatabase();
  return;
}

export default async function handle(req, res) {
  if (req.method === "GET") {
    const products = await findAllProducts();
    res.json(products);
  } else if (req.method === "PUT" && req.query.stockDecrement === "true") {
    const productsToUpdate = req.body;
    const result = await stockDecrease(productsToUpdate);
    res.json(result);
  } else if (req.method === "PUT") {
    const products = req.body;
    const result = await updateProducts(products);
    res.json(result);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
