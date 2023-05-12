import { Int32 } from "mongodb";
import mongoose from "mongoose";
import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const Product = models?.Product || model("Product", ProductSchema);

export default Product;
