import { getSession } from "next-auth/react";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../../../lib/mongoose";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const session = await getSession({ req });
  let db;
  try {
    db = await connectToDatabase();

    if (req.method === "PUT") {
      console.log("Entered Put");

      // const { itemId } = req.query;
      const { userId, itemId, incrementValue } = req.body;

      const updateResult = await db
        .collection("carts")
        .updateOne(
          { user_id: new ObjectId(userId), "items._id": itemId },
          { $inc: { "items.$.quantity": incrementValue } }
        );

      if (updateResult.matchedCount === 0) {
        res.status(404).json({ message: "Cart item not found" });
        return;
      }

      res.status(200).json({
        message: "Cart item updated successfully",
        cart: updateResult,
      });
    } else if (req.method === "POST") {
      const { userId, cartItems } = req.body;
      await db
        .collection("carts")
        .updateOne(
          { user_id: new ObjectId(userId) },
          { $set: { items: cartItems } },
          { upsert: true }
        );

      res.status(201).json({ message: "Cart updated successfully" });
    } else if (req.method === "DELETE") {
      const { userId, itemId } = req.query;
      const deleteResult = await db
        .collection("carts")
        .updateOne(
          { user_id: new ObjectId(userId) },
          { $pull: { items: { _id: itemId } } }
        );

      if (deleteResult.matchedCount === 0) {
        res.status(404).json({ message: "Cart item not found" });
        return;
      }

      res.status(200).json({
        message: "Cart item deleted successfully",
        cart: deleteResult,
      });
    } else if (req.method === "GET") {
      const { userId } = req.query;
      const cart = await db
        .collection("carts")
        .findOne({ user_id: new ObjectId(userId) });

      if (!cart) {
        res.status(404).json({ message: "Cart not found" });
        return;
      }

      res.status(200).json({ items: cart.items, user_id: cart.user_id });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await disconnectFromDatabase();
  }
}
