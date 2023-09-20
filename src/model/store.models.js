import mongoose, { Schema } from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    store_name: String,
    store_district: String,
    store_local_landmark: String,
    store_address: String,
    store_contact_number: Number,
    store_category: String,
    store_pic: String,
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
    collection: "store",
  }
);

export default mongoose?.models?.store || mongoose.model("store", storeSchema);
