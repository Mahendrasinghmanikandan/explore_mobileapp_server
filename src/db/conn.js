import mongoose from "mongoose";

export const createDBConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/explore");
  } catch (err) {
    console.log(err);
  }
};
