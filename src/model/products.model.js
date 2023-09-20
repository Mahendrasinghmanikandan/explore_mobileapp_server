import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_name: String,
    product_quantity: String,
    product_category: String,
    product_pic: String,
    product_price: Number,
    store_id: {
      type: Schema.Types.ObjectId,
      ref: "store",
    },
  },
  {
    timestamps: true,
    collection: "product",
  }
);

export default mongoose?.models?.product ||
  mongoose.model("product", productSchema);
