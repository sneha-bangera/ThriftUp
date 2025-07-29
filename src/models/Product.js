import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "",
  },
  userEmail: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Avoid model overwrite issues
export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
