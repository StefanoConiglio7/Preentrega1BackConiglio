import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  description: { type: String, index: "text" },
  code: String,
  price: Number,
  status: Boolean,
  stock: Number,
  category: { type: String, index: true },
  thumbnails: String,
});

productSchema.plugin(paginate);

const Product = mongoose.model("Product", productSchema);

export default Product;