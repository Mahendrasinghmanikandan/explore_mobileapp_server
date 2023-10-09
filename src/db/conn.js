import mongoose from "mongoose";

export const createDBConnection = async () => {
  try {
    await mongoose.connect("mongodb+srv://mahendrasinghmani222:4X8LItHjFMFloArn@cluster0.delzl0o.mongodb.net/explore?retryWrites=true&w=majority");
  } catch (err) {
    console.log(err);
  }
};

