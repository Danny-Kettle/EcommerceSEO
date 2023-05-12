import { MongoCursorExhaustedError } from "mongodb";
import mongoose from "mongoose";
import { model, models, Schema } from "mongoose";

const CartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const Cart = models?.Cart || model("Cart", CartSchema);

export default Cart;
