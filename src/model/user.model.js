import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    contact: Number,
    pic: String,
    storeStatus:{
      type:Boolean,
      default:false,
    },
  },
  {
    timestamps: true,
    collection: "user",
  }
);



export default  mongoose?.models?.user || mongoose.model("user", userSchema);
